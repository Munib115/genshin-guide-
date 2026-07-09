/**
 * Formats image URLs to request WebP format explicitly from CDNs
 * (Fandom/Wikia and genshin.jmp.blue).
 */
export function toWebP(url) {
  if (!url) return "";

  // 1. Fandom / Wikia CDN images
  if (url.includes("wikia.nocookie.net") || url.includes("fandom.com")) {
    if (url.includes("?")) {
      if (!url.includes("format=")) {
        return `${url}&format=webp`;
      }
      // Replace existing format with webp if present
      return url.replace(/format=\w+/, "format=webp");
    } else {
      return `${url}?format=webp`;
    }
  }

  // 2. genshin.jmp.blue API images
  if (url.includes("genshin.jmp.blue")) {
    // Append .webp to the end of endpoints if not already present
    if (!url.endsWith(".webp") && !url.includes("?")) {
      if (url.endsWith("/icon") || url.endsWith("/gacha-splash") || url.endsWith("/card")) {
        return `${url}.webp`;
      }
    }
  }

  return url;
}
