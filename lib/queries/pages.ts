import { gql } from "graphql-request";

export const PAGE_CONTENT_QUERY = gql`
  query PageContent($slug: String!) {
    pageContent(where: { slug: $slug }) {
      id
      slug
      hero {
        heading
        subheading
        backgroundImage {
          url
          width
          height
        }
      }
      sections {
        heading
        body {
          html
          text
        }
        image {
          url
          width
          height
        }
        imagePosition
      }
      cta {
        heading
        buttonText
        buttonLink
      }
    }
  }
`;

export const TESTIMONIALS_QUERY = gql`
  query Testimonials {
    testimonials {
      id
      quote
      author
    }
  }
`;

export const AWARDS_QUERY = gql`
  query Awards {
    awards(orderBy: year_DESC) {
      id
      year
      title
      description
    }
  }
`;

export const PROCESS_STEPS_QUERY = gql`
  query ProcessSteps {
    processSteps(orderBy: number_ASC) {
      id
      number
      title
      description
    }
  }
`;
