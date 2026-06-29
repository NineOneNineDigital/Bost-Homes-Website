import { gql } from "graphql-request";

export const TEAM_MEMBERS_QUERY = gql`
  query TeamMembers {
    teamMembers(orderBy: createdAt_ASC) {
      id
      name
      title: jobTitle
      image {
        url
        width
        height
      }
      bio {
        html
        text
      }
    }
  }
`;
