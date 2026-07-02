import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { NewsletterBar } from "@/app/components/NewsletterBar";

const headingStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, lineHeight: 0.92, letterSpacing: "0.01em" };

const ROLES = [
  {
    title: "Executive Director",
    type: "FULL-TIME · LEADERSHIP",
    location: "On-site, Eastside District",
    salary: "$95,000 – $115,000",
    desc: "Lead Apex MCC through its founding chapter — from capital campaign completion through grand opening and into sustained operations. Report to the Board of Directors.",
    urgent: true,
    responsibilities: [
      "Complete the $2.4M capital campaign alongside the Director of Development",
      "Finalize site selection and oversee the architectural design process",
      "Build and manage the founding staff team",
      "Serve as the primary public face and spokesperson for Apex MCC",
    ],
  },
  {
    title: "Director of Development",
    type: "FULL-TIME · FUNDRAISING",
    location: "Hybrid, Eastside District",
    salary: "$80,000 – $95,000",
    desc: "Own the $2.4M capital campaign, steward major donor relationships, write and manage grants, and build the long-term development strategy for the organization.",
    urgent: true,
    responsibilities: [
      "Manage a portfolio of 50+ individual and institutional donors",
      "Lead grant writing and reporting for all foundation and government grants",
      "Plan and execute donor cultivation and stewardship events",
      "Build and manage the development database and reporting systems",
    ],
  },
  {
    title: "Community Outreach Coordinator",
    type: "FULL-TIME · PROGRAMS",
    location: "On-site + community",
    salary: "$60,000 – $72,000",
    desc: "Build trust with cultural community leaders, co-design the program model, and serve as the connective tissue between Apex MCC and the communities it will serve.",
    urgent: false,
    responsibilities: [
      "Facilitate monthly co-design sessions with community partner organizations",
      "Conduct 1:1 outreach to 40+ cultural groups across the region",
      "Document community input and translate it into program design recommendations",
      "Represent Apex MCC at community events, festivals, and gatherings",
    ],
  },
  {
    title: "Operations & Facilities Manager",
    type: "PART-TIME · OPERATIONS",
    location: "Hybrid",
    salary: "$40,000 – $50,000 (part-time)",
    desc: "Coordinate the construction process, vendor relationships, and develop internal operational systems ahead of opening day.",
    urgent: false,
    responsibilities: [
      "Manage relationships with the architecture firm and general contractor",
      "Develop operational policies, procedures, and staff handbooks",
      "Source and evaluate vendors for facility equipment and services",
      "Support budget management and financial reporting",
    ],
  },
  {
    title: "Communications Lead",
    type: "PART-TIME · MARKETING",
    location: "Remote",
    salary: "$35,000 – $45,000 (part-time)",
    desc: "Shape the Apex MCC story — brand voice, social media, donor communications, and earned media in partnership with the founding team.",
    urgent: false,
    responsibilities: [
      "Manage all social media channels and grow a community of followers",
      "Write donor newsletters, campaign updates, and press releases",
      "Maintain and update the Apex MCC website",
      "Pitch and manage media relationships for earned coverage",
    ],
  },
];

export function Hiring() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Founding Team</span>
          </div>
          <h1 style={headingStyle} className="text-6xl md:text-8xl uppercase text-foreground mb-6 max-w-3xl">
            BUILD THIS<br />WITH <span className="text-primary">US.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
            We are assembling the founding team that will take Apex MCC from capital campaign to construction to opening day. These are rare opportunities to shape something from the ground up.
          </p>
        </div>
      </section>

      {/* ── PRIORITY CALLOUT ── */}
      <section className="bg-primary/8 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}
              className="text-primary uppercase text-sm">Priority Hires</p>
            <p className="text-foreground font-medium mt-0.5">
              Executive Director and Director of Development are our two most urgent roles.
            </p>
          </div>
          <a href="mailto:team@apexmcc.org"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 font-bold hover:bg-primary/90 transition-colors flex-shrink-0"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
            EMAIL US NOW <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-px bg-border border border-border">
          {ROLES.map((role) => (
            <details key={role.title} className="group bg-background open:bg-card transition-colors">
              <summary className="list-none cursor-pointer py-7 px-8 flex flex-col md:flex-row md:items-start gap-5">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold border border-muted text-muted-foreground px-2 py-0.5"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>{role.type}</span>
                    {role.urgent && (
                      <span className="text-xs font-bold border border-primary/50 text-primary px-2 py-0.5"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>PRIORITY HIRE</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                    className="text-2xl uppercase text-foreground group-open:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{role.location}</span>
                    <span className="text-primary font-semibold">{role.salary}</span>
                  </div>
                </div>
                <div className="text-muted-foreground text-sm flex items-center gap-1 md:pt-8 flex-shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
                  <span className="group-open:hidden">VIEW ROLE</span>
                  <span className="hidden group-open:inline">CLOSE</span>
                </div>
              </summary>

              <div className="px-8 pb-8 flex flex-col gap-6 border-t border-border pt-6">
                <p className="text-muted-foreground leading-relaxed">{role.desc}</p>
                <div>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}
                    className="text-foreground uppercase text-xs mb-3">Key Responsibilities</p>
                  <ul className="flex flex-col gap-2">
                    {role.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`mailto:team@apexmcc.org?subject=Application: ${encodeURIComponent(role.title)}`}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary/90 transition-colors w-fit"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                  APPLY FOR THIS ROLE <ExternalLink size={14} />
                </a>
              </div>
            </details>
          ))}
        </div>

        <p className="text-muted-foreground text-sm mt-8">
          Don't see your role?{" "}
          <a href="mailto:team@apexmcc.org" className="text-primary hover:underline">Email team@apexmcc.org</a>
          {" "}— we are always looking for people who believe in this work.
        </p>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>What We Believe</span>
          </div>
          <h2 style={headingStyle} className="text-5xl uppercase text-foreground mb-10">HOW WE WORK</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { title: "Community-Led", desc: "Every decision about what we build is made with community input first. Staff amplify community voice — they do not replace it." },
              { title: "Radical Transparency", desc: "We share our finances, our milestones, and our setbacks publicly. If we miss a goal, we say so and say why." },
              { title: "Equity in Practice", desc: "Compensation is fair and public. Benefits are strong. We hire from the communities we serve wherever possible." },
            ].map((v) => (
              <div key={v.title} className="bg-card p-8">
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                  className="text-xl uppercase text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
