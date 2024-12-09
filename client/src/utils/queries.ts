import { gql } from '@apollo/client';

// Query to fetch all participants in a group
export const QUERY_GROUP = gql`
  query group($groupId: ID!) {
    group(groupId: $groupId) {
      _id
      participants {
        name
      }
    }
  }
`;

// Query to fetch group assignments
export const QUERY_ASSIGNMENTS = gql`
  query assignments($groupId: ID!) {
    assignments(groupId: $groupId) {
      giver
      receiver
    }
  }
`;