"use client";

import React, { useState, useEffect, useRef } from "react";
import { characterDatabase } from "./data/characters";
import CharacterCard from "./components/CharacterCard";
import ModalDrawer from "./components/ModalDrawer";
import PingSimulator from "./components/PingSimulator";
import InteractiveMaps from "./components/InteractiveMaps";
import DeviceOptimizer from "./components/DeviceOptimizer";
import LiveChat from "./components/LiveChat";

export default function Home() {
  // Navigation & UI State
  const [activeSection, setActiveSection] = useState("guides"); // "guides", "maps", or "optimizer"
  const [activeCategory, setActiveCategory] = useState("all"); // "all", "genshin", "wuwa", "saved"
  const [searchQuery, setSearchQuery] = useState("");
  
  // Character & User Data state
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState({}); // { charId: boolean }
  const [notes, setNotes] = useState({}); // { charId: string }
  const [loadingGenshin, setLoadingGenshin] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  
  // Modal Drawer State
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuRef = useRef(null);

  // 1. Initialize character list (local static) and load extra Genshin characters from public API
  useEffect(() => {
    // Start with the high-quality pre-configured roster (10 Genshin, 23 WuWa)
    setCharacters(characterDatabase);

    async function fetchAllGenshinCharacters() {
      setLoadingGenshin(true);
      try {
        const res = await fetch("https://genshin.jmp.blue/characters/all");
        if (res.ok) {
          const apiChars = await res.json();
          
          setCharacters((prev) => {
            const nextList = [...prev];
            const existingIds = new Set(nextList.map((c) => c.id));

            for (const char of apiChars) {
              let id = char.id || char.name.toLowerCase().replace(/\s+/g, "-");
              
              // Handle Traveler elements collision if id didn't carry it
              if (id === "traveler") {
                const element = (char.vision || "anemo").toLowerCase();
                id = `traveler-${element}`;
              }

              // Skip if already in list (this preserves our custom pre-configured builds)
              if (existingIds.has(id)) continue;

              existingIds.add(id);

              // Parse and format the new character
              nextList.push({
                id: id,
                name: char.name,
                game: "Genshin Impact",
                rarity: char.rarity || 5,
                element: char.vision || "Hydro",
                weapon: char.weapon || "Sword",
                role: char.role || "DPS / Support",
                description: char.description || `${char.name} is a playable character in Genshin Impact from ${char.nation || 'Teyvat'}.`,
                icon: `https://genshin.jmp.blue/characters/${id}/icon`,
                splash: `https://genshin.jmp.blue/characters/${id}/gacha-splash`,
                bestWeapon: {
                  name: char.weapon === "Catalyst" ? "Lost Prayer to the Sacred Winds" : char.weapon === "Claymore" ? "Wolf's Gravestone" : char.weapon === "Bow" ? "Aqua Simulacra" : "Mistsplitter Reforged",
                  rarity: 5,
                  details: "Provides high statistics and matching multipliers for their archetype."
                },
                f2pWeapon: {
                  name: char.weapon === "Catalyst" ? "Mappa Mare (F2P)" : char.weapon === "Claymore" ? "Prototype Archaic (F2P)" : char.weapon === "Bow" ? "Favonius Warbow (F2P)" : "Favonius Sword (F2P)",
                  rarity: 4,
                  details: "Fully craftable or standard gacha pull option that provides high utility."
                },
                bestArtifacts: {
                  set: "Emblem of Severed Fate (4-Piece) / Gladiator's Finale",
                  mainStats: "Sands: ER% or ATK% | Goblet: Elemental DMG% | Circlet: Crit Rate / Crit DMG",
                  subStats: "Crit Rate > Crit DMG > Energy Recharge > ATK%"
                },
                bestEchoes: null,
                teamComps: [
                  { name: "General Synergy", members: [char.name, "Bennett", "Xingqiu", "Kazuha"] }
                ],
                pakistaniTips: `Standard F2P build guidelines. Set up on the Asia Server for optimized latency (90ms - 135ms on PTCL/StormFiber). Level up to at least level 80 and focus on leveling elemental skill talents.`
              });
            }

            console.log("Mapped character IDs in state:", nextList.map(c => c.id));
            return nextList;
          });
        }
      } catch (err) {
        console.warn("Client-side fetch to genshin.jmp.blue failed. Using static offline database roster.", err.message);
      } finally {
        setLoadingGenshin(false);
      }
    }

    fetchAllGenshinCharacters();
  }, []);

  // 2. Read favorites & notes from localStorage (runs purely offline, client-side only)
  useEffect(() => {
    const localFavs = localStorage.getItem("tr_favorites");
    const localNotes = localStorage.getItem("tr_notes");
    
    if (localFavs) setFavorites(JSON.parse(localFavs));
    if (localNotes) setNotes(JSON.parse(localNotes));
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

    if (char.game === "Genshin Impact") {
      setLoadingApi(true);
      try {
        const res = await fetch(`https://genshin.jmp.blue/characters/${char.id}`);
        if (res.ok) {
          const data = await res.json();
          setApiData(data);
        }
      } catch (err) {
        console.warn("Failed to fetch detailed character skills from api:", err.message);
      } finally {
        setLoadingApi(false);
      }
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
          <a href="#" className="logo" onClick={() => { setActiveSection("guides"); setMobileMenuOpen(false); }}>
            <div className="logo-block" />
            TEYVATRESONANCE<span>PK</span>
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
              <span className="hero-badge">PAKISTANI GACHA PORTAL</span>
              <h1 className="display-xl hero-title">Genshin & WuWa Complete Guides</h1>
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
              <div className="cinematic-showcase">

                {/* ── Ambient background glow layers ── */}
                <div className="cin-bg-glow cin-glow-left" />
                <div className="cin-bg-glow cin-glow-right" />
                <div className="cin-center-beam" />

                {/* ── Traveler Card ── */}
                <div className="cin-card cin-card-traveler">
                  {/* Top game badge */}
                  <div className="cin-game-tag cin-tag-gi">
                    <span className="cin-tag-dot" style={{background:"#4fc3f7"}} />
                    GENSHIN IMPACT
                  </div>
                  {/* Full-body splash art */}
                  <div className="cin-img-frame">
                    <div className="cin-img-shimmer" />
                    <img
                      src="https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_PlayerGirl.png"
                      alt="Traveler (Lumine)"
                      className="cin-char-img"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src = "https://enka.network/ui/UI_Gacha_AvatarImg_PlayerGirl.png";
                      }}
                    />
                    {/* Elemental energy at base */}
                    <div className="cin-base-energy cin-energy-anemo" />
                  </div>
                  {/* Name plate */}
                  <div className="cin-nameplate">
                    <span className="cin-char-title">Traveler</span>
                    <span className="cin-char-subtitle">Lumine · The Outlander</span>
                    <div className="cin-element-badge cin-el-anemo">⊕ Anemo</div>
                  </div>
                </div>

                {/* ── Center VS Divider ── */}
                <div className="cin-vs-column">
                  <div className="cin-vs-line top" />
                  <div className="cin-vs-orb">
                    <div className="cin-vs-inner">VS</div>
                    <div className="cin-vs-ring r1" />
                    <div className="cin-vs-ring r2" />
                  </div>
                  <div className="cin-vs-line bottom" />
                </div>

                {/* ── Rover Card ── */}
                <div className="cin-card cin-card-rover">
                  {/* Top game badge */}
                  <div className="cin-game-tag cin-tag-ww">
                    <span className="cin-tag-dot" style={{background:"#ce93d8"}} />
                    WUTHERING WAVES
                  </div>
                  {/* Full-body splash art */}
                  <div className="cin-img-frame">
                    <div className="cin-img-shimmer" style={{animationDelay:"-1.2s"}} />
                    <img
                      src="https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Rover_(Havoc).png"
                      alt="Rover (Havoc)"
                      className="cin-char-img"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // fallback to standard rover
                        if (!e.target.dataset.fb) {
                          e.target.dataset.fb = "1";
                          e.target.src = "https://wutheringwaves.fandom.com/wiki/Special:FilePath/Resonator_Rover.png";
                        }
                      }}
                    />
                    {/* Elemental energy at base */}
                    <div className="cin-base-energy cin-energy-havoc" />
                  </div>
                  {/* Name plate */}
                  <div className="cin-nameplate">
                    <span className="cin-char-title">Rover</span>
                    <span className="cin-char-subtitle">Rover · The Drifter</span>
                    <div className="cin-element-badge cin-el-havoc">◈ Havoc</div>
                  </div>
                </div>

                {/* ── Floating rune particles ── */}
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className={`cin-rune cin-rune-${i}`} />
                ))}

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. MAIN BODY DOCK (Switches sections based on Active Nav link) */}
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
                        {loadingGenshin && (
                          <span style={{ marginLeft: "12px", color: "var(--primary-dark)", fontSize: "13px" }} className="loading-dots">
                            Loading all Genshin characters
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {filteredCharacters.length > 0 ? (
                    <div className="card-grid">
                      {filteredCharacters.map((char) => (
                        <CharacterCard
                          key={char.id}
                          character={char}
                          onSelect={handleSelectCharacter}
                          isFavorite={!!favorites[char.id]}
                          onToggleFavorite={handleToggleFavorite}
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
      ) : (
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
      )}

      {/* 5. Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column" style={{ gridColumn: "span 2" }}>
              <div className="logo" style={{ color: "white" }}>
                <div className="logo-block" />
                TEYVATRESONANCE<span>PK</span>
              </div>
              <p className="body-sm" style={{ color: "var(--on-dark-mute)", marginTop: "8px" }}>
                The premier resource for Genshin Impact and Wuthering Waves build guides in Pakistan. Engineered for optimal responsive performance.
              </p>
            </div>
            
            <div className="footer-column">
              <div className="footer-column-title">RESOURCES</div>
              <ul className="footer-links">
                <li><a href="#guides" onClick={(e) => { e.preventDefault(); setActiveSection("guides"); }}>Build Guides</a></li>
                <li><a href="#optimizer" onClick={(e) => { e.preventDefault(); setActiveSection("optimizer"); }}>Device Optimizer</a></li>
                <li><a href="#maps" onClick={(e) => { e.preventDefault(); setActiveSection("maps"); }}>Interactive Maps</a></li>
                <li><a href="#chat" onClick={(e) => { e.preventDefault(); setActiveSection("chat"); }}>Live Chat</a></li>
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
              © {new Date().getFullYear()} TEYVATRESONANCE PK. THIS PORTAL IS AN INDEPENDENT FAN SITE. ALL ASSETS COPIED ARE COPYRIGHT OF COGNOSPHERE (HOYOVERSE) & KURO GAMES.
            </div>
            <ul className="social-links">
              <li><a href="#">DISCORD</a></li>
              <li><a href="#">TWITTER</a></li>
              <li><a href="#">YOUTUBE</a></li>
            </ul>
          </div>
        </div>
      </footer>

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
