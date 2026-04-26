import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/username")({
  head: () => ({
    meta: [
      { title: "AI Username Generator — Brandable Handles | DBK Tags" },
      {
        name: "description",
        content: "Generate unique, brandable, available-sounding usernames for any social platform. Free AI username generator.",
      },
      { property: "og:title", content: "AI Username Generator | DBK Tags" },
      { property: "og:description", content: "Brandable handles for creators in seconds." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="username"
      badge="✨ Brand identity"
      title="AI Username Generator"
      subtitle="10 unique, brandable usernames tuned to your niche and personality."
      showPlatform={false}
      intro="A great handle is short, memorable and on-brand. We generate 10 candidates so you can pick one that's actually available."
    />
  ),
});