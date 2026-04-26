import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
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
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold">
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
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 sm:inline-flex"
            style={{ background: "var(--gradient-primary)" }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}