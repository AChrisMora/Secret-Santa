import { gql } from '@apollo/client';

// Mutation to add a user (sign-up)
export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to create a group with participants
export const CREATE_SSGROUP = gql`
  mutation createSSGroup($input: SSGroupInput!) {
    createSSGroup(input: $input) {
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

// Mutation to add a member to a group
export const ADD_MEMBER_TO_GROUP = gql`
  mutation addMemberToGroup($groupId: ID!, $member: String!) {
    addMemberToGroup(groupId: $groupId, member: $member) {
      _id
      name
      members
    }
  }
`;

// Mutation to remove a member from a group
export const REMOVE_MEMBER_FROM_GROUP = gql`
  mutation removeMemberFromGroup($groupId: ID!, $member: String!) {
    removeMemberFromGroup(groupId: $groupId, member: $member) {
      _id
      name
      members
    }
  }
`;

// Mutation to delete a group
export const REMOVE_SSGROUP = gql`
  mutation removeSSGroup($groupId: ID!) {
    removeSSGroup(groupId: $groupId)
  }
`;

// Mutation to save group assignments
export const SAVE_ASSIGNMENTS = gql`
  mutation saveAssignments($groupId: ID!, $assignments: [MatchInput!]!) {
    saveAssignments(groupId: $groupId, assignments: $assignments) {
      _id
      matches {
        giver
        receiver
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

