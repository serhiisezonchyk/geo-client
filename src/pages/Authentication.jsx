import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Container, Form, Card, Button } from "react-bootstrap";

import { fetchPoliciesForUser, login } from "../http/userApi";
import { MAP_ROUTE } from "../utils/consts";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import NavBar from "../components/NavBar";

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
        title: "Помилка авторизації",
        content: "Неправльний логін або пароль",
      });
    }
  };

  return (
    <Layout
      style={{ height: "100%", width: "100%", backgroundColor: "transparent" }}
    >
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center "
        style={{
          height: window.innerHeight - 59,
          width: "70vw",
        }}
      >
        <Card
          style={{ width: window.innerWidth - window.innerWidth / 4 }}
          className="shadow-lg p-5 mb-5 bg-white rounded border-0"
        >
          <Typography.Text strong type="secondary" className={"menu-title"}>
            Авторизація
          </Typography.Text>
          <Form
            className="d-flex my-3 gap-3 flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email..."
                rules={[{ required: true }]}
                className={Boolean(errors.email?.message) ? "is-invalid" : ""}
                {...register("email", {
                  required: "Введіть email",
                })}
              />
              <Form.Text className="text-danger pb-3">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Пароль..."
                rules={[{ required: true }]}
                className={
                  Boolean(errors.password?.message) ? "is-invalid" : ""
                }
                {...register("password", {
                  required: "Введіть пароль",
                })}
              />
              <Form.Text className="text-danger pb-3">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Button class="btn btn-outline-primary mx-auto" type="submit">
              Увійти
            </Button>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
});

export default Authentication;
