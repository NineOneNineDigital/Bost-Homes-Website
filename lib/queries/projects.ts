import { gql } from "graphql-request";

const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    name
    slug
    location
    sqft
    year
    bedrooms
    bathrooms
    description {
      html
      text
    }
    images {
      url
      width
      height
    }
    testimonialQuote
    testimonialAuthor
    featured
    archived
  }
`;

export const FEATURED_PROJECTS_QUERY = gql`
  ${PROJECT_FIELDS}
  query FeaturedProjects {
    projects(where: { featured: true, archived: false }, orderBy: year_DESC) {
      ...ProjectFields
    }
  }
`;

export const ALL_PROJECTS_QUERY = gql`
  ${PROJECT_FIELDS}
  query AllProjects {
    projects(where: { archived: false }, orderBy: year_DESC) {
      ...ProjectFields
    }
  }
`;

export const PROJECT_BY_SLUG_QUERY = gql`
  ${PROJECT_FIELDS}
  query ProjectBySlug($slug: String!) {
    project(where: { slug: $slug }) {
      ...ProjectFields
    }
  }
`;

export const PROJECT_SLUGS_QUERY = gql`
  query ProjectSlugs {
    projects(where: { archived: false }) {
      slug
    }
  }
`;

export const ARCHIVED_PROJECTS_QUERY = gql`
  ${PROJECT_FIELDS}
  query ArchivedProjects {
    projects(where: { archived: true }, orderBy: year_DESC) {
      ...ProjectFields
    }
  }
`;
