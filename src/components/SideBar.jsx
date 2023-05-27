import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import SideMenu from "../components/SideMenu";
import { Typography } from "antd";
import { switchLayers } from "../utils/switchLayers";
import { Stack } from "react-bootstrap";

const SideBar = ({ map, layers }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuMode, setMenuMode] = useState();
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const [policyName, categoryId] = name.split("-");

    const fetchAndHandleLayer = (fetchFunc, addFunc, removeFunc) => {
      fetchFunc().then((data) => {
        const newData = data.map((obj) => ({
          ...obj,
          policyName,
        }));
        if (map !== null) {
          checked ? addFunc(map, newData) : removeFunc(map, policyName);
        }
      });
    };
    //add&remove each layer on change checkbox state (../utils/switchLayers)
    switchLayers(policyName, categoryId, checked, fetchAndHandleLayer, map);
    layers.setLayer(name, checked);
  };

  const checkWindowSize = () => {
    if (window.innerWidth > 799) {
      setMenuMode("horizontal");
    } else {
      setMenuMode("inline");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkWindowSize();
    };
    window.addEventListener("resize", handleResize);
    checkWindowSize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {menuMode === "inline" ? (
        <SideMenu
          isOpen={collapsed}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <Sider
          collapsible
          className="side-nav"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          width="20vw"
        >
          <Stack
            className="d-flex  justify-content-evenly"
            direction="horizontal"
            style={{ margin: "20px 0", padding: "0", height: "15vh" }}
          >
            <Typography.Text
              strong
              type="secondary"
              className={collapsed ? "collapsed-menu-title" : "menu-title"}
            >
              GeoPortal
            </Typography.Text>
          </Stack>
          <SideMenu
            isOpen={collapsed}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Sider>
      )}
    </>
  );
};

export default SideBar;
