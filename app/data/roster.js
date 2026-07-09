import { characterDatabase } from "./characters";
import { genshinRoster, genshinUpcoming } from "./genshin-roster";

// Single source of truth for the character roster used across the app (guide
// index, character cards, and the AI chatbot).
//
// The hand-authored `characterDatabase` holds premium build + persona data and
// wins on a name match; the wiki-scraped `genshinRoster` fills in the rest of the
// full Genshin roster. Both share the same field shape, so cards, the modal, and
// the chatbot persona builder all read from one list.
const ownedNames = new Set(characterDatabase.map((c) => c.name.toLowerCase()));
const notOwned = (c) => !ownedNames.has(c.name.toLowerCase());

// Released/playable characters first, then upcoming/unreleased ones (each flagged
// with `upcoming: true`) appended at the end of the index.
export const fullRoster = [
  ...characterDatabase,
  ...genshinRoster.filter(notOwned),
  ...genshinUpcoming.filter(notOwned),
];
