export type Platform =
  | "TikTok"
  | "Instagram"
  | "YouTube"
  | "X"
  | "LinkedIn"
  | "Facebook";

export const PLATFORMS: Platform[] = [
  "TikTok",
  "Instagram",
  "YouTube",
  "X",
  "LinkedIn",
  "Facebook",
];

export type PlatformRule = {
  bioLimit: number;
  captionLimit: number;
  hashtagMin: number;
  hashtagMax: number;
  hashtagIdeal: string; // human-readable
  tip: string;
  captionStyle: string;
  bioStyle: string;
};

export const PLATFORM_RULES: Record<Platform, PlatformRule> = {
  TikTok: {
    bioLimit: 80,
    captionLimit: 2200,
    hashtagMin: 3,
    hashtagMax: 5,
    hashtagIdeal: "3–5",
    tip: "Short, viral, trend-aware. Avoid hashtag stuffing — 3–5 highly relevant tags win the algorithm.",
    captionStyle: "Concise, punchy, viral hook in first line. Max ~150 chars for best retention.",
    bioStyle: "80-char limit. One identity line + emoji + CTA.",
  },
  Instagram: {
    bioLimit: 150,
    captionLimit: 2200,
    hashtagMin: 5,
    hashtagMax: 15,
    hashtagIdeal: "5–15",
    tip: "Mix broad + niche + micro hashtags. 5–15 strategic tags outperform 30 generic ones.",
    captionStyle: "Engagement-focused, can be longer. Strong hook + story + CTA + question.",
    bioStyle: "150-char limit. Identity line breaks, emojis, link-in-bio CTA.",
  },
  YouTube: {
    bioLimit: 1000,
    captionLimit: 5000,
    hashtagMin: 3,
    hashtagMax: 5,
    hashtagIdeal: "3–5",
    tip: "SEO-first. 3–5 hashtags max — YouTube ignores more than 15. Keywords in first 100 chars.",
    captionStyle: "SEO-optimized description. Keywords up top, timestamps, CTAs, links.",
    bioStyle: "Up to 1000 chars. Channel mission, upload schedule, social links, strong CTA.",
  },
  X: {
    bioLimit: 160,
    captionLimit: 280,
    hashtagMin: 1,
    hashtagMax: 3,
    hashtagIdeal: "1–3",
    tip: "Brevity is king. 1–3 hashtags max. Every character counts.",
    captionStyle: "≤280 chars. Bold opinion or hot take. 1–3 hashtags inline.",
    bioStyle: "160-char limit. Punchy identity, achievements, niche.",
  },
  LinkedIn: {
    bioLimit: 220,
    captionLimit: 3000,
    hashtagMin: 3,
    hashtagMax: 5,
    hashtagIdeal: "3–5",
    tip: "Professional tone. 3–5 industry-specific hashtags. Authority + value.",
    captionStyle: "Story-driven, value-led, line breaks for readability. End with a question or CTA.",
    bioStyle: "220-char headline. Role + value prop + niche authority.",
  },
  Facebook: {
    bioLimit: 101,
    captionLimit: 63206,
    hashtagMin: 2,
    hashtagMax: 5,
    hashtagIdeal: "2–5",
    tip: "Community-focused. Moderate hashtag use (2–5). Conversational, shareable.",
    captionStyle: "Conversational, community-driven. Ask questions, encourage shares.",
    bioStyle: "101-char short bio. Friendly identity line.",
  },
};

export function getPlatformRule(p: string): PlatformRule {
  return PLATFORM_RULES[(p as Platform)] ?? PLATFORM_RULES.Instagram;
}