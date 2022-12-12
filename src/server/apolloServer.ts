import { data as users } from "./mockData";
import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Post {
    id: Int
    title: String
    description: String
    pictureUrl: String
  }

  type User {
    id: Int
    name: String
    posts: [Post]
  }

  type Query {
    users: [User]
    posts: [Post]
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "users" array above.
export const resolvers = {
  Query: {
    users: () => users,
    posts: () => users.flatMap((user) => user.posts),
  },
};
