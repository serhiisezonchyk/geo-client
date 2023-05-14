import React, { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button } from "react-bootstrap";

import { fetchPoliciesForUser, login } from "../http/userApi";
import { MAP_ROUTE } from "../utils/consts";
import { useForm } from "react-hook-form";
import { Modal } from "antd";

const Authentication = observer(() => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      let data;
      data = await login(values.email, values.password);

      user.setUser(data);
      user.setIsAuth(true);
      fetchPoliciesForUser(data.id).then((policies) => {
        user.setPolicies(policies);
      });

      navigate(MAP_ROUTE);
    } catch (error) {
      Modal.error({
        title: 'Помилка авторизації',
        content: 'Неправльний логін або пароль',
      });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 59, width: window.innerWidth / 2 }}
    >
      <Card
        style={{ width: window.innerWidth - window.innerWidth / 4 }}
        className="p-5 shadow p-3 mb-5 bg-body rounded"
      >
        <h2 className="m-auto">Авторизація</h2>
        <Form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email..."
              className={Boolean(errors.email?.message) ? "is-invalid" : ""}
              {...register("email", {
                required: "Введіть email",
              })}
            />
            <span className="text-danger pb-3">{errors.email?.message}</span>
          </div>
          <div>
            <Form.Control
              type="password"
              placeholder="Пароль..."
              className={Boolean(errors.login?.message) ? "is-invalid" : ""}
              {...register("password", {
                required: "Введіть пароль.",
              })}
            />
            <span className="text-danger">{errors.password?.message}</span>
          </div>

          <Button className="mt-3" variant="outline-dark" type="submit">
            Увійти
          </Button>
        </Form>
      </Card>
    </Container>
  );
});

export default Authentication;
