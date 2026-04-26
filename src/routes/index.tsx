import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { AdSlot } from "@/components/site/AdSlot";
import {
  Sparkles,
  AtSign,
  MessageSquareQuote,
  Hash,
  MousePointerClick,
  Palette,
  Zap,
  TrendingUp,
  Trophy,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DBK Tags — Free AI Bio, Caption & Hashtag Generator" },
      {
        name: "description",
        content:
          "DBK Tags is the all-in-one AI social branding suite. Generate viral bios, captions, hashtags, usernames & branding kits for TikTok, Instagram, YouTube & more — free.",
      },
      { property: "og:title", content: "DBK Tags — AI Social Branding Suite" },
      {
        property: "og:description",
        content:
          "Viral bios, captions, hashtags & branding kits powered by AI. Free for creators.",
      },
    ],
  }),
  component: Home,
});

const tools = [
  { to: "/tools/bio", icon: Sparkles, title: "AI Bio Generator", desc: "Scroll-stopping bios for every platform.", tag: "Free" },
  { to: "/tools/username", icon: AtSign, title: "Username Generator", desc: "Brandable, unique handles in seconds.", tag: "Free" },
  { to: "/tools/caption", icon: MessageSquareQuote, title: "Caption Generator", desc: "Viral captions with hooks built in.", tag: "Free" },
  { to: "/tools/hashtag", icon: Hash, title: "Hashtag Generator", desc: "Trend-aware, mixed-tier hashtag sets.", tag: "Free" },
  { to: "/tools/cta", icon: MousePointerClick, title: "CTA Generator", desc: "Punchy link-in-bio CTAs that convert.", tag: "Free" },
  { to: "/tools/branding", icon: Palette, title: "Branding Kit", desc: "Full personal brand identity in one click.", tag: "Pro Vibe" },
] as const;

const platforms = ["TikTok", "Instagram", "YouTube", "X", "LinkedIn", "Facebook"];

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-powered · Built for viral creators
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Build a brand that <span className="gradient-text">goes viral</span> on every platform.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            DBK Tags is your AI creator toolkit — generate bios, captions, hashtags,
            usernames and full branding kits in seconds. Free, fast, mobile-first.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/tools/bio"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-5 w-5" /> Try the Bio Generator
            </Link>
            <Link
              to="/tools/branding"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold transition-colors hover:bg-accent"
            >
              Build my Branding Kit
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
            {platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All your <span className="gradient-text">creator tools</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Free forever. No login required to generate.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:flex">
            <Search className="h-4 w-4" /> Trending tools
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative overflow-hidden rounded-2xl border border-border p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)]"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <t.icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open tool →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AdSlot />
      </div>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Lightning fast", desc: "Generate in seconds, copy with one click." },
            { icon: TrendingUp, title: "Trend-aware", desc: "Outputs tuned to what's working right now." },
            { icon: Trophy, title: "Viral-ready", desc: "Hooks, CTAs & emojis baked in by default." },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border p-6"
              style={{ background: "var(--gradient-card)" }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by <span className="gradient-text">10,000+ creators</span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { q: "Got 40k followers after switching my bio. Insane.", a: "@lunafit" },
            { q: "The hashtag generator is unfair. My reach 5x'd.", a: "@beatsbymo" },
            { q: "Built my whole brand identity in one afternoon.", a: "@trader.ace" },
          ].map((t) => (
            <figure
              key={t.a}
              className="rounded-2xl border border-border p-6"
              style={{ background: "var(--gradient-card)" }}
            >
              <blockquote className="text-base">"{t.q}"</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-primary">
                {t.a}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked
        </h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {[
            {
              q: "Is DBK Tags free?",
              a: "Yes — every generator is free. Save & history features unlock with a free account.",
            },
            {
              q: "Which platforms are supported?",
              a: "TikTok, Instagram, YouTube, X (Twitter), LinkedIn, and Facebook — with character limits respected per platform.",
            },
            {
              q: "Will my outputs sound like everyone else's?",
              a: "No. Outputs are personalized using your name, niche, personality, goals, keywords and tone.",
            },
          ].map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div
          className="rounded-3xl p-10 text-center text-primary-foreground shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your viral era starts now.
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Build a brand people remember. Generate your first bio in 10 seconds.
          </p>
          <Link
            to="/tools/bio"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-foreground transition-transform hover:scale-105"
          >
            <Sparkles className="h-5 w-5 text-primary" /> Start free
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
