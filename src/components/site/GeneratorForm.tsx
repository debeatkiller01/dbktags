import { useState } from "react";
import { Copy, Loader2, Sparkles, Heart, Info, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PLATFORMS, getPlatformRule, type Platform } from "@/lib/platformRules";

export type ToolKey =
  | "bio"
  | "username"
  | "caption"
  | "hashtag"
  | "cta"
  | "branding";

const TONES = [
  "Professional",
  "Funny",
  "Savage",
  "Luxury",
  "Motivational",
  "Spiritual",
  "Romantic",
  "Business",
  "Viral/Gen Z",
];

export function GeneratorForm({
  tool,
  showPlatform = true,
  showTopic = false,
  ctaLabel = "Generate",
}: {
  tool: ToolKey;
  showPlatform?: boolean;
  showTopic?: boolean;
  ctaLabel?: string;
}) {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [personality, setPersonality] = useState("");
  const [goals, setGoals] = useState("");
  const [keywords, setKeywords] = useState("");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[1]);
  const [tone, setTone] = useState(TONES[8]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const rule = getPlatformRule(platform);

  // Per-tool platform metric to show in the indicator
  const indicator = (() => {
    switch (tool) {
      case "hashtag":
        return { label: "Recommended hashtags", value: rule.hashtagIdeal };
      case "bio":
      case "branding":
        return { label: "Bio limit", value: `${rule.bioLimit} chars` };
      case "caption":
        return { label: "Caption style", value: rule.captionStyle.split(".")[0] };
      case "cta":
        return { label: "CTA style", value: "Max 6 words, punchy" };
      default:
        return { label: "Optimized for", value: platform };
    }
  })();

  // Output post-processing: hashtag overflow warning
  const hashtagWarning = (() => {
    if (tool !== "hashtag" || !output) return null;
    const count = (output.match(/#\w+/g) || []).length;
    if (count > rule.hashtagMax)
      return `⚠️ ${count} hashtags detected — ${platform} performs best with ${rule.hashtagIdeal}. Consider trimming.`;
    if (count > 0 && count < rule.hashtagMin)
      return `ℹ️ Only ${count} hashtag${count === 1 ? "" : "s"} — ${platform} ideal is ${rule.hashtagIdeal}.`;
    return null;
  })();

  const generate = async () => {
    if (!niche.trim()) {
      toast.error("Please enter your niche");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const { data, error } = await supabase.functions.invoke("generate", {
        body: {
          tool,
          platform,
          tone,
          name,
          niche,
          personality,
          goals,
          keywords,
          topic,
        },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error)
        throw new Error((data as { error: string }).error);
      setOutput((data as { text: string }).text || "No output");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const requireAuth = () =>
    toast.info("Sign in to save outputs (coming soon)");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div
        className="rounded-2xl border border-border p-6 shadow-[var(--shadow-card)]"
        style={{ background: "var(--gradient-card)" }}
      >
        <h2 className="mb-4 text-lg font-bold">Customize your output</h2>
        <div className="grid gap-4">
          <Field label="Your name (optional)">
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
            />
          </Field>
          <Field label="Niche *">
            <input
              className="input"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. fitness coach, music producer, day trader"
            />
          </Field>
          {showTopic && (
            <Field label="Topic / Post idea">
              <input
                className="input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. morning routine that 10x'd my income"
              />
            </Field>
          )}
          <div className="grid grid-cols-2 gap-3">
            {showPlatform && (
              <Field label="Platform">
                <select
                  className="input"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                >
                  {PLATFORMS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </Field>
            )}
            <Field label="Tone">
              <select
                className="input"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                {TONES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          {showPlatform && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs">
              <div className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
                <Info className="h-3.5 w-3.5" />
                Best for {platform}
              </div>
              <div className="grid gap-1 text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">{indicator.label}:</span>{" "}
                  {indicator.value}
                </div>
                <div className="text-[11px] leading-relaxed">{rule.tip}</div>
              </div>
            </div>
          )}

          <Field label="Personality (optional)">
            <input
              className="input"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="e.g. bold, witty, no-nonsense"
            />
          </Field>
          <Field label="Goals (optional)">
            <input
              className="input"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. grow to 100k, sell course"
            />
          </Field>
          <Field label="Keywords (optional)">
            <input
              className="input"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="comma separated"
            />
          </Field>
          <button
            disabled={loading}
            onClick={generate}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] disabled:opacity-60"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            {loading ? "Generating..." : ctaLabel}
          </button>
        </div>
      </div>

      <div
        className="rounded-2xl border border-border p-6 shadow-[var(--shadow-card)]"
        style={{ background: "var(--gradient-card)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Output</h2>
            {output && (
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {output.length} chars · optimized for {platform}
              </p>
            )}
          </div>
          {output && (
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
              >
                <Copy className="h-3 w-3" /> Copy
              </button>
              <button
                onClick={requireAuth}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
              >
                <Heart className="h-3 w-3" /> Save
              </button>
            </div>
          )}
        </div>
        {hashtagWarning && (
          <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-700 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{hashtagWarning}</span>
          </div>
        )}
        <div className="min-h-[320px] whitespace-pre-wrap rounded-xl border border-dashed border-border bg-background/50 p-4 text-sm leading-relaxed">
          {output || (
            <span className="text-muted-foreground">
              Your AI-generated output will appear here. Fill the form and hit
              Generate ✨
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}