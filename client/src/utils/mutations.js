import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        petCount
        savedPets {
          petId
          title
          description
          species
          size
          link
          image
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        petCount
        savedPets {
          petId
          title
          description
          size
          image
          link
        }
      }
    }
  }
`;

export const SAVE_PET = gql`
  mutation savePet($input: PetInput!) {
    savePet(input: $input) {
      _id
      username
      email
      savedPets {
        petId
        size
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($petId: ID!) {
    removePet(petId: $petId) {
      _id
      username
      email
      petCount
      savedPets {
        petId
        size
        image
        description
        title
        link
      }
    }
  }
`;
