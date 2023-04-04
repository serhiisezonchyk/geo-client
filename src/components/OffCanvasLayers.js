import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import { Offcanvas, Form } from "react-bootstrap";
import { fetchPoliciesForUser } from "../http/userApi";
import { observer } from "mobx-react-lite";
const OffCanvasLayers = (props) => {
  const { user, layers } = useContext(Context);

  const handleClose = () => props.setShow(false);
  const handleCheckboxChangeUser = (event) => props.handleCheckboxChangeUser(event);
  const handleCheckboxChangeAuth = (event) => props.handleCheckboxChangeAuth(event);

  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchAllCategoryProblem().then((data) => {
      setCategories(data);
      data.forEach((category) => {
        const checkboxName = `${category.name}-${category.id}`;
        const checkboxState = layers.getLayer(checkboxName);
        const checkboxElem = document.getElementById(checkboxName);
        if (checkboxElem) {
          checkboxElem.checked = checkboxState;
        }
      });
    });

    if (user.isAuth) {
      fetchPoliciesForUser(user.user.id).then((policies) => {
        setPolicies(policies);
        policies.forEach((policy) => {
          const checkboxName = `${policy.name}-${policy.id}`;
          const checkboxState = layers.getLayer(checkboxName);
          const checkboxElem = document.getElementById(checkboxName);
          if (checkboxElem) {
            checkboxElem.checked = checkboxState;
          }
        });
      });
    }
  }, [props.show]);

  return (
    <Offcanvas show={props.show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Категорія</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group>
            {categories.map((category) => (
              <Form.Check
                key={category.id}
                type="checkbox"
                id={`${category.name}-${category.id}`}
                label={category.name}
                name={`${category.name}-${category.id}`}
                onChange={handleCheckboxChangeUser}
              />
            ))}
          </Form.Group>
          <br />
          <Form.Group>
            {policies.map((policy) => (
              <Form.Check
                key={policy.id}
                type="checkbox"
                id={`${policy.name}-${policy.id}`}
                label={policy.label}
                name={`${policy.name}-${policy.id}`}
                onChange={handleCheckboxChangeAuth}
              />
            ))}
          </Form.Group>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default observer(OffCanvasLayers);
