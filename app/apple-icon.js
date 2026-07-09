import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS "Add to Home Screen" icon — dark aurora tile with the Ustaad's-cap mark
// (graduation mortarboard + gacha "wish" spark tassel), matching app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16203a 0%, #0A0E1A 100%)",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gu-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4CC9F0" />
              <stop offset="0.5" stopColor="#8B7CFF" />
              <stop offset="1" stopColor="#E45CFF" />
            </linearGradient>
          </defs>
          {/* Cap band */}
          <path d="M18 29 L18 40 Q18 47 32 47 Q46 47 46 40 L46 29 Z" fill="#2C2557" />
          {/* Mortarboard */}
          <path d="M32 13 L58 25 L32 37 L6 25 Z" fill="url(#gu-grad)" />
          <path d="M32 13 L58 25 L32 27 L6 25 Z" fill="#ffffff" fillOpacity="0.14" />
          {/* Button */}
          <circle cx="32" cy="25" r="2.6" fill="#0A0E1A" />
          <circle cx="32" cy="25" r="1.2" fill="#7CE0FF" />
          {/* Tassel cord + spark */}
          <path d="M32 25 L54 26 L52 40" fill="none" stroke="#7CE0FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 38 C52.8 42 53.8 43.2 57 44 C53.8 44.8 52.8 46 52 49.5 C51.2 46 50.2 44.8 47 44 C50.2 43.2 51.2 42 52 38 Z" fill="url(#gu-grad)" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
