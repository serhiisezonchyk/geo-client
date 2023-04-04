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
  removeProblemInfoPointLayer,
} from "../components/layers/ProblemInfoPointLayer";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";

import {
  addPublicBuildingPointLayer,
  removePublicBuildingPointLayer,
} from "../components/layers/PublicBuildingPoint";
import { fetchAllPublicBuildingPoint } from "../http/layers/publicBuildingPointApi";

import {
  addPublicBuildingPolygonLayer,
  removePublicBuildingPolygonLayer,
} from "../components/layers/PublicBuildingPolygon";
import { fetchAllPublicBuildingPolygon } from "../http/layers/publicBuildingPolygonApi";

import { fetchAllProblemInfoPointByCategories } from "../http/layers/problemInfoPointLayerApi";

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

  const handleCheckboxChangeUser = (event) => {
    const { name, checked } = event.target;
    const categoryId = name.split("-")[1];
    if (checked) {
      fetchAllProblemInfoPointByCategories({
        categoryProblemId: categoryId,
      }).then((data) => {
        if (map !== null) addProblemInfoPointLayer(map, data);
      });
    } else {
      removeProblemInfoPointLayer(map, categoryId);
    }
    layers.setLayer(name, checked);
  };

  const handleCheckboxChangeAuth = (event) => {
    const { name, checked } = event.target;
    const policyName = name.split("-")[0];
    if (checked) {
      switch (policyName) {
        case "public_building_point": {
          fetchAllPublicBuildingPoint().then((data) => {
            const newData = data.map((obj) => {
              return {
                ...obj,
                policyName: policyName,
              };
            });
            if (map !== null) addPublicBuildingPointLayer(map, newData);
          });
          break;
        }

        case "public_building_polygon": {
          fetchAllPublicBuildingPolygon().then((data) => {
            const newData = data.map((obj) => {
              return {
                ...obj,
                policyName: policyName,
              };
            });
            if (map !== null) addPublicBuildingPolygonLayer(map, newData);
          });
          break;
        }
        default:
          break;
      }
    } else {
      switch (policyName) {
        case "public_building_point": {
          removePublicBuildingPointLayer(map, policyName);
          break;
        }

        case "public_building_polygon": {
          removePublicBuildingPolygonLayer(map, policyName);
          break;
        }
        default:
          break;
      }
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
