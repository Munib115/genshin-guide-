"use client";

import React, { useState } from "react";

export default function InteractiveMaps() {
  const [activeMap, setActiveMap] = useState("genshin");

  return (
    <div className="maps-container">
      {/* Tab Switchers */}
      <div className="maps-tabs">
        <button
          className={`pill-tab ${activeMap === "genshin" ? "active" : ""}`}
          onClick={() => setActiveMap("genshin")}
        >
          Genshin Impact Interactive Map
        </button>
        <button
          className={`pill-tab ${activeMap === "wuwa" ? "active" : ""}`}
          onClick={() => setActiveMap("wuwa")}
        >
          Wuthering Waves Interactive Map
        </button>
      </div>

      {/* Embedded Map Frame */}
      <div className="map-wrapper">
        <div className="map-header">
          <span className="caption-md" style={{ color: "var(--on-dark)" }}>
            {activeMap === "genshin" ? "TEYVAT MAP VIEWER" : "JINZHOU REGION MAP VIEWER"}
          </span>
          <span className="caption-xs" style={{ color: "var(--primary)" }}>
            ● LIVE WEB COMPONENT
          </span>
        </div>

        <div className="map-iframe-container">
          {activeMap === "genshin" ? (
            <iframe
              src="https://genshin-impact-map.appsample.com/"
              title="Genshin Impact AppSample Interactive Map"
              className="map-iframe"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <iframe
              src="https://wuthering-waves-map.appsample.com/"
              title="Wuthering Waves AppSample Interactive Map"
              className="map-iframe"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Technical guide under map */}
      <div className="pakistan-alert-box" style={{ marginTop: "12px", borderLeftColor: "var(--primary)" }}>
        <h4 className="pakistan-alert-title" style={{ color: "var(--ink)", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🗺️</span> Interactive Map Features
        </h4>
        <p className="body-sm" style={{ color: "var(--mute)", lineHeight: "1.6" }}>
          Use these embedded maps to track chests, oculi/sonance caskets, local specialties, materials, and boss locations. You can zoom, pan, and filter markings using the left-hand panel directly inside the frame. 
          <em> Note: These interactive maps are powered by AppSample community data, fully functional, and optimized to run inside your browser.</em>
        </p>
      </div>
    </div>
  );
}
