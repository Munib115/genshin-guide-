"use client";

import React, { useState, useEffect } from "react";

export default function GiftCodes() {
  const [activeGame, setActiveGame] = useState("genshin"); // "genshin" or "wuwa"
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCodes() {
      setLoading(true);
      try {
        const res = await fetch("/api/codes");
        if (!res.ok) throw new Error(`Failed to load codes (HTTP ${res.status})`);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch live codes:", err);
        setError(err.message || "Failed to load live data.");
      } finally {
        setLoading(false);
      }
    }
    fetchCodes();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    }).catch(err => {
      console.warn("Copy to clipboard failed:", err);
    });
  };

  const activeCodesList = data?.[activeGame]?.active || [];
  const expiredCodesList = data?.[activeGame]?.expired || [];

  // Filter active codes by search query
  const filteredActive = activeCodesList.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.code.toLowerCase().includes(query) ||
      (item.rewards && item.rewards.toLowerCase().includes(query))
    );
  });

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* Game Selector Headers */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
        <button
          className={`pill-tab ${activeGame === "genshin" ? "active" : ""}`}
          style={{
            flex: "1",
            minHeight: "80px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            background: activeGame === "genshin"
              ? "linear-gradient(135deg, rgba(76, 201, 240, 0.18) 0%, rgba(228, 92, 255, 0.07) 100%)"
              : "rgba(255, 255, 255, 0.02)",
            border: activeGame === "genshin" ? "1px solid var(--primary)" : "1px solid var(--hairline)",
            cursor: "pointer",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            overflow: "hidden",
            position: "relative",
          }}
          onClick={() => setActiveGame("genshin")}
        >
          {/* Subtle glow overlay when active */}
          {activeGame === "genshin" && (
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 50%, rgba(76,201,240,0.12) 0%, transparent 70%)",
              pointerEvents: "none"
            }} />
          )}
          <img
            src="/genshin-logo.png"
            alt="Genshin Impact"
            style={{
              height: "52px",
              maxWidth: "100%",
              objectFit: "contain",
              filter: activeGame === "genshin" ? "drop-shadow(0 0 8px rgba(76,201,240,0.6)) brightness(1.1)" : "brightness(0.65)",
              transition: "filter 0.3s ease",
            }}
          />
        </button>
        <button
          className={`pill-tab ${activeGame === "wuwa" ? "active" : ""}`}
          style={{
            flex: "1",
            minHeight: "80px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            background: activeGame === "wuwa"
              ? "linear-gradient(135deg, rgba(228, 92, 255, 0.18) 0%, rgba(76, 201, 240, 0.07) 100%)"
              : "rgba(255, 255, 255, 0.02)",
            border: activeGame === "wuwa" ? "1px solid var(--secondary)" : "1px solid var(--hairline)",
            cursor: "pointer",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            overflow: "hidden",
            position: "relative",
          }}
          onClick={() => setActiveGame("wuwa")}
        >
          {activeGame === "wuwa" && (
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 50%, rgba(228,92,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none"
            }} />
          )}
          <img
            src="/wuwa-logo.png"
            alt="Wuthering Waves"
            style={{
              height: "52px",
              maxWidth: "100%",
              objectFit: "contain",
              filter: activeGame === "wuwa" ? "drop-shadow(0 0 8px rgba(228,92,255,0.6)) brightness(1.1)" : "brightness(0.65)",
              transition: "filter 0.3s ease",
            }}
          />
        </button>
      </div>

      {/* Local Info / Warning & Guide Bar */}
      <div 
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--hairline)",
          borderRadius: "4px",
          padding: "16px var(--spacing-lg)",
          marginBottom: "32px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px"
        }}
      >
        <div style={{ fontSize: "22px", marginTop: "-2px" }}>💡</div>
        <div>
          <h4 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: "700", color: "#fff" }}>
            {activeGame === "genshin" ? "How to Redeem Genshin Impact Codes" : "How to Redeem Wuthering Waves Codes"}
          </h4>
          <p style={{ margin: "0", fontSize: "14px", color: "var(--mute)", lineHeight: "1.5" }}>
            {activeGame === "genshin" ? (
              <>
                You can redeem codes directly using the <strong>Redeem Link</strong> button on each card (pre-fills on official web page), or log in in-game and navigate to <strong>Settings &gt; Account &gt; Redeem Code</strong>. Must be Union/Adventure Rank 10+.
              </>
            ) : (
              <>
                Kuro Games does not currently offer an official web redemption portal. Redeem codes <strong>in-game</strong> by opening the <strong>Terminal (Esc) &gt; Settings (Gear) &gt; Other Settings &gt; Redemption Code</strong>. Must be Union Level 2+.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div style={{ marginBottom: "32px" }}>
        <div className="search-wrapper" style={{ width: "100%", maxWidth: "100%" }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search active codes or rewards (e.g. Primogems, Astrite)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* Sync Status / Offline Notice */}
      {data?.updatedAt && (
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "var(--mute)" }}>
            🟢 Auto-Sync Active · Updated: {new Date(data.updatedAt).toLocaleTimeString()}
          </span>
          {error && (
            <span style={{ fontSize: "13px", color: "#FF6B6B" }}>
              ⚠️ Live sync failed. Showing offline backup codes.
            </span>
          )}
        </div>
      )}

      {/* Codes Grid / List */}
      {loading ? (
        // Loading skeletons
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="panel"
              style={{
                height: "140px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid var(--hairline)",
                animation: "pulse 1.8s infinite ease-in-out"
              }}
            />
          ))}
        </div>
      ) : filteredActive.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          {filteredActive.map((item) => (
            <div
              key={item.code}
              className="panel"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
                transition: "transform 0.2s ease, border-color 0.2s ease",
                hover: {
                  transform: "translateY(-2px)",
                  borderColor: activeGame === "genshin" ? "rgba(76, 201, 240, 0.3)" : "rgba(228, 92, 255, 0.3)"
                }
              }}
            >
              {/* Left Side Info */}
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: activeGame === "genshin" ? "#4CC9F0" : "#E45CFF",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {item.code}
                  </span>
                  <span className="badge-tag" style={{ background: "rgba(46, 204, 113, 0.15)", color: "#2ECC71", border: "1px solid rgba(46, 204, 113, 0.2)" }}>
                    ACTIVE
                  </span>
                  {item.server && item.server !== "All" && (
                    <span className="badge-tag" style={{ background: "rgba(255, 255, 255, 0.05)", color: "var(--body)" }}>
                      {item.server}
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "var(--mute)", marginRight: "8px" }}>Rewards:</span>
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#fff" }}>
                    {item.rewards || "In-game materials"}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "var(--mute)" }}>📅</span>
                  <span style={{ fontSize: "13px", color: "var(--mute)" }}>
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Right Side Action Buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", width: "100%", maxWidth: "340px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="pill-tab"
                  style={{
                    flex: "1",
                    minWidth: "120px",
                    padding: "10px 18px",
                    background: copiedCode === item.code ? "rgba(46, 204, 113, 0.1)" : "rgba(255, 255, 255, 0.05)",
                    border: copiedCode === item.code ? "1px solid #2ECC71" : "1px solid var(--hairline)",
                    color: copiedCode === item.code ? "#2ECC71" : "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                    borderRadius: "4px",
                    textAlign: "center",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => handleCopy(item.code)}
                >
                  {copiedCode === item.code ? "✓ COPIED" : "📋 COPY CODE"}
                </button>

                {activeGame === "genshin" ? (
                  <a
                    href={`https://genshin.hoyoverse.com/en/gift?code=${item.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-tab active"
                    style={{
                      flex: "1",
                      minWidth: "140px",
                      padding: "10px 18px",
                      background: "linear-gradient(135deg, #4CC9F0 0%, #3B82F6 100%)",
                      border: "none",
                      color: "#000",
                      fontWeight: "700",
                      textAlign: "center",
                      borderRadius: "4px",
                      transition: "opacity 0.2s ease"
                    }}
                  >
                    🚀 REDEEM LINK
                  </a>
                ) : (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--mute)",
                      textAlign: "right",
                      flex: "1",
                      minWidth: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "40px",
                      border: "1px dashed var(--hairline)",
                      borderRadius: "4px"
                    }}
                  >
                    🎮 REDEEM IN-GAME
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "40px", border: "1px dashed var(--hairline)", textAlign: "center", borderRadius: "4px" }}>
          <p className="body-md" style={{ color: "var(--mute)", margin: "0" }}>
            No codes found matching your search. Try adjusting filters.
          </p>
        </div>
      )}

      {/* Expired Codes Section */}
      {!loading && expiredCodesList.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <h3 className="heading-md" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", color: "var(--mute)" }}>
            <span>⏳</span> RECENTLY EXPIRED CODES
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", opacity: "0.6" }}>
            {expiredCodesList.map((item) => (
              <div
                key={item.code}
                className="panel"
                style={{
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "6px",
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "700", color: "var(--mute)", textDecoration: "line-through" }}>
                      {item.code}
                    </span>
                    <span className="badge-tag" style={{ background: "rgba(255, 255, 255, 0.05)", color: "var(--mute)" }}>
                      EXPIRED
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--mute)" }}>
                    Rewards: {item.rewards || "Unknown"}
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--mute)", textAlign: "right" }}>
                  {item.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
