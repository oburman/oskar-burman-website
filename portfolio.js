const map = L.map("map", {
  scrollWheelZoom: false
}).setView([32.79, -117.10], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const coverageAreas = [
  {
    area: "Central San Diego",
    type: "Multifamily",
    count: 9,
    lat: 32.747,
    lng: -117.145
  },
  {
    area: "North Park / University Heights",
    type: "Multifamily",
    count: 4,
    lat: 32.756,
    lng: -117.126
  },
  {
    area: "Pacific Beach",
    type: "Residential",
    count: 2,
    lat: 32.797,
    lng: -117.236
  },
  {
    area: "Lemon Grove",
    type: "Multifamily",
    count: 2,
    lat: 32.742,
    lng: -117.038
  },
  {
    area: "La Mesa",
    type: "Residential",
    count: 2,
    lat: 32.768,
    lng: -117.023
  },
  {
    area: "Lakeside",
    type: "Multifamily",
    count: 1,
    lat: 32.857,
    lng: -116.93
  },
  {
    area: "Encinitas",
    type: "Residential",
    count: 1,
    lat: 33.047,
    lng: -117.264
  },
  {
    area: "Imperial Beach",
    type: "Multifamily",
    count: 1,
    lat: 32.584,
    lng: -117.113
  },
  {
    area: "Morena / Bay Park",
    type: "Commercial",
    count: 1,
    lat: 32.817,
    lng: -117.214
  }
];

const markerColors = {
  Multifamily: "#504f57",
  Residential: "#b27f3a",
  Commercial: "#d6a45b"
};

function createMarkerIcon(type) {
  return L.divIcon({
    className: "portfolio-marker",
    html: `
      <div style="
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: ${markerColors[type]};
        border: 4px solid white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
      "></div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12]
  });
}

coverageAreas.forEach((location) => {
  const propertyWord =
    location.count === 1 ? "property" : "properties";

  L.marker([location.lat, location.lng], {
    icon: createMarkerIcon(location.type)
  })
    .addTo(map)
    .bindPopup(`
      <strong>${location.area}</strong><br>
      ${location.count} managed ${propertyWord}<br>
      ${location.type} coverage
    `);
});
