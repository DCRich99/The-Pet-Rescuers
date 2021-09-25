const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Pet {
    petId: ID!
    size: [String]
    description: String
    species: String
    title: String
    image: String
    link: String
  }

  input PetInput {
    size: [String]
    petId: ID!
    description: String
    species: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    petCount: Int
    savedPets: [Pet]
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePet(input: PetInput): User
    removePet(petId: ID!): User
  }
`;

module.exports = typeDefs;
