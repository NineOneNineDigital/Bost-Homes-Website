import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

const isConfigured =
  !!endpoint && !endpoint.includes("<your-") && endpoint.startsWith("http");

class FallbackClient {
  request(): Promise<never> {
    return Promise.reject(
      new Error("Hygraph is not configured — using fallback data")
    );
  }
}

const client = isConfigured
  ? new GraphQLClient(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  : (new FallbackClient() as unknown as GraphQLClient);

// A production build prerenders every page at once, firing a burst of queries
// that can trip Hygraph's read rate limit (HTTP 429). Retry those (and
// transient gateway errors) with exponential backoff so the build rides out
// the limit window instead of failing. Non-retryable errors rethrow at once.
const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);
const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 600;

function statusOf(error: unknown): number | undefined {
  return (error as { response?: { status?: number } } | null)?.response?.status;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestWithRetry<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      return await client.request<T>(query, variables);
    } catch (error) {
      lastError = error;
      const status = statusOf(error);
      if (status === undefined || !RETRYABLE_STATUS.has(status)) {
        throw error;
      }
      if (attempt < MAX_ATTEMPTS - 1) {
        await sleep(BASE_DELAY_MS * 2 ** attempt);
      }
    }
  }
  throw lastError;
}

export const hygraph = {
  request: requestWithRetry,
} as Pick<GraphQLClient, "request"> as GraphQLClient;

export { isConfigured as isHygraphConfigured };
