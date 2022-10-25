import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


const NavBar = ({SignOut}) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/README.md">Zola Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav justify-content-center" />
       
        <Nav className="justify-content-end" activeKey="/home">
        <Nav.Item>
            <Nav.Link  href="/">Outils</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link  href="/mail">Mails</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link  href="/appels">Appels</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  href="/alertes">Alerte</Nav.Link>
              </Nav.Item>
          </Nav>
          <Nav>

            <Button onClick={SignOut} variant="warning"> Déconnexion</Button> 
          </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar