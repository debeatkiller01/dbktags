import { SiteShell } from "./SiteShell";
import { AdSlot } from "./AdSlot";
import { GeneratorForm, type ToolKey } from "./GeneratorForm";

export function ToolPage({
  tool,
  title,
  subtitle,
  badge,
  showPlatform = true,
  showTopic = false,
  ctaLabel,
  intro,
  faqs,
}: {
  tool: ToolKey;
  title: string;
  subtitle: string;
  badge: string;
  showPlatform?: boolean;
  showTopic?: boolean;
  ctaLabel?: string;
  intro?: string;
  faqs?: { q: string; a: string }[];
}) {
  return (
    <SiteShell>
      <section
        className="relative"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
            {badge}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <GeneratorForm
          tool={tool}
          showPlatform={showPlatform}
          showTopic={showTopic}
          ctaLabel={ctaLabel}
        />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AdSlot />
      </div>

      {intro && (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold">About this tool</h2>
          <p className="mt-2 text-muted-foreground">{intro}</p>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="p-5">
                <summary className="cursor-pointer list-none font-semibold">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}