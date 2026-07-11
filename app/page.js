"use client";

import React, { useState, useEffect, useRef } from "react";
import CharacterCard from "./components/CharacterCard";
import ModalDrawer from "./components/ModalDrawer";
import PingSimulator from "./components/PingSimulator";
import InteractiveMaps from "./components/InteractiveMaps";
import DeviceOptimizer from "./components/DeviceOptimizer";
import LiveChat from "./components/LiveChat";
import CoopFinder from "./components/CoopFinder";
import CharacterChat from "./components/CharacterChat";
import HeroSpotlight from "./components/HeroSpotlight";
import { fullRoster } from "./data/roster";

// Brand mark (sparkle) — cyan→magenta gradient, matches the favicon/app icon
function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="guLogoGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4CC9F0" />
          <stop offset="0.5" stopColor="#8B7CFF" />
          <stop offset="1" stopColor="#E45CFF" />
        </linearGradient>
      </defs>
      
      {/* Radiating Resonance Soundwaves Glow (Goonj) */}
      <path
        d="M7 8 A 5.5 5.5 0 0 0 7 16"
        stroke="url(#guLogoGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
        filter="blur(1px)"
      />
      <path
        d="M17 8 A 5.5 5.5 0 0 1 17 16"
        stroke="url(#guLogoGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
        filter="blur(1px)"
      />
      
      {/* Solid central diamond star & white portal core (Sitara) */}
      <path
        d="M12 6 L14 12 L12 18 L10 12 Z"
        fill="url(#guLogoGrad)"
      />
      <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />

      {/* Radiating Resonance Soundwaves Solid (Goonj) */}
      <path
        d="M7 8 A 5.5 5.5 0 0 0 7 16"
        stroke="url(#guLogoGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 8 A 5.5 5.5 0 0 1 17 16"
        stroke="url(#guLogoGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Outer faint expanding echo waves */}
      <path
        d="M4 5 A 9.5 9.5 0 0 0 4 19"
        stroke="url(#guLogoGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M20 5 A 9.5 9.5 0 0 1 20 19"
        stroke="url(#guLogoGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export default function Home() {
  // Navigation & UI State
  const [activeSection, setActiveSection] = useState("guides"); // "guides", "maps", or "optimizer"
  const [activeCategory, setActiveCategory] = useState("all"); // "all", "genshin", "wuwa", "saved"
  const [searchQuery, setSearchQuery] = useState("");
  
  // Character & User Data state
  // Seed from the merged static roster (hand-authored builds + full wiki-scraped
  // Genshin roster) so the entire guide index is server-rendered for SEO with no
  // runtime API dependency.
  const [characters] = useState(fullRoster);
  const [favorites, setFavorites] = useState({}); // { charId: boolean }
  const [notes, setNotes] = useState({}); // { charId: string }
  const [apiData, setApiData] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  
  // Modal Drawer State
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuRef = useRef(null);
  // Monotonic token so a slow character fetch can't overwrite a newer selection
  const apiRequestRef = useRef(0);

  // 2. Read favorites & notes from localStorage (runs purely offline, client-side only)
  useEffect(() => {
    // Guard against corrupted/partial JSON so a bad value can't break the mount effect
    const safeParse = (key, fallback) => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    };
    setFavorites(safeParse("tr_favorites", {}));
    setNotes(safeParse("tr_notes", {}));
  }, []);

  // 2b. Close mobile menu on outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 2c. App-like behavior: reset scroll to the top when switching sections (tabs)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  // Handle favorite toggle
  const handleToggleFavorite = (id) => {
    const nextVal = !favorites[id];
    const updatedFavs = { ...favorites, [id]: nextVal };
    setFavorites(updatedFavs);
    localStorage.setItem("tr_favorites", JSON.stringify(updatedFavs));
  };

  // Handle save notes
  const handleSaveNotes = (id, text) => {
    const updatedNotes = { ...notes, [id]: text };
    setNotes(updatedNotes);
    localStorage.setItem("tr_notes", JSON.stringify(updatedNotes));
  };

  // Open Drawer panel
  const handleSelectCharacter = async (char) => {
    setSelectedCharacter(char);
    setIsModalOpen(true);
    setApiData(null);

    // Tag this request; if the user switches characters before it resolves,
    // a newer request bumps the token and this stale response is discarded.
    const reqId = ++apiRequestRef.current;

    if (char.game !== "Genshin Impact") {
      setLoadingApi(false);
      return;
    }

    setLoadingApi(true);
    try {
      const res = await fetch(`https://genshin.jmp.blue/characters/${char.id}`);
      if (res.ok) {
        const data = await res.json();
        if (apiRequestRef.current === reqId) setApiData(data);
      }
    } catch (err) {
      console.warn("Failed to fetch detailed character skills from api:", err.message);
    } finally {
      if (apiRequestRef.current === reqId) setLoadingApi(false);
    }
  };

  // Filter logic
  const filteredCharacters = characters.filter((char) => {
    // Search query filter
    const matchesSearch = 
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.element.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.role.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category tab filter
    if (activeCategory === "genshin") {
      return char.game === "Genshin Impact";
    }
    if (activeCategory === "wuwa") {
      return char.game === "Wuthering Waves";
    }
    if (activeCategory === "saved") {
      return !!favorites[char.id];
    }
    return true; // "all"
  });

  return (
    <div className="bg-light">
      {/* 1. Utility Bar */}
      <div className="utility-bar">
        <div className="container">
          <div className="utility-item">
            PORTAL STORAGE: 
            <span style={{ color: "var(--primary)", fontWeight: "700", marginLeft: "4px" }}>
              ● LOCAL BROWSER STORAGE ACTIVE (OFFLINE STABLE)
            </span>
          </div>
          <div className="utility-item">
            REGION: <span className="utility-link">PAKISTAN (PK)</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation */}
      <nav className="primary-nav">
        <div className="container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActiveSection("guides"); setMobileMenuOpen(false); }}>
            <LogoMark />
            SITARA <span>GOONJ</span>
          </a>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#guides" 
                className={activeSection === "guides" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("guides");
                }}
              >
                CHARACTER GUIDES
              </a>
            </li>
            <li>
              <a 
                href="#optimizer" 
                className={activeSection === "optimizer" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("optimizer");
                }}
              >
                DEVICE OPTIMIZER
              </a>
            </li>
            <li>
              <a 
                href="#maps" 
                className={activeSection === "maps" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("maps");
                }}
              >
                INTERACTIVE MAPS
              </a>
            </li>
            <li>
              <a
                href="#coop"
                className={activeSection === "coop" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("coop");
                }}
              >
                CO-OP FINDER
              </a>
            </li>
            <li>
              <a
                href="#chat"
                className={activeSection === "chat" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("chat");
                }}
              >
                LIVE CHAT
              </a>
            </li>
            <li>
              <a
                href="#aichat"
                className={activeSection === "aichat" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("aichat");
                }}
              >
                CHARACTER AI
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <span className="caption-xs" style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "4px 8px" }}>
              V2.1 STATIC
            </span>
          </div>

          {/* Three dots mobile menu toggle */}
          <div className="mobile-menu-container" ref={menuRef}>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              &#8942;
            </button>
            {mobileMenuOpen && (
              <ul className="mobile-nav-links">
                <li>
                  <a 
                    href="#guides" 
                    className={activeSection === "guides" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("guides");
                      setMobileMenuOpen(false);
                    }}
                  >
                    CHARACTER GUIDES
                  </a>
                </li>
                <li>
                  <a 
                    href="#optimizer" 
                    className={activeSection === "optimizer" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("optimizer");
                      setMobileMenuOpen(false);
                    }}
                  >
                    DEVICE OPTIMIZER
                  </a>
                </li>
                <li>
                  <a 
                    href="#maps" 
                    className={activeSection === "maps" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("maps");
                      setMobileMenuOpen(false);
                    }}
                  >
                    INTERACTIVE MAPS
                  </a>
                </li>
                <li>
                  <a
                    href="#coop"
                    className={activeSection === "coop" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("coop");
                      setMobileMenuOpen(false);
                    }}
                  >
                    CO-OP FINDER
                  </a>
                </li>
                <li>
                  <a
                    href="#chat"
                    className={activeSection === "chat" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("chat");
                      setMobileMenuOpen(false);
                    }}
                  >
                    LIVE CHAT
                  </a>
                </li>
                <li>
                  <a
                    href="#aichat"
                    className={activeSection === "aichat" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("aichat");
                      setMobileMenuOpen(false);
                    }}
                  >
                    CHARACTER AI
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <header className="hero-card-dark">
        <div className="hero-grid-bg" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">SITARA GOONJ · PAKISTAN</span>
              <h1 className="display-xl hero-title">Complete <span className="accent-cyan">Genshin</span> &amp; <span className="accent-magenta">WuWa</span> Guides</h1>
              <p className="heading-lg hero-subhead">
                Premium F2P builds, local server ping guidelines, and custom user note systems. Optimized for mobile and low-spec gaming in Pakistan.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setActiveSection("guides")}>
                  Browse Guides
                </button>
                <button className="btn btn-outline-on-dark" onClick={() => setActiveSection("maps")}>
                  Open Map
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <HeroSpotlight />
            </div>
          </div>
        </div>
      </header>

      {/* 4. MAIN BODY DOCK (Switches sections based on Active Nav link) */}
      <div key={activeSection} className="animate-fade-in">
        {activeSection === "guides" ? (
          <>
            {/* Filter strip */}
            <section className="filter-section" id="guides-section">
              <div className="container">
                <div className="filter-container">
                  <div className="filter-group">
                    <span className="filter-label">Filter Game:</span>
                    <button 
                      className={`pill-tab ${activeCategory === "all" ? "active" : ""}`}
                      onClick={() => setActiveCategory("all")}
                    >
                      ALL BUILD GUIDES
                    </button>
                    <button 
                      className={`pill-tab ${activeCategory === "genshin" ? "active" : ""}`}
                      onClick={() => setActiveCategory("genshin")}
                    >
                      GENSHIN IMPACT
                    </button>
                    <button 
                      className={`pill-tab ${activeCategory === "wuwa" ? "active" : ""}`}
                      onClick={() => setActiveCategory("wuwa")}
                    >
                      WUTHERING WAVES
                    </button>
                    <button 
                      className={`pill-tab ${activeCategory === "saved" ? "active" : ""}`}
                      style={{ borderColor: "var(--primary)" }}
                      onClick={() => setActiveCategory("saved")}
                    >
                      ❤️ MY SAVED BUILDS ({Object.values(favorites).filter(Boolean).length})
                    </button>
                  </div>
  
                  {/* Search */}
                  <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search character, element, role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
  
            {/* Guides Character Grid left / Ping Simulator right */}
            <section className="grid-section">
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "start" }} className="guides-grid-layout">
                  {/* Character Cards list */}
                  <div style={{ gridColumn: "span 1" }}>
                    <div className="section-header">
                      <div className="section-info">
                        <h2 className="heading-md">CHARACTER GUIDE INDEX</h2>
                        <span className="result-count">
                          {filteredCharacters.length} results
                          <span style={{ marginLeft: "12px", color: "var(--mute)", fontSize: "13px" }}>
                            · {characters.length} characters in the database
                          </span>
                        </span>
                      </div>
                    </div>
  
                    {filteredCharacters.length > 0 ? (
                      <div className="card-grid">
                        {filteredCharacters.map((char, idx) => (
                          <CharacterCard
                            key={char.id}
                            character={char}
                            onSelect={handleSelectCharacter}
                            isFavorite={!!favorites[char.id]}
                            onToggleFavorite={handleToggleFavorite}
                            index={idx}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: "40px", border: "1px dashed var(--hairline)", textAlign: "center", borderRadius: "2px" }}>
                        <p className="body-md" style={{ color: "var(--mute)" }}>
                          No character guides found matching your filters.
                        </p>
                        {activeCategory === "saved" && (
                          <p className="body-sm" style={{ color: "var(--mute)", marginTop: "8px" }}>
                            Click the heart ❤️ icon on any character to save it to your roster.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
  
            {/* Technical and ISP Guidelines Section */}
            <section className="tech-info-section" id="optimization-section">
              <div className="container">
                <div className="tech-layout">
                  <div className="tech-guide-article">
                    <span className="hero-badge" style={{ alignSelf: "flex-start" }}>NETWORK OPTIMIZATION</span>
                    <h2 className="display-lg tech-guide-title">ISP & Hardware Calibration</h2>
                    <p className="body-md" style={{ color: "var(--mute)" }}>
                      Gacha combat requires stable network connection thresholds. To avoid timing losses (e.g. failing dodge frames in WuWa or swapping skills in Genshin), follow this optimization chart for Pakistani ISP gateways:
                    </p>
                    
                    <div className="table-wrapper">
                      <table className="tech-table">
                        <thead>
                          <tr>
                            <th>ISP Provider</th>
                            <th>Recommended Server</th>
                            <th>Expected Latency</th>
                            <th>Jitter Class</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>StormFiber GPON</td>
                            <td>Asia (Singapore)</td>
                            <td>90ms - 98ms</td>
                            <td>Very Low</td>
                          </tr>
                          <tr>
                            <td>PTCL Flash Fiber</td>
                            <td>Europe (Frankfurt)</td>
                            <td>130ms - 138ms</td>
                            <td>Low</td>
                          </tr>
                          <tr>
                            <td>Transworld Home</td>
                            <td>Asia (Singapore)</td>
                            <td>88ms - 92ms</td>
                            <td>Extremely Low</td>
                          </tr>
                          <tr>
                            <td>Nayatel Fiber</td>
                            <td>Asia (Singapore)</td>
                            <td>105ms - 112ms</td>
                            <td>Low</td>
                          </tr>
                          <tr>
                            <td>PTCL Broadband (DSL)</td>
                            <td>Europe (Frankfurt)</td>
                            <td>140ms - 195ms</td>
                            <td>High (Peak Hours)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
  
                  {/* Ping simulator tool */}
                  <div>
                    <PingSimulator />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : activeSection === "optimizer" ? (
          /* Optimizer Section view */
          <section className="grid-section" id="optimizer-section">
            <div className="container">
              <div className="section-header">
                <div className="section-info">
                  <h2 className="heading-md">LOW-SPEC DEVICE OPTIMIZER</h2>
                  <span className="result-count">3 Platform Categories Loaded</span>
                </div>
              </div>
              <DeviceOptimizer />
            </div>
          </section>
        ) : activeSection === "maps" ? (
          /* Maps Section view */
          <section className="grid-section" id="maps-section">
            <div className="container">
              <div className="section-header">
                <div className="section-info">
                  <h2 className="heading-md">INTERACTIVE WORLD MAPS</h2>
                  <span className="result-count">2 Maps Loaded</span>
                </div>
              </div>
              <InteractiveMaps />
            </div>
          </section>
        ) : activeSection === "coop" ? (
          /* Co-Op Finder Section view */
          <section className="grid-section" id="coop-section">
            <div className="container">
              <div className="section-header">
                <div className="section-info">
                  <h2 className="heading-md">TEAMS & CO-OP FINDER</h2>
                  <span className="result-count">Live Matchmaking Active</span>
                </div>
              </div>
              <CoopFinder />
            </div>
          </section>
        ) : activeSection === "chat" ? (
          /* Live Chat Section view */
          <section className="grid-section" id="chat-section">
            <div className="container">
              <div className="section-header">
                <div className="section-info">
                  <h2 className="heading-md">LIVE RESONANCE CHAT</h2>
                  <span className="result-count">Real-time Sync Active</span>
                </div>
              </div>
              <LiveChat />
            </div>
          </section>
        ) : activeSection === "aichat" ? (
          /* Character AI Chatbot Section view */
          <section className="grid-section" id="aichat-section">
            <div className="container">
              <div className="section-header">
                <div className="section-info">
                  <h2 className="heading-md">TALK TO A CHARACTER (AI)</h2>
                  <span className="result-count">Genshin &amp; WuWa · Powered by Cerebras</span>
                </div>
              </div>
              <CharacterChat />
            </div>
          </section>
        ) : null}
      </div>

      {/* 5. Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column" style={{ gridColumn: "span 2" }}>
              <div className="logo" style={{ color: "white" }}>
                <LogoMark />
                SITARA <span>GOONJ</span>
              </div>
              <p className="body-sm" style={{ color: "var(--on-dark-mute)", marginTop: "8px" }}>
                Sitara Goonj (ستارہ گونج) is Pakistan&apos;s home for Genshin Impact and Wuthering Waves build guides — F2P builds, best weapons &amp; artifacts, team comps, and local ISP ping optimization.
              </p>
            </div>
            
            <div className="footer-column">
              <div className="footer-column-title">RESOURCES</div>
              <ul className="footer-links">
                <li><a href="#guides" onClick={(e) => { e.preventDefault(); setActiveSection("guides"); }}>Build Guides</a></li>
                <li><a href="#optimizer" onClick={(e) => { e.preventDefault(); setActiveSection("optimizer"); }}>Device Optimizer</a></li>
                <li><a href="#maps" onClick={(e) => { e.preventDefault(); setActiveSection("maps"); }}>Interactive Maps</a></li>
                <li><a href="#coop" onClick={(e) => { e.preventDefault(); setActiveSection("coop"); }}>Co-Op Finder</a></li>
                <li><a href="#chat" onClick={(e) => { e.preventDefault(); setActiveSection("chat"); }}>Live Chat</a></li>
                <li><a href="#aichat" onClick={(e) => { e.preventDefault(); setActiveSection("aichat"); }}>Character AI</a></li>
                <li><a href="#optimization-section" onClick={(e) => { e.preventDefault(); setActiveSection("guides"); }}>Ping Checker</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <div className="footer-column-title">GAMES</div>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("guides"); setActiveCategory("genshin"); }}>Genshin Impact</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("guides"); setActiveCategory("wuwa"); }}>Wuthering Waves</a></li>
              </ul>
            </div>

            <div className="footer-column" style={{ gridColumn: "span 2" }}>
              <div className="footer-column-title">LOCAL INFO</div>
              <p className="body-sm" style={{ color: "var(--on-dark-mute)" }}>
                Optimized configurations for low-spec systems. Direct routing guides for StormFiber, PTCL, and Transworld networks.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="legal-bar">
              © {new Date().getFullYear()} SITARA GOONJ (ستارہ گونج). THIS PORTAL IS AN INDEPENDENT FAN SITE. ALL ASSETS ARE COPYRIGHT OF COGNOSPHERE (HOYOVERSE) & KURO GAMES. Genshin Impact character data &amp; icons sourced from the{" "}
              <a href="https://genshin-impact.fandom.com/wiki/Character/List" target="_blank" rel="noopener noreferrer" style={{ color: "var(--on-dark-mute)", textDecoration: "underline" }}>Genshin Impact Wiki</a>, available under CC BY-SA 3.0.
            </div>
            <ul className="social-links">
              <li><a href="#" onClick={(e) => e.preventDefault()} aria-label="Discord (coming soon)">DISCORD</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter (coming soon)">TWITTER</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube (coming soon)">YOUTUBE</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Mobile App Bottom Tab Bar (phones only, via CSS) */}
      <nav className="app-tabbar" aria-label="Primary navigation">
        {[
          {
            key: "guides",
            label: "Guides",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            ),
          },
          {
            key: "optimizer",
            label: "Optimizer",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
            ),
          },
          {
            key: "maps",
            label: "Maps",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            ),
          },
          {
            key: "coop",
            label: "Co-Op",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ),
          },
          {
            key: "chat",
            label: "Chat",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            ),
          },
          {
            key: "aichat",
            label: "AI",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="16" height="12" rx="2" />
                <path d="M12 4v4" />
                <circle cx="12" cy="3" r="1" />
                <circle cx="9" cy="13.5" r="1.1" />
                <circle cx="15" cy="13.5" r="1.1" />
                <path d="M9.5 17h5" />
                <path d="M2 12v4M22 12v4" />
              </svg>
            ),
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`app-tab ${activeSection === tab.key ? "active" : ""}`}
            onClick={() => setActiveSection(tab.key)}
            aria-current={activeSection === tab.key ? "page" : undefined}
            aria-label={tab.label}
          >
            {tab.icon}
            <span className="app-tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 6. Slider Modal Drawer */}
      <ModalDrawer
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorite={selectedCharacter ? !!favorites[selectedCharacter.id] : false}
        onToggleFavorite={handleToggleFavorite}
        personalNotes={selectedCharacter ? notes[selectedCharacter.id] : ""}
        onSaveNotes={handleSaveNotes}
        apiData={apiData}
        loadingApi={loadingApi}
      />
    </div>
  );
}
