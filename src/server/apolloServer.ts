import { data as users } from "./mockData";
import { gql } from "apollo-server-core";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

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
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "users" array above.
export const resolvers = {
  Query: {
    users: () => users,
  },
};
