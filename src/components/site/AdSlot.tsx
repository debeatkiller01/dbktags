export function AdSlot({ label = "Sponsored" }: { label?: string }) {
  return (
    <div
      className="my-8 flex h-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground"
      data-ad-slot="adsterra"
    >
      {label} · Ad
    </div>
  );
}