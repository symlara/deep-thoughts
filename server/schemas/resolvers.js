 const { User, Thought } = require('../models');
 const { AuthenticationError } = require('apollo-server-express');
 const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');

const resolvers = {
    Query: {
         // get all users
         user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('friends')
              .populate('thoughts');
          },
          // get a user by username
          users: async (parent, { username }) => {
              return User.findOne({ username})
              .select('-__v -password')
              .populate('friends')
              .populate('thoughts');
          },

        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
          },
          // get one thought
          thought: async (parent, { _id }) => {
              return Thought.findOne({ _id});
          },

         
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
          }
      }
  };
  
  module.exports = resolvers;