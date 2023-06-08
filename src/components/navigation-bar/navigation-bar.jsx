import NavDropdown from "react-bootstrap/NavDropdown";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ( {user, onLoggedOut} ) => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

                    {!user && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Log in
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Sign up
                            </Nav.Link>
                        </>
                    )}

                    {user && (
                        <>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                        </>
                    )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}