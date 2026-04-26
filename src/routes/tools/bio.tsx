import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/bio")({
  head: () => ({
    meta: [
      { title: "AI Bio Generator — TikTok, Instagram, YouTube | DBK Tags" },
      {
        name: "description",
        content:
          "Free AI bio generator for TikTok, Instagram, YouTube, X, LinkedIn & Facebook. Get viral, character-limit-perfect bios in seconds.",
      },
      { property: "og:title", content: "AI Bio Generator | DBK Tags" },
      {
        property: "og:description",
        content: "Generate scroll-stopping social bios for every platform — free.",
      },
    ],
  }),
  component: BioPage,
});

function BioPage() {
  return (
    <ToolPage
      tool="bio"
      badge="🔥 Most popular"
      title="AI Bio Generator"
      subtitle="Viral, platform-native bios for TikTok, Instagram, YouTube, X, LinkedIn & Facebook — character limits respected."
      intro="Your bio is your first impression. DBK Tags' AI Bio Generator crafts 5 unique bios tailored to your niche, personality and goals — optimized for the exact platform you're posting on."
      faqs={[
        { q: "Are the bios within character limits?", a: "Yes — TikTok 80, Instagram 150, X 160, YouTube 1000, LinkedIn 220, Facebook 101." },
        { q: "Can I regenerate?", a: "Tap Generate as many times as you like — every run is fresh." },
      ]}
    />
  );
}