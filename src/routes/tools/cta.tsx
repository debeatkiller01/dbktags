import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/cta")({
  head: () => ({
    meta: [
      { title: "AI CTA Generator — Link-in-Bio Calls to Action | DBK Tags" },
      {
        name: "description",
        content: "Generate punchy link-in-bio CTAs that convert. Free AI tool for creators and entrepreneurs.",
      },
      { property: "og:title", content: "AI CTA Generator | DBK Tags" },
      { property: "og:description", content: "Punchy link-in-bio CTAs that convert." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="cta"
      badge="🔗 Link-in-bio"
      title="AI CTA Generator"
      subtitle="8 punchy CTAs you can drop straight into your link-in-bio."
      showPlatform={false}
    />
  ),
});