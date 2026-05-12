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
    originalDate
    publishedAt
    updatedAt
  }
`;

export const BLOG_POSTS_QUERY = gql`
  ${BLOG_POST_FIELDS}
  query BlogPosts(
    $first: Int
    $skip: Int
    $where: BlogPostWhereInput
  ) {
    blogPosts(
      orderBy: originalDate_DESC
      first: $first
      skip: $skip
      where: $where
    ) {
      ...BlogPostFields
    }
    blogPostsConnection(where: $where) {
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
      originalDate
      publishedAt
      updatedAt
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
