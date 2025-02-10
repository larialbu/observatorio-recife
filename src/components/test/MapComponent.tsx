"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Função para converter JSON em GeoJSON
function convertToGeoJSON(data) {
  return {
    type: "FeatureCollection",
    features: data.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(item.Longitude.replace(",", ".")), // Converte para número
          parseFloat(item.Latitude.replace(",", ".")),  // Converte para número
        ],
      },
      properties: {
        name: item["Porto Atracação"],
        qtCarga: item.QTCarga,
      },
    })),
  };
}

export default function MapComponent({ data }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove qualquer mapa existente antes de criar um novo
    if (mapRef.current._leaflet_id) {
      mapRef.current.innerHTML = "";
    }

    // Inicializa o mapa
    const map = L.map(mapRef.current).setView([-4.302, -55.971], 4); // Coordenadas iniciais e zoom

    // Adiciona uma camada de tiles (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Converte os dados para GeoJSON
    const geojsonData = convertToGeoJSON(data);

    // Adiciona os pontos ao mapa como círculos
    geojsonData.features.forEach((feature) => {
      const { coordinates } = feature.geometry;
      const { name, qtCarga } = feature.properties;

      // Define a cor do círculo
      const circleColor = name === "Recife" ? "#FF5733" : "#3388FF"; // Vermelho para Recife, azul para os outros

      // Cria um círculo para cada ponto
      const circle = L.circle([coordinates[1], coordinates[0]], {
        color: circleColor, // Cor da borda
        fillColor: circleColor, // Cor de preenchimento
        fillOpacity: 0.6, // Transparência
        radius: 10000, // Raio em metros
      }).addTo(map);

      // Adiciona um popup com as informações do ponto
      circle.bindPopup(`
        <div>
          <strong>Porto:</strong> ${name}<br />
          <strong>Carga:</strong> ${qtCarga}
        </div>
      `);
    });

    // Limpa o mapa quando o componente for desmontado
    return () => {
      map.remove();
    };
  }, [data]);

  return <div ref={mapRef} style={{ width: "100%", height: "600px" }} />;
}