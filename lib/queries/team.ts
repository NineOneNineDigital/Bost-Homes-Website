import { gql } from "graphql-request";

// `first: 100` is required: Hygraph defaults list queries to 10 records, which
// silently truncated the team grid and dropped the most recently added members.
export const TEAM_MEMBERS_QUERY = gql`
  query TeamMembers {
    teamMembers(orderBy: createdAt_ASC, first: 100) {
      id
      name
      title: jobTitle
      image {
        url
        width
        height
      }
      secondaryImage {
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
