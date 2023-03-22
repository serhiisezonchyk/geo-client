import "../index.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import UserLayer from "../components/layers/UserLayer";
import AdminLayer from "../components/layers/AdminLayer";

function Map() {
  return (
    <MapContainer center={[51.5055, 31.2849]} zoom={12} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OpenStreetMap" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="User" checked>
          <UserLayer />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Admin" unchecked>
          <AdminLayer />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default Map;
