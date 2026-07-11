"use client";

import React, { useEffect, useRef } from "react";

// Performance-optimized Canvas-based Ambient Emitter for the background
function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const colors = ["#4cc9f0", "#e45cff", "#fff07a", "#ffffff"];
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const particles = [];
    const maxParticles = 20; // Lightweight count for top performance

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // Distribute initially
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.35 + 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        width: "100%",
        height: "100%",
        opacity: 0.75,
      }}
    />
  );
}

export default function HeroSpotlight({ searchQuery, setSearchQuery, setActiveCategory, setActiveSection }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  // Throttled mouse parallax effect (modifies style directly, avoiding React state re-renders)
  const handleMouseMove = (e) => {
    if (!containerRef.current || !bgRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    // Smooth shifting in opposite direction
    bgRef.current.style.transform = `scale(1.06) translate3d(${x * -16}px, ${y * -16}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!bgRef.current) return;
    bgRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    bgRef.current.style.transform = "scale(1.05) translate3d(0, 0, 0)";
  };

  const handleMouseEnter = () => {
    if (!bgRef.current) return;
    bgRef.current.style.transition = "none";
  };

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
    <div
      ref={containerRef}
      className="immersive-hero-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image container scaled slightly to crop out the outer borders (hiding any AI watermarks) */}
      <div ref={bgRef} className="hero-bg-image" />
      <div className="hero-bg-overlay" />

      {/* Ambient floating elements particles */}
      <BackgroundParticles />

      {/* Central interactive content stack */}
      <div className="hero-content-stack">
        <span className="hero-badge animate-item-1">SITARA GOONJ · ستارہ گونج</span>
        <span className="hero-title-small animate-item-2">MASTER</span>
        <h1 className="hero-title-large animate-item-3">MASTER YOUR ROSTER.</h1>

        {/* Live Search Capsule */}
        <div className="search-capsule animate-item-4">
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
        <div className="action-buttons-row animate-item-5">
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
          transform: scale(1.05) translate3d(0, 0, 0); /* Crops out the outer 5% of pixels, completely hiding edge marks */
          z-index: 1;
          will-change: transform;
          opacity: 0;
          animation: bgReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes bgReveal {
          from { opacity: 0; filter: blur(4px) brightness(0.8); }
          to { opacity: 1; filter: blur(0) brightness(1); }
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

        /* Sequenced Spring-like Slide Up Animations for Load-in */
        .animate-item-1 { opacity: 0; animation: slideUpReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards; }
        .animate-item-2 { opacity: 0; animation: slideUpReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards; }
        .animate-item-3 { opacity: 0; animation: slideUpReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards; }
        .animate-item-4 { opacity: 0; animation: slideUpReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards; }
        .animate-item-5 { opacity: 0; animation: slideUpReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }

        @keyframes slideUpReveal {
          from { opacity: 0; transform: translateY(22px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
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
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        .hero-badge:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .hero-title-small {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 8px;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #4cc9f0, #e45cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulseGlowGradient 4s ease-in-out infinite;
        }

        @keyframes pulseGlowGradient {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 1px rgba(76,201,240,0.1)); }
          50% { filter: brightness(1.2) drop-shadow(0 0 8px rgba(228,92,255,0.45)); }
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
          animation: borderPulse 4s infinite ease-in-out;
        }

        @keyframes borderPulse {
          0%, 100% { border-color: #4cc9f0; box-shadow: 0 0 22px rgba(76,201,240,0.35); }
          50% { border-color: rgba(228, 92, 255, 0.8); box-shadow: 0 0 22px rgba(228,92,255,0.35); }
        }

        .search-capsule:focus-within {
          border-color: #e45cff !important;
          box-shadow: 0 0 25px rgba(228, 92, 255, 0.45) !important;
          transform: translateY(-1px);
          animation: none; /* Disable slow pulse on focus active */
        }

        .search-icon {
          flex-shrink: 0;
          opacity: 0.85;
          transition: transform 0.3s ease;
        }

        .search-capsule:focus-within .search-icon {
          transform: scale(1.08) rotate(5deg);
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
          transition: transform 0.3s ease;
        }

        .action-btn-wrapper:hover .avatar-frame {
          transform: scale(1.1) rotate(-3deg);
        }

        .avatar-frame.genshin-border {
          border-color: #4cc9f0;
          box-shadow: 0 0 10px rgba(76, 201, 240, 0.25);
        }

        .avatar-frame.wuwa-border {
          border-color: #e45cff;
          box-shadow: 0 0 10px rgba(228, 92, 255, 0.25);
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
          transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }

        .glass-pill-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
        }

        .action-btn-wrapper:first-child .glass-pill-btn:hover {
          border-color: rgba(76, 201, 240, 0.6);
          box-shadow: 0 4px 20px rgba(76, 201, 240, 0.3);
        }

        .action-btn-wrapper:last-child .glass-pill-btn:hover {
          border-color: rgba(228, 92, 255, 0.6);
          box-shadow: 0 4px 20px rgba(228, 92, 255, 0.3);
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
