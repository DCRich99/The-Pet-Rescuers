import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { removePetId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_PET } from "../utils/mutations";

const SavedPets = () => {
  //const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  //const userDataLength = Object.keys(userData).length;
  const [removePet, { error }] = useMutation(REMOVE_PET);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // create function that accepts the pet's mongo _id value as param and deletes the pet from the database
  const handleDeletePet = async (petId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePet({
        variables: { petId },
      });

      if (error) {
        throw new Error("something went wrong!");
      }

      //const updatedUser = await response.json();
      //setUserData(updatedUser);
      // upon success, remove pet's id from localStorage
      removePetId(petId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-dark jumbo jumbo3">
        <Container>
          <div className="sign">
            <span className="fast-flicker">S</span>ave
            <span className="flicker">d </span>&nbsp;
            <span className="fast-flicker">A</span>nim
            <span className="flicker">a</span>ls
          </div>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPets.length
            ? `Viewing ${userData.savedPets.length} saved ${
                userData.savedPets.length === 1 ? "pet" : "pets"
              }:`
            : "You have no saved pets!"}
        </h2>
        <CardColumns>
          {userData.savedPets.map((pet) => {
            return (
              <Card key={pet.petId} className="cardImg2">
                {pet.image ? (
                  <Card.Img
                    src={pet.image}
                    alt={`The cover for ${pet.title}`}
                    variant="top"
                    className="cardSoloImg"
                  />
                ) : null}
                <Card.Body className="cardBody">
                  <Card.Title className="text-center">{pet.title}</Card.Title>

                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePet(pet.petId)}
                  >
                    Delete Possible Adoption?
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedPets;
