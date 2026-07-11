"use client";

import React, { useState } from "react";

export default function HeroSpotlight({ searchQuery, setSearchQuery, setActiveCategory, setActiveSection }) {
  const [showTooltip, setShowTooltip] = useState(true);

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
    <div className="showcase-wrapper">
      {/* 1. DESKTOP BROWSER MOCKUP */}
      <div className="showcase-browser-frame">
        {/* Browser Top Header */}
        <div className="browser-header">
          <div className="browser-dots">
            <span className="browser-dot red" />
            <span className="browser-dot yellow" />
            <span className="browser-dot green" />
          </div>
          <div className="browser-nav-arrows">
            <span className="nav-arrow">‹</span>
            <span className="nav-arrow">›</span>
          </div>
          <div className="browser-address-bar">
            <span>https://sitaragoonj.pk</span>
          </div>
          <div className="browser-action-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="browser-content">
          {/* Concept Label */}
          <div className="concept-badge">CONCEPT 1: IMMERSIVE SEARCH</div>

          {/* Deep Night Sky Background and Network Grid */}
          <svg className="sky-network-grid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
            {/* Grid network lines */}
            <path d="M 100 100 L 250 80 L 350 150 M 250 80 L 220 200 M 350 150 L 480 90 M 480 90 L 620 120 M 620 120 L 780 70 M 780 70 L 900 140 M 780 70 L 820 180" stroke="rgba(76, 201, 240, 0.15)" strokeWidth="1" fill="none" />
            {/* Stars */}
            <circle cx="100" cy="100" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="250" cy="80" r="2" fill="#fff" opacity="0.8" />
            <circle cx="350" cy="150" r="1" fill="#fff" opacity="0.5" />
            <circle cx="480" cy="90" r="2" fill="#fff" opacity="0.75" />
            <circle cx="620" cy="120" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="780" cy="70" r="2.5" fill="#fff" opacity="0.8" />
            <circle cx="900" cy="140" r="1" fill="#fff" opacity="0.5" />
            <circle cx="220" cy="200" r="1.5" fill="#fff" opacity="0.4" />
            <circle cx="820" cy="180" r="1.5" fill="#fff" opacity="0.4" />

            {/* Left Pagoda Silhouette */}
            <g opacity="0.3">
              <path d="M -20 500 L -20 280 L 100 240 L 100 500 Z" fill="#060912" />
              <path d="M -50 320 Q 40 280 130 320 L 110 330 Q 40 300 -30 330 Z" fill="#080c16" stroke="#4cc9f0" strokeWidth="0.8" />
              <path d="M -40 260 Q 40 230 120 260 L 100 270 Q 40 250 -20 270 Z" fill="#080c16" stroke="#4cc9f0" strokeWidth="0.8" />
              <rect x="10" y="350" width="12" height="18" fill="#ffd700" opacity="0.4" filter="blur(1px)" />
              <rect x="40" y="350" width="12" height="18" fill="#ffd700" opacity="0.4" filter="blur(1px)" />
              <rect x="70" y="350" width="12" height="18" fill="#ffd700" opacity="0.4" filter="blur(1px)" />
            </g>

            {/* Center Traditional Gateway (Pailou) */}
            <g opacity="0.25">
              <path d="M 120 500 L 120 380 L 260 380 L 260 500 Z" fill="#060912" />
              <path d="M 100 395 Q 190 365 280 395 L 260 405 Q 190 385 120 405 Z" fill="#080c16" stroke="#4cc9f0" strokeWidth="0.8" />
              <line x1="140" y1="380" x2="140" y2="500" stroke="#080c16" strokeWidth="8" />
              <line x1="240" y1="380" x2="240" y2="500" stroke="#080c16" strokeWidth="8" />
            </g>

            {/* Right Cyber Spire Silhouettes */}
            <g opacity="0.32">
              <path d="M 880 500 L 880 180 L 890 150 L 900 180 L 940 500 Z" fill="#060912" />
              <line x1="890" y1="150" x2="890" y2="500" stroke="#e45cff" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.75" />
              <ellipse cx="890" cy="220" rx="14" ry="4" fill="none" stroke="#4cc9f0" strokeWidth="1" opacity="0.6" />
              <ellipse cx="890" cy="280" rx="20" ry="5" fill="none" stroke="#e45cff" strokeWidth="1" opacity="0.6" />
              <ellipse cx="890" cy="340" rx="26" ry="6" fill="none" stroke="#4cc9f0" strokeWidth="1" opacity="0.6" />
            </g>
            
            <g opacity="0.2">
              <path d="M 760 500 L 760 260 L 795 500 Z" fill="#060912" />
              <line x1="760" y1="260" x2="760" y2="500" stroke="#e45cff" strokeWidth="1" opacity="0.5" />
            </g>

            {/* Tooltip pointer curves */}
            {showTooltip && (
              <>
                {/* Left pointer to Pagoda */}
                <path d="M 330 400 C 260 400, 200 370, 70 330" fill="none" stroke="#4cc9f0" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrow-c)" />
                {/* Right pointer to Spire */}
                <path d="M 670 400 C 740 400, 800 350, 890 280" fill="none" stroke="#e45cff" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrow-m)" />
              </>
            )}

            {/* Arrowhead marker definitions */}
            <defs>
              <marker id="arrow-c" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4cc9f0" />
              </marker>
              <marker id="arrow-m" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#e45cff" />
              </marker>
            </defs>
          </svg>

          {/* Left character illustration (Venti) */}
          <div className="char-illustration left">
            <img src="https://genshin-impact.fandom.com/wiki/Special:FilePath/Venti_Wish.png" alt="Venti" referrerPolicy="no-referrer" />
          </div>

          {/* Right character illustration (Jiyan style) */}
          <div className="char-illustration right">
            <img src="https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png" alt="Jiyan" referrerPolicy="no-referrer" />
          </div>

          {/* Center Main Header and Search Stack */}
          <div className="hero-center-stack">
            <span className="hero-concept-title-small">MASTER</span>
            <h1 className="hero-concept-title-large">MASTER YOUR ROSTER.</h1>

            {/* Central Glowing Search Bar */}
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
              />
              {/* Clicking pointer arrow overlay */}
              <svg className="search-cursor-arrow" viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M4 2 L20 11 L13 13 L11 20 Z" />
              </svg>
            </div>

            {/* Quick Browse Buttons Row */}
            <div className="browse-buttons-row">
              <div className="browse-btn-wrapper">
                <div className="browse-avatar" style={{ borderColor: "#4cc9f0" }}>
                  <img src="https://genshin-impact.fandom.com/wiki/Special:FilePath/Venti_Icon.png" alt="Genshin" referrerPolicy="no-referrer" />
                </div>
                <button className="browse-capsule-btn" onClick={handleBrowseGenshin}>
                  Browse Genshin
                </button>
              </div>

              <div className="browse-btn-wrapper">
                <button className="browse-capsule-btn" onClick={handleBrowseWuWa}>
                  Browse WuWa
                </button>
                <div className="browse-avatar" style={{ borderColor: "#e45cff" }}>
                  <img src="https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png" alt="WuWa" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Pointers / Tooltips */}
          {showTooltip && (
            <>
              <div className="annotation-card genshin" onClick={() => setShowTooltip(false)}>
                This area is Genshin-style architecture.
                <span className="annotation-close">×</span>
              </div>
              <div className="annotation-card wuwa" onClick={() => setShowTooltip(false)}>
                Look here: Distinct WuWa architecture spire blended in.
                <span className="annotation-close">×</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="showcase-caption">
        A showcase of unique hero section designs for Sitara Goonj.
      </div>

      {/* 2. MOBILE PHONE FRAME MOCKUP */}
      <div className="showcase-phone-frame">
        {/* iPhone Dynamic Island Bar */}
        <div className="phone-dynamic-island" />
        <div className="phone-status-bar">
          <span className="phone-time">9:41</span>
          <div className="phone-status-icons">
            <svg width="14" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c3.9 3.89 10.21 3.89 14.1 0l1.72-1.72c1.23-1.54 1.97-3.49 1.97-5.61 0-4.97-4.03-9-9-9z" />
            </svg>
            <span className="battery-icon" />
          </div>
        </div>

        {/* Mobile Page Content */}
        <div className="phone-content">
          <div className="concept-badge">CONCEPT 1: MOBILE</div>
          
          <div className="mobile-header-stack">
            <span className="hero-concept-title-small">MASTER</span>
            <h1 className="hero-concept-title-large">YOUR ROSTER.</h1>

            {/* Mobile Search capsule */}
            <div className="search-capsule">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4cc9f0" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search character builds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Central Character Visual Group */}
          <div className="mobile-character-group">
            <img className="mob-char left" src="https://genshin-impact.fandom.com/wiki/Special:FilePath/Venti_Wish.png" alt="Venti" referrerPolicy="no-referrer" />
            <img className="mob-char right" src="https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png" alt="Jiyan" referrerPolicy="no-referrer" />
          </div>

          {/* Stacked Mobile Buttons */}
          <div className="mobile-buttons-stack">
            <button className="browse-capsule-btn mobile" onClick={handleBrowseGenshin}>
              <img className="mob-btn-avatar" src="https://genshin-impact.fandom.com/wiki/Special:FilePath/Venti_Icon.png" alt="" />
              Browse Genshin
            </button>
            <button className="browse-capsule-btn mobile" onClick={handleBrowseWuWa}>
              <img className="mob-btn-avatar" src="https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Jiyan.png" alt="" />
              Browse WuWa
            </button>
          </div>

          {/* Simplified Mobile Pointers */}
          <div className="mobile-annotations-footer">
            <div className="mob-annotation-pill">Genshin Architecture Left</div>
            <div className="mob-annotation-pill">WuWa Spire Right</div>
          </div>
        </div>
      </div>

      {/* Responsive Mockup Styles */}
      <style>{`
        .showcase-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }

        /* 1. DESKTOP BROWSER FRAME */
        .showcase-browser-frame {
          width: 100%;
          max-width: 1140px;
          border-radius: 12px;
          background: #080b13;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 60px rgba(0,0,0,0.85);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .browser-header {
          display: flex;
          align-items: center;
          background: #111625;
          padding: 10px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          gap: 16px;
        }

        .browser-dots {
          display: flex;
          gap: 7px;
        }

        .browser-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .browser-dot.red { background: #ff5f56; }
        .browser-dot.yellow { background: #ffbd2e; }
        .browser-dot.green { background: #27c93f; }

        .browser-nav-arrows {
          display: flex;
          gap: 12px;
          color: rgba(255,255,255,0.3);
          font-size: 18px;
          line-height: 1;
          user-select: none;
        }

        .browser-address-bar {
          flex-grow: 1;
          background: #080a10;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .browser-action-icon {
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .browser-content {
          height: 520px;
          position: relative;
          background: radial-gradient(circle at 50% 50%, #070912 0%, #0c1122 100%);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .concept-badge {
          position: absolute;
          top: 20px;
          left: 24px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 30px;
          padding: 6px 14px;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          z-index: 15;
        }

        .sky-network-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        /* Characters styling */
        .char-illustration {
          position: absolute;
          bottom: 0;
          height: 96%;
          z-index: 5;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
        }
        .char-illustration img {
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 25px rgba(0,0,0,0.55));
        }

        .char-illustration.left {
          left: -40px;
          animation: hoverFloatLeft 6s infinite ease-in-out;
        }
        .char-illustration.right {
          right: -30px;
          animation: hoverFloatRight 6s infinite ease-in-out;
        }

        @keyframes hoverFloatLeft {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes hoverFloatRight {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
        }

        /* Center details */
        .hero-center-stack {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 580px;
          padding: 0 10px;
          transform: translateY(-10px);
        }

        .hero-concept-title-small {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 7px;
          margin-bottom: 6px;
          background: linear-gradient(90deg, #4cc9f0, #e45cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-concept-title-large {
          font-size: 46px;
          font-weight: 800;
          color: white;
          letter-spacing: -1.5px;
          text-shadow: 0 4px 16px rgba(0,0,0,0.85);
          margin-bottom: 24px;
        }

        .search-capsule {
          display: flex;
          align-items: center;
          background: rgba(8, 10, 18, 0.85);
          border: 2px solid #4cc9f0;
          box-shadow: 0 0 20px rgba(76,201,240,0.35);
          border-radius: 40px;
          padding: 0 20px;
          height: 48px;
          width: 100%;
          max-width: 440px;
          position: relative;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .search-capsule:focus-within {
          border-color: #e45cff;
          box-shadow: 0 0 20px rgba(228,92,255,0.35);
        }

        .search-icon {
          flex-shrink: 0;
          opacity: 0.85;
        }

        .search-capsule input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 14.5px;
          margin-left: 10px;
          width: 100%;
        }

        .search-cursor-arrow {
          position: absolute;
          right: 14px;
          top: 24px;
          pointer-events: none;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
          animation: cursorClickPulse 3s infinite ease-in-out;
        }

        @keyframes cursorClickPulse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3px, 3px) scale(0.92); }
        }

        /* Buttons Row */
        .browse-buttons-row {
          display: flex;
          gap: 22px;
          align-items: center;
          margin-top: 14px;
        }

        .browse-btn-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .browse-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid;
          background: #0c0f17;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .browse-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .browse-capsule-btn {
          background: rgba(30, 36, 52, 0.88);
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          border-radius: 30px;
          padding: 8px 18px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .browse-capsule-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1px);
        }

        /* Tooltips */
        .annotation-card {
          position: absolute;
          z-index: 12;
          background: rgba(9, 12, 22, 0.82);
          backdrop-filter: blur(8px);
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          max-width: 180px;
          text-align: left;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-start;
          gap: 6px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .annotation-close {
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          line-height: 1;
        }

        .annotation-card:hover .annotation-close {
          color: white;
        }

        .annotation-card.genshin {
          border: 1px solid #4cc9f0;
          color: #cbebff;
          bottom: 45px;
          left: 330px;
        }

        .annotation-card.wuwa {
          border: 1px solid #e45cff;
          color: #fcd6ff;
          bottom: 45px;
          right: 330px;
        }

        .showcase-caption {
          margin-top: 14px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
          text-align: center;
          letter-spacing: 0.5px;
        }

        /* 2. MOBILE PHONE FRAME */
        .showcase-phone-frame {
          display: none;
        }

        /* RESPONSIVE QUERIES */
        @media (max-width: 1024px) {
          .annotation-card.genshin { left: 240px; }
          .annotation-card.wuwa { right: 240px; }
          .char-illustration.left { left: -70px; }
          .char-illustration.right { right: -60px; }
        }

        @media (max-width: 767px) {
          .showcase-browser-frame {
            display: none;
          }
          .showcase-caption {
            display: none;
          }

          .showcase-phone-frame {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 320px;
            height: 610px;
            border-radius: 40px;
            border: 10px solid #1a202c;
            background: #080b13;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            overflow: hidden;
            position: relative;
            margin: 0 auto 10px;
          }

          .phone-dynamic-island {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 90px;
            height: 20px;
            background: black;
            border-radius: 12px;
            z-index: 100;
          }

          .phone-status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 24px 0 24px;
            color: white;
            font-size: 11px;
            font-weight: 700;
            z-index: 99;
          }

          .phone-status-icons {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .battery-icon {
            width: 16px;
            height: 8px;
            border: 1px solid white;
            border-radius: 2px;
            display: inline-block;
            position: relative;
          }
          .battery-icon::before {
            content: '';
            position: absolute;
            top: 1px;
            left: 1px;
            width: 10px;
            height: 4px;
            background: white;
          }

          .phone-content {
            flex-grow: 1;
            padding: 24px 16px 12px 16px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: radial-gradient(circle at 50% 50%, #060913 0%, #0a0d1a 100%);
          }

          .phone-content .concept-badge {
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 9px;
            padding: 4px 10px;
          }

          .mobile-header-stack {
            margin-top: 48px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 10;
          }

          .mobile-header-stack .hero-concept-title-large {
            font-size: 26px;
            margin-bottom: 12px;
          }

          .mobile-header-stack .search-capsule {
            height: 38px;
            padding: 0 14px;
          }
          
          .mobile-header-stack .search-capsule input {
            font-size: 12px;
          }

          .mobile-character-group {
            position: relative;
            height: 220px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            margin-top: 10px;
          }

          .mob-char {
            position: absolute;
            bottom: 0;
            height: 100%;
            object-fit: contain;
          }
          .mob-char.left {
            left: -10px;
          }
          .mob-char.right {
            right: -10px;
          }

          .mobile-buttons-stack {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            z-index: 10;
          }

          .browse-capsule-btn.mobile {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 8px;
            font-size: 12.5px;
          }

          .mob-btn-avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            object-fit: cover;
          }

          .mobile-annotations-footer {
            display: flex;
            justify-content: space-between;
            font-size: 9px;
            color: rgba(255,255,255,0.3);
            border-top: 1px solid rgba(255,255,255,0.06);
            padding-top: 8px;
            margin-top: 4px;
          }
        }
      `}</style>
    </div>
  );
}
