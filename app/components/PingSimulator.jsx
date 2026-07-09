"use client";

import React, { useState, useRef, useEffect } from "react";

const ispData = {
  stormfiber: {
    name: "StormFiber (Fiber GPON)",
    genshinAsia: 92,
    genshinEurope: 145,
    wuwaAsia: 98,
    wuwaEurope: 154,
    stability: "Excellent (Low Jitter)",
    notes: "StormFiber routing to Singapore (Asia servers) is highly optimized. Extremely stable with less than 2% packet loss."
  },
  ptcl_fiber: {
    name: "PTCL Flash Fiber",
    genshinAsia: 95,
    genshinEurope: 138,
    wuwaAsia: 104,
    wuwaEurope: 144,
    stability: "Very Good",
    notes: "Excellent latency to European servers due to direct SEA-ME-WE undersea cable landing stations. Very stable routing."
  },
  ptcl_copper: {
    name: "PTCL Broadband (Copper DSL/VDSL)",
    genshinAsia: 140,
    genshinEurope: 195,
    wuwaAsia: 152,
    wuwaEurope: 210,
    stability: "Moderate (Frequent Jitter during peak hours)",
    notes: "Copper DSL suffers from signal degradation. Recommend using a wired ethernet cable instead of Wi-Fi to avoid packet loss."
  },
  transworld: {
    name: "Transworld Home (Telin Direct Routing)",
    genshinAsia: 88,
    genshinEurope: 155,
    wuwaAsia: 92,
    wuwaEurope: 165,
    stability: "Excellent (Direct peerings in SG)",
    notes: "Transworld owns private submarine cable networks, providing the lowest latency to Singapore (Asia) from Karachi/Lahore."
  },
  nayatel: {
    name: "Nayatel Fiber (Islamabad/Rawalpindi/Faisalabad)",
    genshinAsia: 105,
    genshinEurope: 150,
    wuwaAsia: 112,
    wuwaEurope: 162,
    stability: "Very Good (Highly consistent)",
    notes: "Great routing for North/Punjab regions. Recommended to use their Optimus service addon for lower gaming latency."
  },
  cellular: {
    name: "Mobile Data (Jazz / Zong 4G)",
    genshinAsia: 130,
    genshinEurope: 180,
    wuwaAsia: 145,
    wuwaEurope: 198,
    stability: "Poor (High spike variance)",
    notes: "Wireless routing changes constantly based on cell tower congestion. Best played late at night or during off-peak hours."
  }
};

export default function PingSimulator() {
  const [selectedIsp, setSelectedIsp] = useState("stormfiber");
  const [pinging, setPinging] = useState(false);
  const [pingResults, setPingResults] = useState(null);
  const timeoutRef = useRef(null);

  // Clear any pending simulation timer if the component unmounts
  // (the Guides section remounts on nav switch), avoiding setState-after-unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleRunPing = () => {
    setPinging(true);
    setPingResults(null);

    // Simulate traceroute latency calculation
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPinging(false);
      setPingResults(ispData[selectedIsp]);
    }, 1800);
  };

  const getPingClass = (val) => {
    if (val < 110) return "ping-excellent";
    if (val < 160) return "ping-average";
    return "ping-poor";
  };

  const getPingDotClass = (val) => {
    if (val < 110) return "bg-excellent";
    if (val < 160) return "bg-average";
    return "bg-poor";
  };

  return (
    <div className="ping-checker-card">
      <div className="corner-square" />
      <h3 className="heading-md ping-card-title">PAKISTANI ISP LATENCY CHECKER</h3>
      <p className="body-sm" style={{ color: "var(--mute)", marginBottom: "16px" }}>
        Select your internet service provider to simulate trace routes to Genshin and Wuthering Waves server farms.
      </p>

      {/* Select Provider */}
      <div className="isp-selector-group">
        <label className="isp-label" htmlFor="isp-select-input">Select Internet Provider</label>
        <select 
          id="isp-select-input" 
          className="isp-select" 
          value={selectedIsp}
          onChange={(e) => setSelectedIsp(e.target.value)}
        >
          {Object.keys(ispData).map((key) => (
            <option key={key} value={key}>
              {ispData[key].name}
            </option>
          ))}
        </select>
      </div>

      {/* Ping Results Dashboard */}
      <div className="ping-results-box">
        {pinging ? (
          <div style={{ textAlign: "center", color: "var(--mute)" }}>
            <span className="body-strong loading-dots">Tracing routes via local hops</span>
            <p className="caption-sm" style={{ marginTop: "4px" }}>Pinging Singapore & Frankfurt...</p>
          </div>
        ) : pingResults ? (
          <div>
            <div className="ping-result-row">
              <span className="ping-server-name">Genshin Asia (Singapore)</span>
              <span className={`ping-value-indicator ${getPingClass(pingResults.genshinAsia)}`}>
                <span className={`ping-indicator-dot ${getPingDotClass(pingResults.genshinAsia)}`} />
                {pingResults.genshinAsia} ms
              </span>
            </div>
            <div className="ping-result-row">
              <span className="ping-server-name">Genshin Europe (Frankfurt)</span>
              <span className={`ping-value-indicator ${getPingClass(pingResults.genshinEurope)}`}>
                <span className={`ping-indicator-dot ${getPingDotClass(pingResults.genshinEurope)}`} />
                {pingResults.genshinEurope} ms
              </span>
            </div>
            <div className="ping-result-row">
              <span className="ping-server-name">WuWa Asia (Tokyo/Singapore)</span>
              <span className={`ping-value-indicator ${getPingClass(pingResults.wuwaAsia)}`}>
                <span className={`ping-indicator-dot ${getPingDotClass(pingResults.wuwaAsia)}`} />
                {pingResults.wuwaAsia} ms
              </span>
            </div>
            <div className="ping-result-row">
              <span className="ping-server-name">WuWa Europe (Frankfurt)</span>
              <span className={`ping-value-indicator ${getPingClass(pingResults.wuwaEurope)}`}>
                <span className={`ping-indicator-dot ${getPingDotClass(pingResults.wuwaEurope)}`} />
                {pingResults.wuwaEurope} ms
              </span>
            </div>
            <div style={{ marginTop: "12px", borderTop: "1px solid var(--glass-border)", paddingTop: "8px" }}>
              <p className="caption-sm">
                <strong>Link Stability:</strong> {pingResults.stability}
              </p>
              <p className="body-sm" style={{ fontSize: "13px", marginTop: "4px", color: "var(--mute)" }}>
                {pingResults.notes}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "var(--mute)" }}>
            <p className="body-sm">Click &quot;Run Ping Simulation&quot; to start trace routes.</p>
          </div>
        )}
      </div>

      <button 
        className="btn btn-primary ping-btn" 
        onClick={handleRunPing}
        disabled={pinging}
      >
        {pinging ? "Simulating..." : "Run Ping Simulation"}
      </button>
    </div>
  );
}
