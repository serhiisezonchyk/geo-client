import React from "react";
import { fetchOneProblemInfoPoint } from "../../http/layers/problemInfoPointLayerApi";
import * as ReactDOMServer from "react-dom/server";
import ProblemInfoPointPopup from "../popups/ProblemInfoPointPopup";
import L, { Icon } from "leaflet";

export const addProblemInfoPointLayer = (map, geojson) => {
  const layer = L.geoJSON(geojson, {
    onEachFeature: onEachFeature,
  });
  if (map !== null) map.addLayer(layer);
};

export const removeProblemInfoPointLayer = (map, overlayName) => {
  if (map !== null) {
    map.eachLayer((layer) => {
      if (layer instanceof L.LayerGroup && map.hasLayer(layer)) {
        layer.eachLayer((overlay) => {
          if (overlay.feature.geometry.category_problem)
            if (
              overlay.feature.geometry.category_problem.id.toString() ===
              overlayName
            ) {
              map.removeLayer(overlay);
            }
        });
      }
    });
  }
};

function onEachFeature(feature, layer) {
  const customIcon = new Icon({
    iconUrl: feature.category_problem.layer_img,
    iconSize: [20, 20],
  });
  layer.setIcon(customIcon);
  layer.on("click", () => {
    fetchOneProblemInfoPoint(feature.id).then((data) => {
      const popupContent = ReactDOMServer.renderToString(
        <ProblemInfoPointPopup data={data} />
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
