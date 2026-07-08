"use client";

import React from "react";

export default function CharacterCard({ character, onSelect, isFavorite, onToggleFavorite }) {
  const { name, game, rarity, element, weapon, role, description, icon, splash } = character;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Avoid triggering card selection
    onToggleFavorite(character.id);
  };

  // Convert element name to lower-case for class mapping
  const elementClass = element ? `element-${element.toLowerCase()}` : "";

  return (
    <div 
      className="character-card animate-in" 
      onClick={() => onSelect(character)}
      style={{ animationDelay: "50ms" }} // subtle delay cascade can be set in CSS or inline
    >
      {/* Signature NVIDIA 12x12px Green Corner Square */}
      <div className="corner-square" />

      {/* Rarity & Game Badge Header */}
      <div className="card-header-meta">
        <span className={`badge-tag rarity-${rarity}`}>
          {rarity}-STAR
        </span>
        <span className="game-label">{game}</span>
      </div>

      {/* Square aspect ratio image wrapper (Fix for cropped faces) */}
      <div className="card-image-wrapper">
        <img 
          src={splash || icon || "https://placehold.co/200x200/1a1a1a/76b900?text=Avatar"} 
          alt={name} 
          className="card-image"
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

      {/* Card Info */}
      <div className="card-title-group">
        <h3 className="card-title">{name}</h3>
        <div className="card-subtitle">
          <span className={`element-dot ${elementClass}`} />
          {element} • {weapon}
        </div>
      </div>

      <p className="card-description">
        {description && description.length > 95 
          ? description.substring(0, 92) + "..." 
          : description}
      </p>

      {/* Card Footer */}
      <div className="card-footer">
        <span className="btn-ghost-link" style={{ fontSize: "13.5px" }}>
          View Guide <span>→</span>
        </span>
        
        {/* Save/Favorite toggle button */}
        <button 
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Remove from saved builds" : "Save to my builds"}
          aria-label={isFavorite ? `Remove ${name} from saved builds` : `Save ${name} to my builds`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "var(--primary)" : "none"} 
            stroke={isFavorite ? "var(--primary)" : "currentColor"} 
            strokeWidth="2" 
            width="20" 
            height="20"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
