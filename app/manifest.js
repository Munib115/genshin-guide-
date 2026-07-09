import { SITE_NAME, SITE_SHORT_NAME, SITE_DESCRIPTION } from "./site-config";

// PWA manifest — makes the site installable ("Add to Home Screen") which
// reinforces the native-app experience on mobile.
export default function manifest() {
  return {
    name: `${SITE_NAME} — Genshin & Wuthering Waves Guides PK`,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0E1A",
    theme_color: "#0A0E1A",
    lang: "en-PK",
    categories: ["games", "entertainment", "education"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
