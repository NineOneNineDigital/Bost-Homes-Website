import { gql } from "graphql-request";

export const NEIGHBORHOODS_QUERY = gql`
  query Neighborhoods {
    neighborhoods(orderBy: name_ASC) {
      id
      name
      slug
      description
      image {
        url
        width
        height
      }
      availableLots
      lots {
        id
        lotNumber
        acreage
        price
        lotStatus
      }
    }
  }
`;

export const NEIGHBORHOOD_BY_SLUG_QUERY = gql`
  query NeighborhoodBySlug($slug: String!) {
    neighborhood(where: { slug: $slug }) {
      id
      name
      slug
      description
      image {
        url
        width
        height
      }
      availableLots
      lots(orderBy: lotNumber_ASC) {
        id
        lotNumber
        acreage
        price
        address
        description
        features
        dimensions
        lotStatus
      }
    }
  }
`;
