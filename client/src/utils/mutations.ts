import { gql } from '@apollo/client';

// Mutation to add a group with participants
export const ADD_GROUP = gql`
  mutation addGroup($participants: [String!]!) {
    addGroup(participants: $participants) {
      _id
      participants {
        name
      }
    }
  }
`;

// Mutation to save group assignments
export const SAVE_ASSIGNMENTS = gql`
  mutation saveAssignments($groupId: ID!, $assignments: [AssignmentInput!]!) {
    saveAssignments(groupId: $groupId, assignments: $assignments) {
      _id
      assignments {
        giver
        receiver
      }
    }
  }
`;