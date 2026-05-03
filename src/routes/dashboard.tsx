import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Sparkles, AtSign, MessageSquareQuote, Hash, MousePointerClick, Palette, Lock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Creator Dashboard | DBK Tags" },
      { name: "description", content: "Your DBK Tags creator dashboard — saved bios, branding kits, history and favorites." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { to: "/tools/bio", icon: Sparkles, title: "Bio Generator" },
  { to: "/tools/username", icon: AtSign, title: "Username" },
  { to: "/tools/caption", icon: MessageSquareQuote, title: "Caption" },
  { to: "/tools/hashtag", icon: Hash, title: "Hashtag" },
  { to: "/tools/cta", icon: MousePointerClick, title: "CTA" },
  { to: "/tools/branding", icon: Palette, title: "Branding Kit" },
] as const;

function Dashboard() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back, <span className="gradient-text">creator</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Jump into a tool or pick up where you left off.
        </p>

        <h2 className="mt-10 text-lg font-bold">Quick tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-card)" }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <t.icon className="h-5 w-5" />
              </span>
              <span className="font-semibold">{t.title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border p-6" style={{ background: "var(--gradient-card)" }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Lock className="h-4 w-4" /> Saved outputs
            </div>
            <p className="text-sm text-muted-foreground">
              Sign in to save your generated bios, captions and branding kits.
            </p>
            <button
              className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Sign in (coming soon)
            </button>
          </div>
          <div className="rounded-2xl border border-border p-6" style={{ background: "var(--gradient-card)" }}>
            <div className="mb-3 text-sm font-semibold text-muted-foreground">
              Branding score
            </div>
            <div className="text-4xl font-bold gradient-text">82/100</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Your bio + hashtag strategy looks viral-ready. Refresh weekly.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}