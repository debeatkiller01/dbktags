import { useEffect, useRef, useState } from "react";
import { Copy, Loader2, Sparkles, Heart, ImagePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

const PLATFORMS = [
  "TikTok",
  "Instagram",
  "YouTube",
  "X",
  "LinkedIn",
  "Facebook",
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
  const [platform, setPlatform] = useState(PLATFORMS[1]);
  const [tone, setTone] = useState(TONES[8]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [images, setImages] = useState<string[]>([]); // data URLs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const MAX_IMAGES = 4;
  const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const addFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    const room = MAX_IMAGES - images.length;
    if (room <= 0) {
      toast.error(`Max ${MAX_IMAGES} images`);
      return;
    }
    const next: string[] = [];
    for (const f of list.slice(0, room)) {
      if (f.size > MAX_BYTES) {
        toast.error(`${f.name || "Image"} is over 5 MB`);
        continue;
      }
      next.push(await fileToDataUrl(f));
    }
    if (next.length) {
      setImages((prev) => [...prev, ...next]);
      toast.success(`Added ${next.length} image${next.length > 1 ? "s" : ""}`);
    }
  };

  // Global paste support — works anywhere on the page
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (const it of Array.from(items)) {
        if (it.kind === "file") {
          const f = it.getAsFile();
          if (f && f.type.startsWith("image/")) files.push(f);
        }
      }
      if (files.length) {
        e.preventDefault();
        void addFiles(files);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

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
          images,
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
        className="rounded-2xl border border-border p-4 shadow-[var(--shadow-card)] sm:p-6"
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {showPlatform && (
              <Field label="Platform">
                <select
                  className="input"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
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

          <Field label="Reference images (optional)">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files?.length) void addFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
                dragOver
                  ? "border-primary bg-accent/40"
                  : "border-border bg-background/50 hover:bg-accent/20"
              }`}
            >
              <ImagePlus className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium">Tap, drop, or paste images</p>
              <p className="text-xs text-muted-foreground">
                PNG / JPG · up to {MAX_IMAGES} · max 5 MB each
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) void addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                    <img src={src} alt={`upload ${i + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImages((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-foreground shadow"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>

          <button
            disabled={loading}
            onClick={generate}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] disabled:opacity-60"
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
        className="rounded-2xl border border-border p-4 shadow-[var(--shadow-card)] sm:p-6"
        style={{ background: "var(--gradient-card)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Output</h2>
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