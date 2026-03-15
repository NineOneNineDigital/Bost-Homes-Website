import { gql } from "graphql-request";

const BLOG_POST_FIELDS = gql`
  fragment BlogPostFields on BlogPost {
    id
    title
    slug
    category
    excerpt
    featuredImage {
      url
      width
      height
    }
    author
    publishedAt
  }
`;

export const BLOG_POSTS_QUERY = gql`
  ${BLOG_POST_FIELDS}
  query BlogPosts($first: Int, $skip: Int, $category: String) {
    blogPosts(
      orderBy: publishedAt_DESC
      first: $first
      skip: $skip
      where: { category: $category }
    ) {
      ...BlogPostFields
    }
    blogPostsConnection(where: { category: $category }) {
      aggregate {
        count
      }
    }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = gql`
  query BlogPostBySlug($slug: String!) {
    blogPost(where: { slug: $slug }) {
      id
      title
      slug
      category
      excerpt
      body {
        html
        text
      }
      featuredImage {
        url
        width
        height
      }
      author
      publishedAt
    }
  }
`;

export const BLOG_POST_SLUGS_QUERY = gql`
  query BlogPostSlugs {
    blogPosts {
      slug
    }
  }
`;
