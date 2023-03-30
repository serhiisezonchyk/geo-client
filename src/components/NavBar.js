import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

import { SUPERUSER_ROUTE, LOGIN_ROUTE, MAP_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const authButton = () => {
    if (user.isAuth) {
      return (
        <Button
          key={user.user.id}
          variant="outline-danger"
          style={{ marginRight: 5, marginBottom: 5 }}
          onClick={() => {
            user.setUser({});
            user.setIsAuth(false);
            localStorage.removeItem("token");
          }}
        >
          Вийти
        </Button>
      );
    } else {
      return (
        <Button
          variant="outline-success"
          style={{ marginRight: 5, marginBottom: 5 }}
          onClick={() => navigate(LOGIN_ROUTE)}
        >
          Увійти
        </Button>
      );
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href={MAP_ROUTE}>Geoportal</Navbar.Brand>
        {user.isAuth ? (
          user.user.role == 'superuser' ? (
            <Nav.Link className="me-auto" href={SUPERUSER_ROUTE}>
              superuser
            </Nav.Link>
          ) : (<></>)
        ) : (<></>)}
      </Container>
      <Nav>{authButton()}</Nav>
    </Navbar>
  );
});
export default NavBar;
