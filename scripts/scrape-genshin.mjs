/**
 * scrape-genshin.mjs — builds app/data/genshin-roster.js from the Genshin Impact
 * Fandom wiki (https://genshin-impact.fandom.com), which stores its data behind a
 * standard MediaWiki API (the normal page HTML is Cloudflare-challenged, but
 * api.php is not).
 *
 * Data pulled:
 *   • Character/List  -> full roster (name, rarity, element, weapon, region,
 *                        body/gender, release date, version, icon URL)
 *   • per-character   -> {{Character Infobox}} wikitext (title, birthday,
 *                        constellation, affiliation) + intro paragraph (description/lore)
 *
 * Wiki text is CC-BY-SA 3.0; attribution is rendered in the site footer.
 *
 * Re-run any time new characters release:   node scripts/scrape-genshin.mjs
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://genshin-impact.fandom.com/api.php";
const UA = "GachaUstaadRosterBot/1.0 (fan site; contact via site) node-fetch";
const CONCURRENCY = 8;
const ICON_SIZE = 256;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, "..", "app", "data", "genshin-roster.js");

// ---------------------------------------------------------------- fetch helpers
async function fetchJSON(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === tries) throw err;
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
}

// Run async mapper over items with a fixed concurrency pool.
async function pool(items, size, mapper) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await mapper(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, worker));
  return results;
}

// ------------------------------------------------------------ wikitext cleaning
function wikitextToPlain(s) {
  if (!s) return "";
  let t = s;
  t = t.replace(/<!--[\s\S]*?-->/g, "");
  t = t.replace(/<ref[^>]*\/>/gi, "");
  t = t.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, "");
  t = t.replace(/<br\s*\/?>/gi, " ");
  t = t.replace(/<[^>]+>/g, "");
  // Collapse templates repeatedly to handle light nesting.
  for (let k = 0; k < 6; k++) {
    const before = t;
    t = t.replace(/\{\{([^{}]*)\}\}/g, (_m, inner) => {
      const parts = inner.split("|").map((x) => x.trim());
      if (parts.length === 1) return parts[0]; // {{Geo}} -> Geo
      const positional = parts.slice(1).filter((p) => p && !/^[\w ]+=/.test(p));
      return positional.length ? positional[positional.length - 1] : parts[0];
    });
    if (t === before) break;
  }
  t = t.replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1"); // [[a|b]] -> b
  t = t.replace(/\[\[([^\]]*)\]\]/g, "$1"); // [[a]] -> a
  t = t.replace(/\[https?:\/\/\S+\s+([^\]]+)\]/g, "$1"); // [url text] -> text
  t = t.replace(/\[https?:\/\/\S+\]/g, "");
  t = t.replace(/'''''/g, "").replace(/'''/g, "").replace(/''/g, "");
  t = t.replace(/[{}]/g, "");
  t = decodeHTML(t); // turn &mdash;, &#39;, &nbsp; etc. into real characters
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

// Extract a balanced {{...}} template block starting at `marker`.
function balancedTemplate(wt, marker) {
  const idx = wt.indexOf(marker);
  if (idx < 0) return "";
  let depth = 0;
  for (let i = idx; i < wt.length - 1; i++) {
    if (wt[i] === "{" && wt[i + 1] === "{") { depth++; i++; continue; }
    if (wt[i] === "}" && wt[i + 1] === "}") { depth--; i++; if (depth === 0) return wt.slice(idx, i + 1); }
  }
  return wt.slice(idx);
}

function ibField(ib, key) {
  const m = ib.match(new RegExp("\\n\\|\\s*" + key + "\\s*=\\s*([^\\n]*)"));
  return m ? wikitextToPlain(m[1]).trim() : "";
}

function parseIntro(wt) {
  // Drop the infobox and lead so the remaining paragraphs are the prose bio.
  // NOTE: we can't anchor on a line starting with "'''" — many leads wrap the
  // bolded name in a template, e.g. {{Lang|'''Zhongli'''|zh=...}} is a playable…
  let body = wt;
  const ib = balancedTemplate(wt, "{{Character Infobox");
  if (ib) body = body.replace(ib, "");
  const paras = body.split(/\n\s*\n/).map((p) => wikitextToPlain(p)).filter(Boolean);

  // The lead is the first paragraph that reads like the opening bio sentence.
  let leadIdx = paras.findIndex(
    (p) => /\bis an?\b/i.test(p) && /\b(playable|non-playable|character|Genshin Impact)\b/i.test(p)
  );
  if (leadIdx < 0) leadIdx = 0;

  const lead = paras[leadIdx] || "";
  const description = (paras[leadIdx + 1] || lead).slice(0, 400);
  const loreParas = paras
    .slice(leadIdx + 1)
    .filter((p) => !/^(After reaching|Upon reaching|When |During )/i.test(p))
    .slice(0, 2);
  const history = (loreParas.join("\n\n") || description).slice(0, 900);
  return { description, history };
}

// --------------------------------------------------------- generic build blocks
// The wiki list/infobox has no build recommendations, so fill archetype-based
// guidance (clearly generic) for characters we haven't hand-authored, matching
// the shape the cards/modal expect. Hand-authored characters override these.
function genericBuild(weapon) {
  const w = weapon || "Sword";
  const bis = {
    Catalyst: "Lost Prayer to the Sacred Winds",
    Claymore: "Wolf's Gravestone",
    Bow: "Aqua Simulacra",
    Polearm: "Staff of Homa",
    Sword: "Mistsplitter Reforged",
  };
  const f2p = {
    Catalyst: "Mappa Mare (F2P)",
    Claymore: "Prototype Archaic (F2P)",
    Bow: "Hamayumi / Favonius Warbow (F2P)",
    Polearm: "Prototype Starglitter (F2P)",
    Sword: "Favonius Sword (F2P)",
  };
  return {
    role: "DPS / Support",
    bestWeapon: {
      name: bis[w] || bis.Sword,
      rarity: 5,
      details: `A strong general-purpose ${w.toLowerCase()} for this archetype. Check the character's kit in-game for the exact best-in-slot.`,
    },
    f2pWeapon: {
      name: f2p[w] || f2p.Sword,
      rarity: 4,
      details: "Craftable / standard-banner option that covers the core stats for free-to-play players.",
    },
    bestArtifacts: {
      set: "Archetype pick: Emblem of Severed Fate / Gladiator's Finale",
      mainStats: "Sands: ATK% or ER% | Goblet: Elemental DMG% | Circlet: Crit Rate / Crit DMG",
      subStats: "Crit Rate > Crit DMG > Energy Recharge > ATK%",
    },
    bestEchoes: null,
    teamComps: [{ name: "General Synergy", members: ["Bennett", "Xingqiu", "Kazuha"] }],
    pakistaniTips:
      "General guidance (auto-generated). Play on the Asia Server for the lowest latency in Pakistan (~90–135ms on StormFiber/PTCL). Level to 80+ and prioritise your elemental skill/burst talents.",
  };
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function genderFromBody(body) {
  if (/female/i.test(body)) return "Female";
  if (/male/i.test(body)) return "Male";
  return "Unknown";
}

// ------------------------------------------------------------------ list parsing
// Returns { playable, upcoming }. The desktop + mobile tables each list every
// character, so we keep the most-complete row per name (avoids a partial row
// poisoning the dedup), then split by whether combat data is finalized.
function parseList(html) {
  const rows = html.match(/<tr>[\s\S]*?<\/tr>/g) || [];
  const byName = new Map();

  for (const row of rows) {
    if (!/data-name=/.test(row)) continue;
    const cells = row.match(/<td\b[\s\S]*?<\/td>/g) || [];
    if (cells.length < 6) continue;

    const nameM = cells[1].match(/data-name="([^"]+)"/);
    if (!nameM) continue;
    const name = decodeHTML(nameM[1]).trim();

    const icon = (cells[0].match(/data-src="([^"]+)"/) || [])[1] || "";
    const rarity = Number((cells[2].match(/title="(\d) Stars?"/) || [])[1] || 0);
    let element = decodeHTML((cells[3].match(/title="([^"]+)"/) || [])[1] || "");
    const weapon = decodeHTML((cells[4].match(/title="([^"]+)"/) || [])[1] || "");
    const region = decodeHTML((cells[5].match(/title="([^"]+)"/) || [])[1] || "");
    const bodyCat = (cells[6] && cells[6].match(/Category:([^"]+?) Characters?/)) || [];
    const body = bodyCat[1] || (cells[6] ? stripTags(cells[6]) : "");
    const release = cells[7] ? (cells[7].match(/data-release="([^" ]+)/) || [, ""])[1] : "";
    const version = cells[8] ? (cells[8].match(/data-version="([^"]+)"/) || [, ""])[1] : "";

    if (element === "None") element = "";

    const rec = {
      name, rarity, element, weapon, region, body, release, version,
      icon: icon.replace(/\/scale-to-width-down\/\d+/, `/scale-to-width-down/${ICON_SIZE}`),
    };
    const score = (r) => (r.element ? 1 : 0) + (r.weapon ? 1 : 0) + (r.rarity ? 1 : 0) + (r.icon ? 1 : 0);
    const prev = byName.get(name);
    if (!prev || score(rec) > score(prev)) byName.set(name, rec);
  }

  const playable = [];
  const upcoming = [];
  for (const rec of byName.values()) {
    // The Traveler has no single element (all seven) — default to Anemo so it renders.
    if (rec.name === "Traveler" && !rec.element) rec.element = "Anemo";
    if (rec.element && rec.weapon && rec.rarity) playable.push(rec);
    else upcoming.push(rec); // unreleased / NPC — no finalized combat data
  }
  return { playable, upcoming };
}

function stripTags(s) {
  return decodeHTML(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}
const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", hellip: "…", rsquo: "'", lsquo: "'",
  ldquo: "“", rdquo: "”", times: "×", deg: "°", middot: "·",
  eacute: "é", uuml: "ü", ouml: "ö", auml: "ä",
};
function decodeHTML(s) {
  if (!s) return s;
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (name in NAMED_ENTITIES ? NAMED_ENTITIES[name] : m))
    // run &amp; last so an already-decoded "&" from an entity above isn't touched twice
    .replace(/&amp;/g, "&");
}

// ------------------------------------------------------- per-character enrichment
async function enrichCharacter(c, { upcoming = false } = {}) {
  let title = "", birthday = "", constellation = "", affiliation = "";
  let description = "", history = "";
  try {
    const url = `${API}?action=parse&page=${encodeURIComponent(c.name)}&prop=wikitext&section=0&format=json`;
    const j = await fetchJSON(url);
    const wt = j.parse.wikitext["*"];
    const ib = balancedTemplate(wt, "{{Character Infobox");
    title = ibField(ib, "title");
    birthday = ibField(ib, "birthday");
    constellation = ibField(ib, "constellation");
    affiliation = ibField(ib, "affiliation");
    const aff2 = ibField(ib, "affiliation2");
    if (aff2 && !/unrevealed|unknown/i.test(aff2)) affiliation = affiliation ? `${affiliation}, ${aff2}` : aff2;
    ({ description, history } = parseIntro(wt));
  } catch (err) {
    console.warn(`  ! ${c.name}: infobox fetch failed (${err.message}) — using list data only`);
  }

  const element = c.element || "None";
  const weapon = c.weapon || "TBA";
  const rarity = c.rarity || 5;

  if (!description) {
    description = upcoming
      ? `${c.name} is an upcoming character${c.region ? ` from ${c.region}` : ""}. Full details will be added when they release.`
      : `${c.name} is a ${rarity}-star ${element} character from ${c.region || "Teyvat"} who wields a ${weapon}.`;
  }

  const base = {
    id: slugify(c.name),
    name: c.name,
    title: title || (upcoming ? "Upcoming Character" : `${element} ${weapon} user`),
    gender: genderFromBody(c.body),
    nation: c.region || "Unknown",
    affiliation: affiliation || "Unknown",
    birthday: birthday || "Unknown",
    constellation: constellation || "Unknown",
    history,
    game: "Genshin Impact",
    rarity,
    element,
    weapon,
    role: upcoming ? "Upcoming" : "DPS / Support",
    description,
    icon: c.icon,
    splash: null,
    releaseDate: c.release,
    version: c.version,
    source: "genshin-impact.fandom.com",
  };

  if (upcoming) {
    return {
      ...base,
      upcoming: true,
      bestWeapon: null,
      f2pWeapon: null,
      bestArtifacts: null,
      bestEchoes: null,
      teamComps: [],
      pakistaniTips:
        "This character hasn't released yet — a full F2P build, weapons, artifacts and team guide will be added on launch.",
    };
  }

  const build = genericBuild(weapon);
  build.teamComps = [{ name: "General Synergy", members: [c.name, "Bennett", "Xingqiu", "Kazuha"] }];
  return {
    ...base,
    bestWeapon: build.bestWeapon,
    f2pWeapon: build.f2pWeapon,
    bestArtifacts: build.bestArtifacts,
    bestEchoes: build.bestEchoes,
    teamComps: build.teamComps,
    pakistaniTips: build.pakistaniTips,
  };
}

// ------------------------------------------------------------------------- main
async function main() {
  console.log("Fetching Character/List …");
  const listJson = await fetchJSON(
    `${API}?action=parse&page=Character/List&prop=text&format=json`
  );
  const { playable, upcoming } = parseList(listJson.parse.text["*"]);
  console.log(`Parsed ${playable.length} playable + ${upcoming.length} upcoming characters.`);
  if (playable.length < 80) throw new Error("Roster looks too small — the list layout may have changed.");

  const total = playable.length + upcoming.length;
  console.log(`Fetching per-character infoboxes (concurrency ${CONCURRENCY}) …`);
  let done = 0;
  const tick = () => {
    done++;
    if (done % 20 === 0) console.log(`  … ${done}/${total}`);
  };

  const enriched = await pool(playable, CONCURRENCY, async (c) => {
    const r = await enrichCharacter(c, { upcoming: false });
    tick();
    return r;
  });
  const enrichedUpcoming = await pool(upcoming, CONCURRENCY, async (c) => {
    const r = await enrichCharacter(c, { upcoming: true });
    tick();
    return r;
  });

  enriched.sort((a, b) => a.name.localeCompare(b.name));
  enrichedUpcoming.sort((a, b) => a.name.localeCompare(b.name));

  const header = `// AUTO-GENERATED by scripts/scrape-genshin.mjs — do not edit by hand.
// Source: Genshin Impact Wiki (https://genshin-impact.fandom.com), text under CC-BY-SA 3.0.
// Re-generate with:  node scripts/scrape-genshin.mjs
// Playable: ${enriched.length} · Upcoming: ${enrichedUpcoming.length}
`;
  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(
    OUT_FILE,
    `${header}\nexport const genshinRoster = ${JSON.stringify(enriched, null, 2)};\n\n` +
      `export const genshinUpcoming = ${JSON.stringify(enrichedUpcoming, null, 2)};\n`,
    "utf8"
  );
  console.log(`\nWrote ${enriched.length} playable + ${enrichedUpcoming.length} upcoming -> app/data/genshin-roster.js`);
}

main().catch((err) => {
  console.error("SCRAPE FAILED:", err);
  process.exit(1);
});
