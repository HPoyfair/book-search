// File: /server/src/schemas/resolvers.ts

import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User'; 

import { signToken } from '../services/auth';

interface GraphQLContext {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: GraphQLContext) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in!');
      }
      return User.findById(context.user._id);
    },
  },

  Mutation: {
    login: async (parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials!');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (parent: any, args: any) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (parent: any, { book }: { book: any }, context: GraphQLContext) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      if (!book || !book.bookId) {
        throw new Error('Invalid book input');
      }
    
      return User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
    },
    

    removeBook: async (parent: any, { bookId }: { bookId: string }, context: GraphQLContext) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
