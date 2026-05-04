import { gql } from "graphql-request";

// Listing/card contexts only need a single thumbnail, name, slug, location.
// Detail pages use PROJECT_FIELDS for full description, gallery, testimonial, etc.
const PROJECT_LIST_FIELDS = gql`
  fragment ProjectListFields on CompletedProject {
    id
    name
    slug
    location
    mainImage {
      url
      width
      height
    }
    images(first: 1) {
      url
      width
      height
    }
  }
`;

const PROJECT_FIELDS = gql`
  fragment ProjectFields on CompletedProject {
    id
    name
    slug
    location
    sqft
    year
    description {
      html
      text
    }
    highlights {
      html
      text
    }
    mainImage {
      url
      width
      height
    }
    images(first: 100) {
      url
      width
      height
    }
    featuredImages(first: 50) {
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
  ${PROJECT_LIST_FIELDS}
  query FeaturedProjects {
    completed_Project(
      where: { featured: true, archived: false }
      orderBy: year_DESC
    ) {
      ...ProjectListFields
    }
  }
`;

export const ALL_PROJECTS_QUERY = gql`
  ${PROJECT_LIST_FIELDS}
  query AllProjects {
    completed_Project(where: { archived: false }, orderBy: year_DESC) {
      ...ProjectListFields
    }
  }
`;

export const PROJECT_BY_SLUG_QUERY = gql`
  ${PROJECT_FIELDS}
  query ProjectBySlug($slug: String!) {
    completedProject(where: { slug: $slug }) {
      ...ProjectFields
    }
  }
`;

export const PROJECT_SLUGS_QUERY = gql`
  query ProjectSlugs {
    completed_Project(where: { archived: false }) {
      slug
    }
  }
`;

export const ARCHIVED_PROJECTS_QUERY = gql`
  ${PROJECT_LIST_FIELDS}
  query ArchivedProjects {
    completed_Project(where: { archived: true }, orderBy: year_DESC) {
      ...ProjectListFields
    }
  }
`;
