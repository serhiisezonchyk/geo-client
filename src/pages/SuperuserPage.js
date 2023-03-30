import React, { useState, useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import UserList from "../components/UserList";
import { fetchAllUsers } from "../http/userApi";

const SuperuserPage =() => {
  const [users, setUsers ] = useState([]);
  useEffect(() => {
    fetchAllUsers().then((data) => setUsers(data));
  }, []);


  return (
    <Container>
      <Row className="mt-2">
        <Col md={8}>
          <UserList users={users}/>
        </Col>
      </Row>
    </Container>
  );
};

export default SuperuserPage;
