import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type GenInput = {
  tool: string; // "bio" | "username" | "caption" | "hashtag" | "cta" | "branding"
  platform?: string;
  tone?: string;
  name?: string;
  niche?: string;
  personality?: string;
  goals?: string;
  keywords?: string;
  topic?: string;
};

function buildPrompt(input: GenInput): { system: string; user: string } {
  const {
    tool,
    platform = "Instagram",
    tone = "Viral/Gen Z",
    name = "",
    niche = "",
    personality = "",
    goals = "",
    keywords = "",
    topic = "",
  } = input;

  const system =
    "You are DBK Tags AI — an elite social branding strategist for creators, influencers, musicians, traders, and entrepreneurs. You write viral, platform-native, SEO-aware, character-limit aware copy. Always return only the requested outputs, no preamble. Use line-separated items. Use emojis where culturally appropriate.";

  const ctx = `Name: ${name}\nNiche: ${niche}\nPersonality: ${personality}\nGoals: ${goals}\nKeywords: ${keywords}\nTopic: ${topic}\nPlatform: ${platform}\nTone: ${tone}`;

  // Platform-specific optimization rules (mirrors src/lib/platformRules.ts)
  const RULES: Record<string, { bio: number; cap: number; hMin: number; hMax: number; hashtagNote: string; bioNote: string; capNote: string }> = {
    TikTok:    { bio: 80,  cap: 150,   hMin: 3, hMax: 5,  hashtagNote: "3–5 highly relevant, viral-trend hashtags only. NO stuffing.", bioNote: "Max 80 chars. Identity + emoji + CTA.", capNote: "Punchy viral hook in first line. ≤150 chars ideal." },
    Instagram: { bio: 150, cap: 2200,  hMin: 5, hMax: 15, hashtagNote: "5–15 strategic hashtags: mix broad + niche + micro tiers.", bioNote: "Max 150 chars. Line breaks, emojis, link CTA.", capNote: "Engagement-focused, hook + story + CTA + question." },
    YouTube:   { bio: 1000,cap: 5000,  hMin: 3, hMax: 5,  hashtagNote: "3–5 SEO hashtags max (YouTube ignores >15).", bioNote: "Up to 1000 chars. Mission, schedule, links, CTA.", capNote: "SEO description: keywords in first 100 chars, timestamps, CTAs." },
    X:         { bio: 160, cap: 280,   hMin: 1, hMax: 3,  hashtagNote: "1–3 hashtags max. Brevity wins.", bioNote: "Max 160 chars. Punchy identity + niche.", capNote: "≤280 chars. Bold take. 1–3 inline hashtags." },
    LinkedIn:  { bio: 220, cap: 3000,  hMin: 3, hMax: 5,  hashtagNote: "3–5 professional industry hashtags only.", bioNote: "Max 220-char headline. Role + value prop + authority.", capNote: "Story-driven, value-led. Line breaks. End with question/CTA." },
    Facebook:  { bio: 101, cap: 500,   hMin: 2, hMax: 5,  hashtagNote: "2–5 hashtags. Community-focused, conversational.", bioNote: "Max 101 chars short bio. Friendly tone.", capNote: "Conversational, encourages shares and comments." },
  };
  const r = RULES[platform] ?? RULES.Instagram;
  const platformBlock = `\n\n=== ${platform.toUpperCase()} OPTIMIZATION RULES (STRICT) ===\nBio limit: ${r.bio} chars — ${r.bioNote}\nCaption guidance: ${r.capNote}\nHashtag rule: ${r.hashtagNote}\nYou MUST respect these limits and conventions.`;

  const map: Record<string, string> = {
    bio: `Generate 5 distinct ${platform} bios. Each bio MUST be ≤${r.bio} characters. Each bio on its own line, numbered 1-5. Scroll-stopping, on-trend, identity-defining. After each bio, append " (Xc)" where X is the actual character count.${platformBlock}\n\n${ctx}`,
    username: `Generate 10 unique, brandable, available-sounding usernames optimized for ${platform}. Mix styles: short, alliterative, punchy, modern. Numbered 1-10, no spaces, lowercase, max 20 chars.\n\n${ctx}`,
    caption: `Generate 5 viral ${platform} captions for: "${topic || niche}". Hook in first 3 words. Include 1 CTA each. Each caption MUST respect ${platform}'s caption style. Numbered 1-5.${platformBlock}\n\n${ctx}`,
    hashtag: `Generate EXACTLY ${r.hMin}-${r.hMax} hashtags optimized for ${platform} about "${topic || niche}". Mix tiers appropriately for the platform (broad + niche + micro where relevant). Output as a single space-separated line, each starting with #. Do NOT exceed ${r.hMax} hashtags. Then on a new line write "Recommended for ${platform}: ${r.hMin}–${r.hMax} hashtags".${platformBlock}\n\n${ctx}`,
    cta: `Generate 8 punchy link-in-bio CTAs for ${platform} (max 6 words each). Numbered 1-8.${platformBlock}\n\n${ctx}`,
    branding: `Create a complete personal branding kit optimized for ${platform}. Output sections with these exact headings: TAGLINE, BIO (≤${r.bio} chars for ${platform}), MISSION, BRAND VOICE, 5 CONTENT PILLARS, 3 SLOGANS, COLOR VIBE, TARGET AUDIENCE.${platformBlock}\n\n${ctx}`,
  };

  return { system, user: map[tool] ?? map.bio };
}

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const input = (await req.json()) as GenInput;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { system, user } = buildPrompt(input);

    const resp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      },
    );

    if (!resp.ok) {
      if (resp.status === 429)
        return new Response(
          JSON.stringify({ error: "Rate limit hit. Try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      if (resp.status === 402)
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Add credits in your workspace.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      const t = await resp.text();
      console.error("AI gateway error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const text: string = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});