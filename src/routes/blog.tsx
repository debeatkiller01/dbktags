import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Creator Branding Tips | DBK Tags" },
      {
        name: "description",
        content: "Best TikTok bios, Instagram bio ideas, viral captions, hashtag strategies, YouTube growth tips and creator branding guides.",
      },
      { property: "og:title", content: "DBK Tags Blog" },
      { property: "og:description", content: "Viral creator branding tips, bio ideas, hashtag strategies & growth guides." },
    ],
  }),
  component: Blog,
});

const posts = [
  { slug: "best-tiktok-bios", title: "100+ Best TikTok Bios for 2025", desc: "Hook your visitors in 80 characters or less.", tag: "TikTok" },
  { slug: "instagram-bio-ideas", title: "Aesthetic Instagram Bio Ideas That Convert", desc: "Bio templates by niche — fitness, beauty, business, music.", tag: "Instagram" },
  { slug: "viral-captions", title: "How to Write Viral Captions (with Hooks)", desc: "The 3-word hook formula creators are stealing.", tag: "Captions" },
  { slug: "hashtag-strategy", title: "Hashtag Strategy: The 30-Tag Mix That Works", desc: "Broad + niche + micro hashtags to maximize reach.", tag: "Hashtags" },
  { slug: "creator-branding-tips", title: "Creator Branding 101: Look Premium on Day 1", desc: "Build a brand identity people actually remember.", tag: "Branding" },
  { slug: "youtube-growth-bios", title: "YouTube Channel Descriptions That Grow Subs", desc: "SEO-friendly descriptions optimized for discovery.", tag: "YouTube" },
];

function Blog() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Creator <span className="gradient-text">Playbook</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          SEO-rich guides to help you grow on every platform.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog"
              className="block rounded-2xl border border-border p-6 transition-transform hover:-translate-y-1"
              style={{ background: "var(--gradient-card)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {p.tag}
              </span>
              <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-primary">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}