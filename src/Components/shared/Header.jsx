import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

// import { } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav-link" to="/task">
              React Task
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav>
                <Link className="nav-link" to="/user">
                  Users
                </Link>
              </Nav>
              <Nav>
                <Link className="nav-link" to="/task">
                  Tasks
                </Link>
              </Nav>
              <Nav>
                <Link className="nav-link" to="/login">
                  login
                </Link>
              </Nav>
            </Nav>
            <Nav>
              <Link className="nav-link">Welcom </Link>
              <Link className="nav-link">Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
