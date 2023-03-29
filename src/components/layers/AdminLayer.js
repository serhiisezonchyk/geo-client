import React, { useEffect, useState } from "react";
import { fetchAll, fetchOne } from "../../http/layers/adminLayerApi";
import { GeoJSON } from "react-leaflet";
import AdminPopup from "../popups/AdminPopup";
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
    return <GeoJSON data={data} onEachFeature={onEachFeature} style={style} />;
  } else {
    return <LoadingSpinner />;
  }
}
function style() {
  return {
    fillColor: "#BD0026",
  };
}

function onEachFeature(feature, layer) {
  layer.on("click", () => {
    fetchOne(feature.gid).then((data) => {
      const popupContent = ReactDOMServer.renderToString(
        <AdminPopup data={data[0]} />
      );
      layer.bindPopup(popupContent);
      layer.openPopup();
      layer._map.setView(layer.getBounds().getCenter(), 17);
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
