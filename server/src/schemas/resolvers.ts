import { User, Group } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

// interface Match {
//   giver: string;
//   receiver: string;
// }

// interface CreateSSGroupArgs {
//   input:{
//   name: string;
//   members: string[];
//   matches: Match[];
//   }
// }

interface AdjustMemberArgs {
  groupId: string;
  member: string;
}

interface GroupId {
  groupId: string;
}

const resolvers = {
  Query: {
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('ssGroups');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },

    myGroups: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }
      
      const user = await User.findOne({ _id: context.user._id }).select('-password');
      console.log(user);
      if (!user) {
        throw new AuthenticationError('User not found.');
      }
      return user.ssGroups;
    }
    
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    // createSSGroup: async (_parent: any, { input }: CreateSSGroupArgs, context: any) => {
    //   if (!context.user) {
    //     throw new AuthenticationError('Not authenticated.');
    //   }
    //   const ssGroup = await Group.create({ name: input.name, members: input.members, matches: input.matches, userId: context.user._id });

    //   const updatedUser = await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { $addToSet: { ssGroups: { ...ssGroup } } },
    //     { new: true }
    //   ).populate("ssGroups");
      
    //   return updatedUser;
    // },

    createSSGroup: async (_parent: any, { input }: any, context: any) => {
      console.log("This is running")
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }
    
      const ssGroup = await Group.create({
        name: input.name,
        members: input.members,
        matches: input.matches,
        userId: context.user._id,
      });
      console.log(ssGroup);
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { ssGroups: ssGroup } },
        { new: true }
      );
      console.log("===============================")
      console.log(updatedUser);

      return ssGroup;
    },
    

    addMemberToGroup: async (_parent: any, { groupId, member, }: AdjustMemberArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }

      return Group.findByIdAndUpdate(
        { _id: groupId, userId: context.user._id },
        { $addToSet: { members: member } },
        { new: true }
      );
    },

    removeMemberFromGroup: async (_parent: any, { groupId, member }: AdjustMemberArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }

      return Group.findByIdAndUpdate(
        { _id: groupId, userId: context.user._id },
        { $pull: { members: member } },
        { new: true }
      );
    },

    removeSSGroup: async (_parent: any, { groupId }: GroupId, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.');
      }

      const deleted = await Group.findOneAndDelete({
        _id: groupId,
        userId: context.user._id,
      });

      return !!deleted;
    },

  },
};

export default resolvers;
