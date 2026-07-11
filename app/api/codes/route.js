// Next.js App Router API Route for Sitara Goonj Gift Codes
// Fetches and parses codes dynamically via Fandom MediaWiki API with server-side in-memory caching.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory cache variables
let memoryCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

// Fandom MediaWiki API endpoints (bypasses Cloudflare block, handles redirects automatically)
const GENSHIN_URL = "https://genshin-impact.fandom.com/api.php?action=parse&page=Promotional_Codes&redirects=true&prop=text&format=json";
const WUWA_URL = "https://wutheringwaves.fandom.com/api.php?action=parse&page=Redemption_Code&redirects=true&prop=text&format=json";

// Static backup fallbacks in case wikis are down or layout changes
const GENSHIN_FALLBACK_ACTIVE = [
  { code: "EZSB8889C2BZ", server: "America, Europe, Asia, TW/HK/Macao", rewards: "Mora ×10,000, Adventurer's Experience ×10, Fine Enhancement Ore ×5", duration: "Discovered: July 1, 2026" },
  { code: "LEGEDILJKSGM", server: "America, Europe, Asia, TW/HK/Macao", rewards: "Primogem ×60, Adventurer's Experience ×5", duration: "Discovered: June 21, 2026" },
  { code: "PFY1S40I88T9", server: "America, Europe, Asia, TW/HK/Macao", rewards: "Primogem ×60, Adventurer's Experience ×5", duration: "Discovered: May 8, 2026" }
];

const WUWA_FALLBACK_ACTIVE = [
  { code: "WUTHERINGGIFT", server: "All", rewards: "50x Astrite, 2x Premium Resonance Potion, 2x Medium Revival Inhaler, 2x Medium Energy Bag, 10,000x Shell Credit", duration: "Discovered: September 26, 2024 Valid until: Unknown" }
];

function cleanText(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseGenshinTable(tableHtml) {
  const rows = tableHtml.match(/<tr>[\s\S]*?<\/tr>/gi) || [];
  const results = [];
  
  for (const row of rows) {
    if (row.includes("<th")) continue; // skip header
    const cells = row.match(/<td\b[\s\S]*?<\/td>/gi) || [];
    if (cells.length < 3) continue;
    
    const codeCell = cells[0];
    const serverCell = cells[1];
    const rewardsCell = cells[2];
    const durationCell = cells[3];
    
    // Extract code
    const codeMatch = codeCell.match(/<code>([^<]+)<\/code>/i) || codeCell.match(/code=([^"&>]+)/i);
    const code = codeMatch ? codeMatch[1].trim() : cleanText(codeCell);
    
    // Extract server
    const server = serverCell ? cleanText(serverCell) : "All";
    
    // Extract rewards
    let rewards = "";
    if (rewardsCell) {
      const itemMatches = rewardsCell.match(/<span class="item-text">([\s\S]*?)<\/span>/gi) || [];
      if (itemMatches.length > 0) {
        rewards = itemMatches.map(item => cleanText(item)).join(", ");
      } else {
        rewards = cleanText(rewardsCell);
      }
    }
    
    const duration = durationCell ? cleanText(durationCell) : "Unknown";
    
    results.push({ code, server, rewards, duration });
  }
  return results;
}

function parseWuWaTable(tableHtml) {
  const rows = tableHtml.match(/<tr>[\s\S]*?<\/tr>/gi) || [];
  const results = [];
  
  for (const row of rows) {
    if (row.includes("<th")) continue; // skip header
    const cells = row.match(/<td\b[\s\S]*?<\/td>/gi) || [];
    if (cells.length < 3) continue;
    
    let codeCell = cells[0];
    let serverCell = cells[1];
    let rewardsCell = cells[2];
    let durationCell = cells[3];
    
    // If the first cell has checkbox/progress tracking, shift cells
    if (codeCell.includes("checkbox") || codeCell.includes("table-progress-checkbox-cell")) {
      codeCell = cells[1];
      serverCell = cells[2];
      rewardsCell = cells[3];
      durationCell = cells[4];
    }
    
    if (!codeCell) continue;
    
    // Extract code
    const codeMatch = codeCell.match(/<code>([^<]+)<\/code>/i);
    const code = codeMatch ? codeMatch[1].trim() : cleanText(codeCell);
    
    // Extract server
    const server = serverCell ? cleanText(serverCell) : "All";
    
    // Extract rewards
    let rewards = "";
    if (rewardsCell) {
      const cardMatches = rewardsCell.match(/<div class="card-container">[\s\S]*?<\/div>/gi) || 
                          rewardsCell.match(/<span class="card-body">[\s\S]*?<\/span>/gi) || [];
      if (cardMatches.length > 0) {
        const parsedCards = cardMatches.map(card => {
          const nameMatch = card.match(/alt="([^"]+)"/i) || card.match(/title="([^"]+)"/i);
          const qtyMatch = card.match(/class="card-text[^"]*">([^<]+)<\/span>/i) || 
                           card.match(/>\s*(\d[\d,\s]*)</i);
          const name = nameMatch ? nameMatch[1].trim() : "";
          const qty = qtyMatch ? qtyMatch[1].replace(/\s+/g, "").trim() : "";
          return qty ? `${qty}x ${name}` : name;
        }).filter(Boolean);
        rewards = parsedCards.join(", ");
      } else {
        rewards = cleanText(rewardsCell);
      }
    }
    
    const duration = durationCell ? cleanText(durationCell) : "Unknown";
    
    results.push({ code, server, rewards, duration });
  }
  return results;
}

export async function GET() {
  const now = Date.now();
  
  // Serve from memory cache if valid
  if (memoryCache && (now - cacheTimestamp < CACHE_TTL)) {
    return Response.json(memoryCache, {
      headers: {
        "Cache-Control": "public, max-age=60",
      }
    });
  }

  let genshinActive = [];
  let wuwaActive = [];
  let wuwaExpired = [];
  let errors = [];

  const UA = "GachaUstaadRosterBot/1.0 (fan site) node-fetch";

  // 1. Fetch & parse Genshin Impact Codes
  try {
    const res = await fetch(GENSHIN_URL, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(6000), // 6 sec timeout
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error.info || "API Error");
    
    const html = data.parse.text["*"];
    const tableMatches = html.match(/<table[^>]*>([\s\S]*?)<\/table>/gi);
    if (tableMatches && tableMatches.length > 0) {
      genshinActive = parseGenshinTable(tableMatches[0]);
    } else {
      throw new Error("No tables found in page markup.");
    }
  } catch (err) {
    console.error("Genshin codes fetch error:", err.message);
    errors.push(`Genshin: ${err.message}`);
    genshinActive = GENSHIN_FALLBACK_ACTIVE;
  }

  // 2. Fetch & parse Wuthering Waves Codes
  try {
    const res = await fetch(WUWA_URL, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(6000), // 6 sec timeout
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error.info || "API Error");

    const html = data.parse.text["*"];
    const tableMatches = html.match(/<table[^>]*>([\s\S]*?)<\/table>/gi);
    if (tableMatches && tableMatches.length > 0) {
      wuwaActive = parseWuWaTable(tableMatches[0]);
      if (tableMatches[1]) {
        wuwaExpired = parseWuWaTable(tableMatches[1]).slice(0, 10); // Limit to top 10 expired
      }
    } else {
      throw new Error("No tables found in page markup.");
    }
  } catch (err) {
    console.error("WuWa codes fetch error:", err.message);
    errors.push(`WuWa: ${err.message}`);
    wuwaActive = WUWA_FALLBACK_ACTIVE;
    wuwaExpired = [];
  }

  // Combine data
  const data = {
    genshin: {
      active: genshinActive.length > 0 ? genshinActive : GENSHIN_FALLBACK_ACTIVE,
      expired: []
    },
    wuwa: {
      active: wuwaActive.length > 0 ? wuwaActive : WUWA_FALLBACK_ACTIVE,
      expired: wuwaExpired
    },
    errors: errors.length > 0 ? errors : null,
    updatedAt: new Date().toISOString()
  };

  // Cache results
  memoryCache = data;
  cacheTimestamp = now;

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60",
    }
  });
}
