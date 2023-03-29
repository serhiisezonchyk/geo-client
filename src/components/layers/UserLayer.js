import React, { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { fetchAll, fetchOne } from "../../http/layers/userLayerApi";
import { GeoJSON, MapContainer } from "react-leaflet";
import UserPopup from "../popups/UserPopup";
import * as ReactDOMServer from "react-dom/server";
import LoadingSpinner from "../LoadingSpinner";

function UserLayer() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      fetchAll()
        .then((data) => {
          setData(data);
        })
        .finally(() => setIsLoading(false));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);
  if (data && !isLoading) {
    return <GeoJSON data={data} onEachFeature={onEachFeature} />;
  } else {
    return <LoadingSpinner />;
  }
}

function onEachFeature(feature, layer) {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1119/1119071.png",
    iconSize: [30, 30],
  });
  layer.setIcon(customIcon);

  layer.on("click", () => {
    fetchOne(feature.gid).then((data) => {
      const popupContent = ReactDOMServer.renderToString(
        <UserPopup data={data[0]} />
      );
      layer.bindPopup(popupContent);
      layer.openPopup();
      layer._map.setView(layer.getLatLng(), 17);
    });
  });

  layer.on("popupopen", () => {
    const map = layer._map;
    const baseLayerContainer = map
      .getPane("tilePane")
      .querySelector(".leaflet-layer");
    baseLayerContainer.classList.add("blur");
  });
   
  layer.on("popupclose", () => {
    const map = layer._map;
    const baseLayerContainer = map
      .getPane("tilePane")
      .querySelector(".leaflet-layer");
    baseLayerContainer.classList.remove("blur");
  });
}

export default UserLayer;
