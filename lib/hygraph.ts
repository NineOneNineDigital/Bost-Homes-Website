import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

const isConfigured =
  !!endpoint && !endpoint.includes("<your-") && endpoint.startsWith("http");

class FallbackClient {
  async request(): Promise<never> {
    throw new Error("Hygraph is not configured — using fallback data");
  }
}

export const hygraph = isConfigured
  ? new GraphQLClient(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  : (new FallbackClient() as unknown as GraphQLClient);

export { isConfigured as isHygraphConfigured };
