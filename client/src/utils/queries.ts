import { gql } from '@apollo/client';

// Query to fetch all participants in a group
export const QUERY_GROUP = gql`
  query ssGroup($groupId: ID!) {
    ssGroup(groupId: $groupId) {
      _id
      name
      members
      matches {
        giver
        receiver
      }
    }
  }
`;

// Query to fetch group assignments (matches)
export const QUERY_ASSIGNMENTS = gql`
  query ssGroup($groupId: ID!) {
    ssGroup(groupId: $groupId) {
      _id
      name
      matches {
        giver
        receiver
      }
    }
  }
`;