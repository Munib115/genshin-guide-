import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sitara Goonj — Genshin Impact & Wuthering Waves Guides Pakistan";

// Branded social share card (Open Graph / Twitter), generated at build time so
// there are no fragile external hotlinked images.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0E1A",
          backgroundImage:
            "radial-gradient(600px 400px at 12% 8%, rgba(76,201,240,0.28), transparent), radial-gradient(600px 400px at 88% 12%, rgba(228,92,255,0.24), transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
          <div
            style={{
              display: "flex",
              width: 88,
              height: 88,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4CC9F0, #E45CFF)",
            }}
          >
            <div style={{ display: "flex", fontSize: 46, fontWeight: 800, color: "#0A0E1A" }}>SG</div>
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700, color: "#93A0B8", letterSpacing: 3 }}>
            SITARA GOONJ · PK
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#FFFFFF", marginTop: 34, lineHeight: 1.05 }}>
          Genshin &amp; Wuthering Waves
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 4, lineHeight: 1.05 }}>
          <span style={{ color: "#4CC9F0" }}>Guides</span>
          <span style={{ color: "#FFFFFF" }}>&nbsp;for&nbsp;</span>
          <span style={{ color: "#E45CFF" }}>Pakistan</span>
        </div>

        <div style={{ display: "flex", fontSize: 32, color: "#93A0B8", marginTop: 40 }}>
          F2P builds · Team comps · ISP ping guides · Low-spec optimization
        </div>
      </div>
    ),
    { ...size }
  );
}
