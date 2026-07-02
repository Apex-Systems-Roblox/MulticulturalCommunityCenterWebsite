import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { NewsletterBar } from "@/app/components/NewsletterBar";

const headingStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, lineHeight: 0.92, letterSpacing: "0.01em" };

const ROADMAP = [
  {
    phase: "01", label: "PHASE ONE", title: "Seed Funding & Site Selection",
    date: "Q1–Q2 2025", status: "active" as const,
    items: [
      "Incorporated as 501(c)(3)",
      "Secured $850K lead donor commitment",
      "Site shortlist narrowed to 3 locations",
      "Community needs assessment launched",
      "Founding board formed",
    ],
  },
  {
    phase: "02", label: "PHASE TWO", title: "Capital Campaign & Planning",
    date: "Q3 2025 – Q2 2026", status: "upcoming" as const,
    items: [
      "Public fundraising campaign launch",
      "Architecture firm engaged",
      "Site selected and secured",
      "Hire founding Executive Director",
      "Co-design sessions with community partners",
    ],
  },
  {
    phase: "03", label: "PHASE THREE", title: "Build & Hire",
    date: "Q3 2026 – Q2 2027", status: "upcoming" as const,
    items: [
      "Construction & renovation",
      "Full staff hired (18 positions)",
      "Founding partner organizations onboarded",
      "Soft launch to founding members",
    ],
  },
  {
    phase: "04", label: "PHASE FOUR", title: "Grand Opening",
    date: "Late 2027", status: "upcoming" as const,
    items: [
      "Full public opening",
      "All programs active",
      "Community membership open to all",
    ],
  },
];

const MILESTONES = [
  { date: "Jan 2025", event: "Apex MCC incorporated as a 501(c)(3) nonprofit" },
  { date: "Mar 2025", event: "Greenfield Family Foundation commits $500K lead gift" },
  { date: "Apr 2025", event: "Board of Directors seated — 9 members from 7 cultural communities" },
  { date: "May 2025", event: "Community needs assessment begins across 40+ groups" },
  { date: "Jun 2025", event: "Capital campaign publicly launched at $2.4M goal" },
  { date: "Now",      event: "Site selection underway · Hiring Executive Director" },
];

export function Roadmap() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Timeline</span>
          </div>
          <h1 style={headingStyle} className="text-6xl md:text-8xl uppercase text-foreground mb-6 max-w-2xl">
            OUR ROAD<br />TO <span className="text-primary">OPENING.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
            We are currently in Phase One — seed funding and site selection. Here is where we are, where we are going, and what each milestone means.
          </p>
        </div>
      </section>

      {/* ── PHASE GRID ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-px bg-border">
            {ROADMAP.map((r) => (
              <div key={r.phase}
                className={`p-8 flex flex-col gap-4 ${r.status === "active" ? "bg-primary/8" : "bg-card"}`}>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                    className="text-6xl text-border leading-none select-none">{r.phase}</span>
                  <span
                    className={`text-[10px] font-bold tracking-widest px-2 py-1 border
                      ${r.status === "active"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted text-muted-foreground"}`}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>
                    {r.status === "active" ? "IN PROGRESS" : "UPCOMING"}
                  </span>
                </div>
                <div>
                  <p className="text-primary text-xs font-bold tracking-widest"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}>{r.label}</p>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                    className="text-xl uppercase text-foreground mt-1">{r.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{r.date}</p>
                </div>
                <ul className="flex flex-col gap-2 mt-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.status === "active" ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Progress So Far</span>
        </div>
        <h2 style={headingStyle} className="text-5xl uppercase text-foreground mb-12">KEY<br />MILESTONES</h2>
        <div className="flex flex-col">
          {MILESTONES.map((m, i) => (
            <div key={m.date}
              className={`flex gap-8 items-start py-5 border-b border-border ${m.date === "Now" ? "bg-primary/5 -mx-4 px-4" : ""}`}>
              <div className="flex-shrink-0 w-24">
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                  className={`text-sm uppercase tracking-wide ${m.date === "Now" ? "text-primary" : "text-muted-foreground"}`}>
                  {m.date}
                </span>
              </div>
              <div className="flex items-start gap-3 flex-1">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${i < MILESTONES.length - 1 ? "bg-primary" : "bg-primary animate-pulse"}`} />
                <p className={`leading-relaxed ${m.date === "Now" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {m.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO HELP ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={headingStyle} className="text-4xl uppercase text-foreground mb-2">HELP US MOVE FASTER</h2>
            <p className="text-muted-foreground">Every dollar and every hire accelerates the timeline.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/funding"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary/90 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
              DONATE <ArrowRight size={14} />
            </Link>
            <Link to="/hiring"
              className="flex items-center gap-2 border border-border text-foreground px-6 py-3 font-bold hover:border-primary hover:text-primary transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
              JOIN THE TEAM
            </Link>
          </div>
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
