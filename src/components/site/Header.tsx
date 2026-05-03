import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { to: "/tools/bio", label: "Bio" },
  { to: "/tools/username", label: "Username" },
  { to: "/tools/caption", label: "Caption" },
  { to: "/tools/hashtag", label: "Hashtag" },
  { to: "/tools/cta", label: "CTA" },
  { to: "/tools/branding", label: "Branding Kit" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 font-bold">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">DBK Tags</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/blog"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 lg:inline-flex"
            style={{ background: "var(--gradient-primary)" }}
          >
            Dashboard
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Blog
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg px-4 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              Dashboard
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}