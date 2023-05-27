import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import { Checkbox, Menu, Typography } from "antd";
import { fetchPoliciesForUser } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { SUPERUSER_ROUTE } from "../utils/consts";

import {
  DatabaseTwoTone,
  EnvironmentTwoTone,
  GoldTwoTone,
} from "@ant-design/icons";
import { GOLDEN } from "../utils/colors";

const { Link } = Typography;

const SideMenu = (props) => {
  const navigate = useNavigate();
  const { user, layers } = useContext(Context);

  const handleCheckboxChange = (event) => props.handleCheckboxChange(event);

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
  }, [props.isOpen]);

  return (
    <Menu theme="light" mode="inline">
      <Menu.SubMenu
        key="Категорії"
        title="Категорії"
        icon={
          <EnvironmentTwoTone
            twoToneColor={GOLDEN}
            style={{ fontSize: "24px" }}
          />
        }
      >
        {categories.map((category) => (
          <Menu.Item key={category.name}>
            <Checkbox
              defaultChecked={true}
              name={`${category.name}-${category.id}`}
              onChange={handleCheckboxChange}
            >
              {category.name}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      {user.isAuth && (
        <Menu.SubMenu
          key="Шари відображення"
          title="Шари відображення"
          icon={
            <GoldTwoTone twoToneColor={GOLDEN} style={{ fontSize: "24px" }} />
          }
        >
          {policies.map((policy) => (
            <Menu.Item key={policy.name}>
              <Checkbox
                id={`${policy.name}-${policy.id}`}
                name={`${policy.name}-${policy.id}`}
                onChange={handleCheckboxChange}
              >
                {policy.label}
              </Checkbox>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )}
      {user.isAuth && user.user.role === "superuser" && (
        <Menu.Item
          theme="light"
          style={{ backgroundColor: "white" }}
          icon={
            <DatabaseTwoTone
              twoToneColor={GOLDEN}
              style={{ fontSize: "24px" }}
            />
          }
        >
          <Link onClick={() => navigate(SUPERUSER_ROUTE)}>Налаштування</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default observer(SideMenu);
