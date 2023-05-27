import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { addProblemInfoPointLayer } from "../components/layers/ProblemInfoPointLayer";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import { fetchAllProblemInfoPointByCategories } from "../http/layers/problemInfoPointLayerApi";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import AuthButton from "../components/AuthButton";
import SideBar from "../components/SideBar";

function Map() {
  const [map, setMap] = useState(null);
  const { user, layers } = useContext(Context);

  useEffect(() => {
    if (map)
      fetchAllCategoryProblem().then((categories) => {
        categories.forEach((category) => {
          const categoryId = category.id;
          layers.setLayer(`${category.name}-${category.id}`, true);
          fetchAllProblemInfoPointByCategories({
            categoryProblemId: categoryId,
          }).then((data) => {
            addProblemInfoPointLayer(map, data);
          });
        });
      });
  }, [map]);

  useEffect(() => {
    user.policies.forEach((policy) => {
      layers.setLayer(`${policy.name}-${policy.id}`, false);
    });
  }, [user.policies]);

  //reload page after log out
  useEffect(() => {
    if (!user.isAuth && map) {
      window.location.reload();
    }
  }, [user.isAuth]);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
      }}
    >
      <SideBar map={map} layers={layers} style={{ flex: "0 0 auto" }} />
      <Layout>
        <Content>
          <MapContainer
            style={{ flex: "1", overflow: "hidden" }}
            center={[51.5055, 31.2849]}
            zoom={12}
            scrollWheelZoom={true}
            className="map"
            zoomControl={false}
            whenReady={(map) => {
              handleMapLoad(map.target);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topright" />
            <AuthButton />
          </MapContainer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default observer(Map);
