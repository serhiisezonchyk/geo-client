import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

import { Col, Container, Row } from "react-bootstrap";
import {fetchAllUsers} from "../http/userApi"
import UserList from "../components/UserList";

const SuperuserPage = observer(() => {
  const { users } = useContext(Context);

  useEffect(() => {
    fetchAllUsers().then((data) => {
      users.setUsers(data);
    });
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={8}>
          <UserList/>
        </Col>
      </Row>
    </Container>
  );
});

export default SuperuserPage;
