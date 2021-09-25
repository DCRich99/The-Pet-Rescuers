import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            The Pet Rescuers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav>
              <Nav.Link as={Link} to="/">
                <button className="navBtn">Search Animals</button>
              </Nav.Link>
              <Nav.Link as={Link} to="/donate">
                <button className="navBtn donate">Donate</button>
              </Nav.Link>
              {/* if user is logged in show saved animals and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                    <button className="navBtn yourAnimals">
                      Saved Animals
                    </button>
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} variant="danger">
                    <button className="text-light logoutBtn"> Logout </button>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  <button className="navBtn">Login/Sign Up</button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        className="modalBackground"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login" className="modalColor">
          <Modal.Header closeButton variant="danger" className="closeBar">
            <Modal.Title id="signup-modal" className="modalColor">
              <Nav variant="pills">
                <Nav.Item className="modalColor">
                  <Nav.Link eventKey="login" className="modalColor loginBtn">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup" className="modalColor signupBtn">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalColor text-light">
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
