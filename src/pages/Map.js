import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { Button, Image } from "react-bootstrap";
import OffCanvasLayers from "../components/OffCanvasLayers";

import {
  addProblemInfoPointLayer,
} from "../components/layers/ProblemInfoPointLayer";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";

import { fetchAllProblemInfoPointByCategories } from "../http/layers/problemInfoPointLayerApi";
import { switchLayers } from "../utils/switchLayers";

function Map() {
  const [map, setMap] = useState(null);
  const [show, setShow] = useState(false);
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

  const handleShow = () => {
    setShow(true);
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

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

  return (
    <>
      <MapContainer
        center={[51.5055, 31.2849]}
        zoom={12}
        scrollWheelZoom={true}
        className="map"
        whenReady={(map) => {
          handleMapLoad(map.target);
        }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="OpenStreetMap" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Button
          variant="light"
          className="layers-btn d-flex justify-content-center align-items-center "
          onClick={handleShow}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/481/481865.png"
            alt="My Image"
            className="layers-btn-img"
          />
        </Button>
      </MapContainer>

      <OffCanvasLayers
        show={show}
        setShow={setShow}
        handleCheckboxChange={handleCheckboxChange}
      />
    </>
  );
}

export default observer(Map);
