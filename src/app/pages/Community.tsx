import { Link } from "react-router";
import { ArrowRight, Globe2, Users, Heart, Hammer } from "lucide-react";
import { NewsletterBar } from "@/app/components/NewsletterBar";

const headingStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, lineHeight: 0.92, letterSpacing: "0.01em" };

const PILLARS = [
  { icon: <Globe2 size={22} />, title: "Cultural Programming", desc: "Dedicated spaces for language exchange, traditional arts, cultural celebrations, and intergenerational storytelling — designed in partnership with 40+ communities." },
  { icon: <Users size={22} />, title: "Newcomer Services", desc: "On-site navigation support, legal aid partnerships, employment readiness, and digital literacy for recently arrived immigrants and refugees." },
  { icon: <Heart size={22} />, title: "Youth & Families", desc: "After-school enrichment, weekend heritage programs, and family counseling in a multilingual, trauma-informed environment." },
  { icon: <Hammer size={22} />, title: "Community Infrastructure", desc: "A 28,000 sq ft facility with a commercial kitchen, performance hall, classrooms, a garden courtyard, and co-working space for community-led organizations." },
];

const PLANNED_PROGRAMS = [
  { icon: "🌍", title: "Language Exchange", desc: "Weekly sessions pairing native speakers across 24 languages." },
  { icon: "🍜", title: "Global Kitchen", desc: "Community cooking classes celebrating different culinary traditions each month." },
  { icon: "🥁", title: "World Music & Dance", desc: "Traditional music, drumming, and dance from West Africa, Latin America, South Asia, and beyond." },
  { icon: "🎨", title: "Youth Arts Collective", desc: "After-school program empowering young people to explore heritage through visual art and storytelling." },
  { icon: "📚", title: "Newcomer Support Hub", desc: "Orientation, English literacy, and legal navigation resources for new arrivals." },
  { icon: "🌱", title: "Community Garden", desc: "A shared urban garden where members cultivate plants and herbs from their home countries." },
];

const COMMUNITIES = [
  { name: "West African",     members: "340 registered",  flag: "🇬🇭", img: "photo-1774438533574-14cab891bbe4" },
  { name: "South Asian",      members: "520 registered",  flag: "🇮🇳", img: "photo-1761124739933-009df5603fbf" },
  { name: "Latin American",   members: "410 registered",  flag: "🇧🇷", img: "photo-1517457373958-b7bdd4587205" },
  { name: "East Asian",       members: "380 registered",  flag: "🇨🇳", img: "photo-1758272133771-b149318883c5" },
  { name: "Middle Eastern",   members: "290 registered",  flag: "🇱🇧", img: "photo-1758613171176-ea64579c2dcf" },
  { name: "Pacific Islander", members: "175 registered",  flag: "🇫🇯", img: "photo-1517456793572-1d8efd6dc135" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-px bg-primary" />
      <span className="text-primary text-xs font-bold tracking-widest uppercase"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>{children}</span>
    </div>
  );
}

export function Community() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-primary/6 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <Eyebrow>Our Vision</Eyebrow>
          <h1 style={headingStyle} className="text-6xl md:text-8xl uppercase text-foreground mb-6 max-w-3xl">
            NOT JUST A<br />BUILDING.<br /><span className="text-primary">A MOVEMENT.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
            Apex MCC will be a 28,000 sq ft permanent facility — the first of its kind in the region — co-designed with the cultural communities it will serve. We are in the planning and fundraising stage now.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Mission</Eyebrow>
            <h2 style={headingStyle} className="text-5xl uppercase text-foreground mb-6">
              CO-DESIGNED FROM<br />THE GROUND UP
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>We are not building a generic space and hoping people fill it. We are working directly with 40+ cultural organizations to co-design every room, program, and policy before the first brick is laid.</p>
              <p>Community planning sessions are already underway. Every decision about what Apex MCC becomes is being made with — not for — the communities it will serve.</p>
              <p>This is a multi-year effort and we are making every milestone public. Follow along and hold us accountable.</p>
            </div>
          </div>
          <div className="overflow-hidden border border-border">
            <img
              src="https://images.unsplash.com/photo-1759310610480-48649b55fbdf?w=700&h=520&fit=crop&auto=format"
              alt="Diverse group in a planning meeting"
              className="w-full h-96 object-cover opacity-75"
            />
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Eyebrow>Four Pillars</Eyebrow>
        <h2 style={headingStyle} className="text-5xl uppercase text-foreground mb-12">WHAT WE WILL BUILD</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-background p-8 hover:bg-card transition-colors">
              <div className="text-primary mb-4">{p.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                className="text-xl uppercase text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNED PROGRAMS ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <Eyebrow>Planned Programs</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 style={headingStyle} className="text-5xl uppercase text-foreground">WHAT WE'RE<br />DESIGNING</h2>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              These programs are in active co-design with community partners. Details will evolve as we build.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {PLANNED_PROGRAMS.map((p) => (
              <div key={p.title} className="bg-card p-7 hover:bg-secondary/20 transition-colors group">
                <span className="text-3xl mb-4 block">{p.icon}</span>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                  className="text-xl uppercase text-foreground mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITIES ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Eyebrow>Planning Partners</Eyebrow>
        <h2 style={headingStyle} className="text-5xl uppercase text-foreground mb-12">COMMUNITIES<br />AT THE TABLE</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
          {COMMUNITIES.map((c) => (
            <div key={c.name} className="bg-background group cursor-pointer overflow-hidden">
              <div className="relative overflow-hidden h-40 bg-muted">
                <img
                  src={`https://images.unsplash.com/${c.img}?w=300&h=220&fit=crop&auto=format`}
                  alt={`${c.name} community`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-3 left-3 text-2xl">{c.flag}</div>
              </div>
              <div className="p-4 group-hover:bg-card transition-colors">
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                  className="text-foreground uppercase text-sm group-hover:text-primary transition-colors">
                  {c.name}
                </p>
                <p className="text-muted-foreground text-xs mt-1">{c.members}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mt-6">
          Want to represent your community in the planning process?{" "}
          <a href="mailto:hello@apexmcc.org" className="text-primary hover:underline">Get in touch →</a>
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={headingStyle} className="text-4xl uppercase text-foreground mb-2">READY TO HELP BUILD THIS?</h2>
            <p className="text-muted-foreground">Support the campaign, join the team, or simply follow along.</p>
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
