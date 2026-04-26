import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/x-bio")({
  head: () => ({
    meta: [
      { title: "X (Twitter) Bio Generator — Free AI Tool | DBK Tags" },
      { name: "description", content: "Free AI X / Twitter bio generator. Punchy 160-char bios optimized for impact and discoverability." },
      { property: "og:title", content: "X Bio Generator | DBK Tags" },
      { property: "og:description", content: "Punchy 160-char X bios. Free." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="bio"
      badge="✖️ X-optimized"
      title="X (Twitter) Bio Generator"
      subtitle="Punchy 160-char bios that announce your niche and authority."
    />
  ),
});