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
    <div className="immersive-hero-wrapper">
      {/* DESKTOP BROWSER SHOWCASE */}
      <div className="hero-desktop-layout">
        <div className="desktop-aspect-container">
          {/* Live HTML search input styled to cover and align with the image's pre-drawn search bar */}
          <input
            type="text"
            className="overlay-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 'Furina build', 'low ping tips'..."
            aria-label="Search character guides"
          />

          {/* Interactive hover overlays on top of the image's browse buttons */}
          <button
            className="overlay-click-btn genshin"
            onClick={handleBrowseGenshin}
            aria-label="Browse Genshin Impact Guides"
          />
          <button
            className="overlay-click-btn wuwa"
            onClick={handleBrowseWuWa}
            aria-label="Browse Wuthering Waves Guides"
          />
        </div>
      </div>

      {/* MOBILE SMARTPHONE SHOWCASE */}
      <div className="hero-mobile-layout">
        <div className="mobile-aspect-container">
          {/* Live HTML search input for mobile */}
          <input
            type="text"
            className="overlay-search-input mobile"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search character builds..."
            aria-label="Search character guides mobile"
          />

          {/* Stacked mobile browse button overlays */}
          <button
            className="overlay-click-btn-mob genshin-mob"
            onClick={handleBrowseGenshin}
            aria-label="Browse Genshin Impact Guides Mobile"
          />
          <button
            className="overlay-click-btn-mob wuwa-mob"
            onClick={handleBrowseWuWa}
            aria-label="Browse Wuthering Waves Guides Mobile"
          />
        </div>
      </div>

      <div className="showcase-caption">
        A showcase of unique hero section designs for Sitara Goonj.
      </div>

      <style>{`
        .immersive-hero-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* DESKTOP VIEWPORT */
        .hero-desktop-layout {
          width: 100%;
          display: block;
        }

        .desktop-aspect-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1024 / 473;
          background-image: url("/hero-desktop.png");
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        /* Precise Overlay Inputs (Desktop) */
        .overlay-search-input {
          position: absolute;
          top: 52.8%;
          left: 49.9%;
          transform: translate(-50%, -50%);
          width: 35.8%;
          height: 7.6%;
          background: #080a12;
          border: none;
          outline: none;
          color: white;
          font-family: inherit;
          font-size: 1.35vw;
          font-weight: 500;
          padding: 0 1vw 0 3.2vw;
          box-sizing: border-box;
          border-radius: 30px;
          cursor: text;
        }

        .overlay-search-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        /* Adjust search text size for large desktop screens */
        @media (min-width: 1200px) {
          .overlay-search-input {
            font-size: 14.5px;
            padding-left: 36px;
          }
        }

        .overlay-click-btn {
          position: absolute;
          top: 67.2%;
          height: 8.5%;
          background: rgba(255, 255, 255, 0);
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: background-color 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 0 0 rgba(76, 201, 240, 0);
        }

        .overlay-click-btn.genshin {
          left: 35.6%;
          width: 12.8%;
        }

        .overlay-click-btn.wuwa {
          left: 51.6%;
          width: 12.8%;
        }

        .overlay-click-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .overlay-click-btn.genshin:hover {
          box-shadow: 0 0 15px rgba(76, 201, 240, 0.4);
        }

        .overlay-click-btn.wuwa:hover {
          box-shadow: 0 0 15px rgba(228, 92, 255, 0.4);
        }

        /* MOBILE VIEWPORT */
        .hero-mobile-layout {
          display: none;
          width: 100%;
        }

        .mobile-aspect-container {
          position: relative;
          width: 100%;
          aspect-ratio: 571 / 1024;
          background-image: url("/hero-mobile.png");
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        .overlay-search-input.mobile {
          position: absolute;
          top: 30.1%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 65%;
          height: 3.2%;
          background: #080a12;
          border: none;
          outline: none;
          color: white;
          font-size: 13px;
          padding: 0 10px 0 28px;
          border-radius: 20px;
          box-sizing: border-box;
        }

        .overlay-search-input.mobile::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .overlay-click-btn-mob {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 77%;
          height: 4.8%;
          background: transparent;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .overlay-click-btn-mob.genshin-mob {
          top: 76.4%;
        }

        .overlay-click-btn-mob.wuwa-mob {
          top: 83.2%;
        }

        .overlay-click-btn-mob:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .showcase-caption {
          margin-top: 14px;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.45);
          text-align: center;
          letter-spacing: 0.5px;
        }

        /* RESPONSIVE DISPLAY TRANSITION */
        @media (max-width: 767px) {
          .hero-desktop-layout {
            display: none;
          }
          .hero-mobile-layout {
            display: block;
          }
          .showcase-caption {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
