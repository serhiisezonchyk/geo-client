import React from "react";
import { fetchOne } from "../../http/layers/publicBuildingPointApi";
import * as ReactDOMServer from "react-dom/server";
import L, { Icon } from "leaflet";
import UserPopup from "../popups/UserPopup";

export const addPublicBuildingPointLayer = (map, geojson) => {
  const layer = L.geoJSON(geojson, {
    onEachFeature: onEachFeature,
  });
  if (map !== null) map.addLayer(layer);
};

export const removePublicBuildingPointLayer = (map, overlayName) => {
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
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/9438/9438201.png",
    iconSize: [30, 30],
  });
  layer.setIcon(customIcon);
  layer.on("click", () => {
    fetchOne(feature.gid).then((data) => {
      console.log(feature);
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
