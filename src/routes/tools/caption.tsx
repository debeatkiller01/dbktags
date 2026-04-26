import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/caption")({
  head: () => ({
    meta: [
      { title: "AI Caption Generator — Viral Hooks & CTAs | DBK Tags" },
      {
        name: "description",
        content: "Generate viral captions with hooks and CTAs for TikTok, Reels, YouTube Shorts and posts. Free AI caption generator.",
      },
      { property: "og:title", content: "AI Caption Generator | DBK Tags" },
      { property: "og:description", content: "Hooks in the first 3 words. CTAs that convert." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="caption"
      badge="🎯 Hook + CTA"
      title="AI Caption Generator"
      subtitle="Scroll-stopping captions with built-in hooks and CTAs — for any platform."
      showTopic
    />
  ),
});