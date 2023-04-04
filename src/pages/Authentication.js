import React, {useContext, useState} from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import {useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Card, FormControl, Button } from "react-bootstrap";


import { fetchPoliciesForUser, login } from "../http/userApi";
import { MAP_ROUTE } from "../utils/consts";

const Authentication = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const click = async () => {
    try {
      let data;
      data = await login(email, password);

      user.setUser(data);
      user.setIsAuth(true);
      fetchPoliciesForUser(data.id).then((policies)=>{
        user.setPolicies(policies);
      })
      
      navigate(MAP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 59, width: window.innerWidth/2 }}
    >
      <Card
        style={{ width: window.innerWidth - window.innerWidth / 4 }}
        className="p-5 shadow p-3 mb-5 bg-body rounded"
      >
        <h2 className="m-auto">Авторизація</h2>
        <Form className="d-flex flex-column">
          <FormControl
            placeholder="Логін..."
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            type="password"
            placeholder="Пароль..."
            className="mt-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="mt-3" variant="outline-dark" onClick={click}>
            Увійти
          </Button>
        </Form>
      </Card>
    </Container>
  );
});

export default Authentication;
