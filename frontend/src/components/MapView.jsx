import React, { useEffect, useRef } from "react";
import mapImage from "../assets/map.jpg";

export default function MapView({
  lat,
  lng,
  title = "Property Location",
  height = 450,
}) {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey || apiKey === "your_google_maps_api_key_here") return;

    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title,
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    }
  }, [apiKey, lat, lng, title]);

  // Show custom image if API key is not available
  if (!apiKey || apiKey === "your_google_maps_api_key_here") {
    return (
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white">

        {/* Clickable Image */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={mapImage}
            alt="Google Maps Preview"
            className="w-full h-auto block hover:opacity-95 transition duration-300 cursor-pointer"
          />
        </a>

        {/* Footer */}
        <div className="p-5 text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Google Maps Preview
          </h3>

          <p className="text-gray-500 mt-2">
            Click the image or button below to open the exact location.
          </p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            📍 Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  // Live Google Map
  return (
    <div
      ref={mapRef}
      style={{ height }}
      className="rounded-xl overflow-hidden border border-gray-200 shadow-lg"
    />
  );
}