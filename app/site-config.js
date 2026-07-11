// ==========================================================================
// Central brand & SEO config — single source of truth.
// 👉 Change SITE_URL to your real production domain before going live.
// ==========================================================================

export const SITE_URL = "https://sitaragoonj.pk";

export const SITE_NAME = "Sitara Goonj";
export const SITE_SHORT_NAME = "Sitara Goonj";

// اردو: "Sitara Goonj" = Star Resonance / Cosmic Echo
export const SITE_TAGLINE = "Genshin Impact & Wuthering Waves Guides Pakistan";

export const SITE_DESCRIPTION =
  "Sitara Goonj (ستارہ گونج) — Pakistan's home for Genshin Impact & Wuthering Waves guides. Expert F2P character builds, best weapons, artifacts & echoes, team comps, local ISP ping guides (StormFiber, PTCL, Transworld, Nayatel) and low-spec device optimization for mobile & PC.";

export const SITE_KEYWORDS = [
  "Sitara Goonj",
  "sitaragoonj",
  "gacha guides Pakistan",
  "Genshin Impact guide Pakistan",
  "Wuthering Waves build Pakistan",
  "F2P Genshin characters",
  "best gacha server ping Pakistan",
  "Genshin Impact Urdu guide",
  "Wuthering Waves resonators guide",
  "low spec gacha settings Pakistan",
  "StormFiber PTCL ping Genshin",
];

// Shared brand mark (Star Resonance) as a raw SVG string — reused by the generated
// apple-icon and Open Graph image so the whole brand stays consistent.
export const BRAND_SPARKLE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
  "<defs><linearGradient id='g' x1='8' y1='8' x2='56' y2='56' gradientUnits='userSpaceOnUse'>" +
  "<stop offset='0' stop-color='#4CC9F0'/><stop offset='0.5' stop-color='#8B7CFF'/><stop offset='1' stop-color='#E45CFF'/>" +
  "</linearGradient></defs>" +
  "<path d='M20 22 A 14 14 0 0 0 20 42' stroke='url(#g)' stroke-width='4.5' stroke-linecap='round' fill='none'/>" +
  "<path d='M44 22 A 14 14 0 0 1 44 42' stroke='url(#g)' stroke-width='4.5' stroke-linecap='round' fill='none'/>" +
  "<path d='M12 14 A 25 25 0 0 0 12 50' stroke='url(#g)' stroke-width='3.2' stroke-linecap='round' fill='none' opacity='0.65'/>" +
  "<path d='M52 14 A 25 25 0 0 1 52 50' stroke='url(#g)' stroke-width='3.2' stroke-linecap='round' fill='none' opacity='0.65'/>" +
  "<path d='M32 16 L37 32 L32 48 L27 32 Z' fill='url(#g)'/>" +
  "<circle cx='32' cy='32' r='4' fill='#FFFFFF'/>" +
  "</svg>";
