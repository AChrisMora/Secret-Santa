const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    ssGroups: [SSGroup]
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input MatchInput {
    giver: String
    receiver: String
  }

  input SSGroupInput {
  name: String 
  members: [String]
  matches: [MatchInput]
  }

  type SSGroup {
    _id: ID
    name: String
    members: [String]
    matches: [Match]
  }

  type Match {
  giver: String
  receiver: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    myGroups: [SSGroup]
  }


  type Mutation {
    addUser(input: UserInput): Auth
    login(email: String, password: String): Auth
    createSSGroup(input: SSGroupInput): SSGroup
    addMemberToGroup(groupId: ID, member: String): SSGroup
    removeMemberFromGroup(groupId: ID, member: String): SSGroup
    removeSSGroup(groupId: ID): Boolean
    }
    `;
    
    
export default typeDefs;
