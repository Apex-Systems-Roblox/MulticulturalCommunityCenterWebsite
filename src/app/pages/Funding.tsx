import { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { FundingBar, FUNDING_GOAL, FUNDING_RAISED } from "@/app/components/FundingBar";
import { NewsletterBar } from "@/app/components/NewsletterBar";
import { fetchDonors, type Donor, supabase } from "@/app/config/supabase";
import { getStripeLink, stripeLinks } from "@/app/config/stripe";

const headingStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, lineHeight: 0.92, letterSpacing: "0.01em" };
const labelStyle   = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" };

const TIERS = [
  { key: "50",   label: "$50",    name: "COMMUNITY SUPPORTER", perks: "Founder newsletter + project updates" },
  { key: "250",  label: "$250",   name: "CULTURE BUILDER",     perks: "Above + name on founding wall" },
  { key: "1000", label: "$1,000", name: "CORNERSTONE DONOR",   perks: "Above + founding member benefits at opening", popular: true },
  { key: "5000", label: "$5,000", name: "LEGACY PARTNER",      perks: "Named space consideration + board invitation" },
];

function stripeConfigured(): boolean {
  return Object.values(stripeLinks).some((v) => v !== null);
}

export function Funding() {
  const [donors, setDonors]       = useState<Donor[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState("1000");
  const [customAmt, setCustomAmt] = useState("");

  useEffect(() => {
    fetchDonors().then((d) => { setDonors(d); setLoading(false); });
  }, []);

  const effectiveAmount =
    selected === "custom"
      ? parseFloat(customAmt.replace(/,/g, "")) || 0
      : parseFloat(selected);

  const pct = Math.min(100, Math.round((FUNDING_RAISED / FUNDING_GOAL) * 100));

  function handleDonate() {
    const link = getStripeLink(selected);
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  }

  const isStripeReady = stripeConfigured();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Capital Campaign</span>
          </div>
          <h1 style={headingStyle} className="text-6xl md:text-8xl uppercase text-foreground mb-6 max-w-3xl">
            HELP US<br />REACH<br /><span className="text-primary">$2.4M.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
            Our capital campaign funds site acquisition, architectural design, renovation, equipment, and 18 months of founding operating costs — everything needed to open our doors.
          </p>
        </div>
      </section>

      {/* ── MAIN FUNDING SECTION ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-px bg-border">

            {/* Left — progress + donors */}
            <div className="lg:col-span-2 bg-card p-8 flex flex-col gap-8">
              <FundingBar raised={FUNDING_RAISED} goal={FUNDING_GOAL} />

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {[
                  { n: "214+", label: "Donors" },
                  { n: "6",    label: "Foundations" },
                  { n: `${pct}%`, label: "of Goal" },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                      className="text-3xl text-primary leading-none">{s.n}</p>
                    <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <p style={labelStyle} className="text-foreground uppercase text-xs mb-4">
                  Lead Donors & Grants
                  {!supabase && (
                    <span className="ml-2 text-muted-foreground font-normal normal-case tracking-normal text-[10px]">
                      (fallback data — connect Supabase to manage live)
                    </span>
                  )}
                </p>

                {loading ? (
                  <div className="flex flex-col gap-3">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="h-8 bg-muted animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-border">
                    {donors.map((d) => (
                      <div key={d.name} className="py-2.5 flex justify-between items-center gap-4">
                        <div>
                          <p className="text-foreground text-sm font-medium">{d.name}</p>
                          <p className="text-muted-foreground text-xs">{d.type}</p>
                        </div>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                          className="text-primary text-lg flex-shrink-0">{d.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right — donation tiers */}
            <div className="lg:col-span-3 bg-background p-8 flex flex-col gap-6">
              <p style={labelStyle} className="text-foreground uppercase text-xs">Select a Giving Amount</p>

              {!isStripeReady && (
                <div className="border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">Stripe not yet configured.</span>{" "}
                  Add your VITE_STRIPE_LINK_* env vars to enable donations.{" "}
                  <a href="https://dashboard.stripe.com/payment-links" target="_blank" rel="noopener noreferrer"
                    className="text-primary underline">Create Payment Links →</a>
                </div>
              )}

              {/* Tier grid */}
              <div className="grid grid-cols-2 gap-3">
                {TIERS.map((tier) => (
                  <button key={tier.key} onClick={() => setSelected(tier.key)}
                    className={`border p-4 text-left transition-colors ${selected === tier.key ? "border-primary bg-primary/8" : "border-border hover:border-primary/50"}`}>
                    {tier.popular && (
                      <p className="text-primary text-[10px] font-bold tracking-widest mb-1"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}>POPULAR</p>
                    )}
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                      className="text-2xl text-foreground leading-none">{tier.label}</p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em" }}
                      className="text-muted-foreground uppercase mt-1">{tier.name}</p>
                    <p className="text-muted-foreground text-xs mt-2 leading-snug">{tier.perks}</p>
                    {selected === tier.key && (
                      <div className="mt-2 flex items-center gap-1 text-primary">
                        <Check size={12} /><span className="text-xs font-semibold">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <button onClick={() => setSelected("custom")}
                className={`w-full border p-4 text-left transition-colors ${selected === "custom" ? "border-primary bg-primary/8" : "border-border hover:border-primary/50"}`}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}
                  className="text-sm uppercase text-muted-foreground mb-2">Custom amount</p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-lg font-bold">$</span>
                  <input
                    type="number" placeholder="0" min={1}
                    value={customAmt}
                    onClick={() => setSelected("custom")}
                    onChange={(e) => { setSelected("custom"); setCustomAmt(e.target.value); }}
                    className="flex-1 bg-transparent text-foreground text-2xl font-bold outline-none placeholder:text-muted-foreground/40"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  />
                </div>
              </button>

              {/* Donate button */}
              <div className="pt-2 border-t border-border flex items-center justify-between gap-4">
                <div>
                  <p className="text-muted-foreground text-xs">Total gift</p>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                    className="text-3xl text-foreground">
                    {effectiveAmount > 0 ? `$${effectiveAmount.toLocaleString()}` : "—"}
                  </p>
                </div>
                <button
                  disabled={!isStripeReady || effectiveAmount <= 0}
                  onClick={handleDonate}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-bold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
                  DONATE VIA STRIPE <ArrowRight size={16} />
                </button>
              </div>

              <p className="text-muted-foreground text-xs">
                You will be redirected to a secure Stripe-hosted payment page. Apex MCC is a 501(c)(3) nonprofit — your donation is tax-deductible to the extent permitted by law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOUR GIFT FUNDS ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Campaign Breakdown</span>
        </div>
        <h2 style={headingStyle} className="text-5xl uppercase text-foreground mb-10">WHERE THE<br />MONEY GOES</h2>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {[
            { pct: "45%", label: "Site & Construction",      desc: "Acquisition, renovation, and build-out of the 28,000 sq ft facility." },
            { pct: "25%", label: "Equipment & Furnishings",  desc: "Commercial kitchen, AV systems, furniture, signage, and program supplies." },
            { pct: "30%", label: "Operations (18 months)",   desc: "Staff salaries, insurance, utilities, and program costs through the first year and a half." },
          ].map((item) => (
            <div key={item.label} className="bg-background p-8">
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                className="text-5xl text-primary leading-none mb-3">{item.pct}</p>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                className="text-xl uppercase text-foreground mb-2">{item.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OTHER WAYS TO GIVE ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 style={headingStyle} className="text-4xl uppercase text-foreground mb-8">OTHER WAYS TO GIVE</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Pledge a Multi-Year Gift",  desc: "Spread your commitment over 2–3 years. Contact us to set up a pledge agreement.", cta: "Email hello@apexmcc.org", href: "mailto:hello@apexmcc.org?subject=Multi-year pledge inquiry" },
              { title: "Name a Space",              desc: "Gifts of $25,000+ may include naming rights for a room or program area. Let's talk.", cta: "Start the conversation", href: "mailto:hello@apexmcc.org?subject=Naming gift inquiry" },
              { title: "In-Kind Donations",         desc: "We accept donated equipment, professional services, and materials. Reach out to discuss.", cta: "Email hello@apexmcc.org", href: "mailto:hello@apexmcc.org?subject=In-kind donation inquiry" },
            ].map((item) => (
              <div key={item.title} className="border border-border p-6 hover:border-primary/50 transition-colors">
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                  className="text-xl uppercase text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                <a href={item.href}
                  className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>
                  {item.cta} <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
