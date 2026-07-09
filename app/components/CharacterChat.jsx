"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { fullRoster } from "../data/roster";
import { toWebP } from "../utils/image";

const FALLBACK_ICON = "https://genshin.jmp.blue/characters/traveler-anemo/icon";

// Roster the bots can roleplay as — the full merged roster (hand-authored premium
// characters + the wiki-scraped Genshin roster), all of which carry the persona
// data (title, region, birthday, background) the AI needs.
const ROSTER = fullRoster.filter((c) => c.name && c.icon);

const STARTERS = [
  "Introduce yourself!",
  "How should I build you?",
  "What's the best team for you?",
  "Tell me about your home region.",
  "Koi tip do gaming ke liye?",
];

export default function CharacterChat() {
  const [gameFilter, setGameFilter] = useState("all"); // all | genshin | wuwa
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(ROSTER[0]?.id || "");
  const [conversations, setConversations] = useState({}); // { [charId]: [{role, content}] }
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | streaming
  const [error, setError] = useState("");

  const abortRef = useRef(null);
  const messagesEndRef = useRef(null);

  const selectedChar = useMemo(
    () => ROSTER.find((c) => c.id === selectedId) || null,
    [selectedId]
  );
  const activeMessages = conversations[selectedId] || [];

  // Load any saved conversations once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tr_ai_conversations");
      if (raw) setConversations(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  // Persist conversations, but not on every streamed token (only when idle).
  useEffect(() => {
    if (status === "streaming") return;
    try {
      localStorage.setItem("tr_ai_conversations", JSON.stringify(conversations));
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [conversations, status]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  // Abort any in-flight stream when leaving / switching characters.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const filteredRoster = ROSTER.filter((c) => {
    if (gameFilter === "genshin" && c.game !== "Genshin Impact") return false;
    if (gameFilter === "wuwa" && c.game !== "Wuthering Waves") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        (c.element || "").toLowerCase().includes(q) ||
        (c.nation || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelect = (id) => {
    if (id === selectedId) return;
    abortRef.current?.abort();
    setStatus("idle");
    setError("");
    setSelectedId(id);
  };

  const handleClear = () => {
    abortRef.current?.abort();
    setStatus("idle");
    setError("");
    setConversations((prev) => ({ ...prev, [selectedId]: [] }));
  };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || status === "streaming" || !selectedChar) return;

    setError("");
    setInput("");

    // Optimistically add the user turn + an empty assistant turn to stream into.
    const history = [...(conversations[selectedId] || []), { role: "user", content: trimmed }];
    setConversations((prev) => ({
      ...prev,
      [selectedId]: [...history, { role: "assistant", content: "" }],
    }));
    setStatus("streaming");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId: selectedId, messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${res.status}).`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setConversations((prev) => {
          const list = prev[selectedId] ? [...prev[selectedId]] : [];
          if (list.length > 0) {
            list[list.length - 1] = { role: "assistant", content: acc };
          }
          return { ...prev, [selectedId]: list };
        });
      }

      // Empty completion (e.g. content filter) — surface something instead of a blank bubble.
      if (!acc.trim()) {
        setConversations((prev) => {
          const list = prev[selectedId] ? [...prev[selectedId]] : [];
          if (list.length > 0) {
            list[list.length - 1] = {
              role: "assistant",
              content: "…(no response — try rephrasing that)",
            };
          }
          return { ...prev, [selectedId]: list };
        });
      }
    } catch (err) {
      if (err?.name === "AbortError") {
        // User switched/cleared/stopped — drop the trailing empty assistant bubble.
        setConversations((prev) => {
          const list = prev[selectedId] ? [...prev[selectedId]] : [];
          if (list.length && list[list.length - 1].role === "assistant" && !list[list.length - 1].content) {
            list.pop();
          }
          return { ...prev, [selectedId]: list };
        });
      } else {
        setError(err?.message || "Something went wrong talking to the character.");
        // Remove the empty assistant placeholder so the error isn't attached to a blank bubble.
        setConversations((prev) => {
          const list = prev[selectedId] ? [...prev[selectedId]] : [];
          if (list.length && list[list.length - 1].role === "assistant" && !list[list.length - 1].content) {
            list.pop();
          }
          return { ...prev, [selectedId]: list };
        });
      }
    } finally {
      setStatus("idle");
      abortRef.current = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleStop = () => abortRef.current?.abort();

  const gameBadge = (game) => (game === "Genshin Impact" ? "GI" : "WuWa");
  const gameColor = (game) => (game === "Genshin Impact" ? "#2AA6D6" : "#B23BE0");

  return (
    <div className="aichat-layout">
      {/* ── Character picker ── */}
      <aside className="aichat-picker card-dark" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <div style={{ borderBottom: "1px solid var(--hairline-strong)", paddingBottom: "var(--spacing-sm)" }}>
          <h3 className="heading-sm" style={{ color: "white" }}>CHOOSE A CHARACTER</h3>
          <p className="caption-sm" style={{ color: "var(--on-dark-mute)" }}>Chat live with any hero — they reply in character.</p>
        </div>

        {/* Game filter */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[
            { key: "all", label: "ALL" },
            { key: "genshin", label: "GENSHIN" },
            { key: "wuwa", label: "WUWA" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setGameFilter(f.key)}
              className="btn btn-outline-on-dark"
              style={{
                flex: 1,
                padding: "6px 4px",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                border: "1px solid var(--hairline-strong)",
                background: gameFilter === f.key ? "var(--primary)" : "transparent",
                color: gameFilter === f.key ? "#0A0E1A" : "var(--ash)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          className="device-select"
          style={{ width: "100%", padding: "8px 12px", background: "#111", border: "1px solid var(--hairline-strong)", color: "white", fontSize: "13px" }}
          placeholder="Search name, element, region…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* List */}
        <div className="aichat-picker-list" style={{ display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto", scrollbarWidth: "thin" }}>
          {filteredRoster.length === 0 ? (
            <p className="caption-sm" style={{ color: "var(--on-dark-mute)", padding: "8px" }}>No characters match.</p>
          ) : (
            filteredRoster.map((c) => {
              const isActive = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelect(c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 8px",
                    cursor: "pointer",
                    textAlign: "left",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: isActive ? "var(--primary)" : "transparent",
                    background: isActive ? "rgba(76,201,240,0.12)" : "transparent",
                  }}
                >
                  <img
                    src={toWebP(c.icon)}
                    alt={c.name}
                    style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#222", objectFit: "contain", border: "1px solid var(--hairline-strong)", flexShrink: 0 }}
                    onError={(e) => { e.target.src = FALLBACK_ICON; }}
                  />
                  <span style={{ minWidth: 0 }}>
                    <span className="body-strong" style={{ display: "block", color: "white", fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {c.name}
                    </span>
                    <span className="caption-xs" style={{ color: "var(--on-dark-mute)" }}>
                      {c.element} · {gameBadge(c.game)}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ── Chat window ── */}
      <section
        className="card-dark"
        style={{ minHeight: "540px", maxHeight: "720px", display: "flex", flexDirection: "column", background: "#080808", border: "1px solid var(--hairline-strong)" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--hairline-strong)", paddingBottom: "var(--spacing-sm)" }}>
          {selectedChar && (
            <img
              src={toWebP(selectedChar.icon)}
              alt={selectedChar.name}
              style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#222", objectFit: "contain", border: `2px solid ${gameColor(selectedChar.game)}` }}
              onError={(e) => { e.target.src = FALLBACK_ICON; }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 className="heading-sm" style={{ color: "white", margin: 0 }}>{selectedChar?.name || "Select a character"}</h3>
            <p className="caption-xs" style={{ color: "var(--on-dark-mute)", margin: 0 }}>
              {selectedChar ? `${selectedChar.title || selectedChar.role} · ${selectedChar.game}` : "Pick someone from the list to start chatting"}
            </p>
          </div>
          {activeMessages.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-outline-on-dark"
              style={{ padding: "4px 10px", fontSize: "11px", cursor: "pointer", border: "1px solid var(--hairline-strong)" }}
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background: "#d32f2f", color: "white", padding: "8px 12px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
            <span>{error}</span>
            <button style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }} onClick={() => setError("")}>✕</button>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "var(--spacing-md) 4px", display: "flex", flexDirection: "column", gap: "12px", scrollbarWidth: "thin" }}>
          {activeMessages.length === 0 ? (
            <div style={{ margin: "auto", textAlign: "center", maxWidth: "420px" }}>
              <p className="body-sm" style={{ color: "var(--on-dark-mute)", marginBottom: "14px" }}>
                Say hello to <strong style={{ color: "var(--primary)" }}>{selectedChar?.name}</strong> — or try one of these:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                {STARTERS.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="btn btn-outline-on-dark"
                    style={{ padding: "6px 12px", fontSize: "12px", cursor: "pointer", border: "1px solid var(--hairline-strong)", color: "var(--ash)", borderRadius: "16px" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            activeMessages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div key={idx} style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", gap: "10px", alignItems: "flex-start" }}>
                  {!isUser && selectedChar && (
                    <img
                      src={toWebP(selectedChar.icon)}
                      alt={selectedChar.name}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#222", objectFit: "contain", border: "1px solid var(--hairline-strong)", flexShrink: 0 }}
                      onError={(e) => { e.target.src = FALLBACK_ICON; }}
                    />
                  )}
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "9px 13px",
                      borderRadius: isUser ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                      background: isUser ? "var(--primary)" : "rgba(255,255,255,0.06)",
                      color: isUser ? "#0A0E1A" : "#e8e8e8",
                      border: isUser ? "none" : "1px solid var(--hairline-strong)",
                    }}
                  >
                    <p className="body-sm" style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.5 }}>
                      {msg.content || (status === "streaming" && idx === activeMessages.length - 1 ? "▋" : "")}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", borderTop: "1px solid var(--hairline-strong)", paddingTop: "var(--spacing-md)" }}>
          <input
            type="text"
            maxLength={500}
            className="device-select"
            style={{ flex: 1, minWidth: 0, padding: "12px", background: "#111", border: "1px solid var(--hairline-strong)", color: "white" }}
            placeholder={selectedChar ? `Message ${selectedChar.name}…` : "Select a character first"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!selectedChar || status === "streaming"}
          />
          {status === "streaming" ? (
            <button type="button" onClick={handleStop} className="btn btn-outline-on-dark" style={{ padding: "0 20px", minWidth: "90px", border: "1px solid var(--hairline-strong)", cursor: "pointer" }}>
              STOP
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ padding: "0 24px", minWidth: "90px" }} disabled={!selectedChar || !input.trim()}>
              SEND
            </button>
          )}
        </form>

        <p className="caption-xs" style={{ color: "var(--mute)", textAlign: "center", marginTop: "6px" }}>
          AI roleplay for fun — responses are generated and not official. Unaffiliated with HoYoverse / Kuro Games.
        </p>
      </section>
    </div>
  );
}
