"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { toWebP } from "../utils/image";
import { characterDatabase } from "../data/characters";

export default function LiveChat() {
  // 1. Supabase Initialization States
  const [supabaseUrl, setSupabaseUrl] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  );
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED"); // DISCONNECTED, CONNECTING, CONNECTED, ERROR
  const [showConfig, setShowConfig] = useState(false);

  // 2. User & Chat States
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(characterDatabase[0]?.icon || "");
  const [gameTag, setGameTag] = useState("Genshin"); // Genshin or WuWa
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [errorText, setErrorText] = useState("");

  const messagesEndRef = useRef(null);

  // Quick Chat Options
  const quickPhrases = [
    "Need help with Weekly Boss!",
    "StormFiber ping is solid today!",
    "PTCL ping is spiking right now.",
    "Anyone up for some co-op?",
    "Looking for Echo farming partners!",
    "Add me: UID "
  ];

  // 3. Load user settings & supabase keys from localStorage
  useEffect(() => {
    // Load config if saved locally
    const savedUrl = localStorage.getItem("tr_supabase_url");
    const savedKey = localStorage.getItem("tr_supabase_key");
    if (savedUrl) setSupabaseUrl(savedUrl);
    if (savedKey) setSupabaseAnonKey(savedKey);

    // Set a default guest username
    const savedUsername = localStorage.getItem("tr_chat_username");
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      const randId = Math.floor(1000 + Math.random() * 9000);
      const initialUser = `Traveler#${randId}`;
      setUsername(initialUser);
      localStorage.setItem("tr_chat_username", initialUser);
    }

    // Set a default avatar from database
    const savedAvatar = localStorage.getItem("tr_chat_avatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    } else if (characterDatabase.length > 0) {
      setSelectedAvatar(characterDatabase[0].icon);
      localStorage.setItem("tr_chat_avatar", characterDatabase[0].icon);
    }

    const savedGameTag = localStorage.getItem("tr_chat_gametag");
    if (savedGameTag) {
      setGameTag(savedGameTag);
    }
  }, []);

  // 4. Handle Client Creation
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
      console.error("Supabase init error:", err);
      setConnectionStatus("ERROR");
    }
  }, [supabaseUrl, supabaseAnonKey]);

  const fetchMessages = async () => {
    if (!supabaseClient) return;
    setLoadingMessages(true);
    setErrorText("");
    try {
      const { data, error } = await supabaseClient
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Fetch messages error details:", err?.message || err, err);
      setErrorText(
        `Could not fetch messages: ${err?.message || "Verify your connection settings."} (Hint: Make sure the 'messages' table exists in your Supabase dashboard).`
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  // 5. Fetch Messages & Setup Real-time listener
  useEffect(() => {
    if (!supabaseClient) return;

    fetchMessages();

    let channel = null;

    // Subscribe to new inserts
    try {
      channel = supabaseClient
        .channel("public:messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            setMessages((prev) => {
              // Ensure we don't insert duplicate IDs if any racing conditions occur
              if (prev.some((m) => m.id === payload.new.id)) return prev;
              const nextList = [...prev, payload.new];
              // Cap at 100 messages in client state
              return nextList.slice(-100);
            });
          }
        )
        .subscribe((status) => {
          console.log("Realtime subscription status:", status);
        });
    } catch (err) {
      console.warn("Realtime subscription error:", err);
    }

    return () => {
      if (channel) {
        supabaseClient.removeChannel(channel);
      }
    };
  }, [supabaseClient]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save changes to local configuration
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

  const handleUpdateUser = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("tr_chat_username", newUsername);
  };

  const handleUpdateAvatar = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    localStorage.setItem("tr_chat_avatar", avatarUrl);
  };

  const handleUpdateGameTag = (tag) => {
    setGameTag(tag);
    localStorage.setItem("tr_chat_gametag", tag);
  };

  // Send Message function
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!supabaseClient) {
      setShowConfig(true);
      return;
    }

    const trimmedMsg = messageText.trim();
    if (!trimmedMsg) return;

    try {
      const { data, error } = await supabaseClient
        .from("messages")
        .insert([
          {
            username: username || "Anonymous",
            message: trimmedMsg,
            avatar: selectedAvatar,
            game_tag: gameTag,
          },
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data[0].id)) return prev;
          return [...prev, data[0]];
        });
      }

      setMessageText("");
    } catch (err) {
      console.error("Error sending message details:", err?.message || err, err);
      setErrorText(`Failed to send message: ${err?.message || "Verify your database write policies."}`);
    }
  };

  const insertQuickPhrase = (phrase) => {
    setMessageText((prev) => prev + phrase);
  };

  // Format timestamp helper
  const formatTime = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="chat-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--spacing-lg)", marginTop: "var(--spacing-lg)" }}>
      {/* Main Grid: User Profile Left, Message Box Right */}
      <div className="chat-grid-container">
        
        {/* User Configuration Panel */}
        <div className="card-dark" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--spacing-md)" }}>
          <div style={{ borderBottom: "1px solid var(--hairline-strong)", paddingBottom: "var(--spacing-sm)" }}>
            <h3 className="heading-sm" style={{ color: "white" }}>YOUR IDENTITY</h3>
            <p className="caption-sm" style={{ color: "var(--on-dark-mute)" }}>Choose your nickname and favorite avatar.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--spacing-md)" }}>
            {/* Nickname Input */}
            <div>
              <label className="caption-xs" style={{ display: "block", color: "var(--on-dark)", marginBottom: "4px" }}>NICKNAME</label>
              <input
                type="text"
                maxLength={20}
                className="device-select"
                style={{ width: "100%", padding: "8px 12px", background: "#222", border: "1px solid var(--hairline-strong)", color: "white" }}
                value={username}
                onChange={(e) => handleUpdateUser(e.target.value)}
                placeholder="Your Nickname"
              />
            </div>

            {/* Game Badge Selector */}
            <div>
              <label className="caption-xs" style={{ display: "block", color: "var(--on-dark)", marginBottom: "4px" }}>PLAYER TAG</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: gameTag === "Genshin" ? "#2AA6D6" : "rgba(255,255,255,0.05)",
                    color: "white",
                    border: "1px solid var(--hairline-strong)",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}
                  onClick={() => handleUpdateGameTag("Genshin")}
                >
                  GENSHIN IMPACT
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: gameTag === "WuWa" ? "#B23BE0" : "rgba(255,255,255,0.05)",
                    color: "white",
                    border: "1px solid var(--hairline-strong)",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}
                  onClick={() => handleUpdateGameTag("WuWa")}
                >
                  WUTHERING WAVES
                </button>
              </div>
            </div>

            {/* Avatar picker */}
            <div>
              <label className="caption-xs" style={{ display: "block", color: "var(--on-dark)", marginBottom: "4px" }}>AVATAR CHARACTER</label>
              <select
                className="device-select"
                style={{ width: "100%", padding: "8px", background: "#222", border: "1px solid var(--hairline-strong)", color: "white" }}
                value={selectedAvatar}
                onChange={(e) => handleUpdateAvatar(e.target.value)}
              >
                {characterDatabase.map((char) => (
                  <option key={char.id} value={char.icon}>
                    {char.name} ({char.game === "Genshin Impact" ? "GI" : "WuWa"})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.05)", padding: "8px", border: "1px dashed var(--hairline-strong)" }}>
            {selectedAvatar && (
              <img 
                src={toWebP(selectedAvatar)} 
                alt="Selected Avatar" 
                style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#333", objectFit: "contain" }}
                onError={(e) => { e.target.src = "https://genshin.jmp.blue/characters/traveler-anemo/icon"; }}
              />
            )}
            <div>
              <div className="body-strong" style={{ color: "var(--primary)" }}>{username || "Anonymous"}</div>
              <div className="caption-xs" style={{ color: "var(--on-dark-mute)" }}>
                Tag: <span style={{ color: gameTag === "Genshin" ? "#7CE0FF" : "#F58BFF" }}>{gameTag.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Message Window */}
        <div 
          className="card-dark" 
          style={{ 
            minHeight: "450px", 
            maxHeight: "650px", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between",
            background: "#080808",
            border: "1px solid var(--hairline-strong)"
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--hairline-strong)", paddingBottom: "var(--spacing-sm)" }}>
            <h3 className="heading-sm" style={{ color: "white" }}>GLOBAL REEF CHAT</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button 
                type="button" 
                onClick={fetchMessages} 
                className="btn btn-outline-on-dark" 
                style={{ padding: "2px 8px", fontSize: "11px", cursor: "pointer", border: "1px solid var(--hairline-strong)" }}
              >
                🔄 REFRESH
              </button>
              <span className="caption-xs" style={{ color: "var(--primary)" }}>REAL-TIME PUBLIC FEED</span>
            </div>
          </div>

          {/* Error display */}
          {errorText && (
            <div style={{ background: "#d32f2f", color: "white", padding: "8px 12px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{errorText}</span>
              <button style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }} onClick={() => setErrorText("")}>✕</button>
            </div>
          )}

          {/* Messages List Area */}
          <div 
            style={{ 
              flex: 1, 
              overflowY: "auto", 
              padding: "var(--spacing-md) 0", 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px",
              scrollbarWidth: "thin"
            }}
          >
            {connectionStatus !== "CONNECTED" && messages.length === 0 ? (
              <div style={{ margin: "auto", textAlign: "center", padding: "var(--spacing-xl)", maxWidth: "400px" }}>
                <div className="caption-xs" style={{ color: "var(--primary)", fontSize: "16px", marginBottom: "8px" }}>📶 Connection Required</div>
                <p className="body-sm" style={{ color: "var(--on-dark-mute)" }}>
                  Please click the <strong>Configure Supabase</strong> button above to connect your database and start chat synchronization.
                </p>
              </div>
            ) : loadingMessages ? (
              <div style={{ margin: "auto", textAlign: "center", color: "var(--on-dark-mute)" }}>
                <div className="shimmer-effect" style={{ width: "80px", height: "16px", margin: "0 auto 8px" }} />
                <p className="caption-xs">Retrieving portal messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div style={{ margin: "auto", textAlign: "center", color: "var(--on-dark-mute)" }}>
                <p className="body-sm">No messages yet. Be the first to start the resonance!</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isSelf = msg.username === username;
                return (
                  <div
                    key={msg.id ?? msg.created_at ?? idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      padding: "8px 12px",
                      background: isSelf ? "rgba(76, 201, 240, 0.08)" : "transparent",
                      borderLeft: isSelf ? "3px solid var(--primary)" : "none"
                    }}
                  >
                    {msg.avatar ? (
                      <img 
                        src={toWebP(msg.avatar)} 
                        alt="Avatar" 
                        style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#222", objectFit: "contain", border: "1px solid var(--hairline-strong)" }}
                        onError={(e) => { e.target.src = "https://genshin.jmp.blue/characters/traveler-anemo/icon"; }}
                      />
                    ) : (
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#444", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: "bold" }}>
                        {msg.username ? msg.username[0].toUpperCase() : "?"}
                      </div>
                    )}
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span className="body-strong" style={{ color: "white", fontSize: "14px" }}>{msg.username}</span>
                        {msg.game_tag && (
                          <span 
                            className="caption-xs" 
                            style={{ 
                              fontSize: "9px", 
                              padding: "1px 4px", 
                              background: msg.game_tag === "Genshin" ? "#2AA6D6" : "#B23BE0",
                              color: "white",
                              borderRadius: "2px"
                            }}
                          >
                            {msg.game_tag}
                          </span>
                        )}
                        <span className="caption-sm" style={{ color: "var(--mute)", marginLeft: "auto", fontSize: "11px" }}>
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                      <p className="body-sm" style={{ color: "#e0e0e0", marginTop: "4px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chat Buttons Bar */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", padding: "6px 0", borderTop: "1px solid var(--hairline-strong)", scrollbarWidth: "none" }}>
            {quickPhrases.map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-outline-on-dark"
                style={{ 
                  whiteSpace: "nowrap", 
                  padding: "4px 8px", 
                  fontSize: "11px", 
                  borderRadius: "2px",
                  border: "1px solid #333",
                  color: "var(--ash)"
                }}
                onClick={() => insertQuickPhrase(phrase)}
              >
                {phrase}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "10px", borderTop: "1px solid var(--hairline-strong)", paddingTop: "var(--spacing-md)" }}>
            <input
              type="text"
              maxLength={300}
              className="device-select"
              style={{ flex: 1, minWidth: 0, padding: "12px", background: "#111", border: "1px solid var(--hairline-strong)", color: "white" }}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={connectionStatus === "CONNECTED" ? "Type a message... (Press Enter to send)" : "Please configure Supabase connection first..."}
              disabled={connectionStatus !== "CONNECTED"}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: "0 24px", minWidth: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}
              disabled={connectionStatus !== "CONNECTED" || !messageText.trim()}
            >
              SEND
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
