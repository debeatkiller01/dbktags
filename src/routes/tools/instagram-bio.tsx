import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/instagram-bio")({
  head: () => ({
    meta: [
      { title: "Instagram Bio Generator — Free AI Tool | DBK Tags" },
      { name: "description", content: "Free AI Instagram bio generator. Crafts 150-char bios with line breaks, emojis, and a link-in-bio CTA." },
      { property: "og:title", content: "Instagram Bio Generator | DBK Tags" },
      { property: "og:description", content: "Engagement-focused IG bios within 150 chars." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="bio"
      badge="📸 Instagram-optimized"
      title="Instagram Bio Generator"
      subtitle="150-char bios with branding, emojis, and a strong CTA."
    />
  ),
});