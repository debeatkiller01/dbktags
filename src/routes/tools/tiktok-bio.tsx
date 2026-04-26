import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/tiktok-bio")({
  head: () => ({
    meta: [
      { title: "TikTok Bio Generator — Free AI Tool | DBK Tags" },
      { name: "description", content: "Generate viral TikTok bios optimized for the 80-character limit. Free AI TikTok bio generator with trend-aware copy." },
      { property: "og:title", content: "TikTok Bio Generator | DBK Tags" },
      { property: "og:description", content: "Viral TikTok bios within the 80-char limit. Free." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="bio"
      badge="🎵 TikTok-optimized"
      title="TikTok Bio Generator"
      subtitle="80-char viral bios tuned for TikTok discovery and identity."
    />
  ),
});