import { Link } from "react-router";
import { Mail, MapPin } from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { email, location } from "@/app/config/brand";

const labelStyle = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 700,
  letterSpacing: "0.1em",
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <SiteLogo showTagline={false} />
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase mt-1 pl-10">
                Multicultural Community Center
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              A nonprofit in development. Raising funds and building the founding team to open a permanent multicultural community center by 2027.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Mail size={12} className="text-primary" />{email}</span>
              <span className="flex items-center gap-2"><MapPin size={12} className="text-primary" />{location}</span>
            </div>
          </div>

          <div>
            <p style={labelStyle} className="text-foreground uppercase text-xs mb-4">Get Involved</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Donate to the Campaign", to: "/funding"  },
                { label: "View Open Positions",    to: "/hiring"   },
                { label: "Attend a Planning Meeting", to: "/roadmap" },
                { label: "Partner With Us",        to: "/community" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={labelStyle} className="text-foreground uppercase text-xs mb-4">About the Project</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Our Vision",      to: "/community" },
                { label: "Capital Campaign", to: "/funding"  },
                { label: "Roadmap",         to: "/roadmap"   },
                { label: "Join the Team",   to: "/hiring"    },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">© 2026 Apex Multicultural Community Center Inc. 501(c)(3) pending.</p>
          <p className="text-muted-foreground text-xs">All donations are tax-deductible to the extent allowed by law.</p>
        </div>
      </div>
    </footer>
  );
}
