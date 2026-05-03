import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";

export const Route = createFileRoute("/tools/branding")({
  head: () => ({
    meta: [
      { title: "AI Personal Branding Kit Generator | DBK Tags" },
      {
        name: "description",
        content: "Build your full personal brand identity in one click — tagline, bio, mission, voice, content pillars, slogans and more.",
      },
      { property: "og:title", content: "AI Branding Kit Generator | DBK Tags" },
      { property: "og:description", content: "Your full brand identity in one click." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="branding"
      badge="👑 Pro vibe"
      title="Personal Branding Kit"
      subtitle="A full brand identity — tagline, bio, mission, voice, content pillars, slogans, color vibe & target audience."
      showPlatform={false}
      ctaLabel="Build my Brand Kit"
    />
  ),
});