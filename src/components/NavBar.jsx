import React from "react";

import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { MAP_ROUTE } from "../utils/consts";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Header style={{ backgroundColor: "transparent", height: "10vh" }}>
      <LeftOutlined onClick={() => navigate(MAP_ROUTE)} />
    </Header>
  );
};
export default NavBar;
