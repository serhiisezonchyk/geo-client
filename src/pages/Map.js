import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { Button, Image } from "react-bootstrap";
import { fetchAllProblemInfoPointByCategories } from "../http/layers/problemInfoPointLayerApi";
import OffCanvasLayers from "../components/OffCanvasLayers";
import {
  addGeojsonLayer,
  removeGeojsonLayer,
} from "../components/layers/ProblemInfoPointLayer";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

function Map() {
  const [map, setMap] = useState(null);
  const [show, setShow] = useState(false);
  const { user, layers } = useContext(Context);

  useEffect(() => {
    fetchAllCategoryProblem().then((categories) => {
      categories.forEach((category) => {
        const categoryId = category.id;
        layers.setLayer(`${category.name}-${category.id}`, true);
        fetchAllProblemInfoPointByCategories({
          categoryProblemId: categoryId,
        }).then((data) => {
          if (map !== null) {
            addGeojsonLayer(map, data);
          }
        });
      });
    });
  }, [map]);

  useEffect(() => {
    user.policies.forEach((policy) => {
      console.log(policy.name);
      layers.setLayer(`${policy.name}-${policy.id}`, true);
    });
  }, [user.policies]);

  const handleShow = () => {
    setShow(true);
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleCheckboxChangeUser = (event) => {
    const { name, checked } = event.target;
    const categoryId = name.split("-")[1];
    if (checked) {
      fetchAllProblemInfoPointByCategories({
        categoryProblemId: categoryId,
      }).then((data) => {
        if (map !== null) addGeojsonLayer(map, data);
      });
    } else {
      removeGeojsonLayer(map, categoryId);
    }
    layers.setLayer(name, checked);
  };

  const handleCheckboxChangeAuth = (event) => {
    const { name, checked } = event.target;
    const policyName = name.split("-")[0];
    if(checked){
      console.log(policyName + " checked");
    }else{
      console.log(policyName + " uncheced");
    }

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
        handleCheckboxChangeUser={handleCheckboxChangeUser}
        handleCheckboxChangeAuth={handleCheckboxChangeAuth}
      />
    </>
  );
}

export default observer(Map);
