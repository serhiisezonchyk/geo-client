import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import { Offcanvas, Form } from "react-bootstrap";
const OffCanvasLayers = (props) => {
  const {user} = useContext(Context);

  const handleClose = () => props.setShow(false);
  const handleCheckboxChange = (event) => props.handleCheckboxChange(event);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategoryProblem().then((data) => {
      setCategories(data);
      data.forEach((category) => {
        const checkboxName = `${category.name}-${category.id}`;
        const checkboxState = localStorage.getItem(checkboxName) === "true";
        const checkboxElem = document.getElementById(checkboxName);
        if (checkboxElem) {
          checkboxElem.checked = checkboxState;
        }
      });
    });
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
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasLayers;
