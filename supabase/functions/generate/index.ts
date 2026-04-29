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
  images?: string[]; // data URLs
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

  const map: Record<string, string> = {
    bio: `Generate 5 distinct ${platform} bios. Respect platform character limits (TikTok 80, Instagram 150, X 160, YouTube 1000, LinkedIn 220, Facebook 101). Each bio on its own line, numbered 1-5. Make them scroll-stopping, on-trend, and identity-defining.\n\n${ctx}`,
    username: `Generate 10 unique, brandable, available-sounding usernames. Mix styles: short, alliterative, punchy, modern. Numbered 1-10, no spaces, lowercase, max 20 chars.\n\n${ctx}`,
    caption: `Generate 5 viral ${platform} captions for: "${topic || niche}". Hook in first 3 words. Include 1 CTA each. Numbered 1-5.\n\n${ctx}`,
    hashtag: `Generate 30 trending, mixed-tier (broad + niche + micro) hashtags for ${platform} about "${topic || niche}". Output as a single space-separated line, each starting with #.\n\n${ctx}`,
    cta: `Generate 8 punchy link-in-bio CTAs (max 6 words each). Numbered 1-8.\n\n${ctx}`,
    branding: `Create a complete personal branding kit. Output sections with these exact headings: TAGLINE, BIO, MISSION, BRAND VOICE, 5 CONTENT PILLARS, 3 SLOGANS, COLOR VIBE, TARGET AUDIENCE.\n\n${ctx}`,
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

    const images = (input.images ?? []).filter((s) =>
      typeof s === "string" && s.startsWith("data:image/"),
    );
    const userContent: unknown =
      images.length > 0
        ? [
            { type: "text", text: user + "\n\nUse the attached image(s) as visual brand/style reference." },
            ...images.map((url) => ({ type: "image_url", image_url: { url } })),
          ]
        : user;

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
            { role: "user", content: userContent },
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