import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { findPetSearch } from "../utils/API";
import { savePetIds, getSavedPetIds } from "../utils/localStorage";
import { SAVE_PET } from "../utils/mutations";

const SearchPets = () => {
  const [savePet, { error }] = useMutation(SAVE_PET);
  // create state for holding returned google api data
  const [searchedPets, setSearchedPets] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved petId values
  const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());

  // set up useEffect hook to save `savedPetIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePetIds(savedPetIds);
  });

  // create method to search for pets and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await findPetSearch(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { animals } = await response.json();

      const petData = animals
        .map((pet) => {
          return {
            petId: pet.id,
            size: pet.size || ["No size to display"],
            title: pet.name,
            description: pet.gender,
            species: pet.species,
            image: pet.primary_photo_cropped?.large || "",
          };
        })
        .filter((pet) => pet.image !== "");
      console.log(petData);
      console.log(searchedPets.length);
      setSearchedPets(petData);
      console.log(searchedPets);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a pet to our database
  const handleSavePet = async (petId) => {
    // find the pet in `searchedPets` state by the matching id
    const petToSave = searchedPets.find((pet) => pet.petId === petId);
    console.log(petToSave);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePet({
        variables: { input: petToSave },
      });
      console.log(data);

      if (error) {
        throw new Error("something went wrong!");
      }

      // if pet successfully saves to user's account, save pet id to state
      setSavedPetIds([...savedPetIds, petToSave.petId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-dark jumbo ">
        <Container>
          <h1 className="head text-center">Search for Animals!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row className="search">
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  className="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for an animal"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" size="lg" className="glow-on-hover">
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2 className="text-center">
          {searchedPets.length
            ? `Viewing ${searchedPets.length} results:`
            : "Search for an animal to begin"}
        </h2>

        <CardColumns>
          {searchedPets.length > 0 &&
            searchedPets.map((pet) => {
              return (
                <Card key={pet.petId} className="text-center cardImg">
                  {pet.image ? (
                    <Card.Img
                      src={pet.image}
                      alt={`The image available for ${pet.title}`}
                      variant="top"
                      className="cardSoloImg"
                    />
                  ) : (
                    "Currently there is no image available"
                  )}

                  <Card.Body className="cardBody text-center text-dark">
                    <Card.Title>{pet.title}</Card.Title>

                    <Card.Text>
                      {pet.size} {pet.description} {pet.species}
                    </Card.Text>

                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPetIds?.some(
                          (savedPetId) => savedPetId === pet.petId
                        )}
                        className="saveBtn"
                        onClick={() => handleSavePet(pet.petId)}
                      >
                        {savedPetIds?.some(
                          (savedPetId) => savedPetId === pet.petId
                        )
                          ? "This Animal has already been saved!"
                          : ""}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          ;
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPets;
