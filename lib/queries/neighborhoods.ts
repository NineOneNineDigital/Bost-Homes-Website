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
    }
  }
`;
