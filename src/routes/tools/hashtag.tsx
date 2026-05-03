import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/hashtag")({
  head: () => ({
    meta: [
      { title: "AI Hashtag Generator — 30 Trending Tags | DBK Tags" },
      {
        name: "description",
        content: "Generate 30 trending, mixed-tier hashtags (broad + niche + micro) for any platform and topic. Free.",
      },
      { property: "og:title", content: "AI Hashtag Generator | DBK Tags" },
      { property: "og:description", content: "Trend-aware hashtag sets that maximize reach." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="hashtag"
      badge="📈 Reach booster"
      title="AI Hashtag Generator"
      subtitle="30 mixed-tier hashtags (broad, niche, micro) tuned for your platform and topic."
      showTopic
    />
  ),
});