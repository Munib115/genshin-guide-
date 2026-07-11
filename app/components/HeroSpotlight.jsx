"use client";

import React from "react";

export default function HeroSpotlight({ searchQuery, setSearchQuery, setActiveCategory, setActiveSection }) {
  const handleBrowseGenshin = (e) => {
    e.preventDefault();
    setActiveSection("guides");
    setActiveCategory("genshin");
    const el = document.getElementById("guides-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBrowseWuWa = (e) => {
    e.preventDefault();
    setActiveSection("guides");
    setActiveCategory("wuwa");
    const el = document.getElementById("guides-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="immersive-hero-container">
      {/* Background image container scaled slightly to crop out the outer borders (hiding any AI watermarks) */}
      <div className="hero-bg-image" />
      <div className="hero-bg-overlay" />

      {/* Central interactive content stack */}
      <div className="hero-content-stack">
        <span className="hero-badge">SITARA GOONJ · ستارہ گونج</span>
        <span className="hero-title-small">MASTER</span>
        <h1 className="hero-title-large">MASTER YOUR ROSTER.</h1>

        {/* Live Search Capsule */}
        <div className="search-capsule">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4cc9f0" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search 'Furina build', 'low ping tips'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search character guides"
          />
          {/* Animated click pointer indicator */}
          <svg className="search-pointer-arrow" viewBox="0 0 24 24" fill="white" width="16" height="16">
            <path d="M4 2 L20 11 L13 13 L11 20 Z" />
          </svg>
        </div>

        {/* Action buttons flanked by circular character avatars */}
        <div className="action-buttons-row">
          <div className="action-btn-wrapper">
            <div className="avatar-frame genshin-border">
              <img src="https://genshin-impact.fandom.com/wiki/Special:FilePath/Venti_Icon.png" alt="" referrerPolicy="no-referrer" />
            </div>
            <button className="glass-pill-btn" onClick={handleBrowseGenshin}>
              Browse Genshin
            </button>
          </div>

          <div className="action-btn-wrapper">
            <button className="glass-pill-btn" onClick={handleBrowseWuWa}>
              Browse WuWa
            </button>
            <div className="avatar-frame wuwa-border">
              <img src="https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png" alt="" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .immersive-hero-container {
          position: relative;
          width: 100%;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #060913;
        }

        /* Full-bleed background image with scale to crop out edge watermarks/AI logos */
        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-image: url("/hero-clean-bg.png");
          background-size: cover;
          background-position: center 65%;
          transform: scale(1.05); /* Crops out the outer 5% of pixels, completely hiding edge marks */
          z-index: 1;
        }

        /* Layered gradients to fade background to black at the bottom and sides */
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 9, 19, 0.3) 0%, rgba(6, 9, 19, 0.6) 60%, #060913 100%),
                      radial-gradient(ellipse at center, transparent 30%, rgba(6, 9, 19, 0.7) 100%);
          z-index: 2;
        }

        /* Central HTML content stack */
        .hero-content-stack {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 680px;
          width: 100%;
          padding: 0 24px;
          transform: translateY(-5px);
        }

        .hero-badge {
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 2px;
          margin-bottom: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6px 14px;
          border-radius: 20px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        .hero-title-small {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 8px;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #4cc9f0, #e45cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-title-large {
          font-size: 48px;
          font-weight: 900;
          color: white;
          letter-spacing: -1.5px;
          margin: 0 0 28px 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
          text-align: center;
        }

        /* Glowing Capsule Search Bar */
        .search-capsule {
          display: flex;
          align-items: center;
          background: rgba(8, 11, 20, 0.85);
          backdrop-filter: blur(12px);
          border: 2px solid #4cc9f0;
          box-shadow: 0 0 25px rgba(76, 201, 240, 0.4);
          border-radius: 40px;
          padding: 0 20px;
          height: 52px;
          width: 100%;
          max-width: 460px;
          position: relative;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
          box-sizing: border-box;
        }

        .search-capsule:focus-within {
          border-color: #e45cff;
          box-shadow: 0 0 25px rgba(228, 92, 255, 0.45);
          transform: translateY(-1px);
        }

        .search-icon {
          flex-shrink: 0;
          opacity: 0.85;
        }

        .search-capsule input {
          flex-grow: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 15px;
          font-weight: 500;
          margin-left: 12px;
          width: 100%;
          font-family: inherit;
        }

        .search-capsule input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-pointer-arrow {
          position: absolute;
          right: -15px;
          bottom: -15px;
          pointer-events: none;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
          animation: cursorHoverPulse 3s infinite ease-in-out;
        }

        @keyframes cursorHoverPulse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3px, -3px) scale(0.92); }
        }

        /* Buttons Row styling */
        .action-buttons-row {
          display: flex;
          gap: 24px;
          align-items: center;
          margin-top: 24px;
        }

        .action-btn-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar-frame {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid;
          background: #080b13;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
        }

        .avatar-frame.genshin-border {
          border-color: #4cc9f0;
        }

        .avatar-frame.wuwa-border {
          border-color: #e45cff;
        }

        .avatar-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .glass-pill-btn {
          background: rgba(17, 22, 38, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          border-radius: 30px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }

        .glass-pill-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
        }

        /* RESPONSIVE QUERIES */
        @media (max-width: 767px) {
          .immersive-hero-container {
            height: 480px;
          }

          .hero-bg-image {
            background-position: center 60%;
          }

          .hero-title-large {
            font-size: 32px;
            margin-bottom: 20px;
          }

          .search-capsule {
            height: 46px;
            padding: 0 16px;
          }

          .search-capsule input {
            font-size: 13.5px;
          }

          .search-pointer-arrow {
            display: none;
          }

          .action-buttons-row {
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .action-btn-wrapper {
            width: 100%;
            justify-content: center;
          }

          .glass-pill-btn {
            width: 100%;
            max-width: 240px;
            padding: 8px 20px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
