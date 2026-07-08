"use client";

import React, { useState, useEffect } from "react";

export default function ModalDrawer({ 
  character, 
  isOpen, 
  onClose, 
  isFavorite, 
  onToggleFavorite, 
  personalNotes, 
  onSaveNotes,
  apiData,
  loadingApi
}) {
  const [notesText, setNotesText] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [activeTab, setActiveTab] = useState("build"); // "build" or "skills"

  // Sync state notesText with prop personalNotes when character changes
  useEffect(() => {
    if (character) {
      setNotesText(personalNotes || "");
      setSaveStatus("");
      setActiveTab("build"); // reset to build tab on character switch
    }
  }, [character, personalNotes]);

  if (!character) return null;

  const { name, game, rarity, element, weapon, role, description, icon, splash, bestWeapon, f2pWeapon, bestArtifacts, bestEchoes, teamComps, pakistaniTips } = character;

  const handleNotesChange = (e) => {
    setNotesText(e.target.value);
  };

  const handleSaveNotesClick = () => {
    onSaveNotes(character.id, notesText);
    setSaveStatus("Notes saved!");
    setTimeout(() => {
      setSaveStatus("");
    }, 2500);
  };

  // Convert element name to lower-case for class mapping
  const elementClass = element ? `element-${element.toLowerCase()}` : "";

  return (
    <div className={`modal-backdrop ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div 
        className="modal-drawer" 
        onClick={(e) => e.stopPropagation()} // Stop propagation to avoid closing modal
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="heading-md" style={{ color: "var(--on-dark)" }}>CHARACTER PROFILE</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close panel">
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="modal-body">
          {/* Headline & Avatar Summary */}
          <div className="detail-intro-section">
            <div className="detail-img-box">
              <img 
                src={splash || icon || "https://placehold.co/200x200/1a1a1a/76b900?text=Avatar"} 
                alt={name} 
                className="detail-img"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (splash && icon && splash !== icon && !e.target.src.endsWith(icon)) {
                    e.target.src = icon;
                  } else {
                    e.target.src = "https://placehold.co/200x200/1a1a1a/76b900?text=" + encodeURIComponent(name);
                  }
                }}
              />
            </div>
            <div className="detail-headline">
              <div className="detail-title-row">
                <h1 className="heading-xl" style={{ margin: 0 }}>{name}</h1>
                <span className={`badge-tag rarity-${rarity}`}>
                  {rarity}-STAR
                </span>
                {/* Favorite Bookmark Toggle inside header */}
                <button 
                  className={`fav-btn ${isFavorite ? "active" : ""}`}
                  onClick={() => onToggleFavorite(character.id)}
                  title={isFavorite ? "Remove from saved builds" : "Save to my builds"}
                  style={{ marginLeft: "auto", padding: "8px" }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={isFavorite ? "var(--primary)" : "none"} 
                    stroke={isFavorite ? "var(--primary)" : "currentColor"} 
                    strokeWidth="2" 
                    width="24" 
                    height="24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="detail-game">{game}</div>
              <p className="body-sm" style={{ color: "var(--mute)" }}>{description}</p>
              
              <div className="detail-tags">
                <span className="badge-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span className={`element-dot ${elementClass}`} />
                  {element}
                </span>
                <span className="badge-tag">{weapon}</span>
                <span className="badge-tag">{role}</span>
              </div>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="maps-tabs" style={{ marginBottom: 0, marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              className={`pill-tab ${activeTab === "build" ? "active" : ""}`}
              onClick={() => setActiveTab("build")}
              style={{ padding: "8px 16px", fontSize: "13px" }}
            >
              🛠️ BUILD & GEAR
            </button>

            <button
              className={`pill-tab ${activeTab === "lore" ? "active" : ""}`}
              onClick={() => setActiveTab("lore")}
              style={{ padding: "8px 16px", fontSize: "13px" }}
            >
              📖 PROFILE & LORE
            </button>
            
            {game === "Genshin Impact" && (
              <button
                className={`pill-tab ${activeTab === "skills" ? "active" : ""}`}
                onClick={() => setActiveTab("skills")}
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                📜 SKILLS & CONSTS (API)
              </button>
            )}
          </div>

          {/* TAB 1: BUILD AND GEAR */}
          {activeTab === "build" && (
            <>
              {/* Recommended Gear Panels */}
              <div className="guide-panel">
                <h3 className="panel-title heading-sm">RECOMMENDED WEAPONS</h3>
                
                {bestWeapon && (
                  <div className="build-item">
                    <div className="build-item-header">
                      <span className="build-item-name">{bestWeapon.name}</span>
                      <span className="build-item-label" style={{ color: "var(--primary-dark)" }}>BEST-IN-SLOT</span>
                    </div>
                    <p className="build-item-desc">{bestWeapon.details}</p>
                  </div>
                )}

                {f2pWeapon && (
                  <div className="build-item" style={{ marginTop: "16px" }}>
                    <div className="build-item-header">
                      <span className="build-item-name">{f2pWeapon.name}</span>
                      <span className="build-item-label" style={{ color: "var(--link-blue)" }}>F2P ALTERNATIVE</span>
                    </div>
                    <p className="build-item-desc">{f2pWeapon.details}</p>
                  </div>
                )}
              </div>

              {/* Recommended Artifacts or Echoes */}
              {(bestArtifacts || bestEchoes) && (
                <div className="guide-panel">
                  <h3 className="panel-title heading-sm">
                    {bestArtifacts ? "RECOMMENDED ARTIFACTS" : "RECOMMENDED ECHOES"}
                  </h3>
                  {bestArtifacts && (
                    <div className="build-item">
                      <div className="build-item-name" style={{ color: "var(--ink)" }}>{bestArtifacts.set}</div>
                      <p className="build-item-desc" style={{ marginTop: "4px" }}>
                        <strong>Main Stats:</strong> {bestArtifacts.mainStats}
                      </p>
                      <p className="build-item-desc">
                        <strong>Sub Stats:</strong> {bestArtifacts.subStats}
                      </p>
                    </div>
                  )}
                  {bestEchoes && (
                    <div className="build-item">
                      <div className="build-item-name" style={{ color: "var(--ink)" }}>{bestEchoes.set}</div>
                      <p className="build-item-desc" style={{ marginTop: "4px" }}>
                        <strong>Main Stats:</strong> {bestEchoes.mainStats}
                      </p>
                      <p className="build-item-desc">
                        <strong>Sub Stats:</strong> {bestEchoes.subStats}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Best Team Compositions */}
              {teamComps && teamComps.length > 0 && (
                <div className="guide-panel">
                  <h3 className="panel-title heading-sm">RECOMMENDED TEAM COMPS</h3>
                  <div className="teams-list">
                    {teamComps.map((team, idx) => (
                      <div key={idx} className="team-row">
                        <div className="team-name">{team.name}</div>
                        <div className="team-members">
                          {team.members.map((member, mIdx) => (
                            <span key={mIdx} className="team-member-badge">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Notes (User Data Save Feature) */}
              <div className="guide-panel" style={{ borderColor: "var(--primary)" }}>
                <h3 className="panel-title heading-sm" style={{ color: "var(--primary-dark)" }}>
                  MY PERSONAL BUILD NOTES
                </h3>
                <div className="user-notes-section">
                  <p className="body-sm" style={{ color: "var(--mute)", marginBottom: "4px" }}>
                    Add your own notes, artifacts stats, or weapons details here. These will be saved locally on your browser.
                  </p>
                  <textarea
                    className="notes-textarea"
                    value={notesText}
                    onChange={handleNotesChange}
                    placeholder="Examples: My Furina is level 90, C0, using Fleuve R5. Crit ratio is 60/140. Main focus: get a better HP sands."
                  />
                  <div className="notes-actions">
                    {saveStatus && (
                      <span className="body-sm" style={{ color: "green", alignSelf: "center", marginRight: "8px", fontWeight: "bold" }}>
                        {saveStatus}
                      </span>
                    )}
                    <button className="btn btn-primary" onClick={handleSaveNotesClick} style={{ height: "36px", padding: "0 16px", fontSize: "14px" }}>
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>

              {/* Local Pakistani Network Guidelines */}
              {pakistaniTips && (
                <div className="pakistan-alert-box">
                  <h4 className="pakistan-alert-title">
                    🇵🇰 PAKISTAN NETWORK & DEVICE GUIDE
                  </h4>
                  <p className="pakistan-alert-content">{pakistaniTips}</p>
                </div>
              )}
            </>
          )}

          {/* TAB 3: PROFILE & LORE */}
          {activeTab === "lore" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Profile Details Panel */}
              <div className="guide-panel">
                <h3 className="panel-title heading-sm">RESONATOR BIOGRAPHY</h3>
                <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "12px" }}>
                  <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                    <div className="caption-xs" style={{ color: "var(--mute)" }}>Appellation / Title</div>
                    <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{character.title || apiData?.title || "Unknown"}</div>
                  </div>
                  <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                    <div className="caption-xs" style={{ color: "var(--mute)" }}>Gender</div>
                    <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{character.gender || apiData?.gender || "Unknown"}</div>
                  </div>
                  <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                    <div className="caption-xs" style={{ color: "var(--mute)" }}>Nation / Region</div>
                    <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{character.nation || apiData?.nation || "Unknown"}</div>
                  </div>
                  <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                    <div className="caption-xs" style={{ color: "var(--mute)" }}>Affiliation</div>
                    <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{character.affiliation || apiData?.affiliation || "Unknown"}</div>
                  </div>
                  <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                    <div className="caption-xs" style={{ color: "var(--mute)" }}>Birthday</div>
                    <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{character.birthday || apiData?.birthday || "Unknown"}</div>
                  </div>
                  <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                    <div className="caption-xs" style={{ color: "var(--mute)" }}>{game === "Genshin Impact" ? "Constellation" : "Forte Aspect"}</div>
                    <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{character.constellation || apiData?.constellation || "Unknown"}</div>
                  </div>
                  {apiData?.release && (
                    <div className="profile-meta-item" style={{ borderBottom: "1px solid var(--surface-soft)", paddingBottom: "8px" }}>
                      <div className="caption-xs" style={{ color: "var(--mute)" }}>Release Date</div>
                      <div className="body-sm" style={{ fontWeight: "bold", color: "var(--ink)" }}>{apiData.release}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Lore & History Narrative */}
              <div className="guide-panel" style={{ borderLeft: "4px solid var(--primary)" }}>
                <h3 className="panel-title heading-sm" style={{ color: "var(--primary-dark)" }}>LORE & BACKSTORY</h3>
                <p className="body-sm" style={{ color: "var(--body)", marginTop: "12px", lineHeight: "1.7", fontSize: "14.5px", textAlign: "justify", whiteSpace: "pre-line" }}>
                  {character.history || apiData?.description || description || "No detailed lore record currently available."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE DATAMINED SKILLS & CONSTELLATIONS */}
          {activeTab === "skills" && (
            <>
              {loadingApi ? (
                <div style={{ textAlign: "center", padding: "40px", border: "1px solid var(--hairline)" }}>
                  <span className="body-strong loading-dots" style={{ color: "var(--primary-dark)" }}>
                    Scraping live game database values
                  </span>
                </div>
              ) : apiData ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Skill Talents */}
                  {apiData.skillTalents && apiData.skillTalents.length > 0 && (
                    <div className="guide-panel">
                      <h3 className="panel-title heading-sm">ACTIVE TALENTS</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {apiData.skillTalents.map((talent, idx) => (
                          <div key={idx} style={{ borderBottom: idx !== apiData.skillTalents.length - 1 ? "1px solid var(--surface-soft)" : "none", paddingBottom: "12px" }}>
                            <div className="body-strong" style={{ color: "var(--ink)", display: "flex", justifyContent: "space-between" }}>
                              <span>{talent.name}</span>
                              <span className="caption-xs" style={{ color: "var(--mute)", border: "1px solid var(--hairline)", padding: "1px 6px" }}>
                                {talent.unlock}
                              </span>
                            </div>
                            <p className="body-sm" style={{ color: "var(--mute)", marginTop: "4px", fontSize: "13.5px", whiteSpace: "pre-line" }}>
                              {talent.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passive Talents */}
                  {apiData.passiveTalents && apiData.passiveTalents.length > 0 && (
                    <div className="guide-panel">
                      <h3 className="panel-title heading-sm">PASSIVE TALENTS</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {apiData.passiveTalents.map((passive, idx) => (
                          <div key={idx} style={{ borderBottom: idx !== apiData.passiveTalents.length - 1 ? "1px solid var(--surface-soft)" : "none", paddingBottom: "12px" }}>
                            <div className="body-strong" style={{ color: "var(--ink)", display: "flex", justifyContent: "space-between" }}>
                              <span>{passive.name}</span>
                              <span className="caption-xs" style={{ color: "var(--mute)", border: "1px solid var(--hairline)", padding: "1px 6px" }}>
                                {passive.unlock}
                              </span>
                            </div>
                            <p className="body-sm" style={{ color: "var(--mute)", marginTop: "4px", fontSize: "13.5px" }}>
                              {passive.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Constellations */}
                  {apiData.constellations && apiData.constellations.length > 0 && (
                    <div className="guide-panel">
                      <h3 className="panel-title heading-sm">CONSTELLATIONS</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {apiData.constellations.map((constellation, idx) => (
                          <div key={idx} style={{ borderBottom: idx !== apiData.constellations.length - 1 ? "1px solid var(--surface-soft)" : "none", paddingBottom: "12px" }}>
                            <div className="body-strong" style={{ color: "var(--ink)", display: "flex", gap: "8px" }}>
                              <span style={{ color: "var(--primary-dark)" }}>C{idx + 1}</span>
                              <span>{constellation.name}</span>
                            </div>
                            <p className="body-sm" style={{ color: "var(--mute)", marginTop: "4px", fontSize: "13.5px" }}>
                              {constellation.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ padding: "30px", border: "1px dashed var(--hairline)", textAlign: "center" }}>
                  <p className="body-sm" style={{ color: "var(--mute)" }}>
                    Could not fetch character talent values from the API. Make sure your internet connection is active.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
