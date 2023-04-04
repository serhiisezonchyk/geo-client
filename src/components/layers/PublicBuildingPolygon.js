import React from "react";
import { fetchOne } from "../../http/layers/publicBuildingPolygonApi";
import * as ReactDOMServer from "react-dom/server";
import L, { Icon } from "leaflet";
import AdminPopup from "../popups/AdminPopup";

export const addPublicBuildingPolygonLayer = (map, geojson) => {
  const layer = L.geoJSON(geojson, {
    onEachFeature: onEachFeature,
    style: style,
  });
  if (map !== null) map.addLayer(layer);
};

export const removePublicBuildingPolygonLayer = (map, overlayName) => {
  if (map !== null) {
    map.eachLayer((layer) => {
      if (layer instanceof L.LayerGroup && map.hasLayer(layer)) {
        layer.eachLayer((overlay) => {
          if (overlay.feature.geometry.policyName)
            if (
              overlay.feature.geometry.policyName.toString() === overlayName
            ) {
              map.removeLayer(overlay);
            }
        });
      }
    });
  }
};

function onEachFeature(feature, layer) {
  layer.on("click", () => {
    fetchOne(feature.gid).then((data) => {
      console.log(feature);
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

function style() {
  return {
    fillColor: "#BD0026",
  };
}