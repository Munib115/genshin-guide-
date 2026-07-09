"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { fullRoster } from "../data/roster";
import { toWebP } from "../utils/image";

// Curated headline characters (all have consistent square wiki portraits so the
// framing stays uniform). Any name not found in the roster is silently skipped.
const FEATURED = [
  "Furina",
  "Arlecchino",
  "Neuvillette",
  "Raiden Shogun",
  "Mualani",
  "Nahida",
  "Hu Tao",
  "Zhongli",
  "Kamisato Ayaka",
  "Yae Miko",
];

// Glow tint per element (covers Genshin + WuWa elements).
const ELEMENT_COLOR = {
  pyro: "#ff7a5c", hydro: "#4cc9f0", electro: "#c084fc", cryo: "#8fe3ff",
  dendro: "#9ede4a", anemo: "#6fe7c8", geo: "#f5c451",
  fusion: "#ff6b6b", spectro: "#fff07a", havoc: "#e05cff",
  aero: "#7cf0c0", glacio: "#8fd0ff",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

// Scramble text effect for high-tech feeling
function ScrambleText({ text, speed = 25 }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame = 0;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const queue = [];
    
    // Parse target characters
    for (let i = 0; i < text.length; i++) {
      const from = text[i];
      const to = text[i];
      const start = Math.floor(Math.random() * 8);
      const end = start + Math.floor(Math.random() * 12);
      queue.push({ from, to, start, end, char: "" });
    }

    let activeId;
    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frame >= item.end) {
          complete++;
          output += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = chars[Math.floor(Math.random() * chars.length)];
          }
          output += item.char;
        } else {
          output += " ";
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        setDisplayText(text);
      } else {
        frame++;
        activeId = setTimeout(update, speed);
      }
    };

    update();
    return () => clearTimeout(activeId);
  }, [text, speed]);

  return <span>{displayText}</span>;
}

// Canvas-based performant particle emitter styled matching character's element
function ElementParticles({ element, reduced }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const colors = {
      pyro: ["#ff5722", "#ff9800", "#ff7a5c"],
      hydro: ["#00bcd4", "#03a9f4", "#4cc9f0"],
      electro: ["#9c27b0", "#e040fb", "#c084fc"],
      cryo: ["#e0f7fa", "#8fe3ff", "#b2ebf2"],
      dendro: ["#4caf50", "#9ede4a", "#cddc39"],
      anemo: ["#00e676", "#6fe7c8", "#a7ffeb"],
      geo: ["#ffc107", "#f5c451", "#ffa000"],
      fusion: ["#ff6b6b", "#ff3d00", "#ff8a80"],
      spectro: ["#fff59d", "#fff07a", "#fff9c4"],
      havoc: ["#ba68c8", "#e05cff", "#ea80fc"],
      aero: ["#26a69a", "#7cf0c0", "#b2dfdb"],
      glacio: ["#8fd0ff", "#e0f2f1", "#b2ebf2"],
    };

    const palette = colors[(element || "").toLowerCase()] || ["#ffffff", "#8B7CFF", "#4cc9f0"];
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = [];
    const maxParticles = 30;

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // distribute initially
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 3 + 1.2;
        this.speedY = Math.random() * 1.0 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = palette[Math.floor(Math.random() * palette.length)];
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
        ctx.shadowBlur = this.size * 1.5;
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
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [element, reduced]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
      }}
    />
  );
}

export default function HeroSpotlight() {
  const slides = useMemo(
    () =>
      FEATURED.map((name) => fullRoster.find((c) => c.name === name))
        .filter(Boolean)
        .map((c) => ({
          id: c.id,
          name: c.name,
          game: c.game,
          element: c.element || "",
          label: c.title && c.title !== "Unknown" ? c.title : c.role,
          img: c.splash || (c.icon || "").replace("/scale-to-width-down/256", "/scale-to-width-down/512"),
        })),
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced || slides.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [paused, reduced, slides.length]);

  if (slides.length === 0) return null;
  const cur = slides[active];
  const glow = ELEMENT_COLOR[(cur.element || "").toLowerCase()] || "#8B7CFF";
  const isGI = cur.game === "Genshin Impact";

  const handleMouseMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Map coords to rotation: -12 to 12 degrees max
    const rx = ((yc - y) / yc) * 12;
    const ry = ((x - xc) / xc) * 12;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setPaused(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      className="hero-spotlight"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleMouseLeave}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured characters"
    >
      <div
        className="spotlight-glow"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${glow}55, transparent 70%)`,
          transform: `translate3d(${tilt.ry * 1.5}px, ${-tilt.rx * 1.5}px, 0)`,
          transition: tilt.rx === 0 && tilt.ry === 0 ? "transform 0.6s ease" : "none",
        }}
      />

      <div
        className="spotlight-stage"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: tilt.rx === 0 && tilt.ry === 0 ? "transform 0.6s ease" : "none",
        }}
      >
        {slides.map((s, i) => (
          <div key={s.id} className={`spotlight-slide ${i === active ? "active" : ""}`} aria-hidden={i !== active}>
            <img
              className="spotlight-img"
              src={toWebP(s.img)}
              alt={s.name}
              referrerPolicy="no-referrer"
              loading={i === 0 ? "eager" : "lazy"}
              onError={(e) => {
                // Never show a broken image in the hero — fall back to a soft fill.
                e.currentTarget.style.visibility = "hidden";
              }}
            />
          </div>
        ))}

        <div className="spotlight-wash" />
        
        {/* Dynamic canvas element particles */}
        <ElementParticles element={cur.element} reduced={reduced} />

        <div className="spotlight-plate">
          <span
            className="spotlight-tag"
            style={{ background: isGI ? "rgba(42,166,214,0.85)" : "rgba(178,59,224,0.85)" }}
          >
            {isGI ? "GENSHIN IMPACT" : "WUTHERING WAVES"}
          </span>
          <div className="spotlight-name">
            <ScrambleText text={cur.name} />
          </div>
          <div className="spotlight-sub">
            {cur.element && <span className={`element-dot element-${cur.element.toLowerCase()}`} />}
            <ScrambleText text={`${cur.element ? `${cur.element} · ` : ""}${cur.label}`} />
          </div>
        </div>
      </div>

      <div className="spotlight-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={i === active ? "on" : ""}
            onClick={() => setActive(i)}
            aria-label={`Show ${s.name}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </div>
  );
}
