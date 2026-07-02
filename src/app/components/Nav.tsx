import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { SiteLogo } from "./SiteLogo";

const LINKS = [
  { label: "HOME",         to: "/"          },
  { label: "OUR VISION",  to: "/community" },
  { label: "FUNDRAISING", to: "/funding"   },
  { label: "ROADMAP",     to: "/roadmap"   },
  { label: "JOIN THE TEAM", to: "/hiring"  },
];

const linkStyle = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 600,
  letterSpacing: "0.08em",
};

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)}>
          <SiteLogo />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.slice(1).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={linkStyle}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/funding"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 text-sm font-bold hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            DONATE <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}
              className={({ isActive }) =>
                `text-lg transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/funding"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold w-fit"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}
          >
            DONATE <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </nav>
  );
}
