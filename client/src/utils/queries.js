import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      petCount
      savedPets {
        petId
        size
        image
        species
        description
        title
        link
      }
    }
  }
`;
