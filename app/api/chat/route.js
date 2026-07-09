import { fullRoster } from "../../data/roster";

// This handler must run per-request (it reads a secret + calls an external API),
// so make sure it is never statically prerendered or cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CEREBRAS_URL = "https://api.cerebras.ai/v1/chat/completions";
const MODEL = process.env.CEREBRAS_MODEL || "gpt-oss-120b";

// Build an in-character system prompt from the rich data we already store per
// character (title, nation, history, personality-relevant fields + their build).
function buildSystemPrompt(char) {
  const teams = Array.isArray(char.teamComps)
    ? char.teamComps
        .map((t) => `${t.name} (${(t.members || []).join(", ")})`)
        .join(" | ")
    : "";

  const gearLine = char.bestArtifacts?.set
    ? `Artifacts: ${char.bestArtifacts.set}. ${char.bestArtifacts.mainStats || ""}`
    : char.bestEchoes
    ? `Echoes: ${char.bestEchoes}`
    : "";

  const playerName =
    char.game === "Wuthering Waves" ? "Rover" : "the Traveler";

  return [
    `You are ${char.name}${char.title ? `, "${char.title}"` : ""}, a character from ${char.game}. Stay fully in character in first person at all times. Never say you are an AI, a language model, a bot, or that you were made by any company. If asked what you are, answer as ${char.name} would.`,
    ``,
    `── CHARACTER PROFILE ──`,
    `Name: ${char.name}${char.title ? ` (aka "${char.title}")` : ""}`,
    `Game: ${char.game}`,
    char.gender ? `Gender: ${char.gender}` : ``,
    char.element ? `Element/Vision: ${char.element}` : ``,
    char.weapon ? `Weapon: ${char.weapon}` : ``,
    char.role ? `Combat role: ${char.role}` : ``,
    char.nation ? `Home region: ${char.nation}` : ``,
    char.affiliation ? `Affiliation: ${char.affiliation}` : ``,
    char.birthday ? `Birthday: ${char.birthday}` : ``,
    char.constellation ? `Constellation/Sign: ${char.constellation}` : ``,
    char.history ? `Background: ${char.history}` : ``,
    char.description ? `In-game description: ${char.description}` : ``,
    ``,
    `── HOW YOU SPEAK ──`,
    `Talk exactly the way ${char.name} would: match their canon personality, tone, humor, and speech quirks. Address the player warmly as ${playerName}. Keep replies conversational and fairly short (2-5 sentences) unless the player explicitly asks for a detailed guide.`,
    ``,
    `── YOUR OWN BUILD (share only if the player asks how to build, gear, or play you) ──`,
    char.bestWeapon?.name ? `Best weapon: ${char.bestWeapon.name} — ${char.bestWeapon.details || ""}` : ``,
    char.f2pWeapon?.name ? `F2P weapon: ${char.f2pWeapon.name} — ${char.f2pWeapon.details || ""}` : ``,
    gearLine,
    teams ? `Recommended teams: ${teams}` : ``,
    char.pakistaniTips ? `Tip for Pakistani players: ${char.pakistaniTips}` : ``,
    ``,
    `── RULES ──`,
    `- Keep it friendly and safe-for-work.`,
    `- Many of your fans are from Pakistan, so you may reply casually in English or Roman Urdu if the player writes that way.`,
    `- Stay in character even for off-topic questions; answer briefly as ${char.name}.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request) {
  const apiKey = process.env.CEREBRAS_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chatbot is not configured. Set CEREBRAS_API_KEY in .env.local and restart the server." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { characterId, messages } = body || {};
  const char = fullRoster.find((c) => c.id === characterId);
  if (!char) {
    return Response.json({ error: "Unknown character." }, { status: 404 });
  }

  // Sanitise the incoming history: only user/assistant text turns, capped in
  // both length and count so a client can't blow up the upstream request.
  const history = (Array.isArray(messages) ? messages : [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }));

  if (history.length === 0) {
    return Response.json({ error: "No message to send." }, { status: 400 });
  }

  const payload = {
    model: MODEL,
    stream: true,
    temperature: 0.8,
    max_completion_tokens: 800,
    // gpt-oss is a reasoning model; keep the hidden reasoning short so the token
    // budget goes to the actual in-character reply (and responses stay snappy).
    reasoning_effort: "low",
    messages: [{ role: "system", content: buildSystemPrompt(char) }, ...history],
  };

  let upstream;
  try {
    upstream = await fetch(CEREBRAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return Response.json(
      { error: "Could not reach the Cerebras API.", detail: String(err?.message || err) },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return Response.json(
      { error: `Cerebras API error (${upstream.status}).`, detail: detail.slice(0, 500) },
      { status: 502 }
    );
  }

  // Re-shape the upstream OpenAI-style SSE into a plain UTF-8 token stream so
  // the browser can just read text deltas without parsing SSE itself.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? ""; // keep the trailing partial line
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Ignore keep-alives / partial JSON fragments.
            }
          }
        }
      } catch (err) {
        controller.error(err);
        return;
      } finally {
        reader.releaseLock();
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
