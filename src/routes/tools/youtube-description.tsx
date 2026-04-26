import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/youtube-description")({
  head: () => ({
    meta: [
      { title: "YouTube Description Generator — SEO AI Tool | DBK Tags" },
      { name: "description", content: "Generate SEO-optimized YouTube channel and video descriptions. Free AI tool tuned for YouTube ranking." },
      { property: "og:title", content: "YouTube Description Generator | DBK Tags" },
      { property: "og:description", content: "SEO-first YouTube descriptions with keywords up top." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="caption"
      badge="▶️ YouTube SEO"
      title="YouTube Description Generator"
      subtitle="SEO-optimized descriptions with keywords, timestamps, and CTAs."
      showTopic
    />
  ),
});