export const userTypeDefs = `#graphql
  type User {
    id: ID
    email: String
    name: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(email: String!, name: String!): User
  }
`
