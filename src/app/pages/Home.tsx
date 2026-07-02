import { Link } from "react-router";
import { ArrowRight, Users, Globe2, Hammer, Heart } from "lucide-react";
import { FundingBar, FUNDING_GOAL, FUNDING_RAISED } from "@/app/components/FundingBar";
import { NewsletterBar } from "@/app/components/NewsletterBar";

const headingStyle = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  lineHeight: 0.88,
  letterSpacing: "0.01em",
};

const QUICK_LINKS = [
  { icon: <Globe2 size={20} />, label: "Our Vision", to: "/community", desc: "Who we are and why we're building this" },
  { icon: <Hammer size={20} />, label: "Roadmap",    to: "/roadmap",   desc: "Where we are and what comes next" },
  { icon: <Users size={20} />, label: "Join the Team", to: "/hiring",  desc: "Open founding team positions" },
  { icon: <Heart size={20} />, label: "Donate",      to: "/funding",   desc: "Support the $2.4M capital campaign" },
];

export function Home() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1777177496992-bbb3431e7550?w=1600&h=1000&fit=crop&auto=format"
            alt="Modern community building interior"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <div className="inline-flex items-center gap-2 border border-primary/40 text-primary px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.15em" }}
              className="text-xs uppercase"
            >
              Now Fundraising · Opening 2027
            </span>
          </div>

          <h1 style={headingStyle} className="text-6xl sm:text-7xl md:text-[9rem] uppercase text-foreground mb-8 max-w-5xl">
            BUILDING A<br />HOME FOR<br /><span className="text-primary">EVERY</span><br />COMMUNITY.
          </h1>

          <div className="grid md:grid-cols-2 gap-10 items-end">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Apex Multicultural Community Center is a nonprofit in development — raising funds, finalizing plans, and hiring a founding team to build a permanent home for 40+ cultural communities.
            </p>
            <div className="bg-card border border-border p-6">
              <FundingBar raised={FUNDING_RAISED} goal={FUNDING_GOAL} />
              <div className="flex gap-3 mt-6">
                <Link to="/funding"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 font-bold hover:bg-primary/90 transition-colors text-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                  DONATE NOW <ArrowRight size={14} />
                </Link>
                <Link to="/hiring"
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground py-3 font-bold hover:border-primary hover:text-primary transition-colors text-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                  JOIN THE TEAM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK NAV CARDS ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="bg-card p-7 flex flex-col gap-4 group hover:bg-secondary/30 transition-colors"
              >
                <div className="text-primary">{item.icon}</div>
                <div>
                  <p
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.04em" }}
                    className="text-lg uppercase text-foreground group-hover:text-primary transition-colors"
                  >
                    {item.label}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1 leading-snug">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Who We Are</span>
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, lineHeight: 0.92 }}
            className="text-5xl uppercase text-foreground mb-6">
            NOT JUST A<br />BUILDING.<br /><span className="text-primary">A MOVEMENT.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Apex MCC will be a 28,000 sq ft permanent facility — the first of its kind in the region — co-designed with the 40+ cultural communities it will serve. We are in the fundraising and planning stage right now.
          </p>
          <Link to="/community"
            className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2.5 font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
            READ OUR VISION <ArrowRight size={14} />
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden border border-border">
            <img
              src="https://images.unsplash.com/photo-1573165706511-3ffde6ef1fe3?w=700&h=500&fit=crop&auto=format"
              alt="Diverse team collaborating around a table"
              className="w-full h-72 object-cover opacity-75"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-5">
            <p className="text-3xl font-extrabold leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>28K</p>
            <p className="text-xs font-bold mt-1 opacity-80 tracking-wide uppercase">Sq Ft Planned</p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "57%",  label: "of Campaign Goal Raised" },
            { value: "214+", label: "Individual Donors" },
            { value: "40+",  label: "Cultural Groups in Planning" },
            { value: "2027", label: "Target Opening Year" },
          ].map((s) => (
            <div key={s.label}>
              <span
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                className="text-4xl text-primary leading-none block"
              >
                {s.value}
              </span>
              <span className="text-muted-foreground text-sm font-medium mt-1 block">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
