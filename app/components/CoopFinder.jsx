"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { fullRoster } from "../data/roster";

// Filter out playable characters with names and icons for avatars
const AVATAR_LIST = fullRoster.filter((c) => c.name && c.icon && !c.upcoming);

const PURPOSES = [
  "Weekly Bosses",
  "Domain Farming",
  "Material Gathering",
  "Echo Farming",
  "Casual Play / Exploration",
  "Daily Commissions",
  "Achievement Hunting"
];

const SERVERS = ["Asia", "Europe", "America", "TW/HK/MO", "SEA"];

export default function CoopFinder() {
  // 1. Supabase Initialization
  const [supabaseUrl, setSupabaseUrl] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  );
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED"); // DISCONNECTED, CONNECTING, CONNECTED, ERROR
  const [showConfig, setShowConfig] = useState(false);

  // Toggle Form Visibility
  const [showForm, setShowForm] = useState(false);

  // 2. User & Form States
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_LIST[0]?.icon || "");
  const [uid, setUid] = useState("");
  const [game, setGame] = useState("Genshin Impact");
  const [server, setServer] = useState("Asia");
  const [worldLevel, setWorldLevel] = useState("WL 8");
  const [purpose, setPurpose] = useState("Weekly Bosses");
  const [description, setDescription] = useState("");

  // 3. List & Filter States
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Client-side Filters
  const [gameFilter, setGameFilter] = useState("all");
  const [serverFilter, setServerFilter] = useState("all");
  const [purposeFilter, setPurposeFilter] = useState("all");
  
  // Track copy feedback for individual post IDs: { [postId]: boolean }
  const [copiedId, setCopiedId] = useState({});
  // Track my post IDs locally to allow deleting/marking them as filled
  const [myPostIds, setMyPostIds] = useState([]);

  // Ref to handle unmounted subscription cleanup
  const subscriptionRef = useRef(null);

  // 4. Load configuration & user session from localStorage
  useEffect(() => {
    const savedUrl = localStorage.getItem("tr_supabase_url");
    const savedKey = localStorage.getItem("tr_supabase_key");
    if (savedUrl) setSupabaseUrl(savedUrl);
    if (savedKey) setSupabaseAnonKey(savedKey);

    const savedUsername = localStorage.getItem("tr_chat_username");
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      const randId = Math.floor(1000 + Math.random() * 9000);
      const initialUser = `Traveler#${randId}`;
      setUsername(initialUser);
      localStorage.setItem("tr_chat_username", initialUser);
    }

    const savedAvatar = localStorage.getItem("tr_chat_avatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    } else if (AVATAR_LIST.length > 0) {
      setSelectedAvatar(AVATAR_LIST[0].icon);
      localStorage.setItem("tr_chat_avatar", AVATAR_LIST[0].icon);
    }

    const savedUid = localStorage.getItem("tr_coop_uid") || "";
    setUid(savedUid);

    const savedMyPosts = JSON.parse(localStorage.getItem("tr_my_coop_posts") || "[]");
    setMyPostIds(savedMyPosts);
  }, []);

  // 5. Initialize Supabase client
  useEffect(() => {
    const activeUrl = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const activeKey = supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!activeUrl || !activeKey) {
      setConnectionStatus("DISCONNECTED");
      setSupabaseClient(null);
      return;
    }

    setConnectionStatus("CONNECTING");
    try {
      const client = createClient(activeUrl, activeKey);
      setSupabaseClient(client);
      setConnectionStatus("CONNECTED");
    } catch (err) {
      console.error("Supabase init error (coop):", err);
      setConnectionStatus("ERROR");
    }
  }, [supabaseUrl, supabaseAnonKey]);

  // 6. Fetch Active Co-Op Posts
  const fetchPosts = async () => {
    if (!supabaseClient) return;
    setLoadingPosts(true);
    setErrorText("");

    try {
      const { data, error } = await supabaseClient
        .from("lfg_posts")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(40);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Fetch LFG posts error:", err);
      setErrorText(
        `Could not retrieve active co-op sessions: ${err?.message || "Verify your connection."} (Ensure the 'lfg_posts' table exists).`
      );
    } finally {
      setLoadingPosts(false);
    }
  };

  // 7. Subscribe to real-time updates
  useEffect(() => {
    if (!supabaseClient) return;

    fetchPosts();

    try {
      subscriptionRef.current = supabaseClient
        .channel("public:lfg_posts")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "lfg_posts" },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const newPost = payload.new;
              if (newPost.status === "active") {
                setPosts((prev) => {
                  if (prev.some((p) => p.id === newPost.id)) return prev;
                  return [newPost, ...prev].slice(0, 40);
                });
              }
            } else if (payload.eventType === "UPDATE") {
              const updatedPost = payload.new;
              if (updatedPost.status !== "active") {
                // Filter out filled/resolved posts
                setPosts((prev) => prev.filter((p) => p.id !== updatedPost.id));
              } else {
                setPosts((prev) =>
                  prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
                );
              }
            } else if (payload.eventType === "DELETE") {
              setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
            }
          }
        )
        .subscribe();
    } catch (err) {
      console.warn("Real-time LFG subscription error:", err);
    }

    return () => {
      if (subscriptionRef.current) {
        supabaseClient.removeChannel(subscriptionRef.current);
      }
    };
  }, [supabaseClient]);

  // 8. Handle Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!supabaseClient) {
      setShowConfig(true);
      return;
    }

    const trimmedUsername = username.trim();
    const trimmedUid = uid.trim();
    if (!trimmedUsername || !trimmedUid) return;

    // Local validation for UID
    if (!/^\d+$/.test(trimmedUid)) {
      setErrorText("UID must contain only numbers.");
      return;
    }

    setSubmitting(true);
    setErrorText("");

    try {
      const { data, error } = await supabaseClient
        .from("lfg_posts")
        .insert([
          {
            username: trimmedUsername,
            uid: trimmedUid,
            game,
            server,
            world_level: worldLevel,
            purpose,
            description: description.trim(),
            avatar: selectedAvatar,
            status: "active"
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        // Save UID to local storage for convenience
        localStorage.setItem("tr_coop_uid", trimmedUid);
        
        // Track ownership of this post
        const nextMyPosts = [...myPostIds, data[0].id];
        setMyPostIds(nextMyPosts);
        localStorage.setItem("tr_my_coop_posts", JSON.stringify(nextMyPosts));

        // Update list immediately if sync is slow
        setPosts((prev) => {
          if (prev.some((p) => p.id === data[0].id)) return prev;
          return [data[0], ...prev];
        });

        // Reset form details and close form
        setDescription("");
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setErrorText(`Failed to publish co-op request: ${err?.message || "Check your Supabase write policies."}`);
    } finally {
      setSubmitting(false);
    }
  };

  // 9. Mark a post as filled / complete
  const handleMarkAsFilled = async (postId) => {
    if (!supabaseClient) return;

    try {
      const { error } = await supabaseClient
        .from("lfg_posts")
        .update({ status: "filled" })
        .eq("id", postId);

      if (error) throw error;

      // Filter out of current state
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      
      // Remove from owned list
      const nextMyPosts = myPostIds.filter((id) => id !== postId);
      setMyPostIds(nextMyPosts);
      localStorage.setItem("tr_my_coop_posts", JSON.stringify(nextMyPosts));
    } catch (err) {
      console.error("Error marking post as filled:", err);
      setErrorText(`Failed to update post: ${err?.message}`);
    }
  };

  // 10. Copy UID to Clipboard
  const handleCopyUid = (postId, uidValue) => {
    navigator.clipboard.writeText(uidValue).then(
      () => {
        setCopiedId((prev) => ({ ...prev, [postId]: true }));
        setTimeout(() => {
          setCopiedId((prev) => ({ ...prev, [postId]: false }));
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy UID:", err);
      }
    );
  };

  // Helper for relative timestamps
  const getRelativeTime = (isoString) => {
    try {
      const diffMs = new Date() - new Date(isoString);
      const diffMins = Math.floor(diffMs / 60000);
      const diffHrs = Math.floor(diffMins / 60);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHrs < 24) return `${diffHrs}h ago`;
      return new Date(isoString).toLocaleDateString();
    } catch (e) {
      return "";
    }
  };

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesGame = gameFilter === "all" || post.game === gameFilter;
      const matchesServer = serverFilter === "all" || post.server === serverFilter;
      const matchesPurpose = purposeFilter === "all" || post.purpose === purposeFilter;
      return matchesGame && matchesServer && matchesPurpose;
    });
  }, [posts, gameFilter, serverFilter, purposeFilter]);

  // Save changes to Supabase configuration in localStorage
  const handleSaveConfig = (e) => {
    e.preventDefault();
    localStorage.setItem("tr_supabase_url", supabaseUrl);
    localStorage.setItem("tr_supabase_key", supabaseAnonKey);
    setShowConfig(false);
  };

  const handleClearConfig = () => {
    localStorage.removeItem("tr_supabase_url");
    localStorage.removeItem("tr_supabase_key");
    setSupabaseUrl("");
    setSupabaseAnonKey("");
    setSupabaseClient(null);
    setConnectionStatus("DISCONNECTED");
  };

  return (
    <div className="coop-layout" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)", marginTop: "var(--spacing-lg)" }}>

      {/* Error Alert Box */}
      {errorText && (
        <div className="pakistan-alert-box" style={{ borderLeftColor: "#EF4444", background: "rgba(239, 68, 68, 0.05)" }}>
          <h4 className="pakistan-alert-title" style={{ color: "#EF4444" }}>⚠️ DATABASE CONNECTION WARNING</h4>
          <p className="body-sm" style={{ color: "var(--on-dark-mute)", marginTop: "4px" }}>{errorText}</p>
        </div>
      )}

      {/* Action Header bar: Create Request toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--hairline)", paddingBottom: "12px" }}>
        <h3 className="heading-sm" style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
          <span>🎮</span> MATCHMAKING LOBBIES
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
          style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "6px" }}
        >
          {showForm ? "× Cancel Request" : "➕ Create Co-Op Request"}
        </button>
      </div>

      {/* Wide Creation Form Panel (spacious grid, collapsible) */}
      {showForm && (
        <div className="coop-form-card">
          <h3 className="heading-sm" style={{ color: "var(--primary)", borderBottom: "1px solid var(--hairline-strong)", paddingBottom: "8px", marginBottom: "16px" }}>
            📢 POST A NEW CO-OP SESSION
          </h3>

          <form onSubmit={handleCreatePost} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="coop-form-grid">
              
              {/* Column 1: Identity */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Gacha Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DilucMain99"
                    className="search-input"
                    style={{ width: "100%", height: "38px" }}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      localStorage.setItem("tr_chat_username", e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>In-Game UID (Copyable)</label>
                  <input
                    type="text"
                    required
                    pattern="\d+"
                    placeholder="e.g. 182736452"
                    className="search-input"
                    style={{ width: "100%", height: "38px" }}
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                  />
                </div>
              </div>

              {/* Column 2: Game Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Select Game</label>
                  <select
                    className="isp-select"
                    style={{ width: "100%", height: "38px", padding: "0 10px" }}
                    value={game}
                    onChange={(e) => {
                      setGame(e.target.value);
                      setWorldLevel(e.target.value === "Genshin Impact" ? "WL 8" : "UL 50");
                    }}
                  >
                    <option value="Genshin Impact">Genshin Impact</option>
                    <option value="Wuthering Waves">Wuthering Waves</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Server</label>
                    <select
                      className="isp-select"
                      style={{ width: "100%", height: "38px", padding: "0 10px" }}
                      value={server}
                      onChange={(e) => setServer(e.target.value)}
                    >
                      {SERVERS.map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>
                      {game === "Genshin Impact" ? "World Lvl" : "Union Lvl"}
                    </label>
                    <select
                      className="isp-select"
                      style={{ width: "100%", height: "38px", padding: "0 10px" }}
                      value={worldLevel}
                      onChange={(e) => setWorldLevel(e.target.value)}
                    >
                      {game === "Genshin Impact" ? (
                        ["WL 1", "WL 2", "WL 3", "WL 4", "WL 5", "WL 6", "WL 7", "WL 8", "WL 9"].map((wl) => (
                          <option key={wl} value={wl}>{wl}</option>
                        ))
                      ) : (
                        ["UL 10+", "UL 20+", "UL 30+", "UL 40+", "UL 50+", "UL 60+", "UL 70"].map((ul) => (
                          <option key={ul} value={ul}>{ul}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Column 3: Purpose & Avatar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Co-Op Purpose</label>
                  <select
                    className="isp-select"
                    style={{ width: "100%", height: "38px", padding: "0 10px" }}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Card Avatar Icon</label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <img 
                      src={selectedAvatar} 
                      alt="Current Avatar" 
                      style={{ width: "38px", height: "38px", border: "1px solid var(--primary)", objectFit: "cover", background: "var(--surface)", borderRadius: "4px" }}
                      onError={(e) => { e.target.src = "https://genshin.jmp.blue/characters/traveler-anemo/icon"; }}
                    />
                    <select
                      className="isp-select"
                      style={{ flex: 1, height: "38px", padding: "0 10px" }}
                      value={selectedAvatar}
                      onChange={(e) => {
                        setSelectedAvatar(e.target.value);
                        localStorage.setItem("tr_chat_avatar", e.target.value);
                      }}
                    >
                      {AVATAR_LIST.map((char) => (
                        <option key={char.id} value={char.icon}>{char.name} ({char.game === "Genshin Impact" ? "GI" : "WuWa"})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Custom description (Full width) */}
            <div>
              <label className="filter-label" style={{ display: "block", marginBottom: "6px" }}>Custom Message / Farming Request Details</label>
              <textarea
                className="search-input"
                style={{ width: "100%", minHeight: "60px", padding: "10px", lineHeight: "1.5", resize: "vertical" }}
                placeholder="Provide directions or server/ping details (e.g. 'Nayatel Fiber Asia Server, farming materials for Mualani, need helper')"
                value={description}
                maxLength={250}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn btn-outline-on-dark"
                style={{ padding: "10px 24px" }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || connectionStatus !== "CONNECTED"}
                className="btn btn-primary"
                style={{ padding: "10px 32px" }}
              >
                {submitting ? "Publishing..." : "POST CO-OP REQUEST"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. LFG Directory Filter and Feed Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Filters Bar */}
        <div className="guide-panel" style={{ padding: "var(--spacing-md)", border: "1px solid var(--hairline)" }}>
          <span className="filter-label" style={{ display: "block", marginBottom: "12px" }}>🔍 FILTER CO-OP DIRECTORY:</span>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "140px" }}>
              <span className="caption-xs" style={{ color: "var(--mute)" }}>GAME</span>
              <select 
                className="isp-select" 
                style={{ height: "34px", padding: "0 8px", fontSize: "13px" }}
                value={gameFilter}
                onChange={(e) => setGameFilter(e.target.value)}
              >
                <option value="all">All Games</option>
                <option value="Genshin Impact">Genshin Impact</option>
                <option value="Wuthering Waves">Wuthering Waves</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "120px" }}>
              <span className="caption-xs" style={{ color: "var(--mute)" }}>SERVER</span>
              <select 
                className="isp-select" 
                style={{ height: "34px", padding: "0 8px", fontSize: "13px" }}
                value={serverFilter}
                onChange={(e) => setServerFilter(e.target.value)}
              >
                <option value="all">All Servers</option>
                {SERVERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "180px" }}>
              <span className="caption-xs" style={{ color: "var(--mute)" }}>PURPOSE</span>
              <select 
                className="isp-select" 
                style={{ height: "34px", padding: "0 8px", fontSize: "13px" }}
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
              >
                <option value="all">All Purposes</option>
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <button 
                className="btn btn-outline-on-dark" 
                style={{ height: "34px", fontSize: "12px", border: "1px solid var(--hairline)", cursor: "pointer" }}
                onClick={fetchPosts}
                disabled={loadingPosts || connectionStatus !== "CONNECTED"}
              >
                {loadingPosts ? "Refreshing..." : "🔄 Refresh Feed"}
              </button>
            </div>

          </div>
        </div>

        {/* LFG Cards Grid (2-3 columns on desktop, 1 on mobile) */}
        {loadingPosts ? (
          <div style={{ padding: "60px", textAlign: "center", border: "1px dashed var(--hairline)", color: "var(--mute)" }}>
            <span className="animate-pulse">Loading active co-op sessions from database...</span>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="coop-cards-grid">
            {filteredPosts.map((post) => {
              const isGenshin = post.game === "Genshin Impact";
              const badgeColor = isGenshin ? "var(--primary)" : "#E45CFF";
              const isMyPost = myPostIds.includes(post.id);

              return (
                <div 
                  key={post.id} 
                  className="coop-post-card"
                  style={{ 
                    borderLeft: `4px solid ${badgeColor}`,
                    position: "relative"
                  }}
                >
                  {/* Card Header: Avatar, names, timestamps */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                      <img 
                        src={post.avatar || "https://genshin.jmp.blue/characters/traveler-anemo/icon"} 
                        alt={post.username} 
                        style={{ 
                          width: "42px", 
                          height: "42px", 
                          border: `1px solid ${badgeColor}`,
                          borderRadius: "4px",
                          objectFit: "cover",
                          background: "var(--surface)"
                        }}
                        onError={(e) => { e.target.src = "https://genshin.jmp.blue/characters/traveler-anemo/icon"; }}
                      />
                      
                      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                        <span className="body-strong" style={{ color: "var(--ink)", display: "flex", alignItems: "center", gap: "6px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {post.username}
                          {isMyPost && (
                            <span 
                              className="caption-xs" 
                              style={{ 
                                color: "var(--primary)", 
                                border: "1px solid var(--primary)", 
                                padding: "1px 4px", 
                                fontSize: "9px",
                                textTransform: "uppercase",
                                display: "inline-block",
                                flexShrink: 0
                              }}
                            >
                              My Post
                            </span>
                          )}
                        </span>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginTop: "2px" }}>
                          <span 
                            className="caption-xs" 
                            style={{ 
                              color: badgeColor, 
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontSize: "10px"
                            }}
                          >
                            {isGenshin ? "Genshin" : "WuWa"}
                          </span>
                          <span style={{ color: "var(--mute)", fontSize: "11px" }}>•</span>
                          <span className="caption-xs" style={{ color: "var(--on-dark-mute)" }}>{post.server}</span>
                          <span style={{ color: "var(--mute)", fontSize: "11px" }}>•</span>
                          <span className="caption-xs" style={{ color: "var(--on-dark-mute)" }}>{post.world_level}</span>
                        </div>
                      </div>

                      <span className="caption-xs" style={{ color: "var(--mute)", flexShrink: 0 }}>
                        {getRelativeTime(post.created_at)}
                      </span>
                    </div>

                    {/* Purpose tag inside card */}
                    <div style={{ margin: "6px 0 10px" }}>
                      <span 
                        className="caption-xs" 
                        style={{ 
                          backgroundColor: "rgba(0,0,0,0.3)", 
                          padding: "4px 10px", 
                          border: "1px solid var(--hairline-strong)",
                          color: "var(--ink)",
                          borderRadius: "2px",
                          display: "inline-block"
                        }}
                      >
                        🎯 {post.purpose}
                      </span>
                    </div>

                    {/* Custom user message */}
                    {post.description && (
                      <p className="coop-desc">
                        {post.description}
                      </p>
                    )}
                  </div>

                  {/* Card Footer: UID & Actions */}
                  <div 
                    style={{ 
                      borderTop: "1px solid var(--hairline)", 
                      paddingTop: "12px", 
                      marginTop: "12px",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="caption-xs" style={{ color: "var(--mute)" }}>UID:</span>
                      <code style={{ color: "var(--ink)", fontWeight: "bold", letterSpacing: "0.5px", fontSize: "13.5px" }}>
                        {post.uid}
                      </code>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        className="btn btn-primary"
                        style={{ padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}
                        onClick={() => handleCopyUid(post.id, post.uid)}
                      >
                        {copiedId[post.id] ? "✅ Copied" : "📋 Copy UID"}
                      </button>
                      
                      {isMyPost && (
                        <button 
                          className="btn btn-outline-on-dark"
                          style={{ 
                            padding: "6px 12px", 
                            fontSize: "12px", 
                            borderColor: "#EF4444", 
                            color: "#EF4444",
                            cursor: "pointer"
                          }}
                          onClick={() => handleMarkAsFilled(post.id)}
                        >
                          Mark as Filled
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: "60px", border: "1px dashed var(--hairline)", textAlign: "center", background: "var(--glass-strong)", borderRadius: "var(--rounded-sm)" }}>
            <p className="body-md" style={{ color: "var(--mute)" }}>
              No active co-op requests match your filters.
            </p>
            <p className="body-sm" style={{ color: "var(--mute)", marginTop: "8px" }}>
              Be the first to list a request by clicking **➕ Create Co-Op Request**!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
