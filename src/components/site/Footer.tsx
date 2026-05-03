import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <h3 className="text-base font-bold">DBK Tags</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The Ultimate AI Creator Branding Toolkit. Free tools for viral
            bios, captions, hashtags & more.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Free Tools</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/tools/bio" className="hover:text-primary">Bio Generator</Link></li>
            <li><Link to="/tools/username" className="hover:text-primary">Username Generator</Link></li>
            <li><Link to="/tools/caption" className="hover:text-primary">Caption Generator</Link></li>
            <li><Link to="/tools/hashtag" className="hover:text-primary">Hashtag Generator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Stay updated</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Get viral creator tips weekly.
          </p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="input flex-1"
            />
            <button
              className="rounded-md px-3 py-2 text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DBK Tags. Built for creators.
      </div>
    </footer>
  );
}