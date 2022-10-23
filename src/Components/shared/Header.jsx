import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectUserName,
  selectUserAdmin,
  logout,
} from "../../features/UserSlice";

const Header = () => {
  const isAuthenticated = useSelector(selectUser);
  const isAdmin = useSelector(selectUserAdmin);
  const nameUser = useSelector(selectUserName);
  console.log("nameUser", nameUser);
  console.log("isAdmin", isAdmin);
  console.log("isAuthenticated", isAuthenticated);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <>
      {isAuthenticated && (
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
                {nameUser.User_type !== "user" && (
                  <Nav>
                    <Link className="nav-link" to="/user">
                      Users
                    </Link>
                  </Nav>
                )}

                <Nav>
                  <Link className="nav-link" to="/task">
                    Tasks
                  </Link>
                </Nav>
                {!isAuthenticated && (
                  <Nav>
                    <Link className="nav-link" to="/login">
                      login
                    </Link>
                  </Nav>
                )}
              </Nav>
              <Nav>
                <Nav className="nav-link">Welcom {nameUser.user_name} </Nav>
                <Nav className="nav-link" onClick={handleSubmit}>
                  Logout
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
