import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Geoportal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Увійти</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}
export default NavBar;