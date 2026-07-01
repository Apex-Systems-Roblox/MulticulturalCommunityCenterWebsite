import { useState, useRef } from "react";
import { Menu, X, ArrowRight, Globe2, MapPin, Mail, Users, Hammer, Heart, ExternalLink, Upload, Check, CreditCard, ChevronRight } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type DonationStep = "tiers" | "details" | "confirm" | "success";

interface DonationForm {
  amount: string;
  customAmount: string;
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  anonymous: boolean;
  coverFees: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "OUR VISION", href: "#vision" },
  { label: "FUNDRAISING", href: "#funding" },
  { label: "ROADMAP", href: "#roadmap" },
  { label: "JOIN THE TEAM", href: "#hiring" },
];

const FUNDING_GOAL = 2_400_000;
const INITIAL_RAISED = 1_380_000;

const PILLARS = [
  { icon: <Globe2 size={22} />, title: "Cultural Programming", desc: "Dedicated spaces for language exchange, traditional arts, cultural celebrations, and intergenerational storytelling — designed in partnership with 40+ communities." },
  { icon: <Users size={22} />, title: "Newcomer Services", desc: "On-site navigation support, legal aid partnerships, employment readiness, and digital literacy for recently arrived immigrants and refugees." },
  { icon: <Heart size={22} />, title: "Youth & Families", desc: "After-school enrichment, weekend heritage programs, and family counseling in a multilingual, trauma-informed environment." },
  { icon: <Hammer size={22} />, title: "Community Infrastructure", desc: "A 28,000 sq ft facility with a commercial kitchen, performance hall, classrooms, a garden courtyard, and co-working space for community-led organizations." },
];

const ROADMAP = [
  { phase: "01", label: "PHASE ONE", title: "Seed Funding & Site Selection", date: "Q1–Q2 2025", status: "complete" as const, items: ["Incorporated as 501(c)(3)", "Secured $850K lead donor commitment", "Site shortlist narrowed to 3 locations"] },
  { phase: "02", label: "PHASE TWO", title: "Capital Campaign & Planning", date: "Q3 2025 – Q2 2026", status: "active" as const, items: ["Public fundraising campaign launched", "Architecture firm engaged", "Community needs assessment underway", "Hire founding Executive Director"] },
  { phase: "03", label: "PHASE THREE", title: "Build & Hire", date: "Q3 2026 – Q2 2027", status: "upcoming" as const, items: ["Construction & renovation", "Full staff hired (18 positions)", "Founding partner organizations onboarded", "Soft launch to founding members"] },
  { phase: "04", label: "PHASE FOUR", title: "Grand Opening", date: "Late 2027", status: "upcoming" as const, items: ["Full public opening", "All programs active", "Community membership open to all"] },
];

const ROLES = [
  { title: "Executive Director", type: "FULL-TIME · LEADERSHIP", desc: "Lead the organization through its founding chapter — from capital campaign completion through grand opening and into sustained operations.", urgent: true },
  { title: "Director of Development", type: "FULL-TIME · FUNDRAISING", desc: "Own the $2.4M capital campaign, steward major donor relationships, and build the long-term grants strategy.", urgent: true },
  { title: "Community Outreach Coordinator", type: "FULL-TIME · PROGRAMS", desc: "Build trust with cultural community leaders, co-design the program model, and serve as the connective tissue between Apex MCC and the communities it will serve.", urgent: false },
  { title: "Operations & Facilities Manager", type: "PART-TIME · OPERATIONS", desc: "Coordinate the construction process, vendor relationships, and develop internal operational systems ahead of opening.", urgent: false },
  { title: "Communications Lead", type: "PART-TIME · MARKETING", desc: "Shape the Apex MCC story — brand voice, social media, donor communications, and earned media in partnership with the founding team.", urgent: false },
];

const DONATION_TIERS = [
  { name: "COMMUNITY SUPPORTER", amount: 50, label: "$50", perks: "Founder newsletter + project updates" },
  { name: "CULTURE BUILDER", amount: 250, label: "$250", perks: "Above + name on founding wall" },
  { name: "CORNERSTONE DONOR", amount: 1000, label: "$1,000", perks: "Above + founding member benefits at opening", popular: true },
  { name: "LEGACY PARTNER", amount: 5000, label: "$5,000", perks: "Named space consideration + board invitation" },
];

const DONORS = [
  { name: "Greenfield Family Foundation", amount: "$500,000", type: "Lead Gift" },
  { name: "City of Eastside Municipal Grant", amount: "$230,000", type: "Public Grant" },
  { name: "Horizon Community Trust", amount: "$150,000", type: "Foundation" },
  { name: "Anonymous Donor", amount: "$100,000", type: "Individual" },
  { name: "Regional Arts & Culture Fund", amount: "$80,000", type: "Grant" },
  { name: "Community members & friends", amount: "$320,000+", type: "Grassroots" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function FundingBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-muted-foreground text-sm">Raised so far</span>
        <span className="text-primary font-bold text-sm"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}>
          {pct}% OF GOAL
        </span>
      </div>
      <div className="h-3 bg-muted w-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>${raised.toLocaleString()} raised</span>
        <span>${(goal / 1_000_000).toFixed(1)}M goal</span>
      </div>
    </div>
  );
}

function LogoUploadZone({ logo, onUpload }: { logo: string | null; onUpload: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    onUpload(url);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) handleFile(file);
      }}
      className="cursor-pointer border-2 border-dashed border-border hover:border-primary/60 transition-colors flex flex-col items-center justify-center gap-3 p-8 group min-h-[140px]"
    >
      {logo ? (
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Uploaded logo" className="max-h-16 max-w-48 object-contain" />
          <p className="text-muted-foreground text-xs group-hover:text-primary transition-colors">Click to replace</p>
        </div>
      ) : (
        <>
          <Upload size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="text-center">
            <p className="text-foreground text-sm font-medium">Drop your logo here</p>
            <p className="text-muted-foreground text-xs mt-1">PNG, SVG, or JPG · any size</p>
          </div>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}

function formatCard(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [raised, setRaised] = useState(INITIAL_RAISED);

  // Donation flow
  const [donationStep, setDonationStep] = useState<DonationStep>("tiers");
  const [donationForm, setDonationForm] = useState<DonationForm>({
    amount: "1000",
    customAmount: "",
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    anonymous: false,
    coverFees: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<DonationForm>>({});
  const [submitting, setSubmitting] = useState(false);

  const effectiveAmount = donationForm.amount === "custom"
    ? parseFloat(donationForm.customAmount.replace(/,/g, "")) || 0
    : parseFloat(donationForm.amount);
  const processingFee = donationForm.coverFees ? +(effectiveAmount * 0.029 + 0.30).toFixed(2) : 0;
  const totalCharge = +(effectiveAmount + processingFee).toFixed(2);

  function setField<K extends keyof DonationForm>(key: K, value: DonationForm[K]) {
    setDonationForm((f) => ({ ...f, [key]: value }));
    setFormErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateDetails() {
    const errors: Partial<DonationForm> = {};
    if (!donationForm.firstName.trim()) errors.firstName = "Required";
    if (!donationForm.lastName.trim()) errors.lastName = "Required";
    if (!/\S+@\S+\.\S+/.test(donationForm.email)) errors.email = "Valid email required";
    if (donationForm.cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Enter full card number";
    if (donationForm.cardExpiry.length < 5) errors.cardExpiry = "Required";
    if (donationForm.cardCvc.length < 3) errors.cardCvc = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submitDonation() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setRaised((r) => r + effectiveAmount);
    setDonationStep("success");
    setSubmitting(false);
  }

  const headingStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.01em" };
  const labelStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            {logo ? (
              <img src={logo} alt="Apex MCC logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Globe2 size={16} className="text-primary-foreground" />
              </div>
            )}
            <div className="flex flex-col leading-none">
              <span style={{ ...headingStyle, fontSize: "1.1rem", letterSpacing: "0.06em" }} className="text-foreground uppercase leading-none">APEX MCC</span>
              <span className="text-muted-foreground text-[10px] tracking-widest uppercase leading-none mt-0.5">Coming 2027</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#funding"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 text-sm font-bold hover:bg-primary/90 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
              DONATE <ArrowRight size={14} />
            </a>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}
                className="text-lg text-foreground hover:text-primary transition-colors">{l.label}</a>
            ))}
            <a href="#funding" className="mt-2 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold w-fit"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}>
              DONATE <ArrowRight size={14} />
            </a>
          </div>
        )}
      </nav>

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
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.15em" }} className="text-xs uppercase">
              Now Fundraising · Opening 2027
            </span>
          </div>

          <h1 style={{ ...headingStyle, lineHeight: 0.88 }} className="text-6xl sm:text-7xl md:text-[9rem] uppercase text-foreground mb-8 max-w-5xl">
            BUILDING A<br />HOME FOR<br /><span className="text-primary">EVERY</span><br />COMMUNITY.
          </h1>

          <div className="grid md:grid-cols-2 gap-10 items-end">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Apex Multicultural Community Center is a nonprofit in development — raising funds, finalizing plans, and hiring a founding team to build a permanent home for 40+ cultural communities in our region.
            </p>
            <div className="bg-card border border-border p-6">
              <FundingBar raised={raised} goal={FUNDING_GOAL} />
              <div className="flex gap-3 mt-6">
                <a href="#funding"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 font-bold hover:bg-primary/90 transition-colors text-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                  DONATE NOW <ArrowRight size={14} />
                </a>
                <a href="#hiring"
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground py-3 font-bold hover:border-primary hover:text-primary transition-colors text-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                  JOIN THE TEAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGO UPLOAD ── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>
                  Branding
                </span>
              </div>
              <h2 style={{ ...headingStyle, lineHeight: 0.92 }} className="text-4xl md:text-5xl uppercase text-foreground mb-3">
                UPLOAD YOUR LOGO
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Drop your organization's logo here. It will appear in the nav and anywhere the Apex MCC mark is shown. PNG or SVG with a transparent background works best.
              </p>
            </div>
            <LogoUploadZone logo={logo} onUpload={setLogo} />
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Our Vision</span>
            </div>
            <h2 style={{ ...headingStyle, lineHeight: 0.92 }} className="text-5xl md:text-6xl uppercase text-foreground mb-8">
              NOT JUST A<br />BUILDING.<br /><span className="text-primary">A MOVEMENT.</span>
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>Apex MCC will be a 28,000 sq ft permanent facility — the first of its kind in the region — designed in full partnership with the communities it will serve.</p>
              <p>We are not building a generic space and hoping people fill it. We are working directly with 40+ cultural organizations to co-design every room, program, and policy from the ground up.</p>
              <p>This is a multi-year effort. We are in the fundraising and planning stage now, making every decision publicly and with community input.</p>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden border border-border">
              <img src="https://images.unsplash.com/photo-1573165706511-3ffde6ef1fe3?w=700&h=500&fit=crop&auto=format"
                alt="Diverse team collaborating" className="w-full h-80 object-cover opacity-75" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-5">
              <p className="text-3xl font-extrabold leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>28K</p>
              <p className="text-xs font-bold mt-1 opacity-80 tracking-wide uppercase">Square Feet</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-16">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-background p-7 hover:bg-card transition-colors">
              <div className="text-primary mb-4">{p.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
                className="text-lg uppercase text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FUNDRAISING ── */}
      <section id="funding" className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Capital Campaign</span>
          </div>
          <div className="grid md:grid-cols-2 gap-16 mb-14">
            <h2 style={{ ...headingStyle, lineHeight: 0.92 }} className="text-5xl md:text-6xl uppercase text-foreground">
              HELP US<br />REACH THE<br /><span className="text-primary">$2.4M GOAL</span>
            </h2>
            <div className="flex flex-col justify-center gap-4 text-muted-foreground leading-relaxed">
              <p>Our capital campaign funds site acquisition, architectural design, renovation, equipment, and 18 months of founding operating costs.</p>
              <p>We accept one-time gifts, multi-year pledges, in-kind donations, and naming gifts. All donations are tax-deductible.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-border">

            {/* Left: progress + donors */}
            <div className="lg:col-span-1 bg-card p-8 flex flex-col gap-8">
              <FundingBar raised={raised} goal={FUNDING_GOAL} />
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {[
                  { n: (214 + (raised > INITIAL_RAISED ? Math.floor((raised - INITIAL_RAISED) / 150) : 0)).toString(), label: "Donors" },
                  { n: "6", label: "Foundations" },
                  { n: `${Math.min(100, Math.round((raised / FUNDING_GOAL) * 100))}%`, label: "of Goal" },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }} className="text-3xl text-primary leading-none">{s.n}</p>
                    <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-border">
                <p style={labelStyle} className="text-foreground uppercase text-xs mb-4">Lead Donors & Grants</p>
                <div className="flex flex-col divide-y divide-border">
                  {DONORS.map((d) => (
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
              </div>
            </div>

            {/* Right: donation flow */}
            <div className="lg:col-span-2 bg-background p-8">
              {donationStep === "success" ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Check size={28} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 style={{ ...headingStyle, lineHeight: 1 }} className="text-4xl uppercase text-foreground mb-2">
                      THANK YOU!
                    </h3>
                    <p className="text-muted-foreground">
                      Your gift of <span className="text-primary font-bold">${effectiveAmount.toLocaleString()}</span> has been received.
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">A receipt has been sent to {donationForm.email}.</p>
                  </div>
                  <button onClick={() => { setDonationStep("tiers"); setDonationForm((f) => ({ ...f, customAmount: "", firstName: "", lastName: "", email: "", cardNumber: "", cardExpiry: "", cardCvc: "" })); }}
                    className="border border-border text-muted-foreground px-6 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
                    MAKE ANOTHER GIFT
                  </button>
                </div>

              ) : donationStep === "tiers" ? (
                <div className="flex flex-col gap-6">
                  <p style={labelStyle} className="text-foreground uppercase text-xs">Select a Giving Amount</p>

                  {/* Tier grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {DONATION_TIERS.map((tier) => (
                      <button key={tier.amount}
                        onClick={() => setField("amount", String(tier.amount))}
                        className={`border p-4 text-left transition-colors ${donationForm.amount === String(tier.amount) ? "border-primary bg-primary/8" : "border-border hover:border-primary/50"}`}>
                        {tier.popular && (
                          <p className="text-primary text-[10px] font-bold tracking-widest mb-1"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}>POPULAR</p>
                        )}
                        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                          className="text-2xl text-foreground leading-none">{tier.label}</p>
                        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em" }}
                          className="text-muted-foreground uppercase mt-1">{tier.name}</p>
                        <p className="text-muted-foreground text-xs mt-2 leading-snug">{tier.perks}</p>
                        {donationForm.amount === String(tier.amount) && (
                          <div className="mt-2 flex items-center gap-1 text-primary">
                            <Check size={12} /><span className="text-xs font-semibold">Selected</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div>
                    <button onClick={() => setField("amount", "custom")}
                      className={`w-full border p-4 text-left transition-colors ${donationForm.amount === "custom" ? "border-primary bg-primary/8" : "border-border hover:border-primary/50"}`}>
                      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}
                        className="text-sm uppercase text-muted-foreground mb-2">Enter a custom amount</p>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-lg font-bold">$</span>
                        <input
                          type="number"
                          placeholder="0"
                          min={1}
                          value={donationForm.customAmount}
                          onClick={() => setField("amount", "custom")}
                          onChange={(e) => { setField("amount", "custom"); setField("customAmount", e.target.value); }}
                          className="flex-1 bg-transparent text-foreground text-2xl font-bold outline-none placeholder:text-muted-foreground/40"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Cover fees toggle */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => setField("coverFees", !donationForm.coverFees)}
                      className={`mt-0.5 w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-colors ${donationForm.coverFees ? "bg-primary border-primary" : "border-border group-hover:border-primary/60"}`}>
                      {donationForm.coverFees && <Check size={12} className="text-primary-foreground" />}
                    </div>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      Cover the {(2.9).toFixed(1)}% + $0.30 processing fee so 100% of my gift goes to Apex MCC
                      {donationForm.coverFees && effectiveAmount > 0 && (
                        <span className="text-primary font-semibold"> (+${processingFee.toFixed(2)})</span>
                      )}
                    </span>
                  </label>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs">Total charge</p>
                      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }} className="text-3xl text-foreground">
                        {effectiveAmount > 0 ? `$${totalCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                      </p>
                    </div>
                    <button
                      disabled={effectiveAmount <= 0}
                      onClick={() => setDonationStep("details")}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-bold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
                      CONTINUE <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

              ) : donationStep === "details" ? (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <p style={labelStyle} className="text-foreground uppercase text-xs">Your Details</p>
                    <button onClick={() => setDonationStep("tiers")}
                      className="text-muted-foreground text-xs hover:text-primary transition-colors flex items-center gap-1">
                      ← Change amount
                    </button>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    {(["firstName", "lastName"] as const).map((f, i) => (
                      <div key={f}>
                        <label className="text-muted-foreground text-xs mb-1.5 block"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                          {i === 0 ? "FIRST NAME" : "LAST NAME"}
                        </label>
                        <input
                          value={donationForm[f]}
                          onChange={(e) => setField(f, e.target.value)}
                          placeholder={i === 0 ? "Maria" : "Santos"}
                          className={`w-full bg-muted border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 ${formErrors[f] ? "border-red-500/60" : "border-border"}`}
                        />
                        {formErrors[f] && <p className="text-red-400 text-xs mt-1">{formErrors[f]}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-muted-foreground text-xs mb-1.5 block"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={donationForm.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="maria@example.com"
                      className={`w-full bg-muted border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 ${formErrors.email ? "border-red-500/60" : "border-border"}`}
                    />
                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Card */}
                  <div>
                    <label className="text-muted-foreground text-xs mb-1.5 flex items-center gap-2 block"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                      <CreditCard size={13} /> CARD NUMBER
                    </label>
                    <input
                      value={donationForm.cardNumber}
                      onChange={(e) => setField("cardNumber", formatCard(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full bg-muted border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 font-mono ${formErrors.cardNumber ? "border-red-500/60" : "border-border"}`}
                    />
                    {formErrors.cardNumber && <p className="text-red-400 text-xs mt-1">{formErrors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-muted-foreground text-xs mb-1.5 block"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                        EXPIRY
                      </label>
                      <input
                        value={donationForm.cardExpiry}
                        onChange={(e) => setField("cardExpiry", formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className={`w-full bg-muted border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 font-mono ${formErrors.cardExpiry ? "border-red-500/60" : "border-border"}`}
                      />
                      {formErrors.cardExpiry && <p className="text-red-400 text-xs mt-1">{formErrors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs mb-1.5 block"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                        CVC
                      </label>
                      <input
                        value={donationForm.cardCvc}
                        onChange={(e) => setField("cardCvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                        className={`w-full bg-muted border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 font-mono ${formErrors.cardCvc ? "border-red-500/60" : "border-border"}`}
                      />
                      {formErrors.cardCvc && <p className="text-red-400 text-xs mt-1">{formErrors.cardCvc}</p>}
                    </div>
                  </div>

                  {/* Anonymous */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setField("anonymous", !donationForm.anonymous)}
                      className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-colors ${donationForm.anonymous ? "bg-primary border-primary" : "border-border group-hover:border-primary/60"}`}>
                      {donationForm.anonymous && <Check size={12} className="text-primary-foreground" />}
                    </div>
                    <span className="text-muted-foreground text-sm">Make my donation anonymous</span>
                  </label>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs">Donating</p>
                      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }} className="text-3xl text-foreground">
                        ${totalCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <button
                      onClick={() => { if (validateDetails()) setDonationStep("confirm"); }}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-bold hover:bg-primary/90 transition-colors"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
                      REVIEW GIFT <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

              ) : (
                /* confirm step */
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <p style={labelStyle} className="text-foreground uppercase text-xs">Confirm Your Gift</p>
                    <button onClick={() => setDonationStep("details")}
                      className="text-muted-foreground text-xs hover:text-primary transition-colors">
                      ← Edit details
                    </button>
                  </div>

                  <div className="border border-border p-6 flex flex-col gap-4">
                    {[
                      { label: "Donor", value: donationForm.anonymous ? "Anonymous" : `${donationForm.firstName} ${donationForm.lastName}` },
                      { label: "Email", value: donationForm.email },
                      { label: "Card", value: `•••• •••• •••• ${donationForm.cardNumber.slice(-4)}` },
                      { label: "Tier", value: DONATION_TIERS.find((t) => String(t.amount) === donationForm.amount)?.name ?? "Custom Gift" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="text-foreground font-medium text-right">{row.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-4 flex justify-between items-end">
                      <span className="text-muted-foreground text-sm">Total charge</span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }} className="text-primary text-3xl">
                        ${totalCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Apex Multicultural Community Center Inc. is a 501(c)(3) nonprofit. Your donation is tax-deductible to the extent permitted by law. You will receive an email receipt immediately.
                  </p>

                  <button
                    disabled={submitting}
                    onClick={submitDonation}
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                    {submitting ? (
                      <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> PROCESSING…</>
                    ) : (
                      <> CONFIRM DONATION <Check size={16} /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Timeline</span>
        </div>
        <h2 style={{ ...headingStyle, lineHeight: 0.92 }} className="text-5xl md:text-6xl uppercase text-foreground mb-14">
          OUR<br />ROADMAP
        </h2>
        <div className="grid md:grid-cols-4 gap-px bg-border">
          {ROADMAP.map((r) => (
            <div key={r.phase} className={`p-7 flex flex-col gap-4 ${r.status === "active" ? "bg-primary/8" : "bg-background"}`}>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                  className="text-5xl text-border leading-none select-none">{r.phase}</span>
                <span className={`text-[10px] font-bold tracking-widest px-2 py-1 border
                  ${r.status === "complete" ? "border-primary/60 text-primary" :
                    r.status === "active" ? "border-primary bg-primary text-primary-foreground" :
                    "border-muted text-muted-foreground"}`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>
                  {r.status === "complete" ? "DONE" : r.status === "active" ? "IN PROGRESS" : "UPCOMING"}
                </span>
              </div>
              <div>
                <p className="text-primary text-xs font-bold tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}>{r.label}</p>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
                  className="text-xl uppercase text-foreground mt-1">{r.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{r.date}</p>
              </div>
              <ul className="flex flex-col gap-2 mt-2">
                {r.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.status === "complete" ? "bg-primary" : r.status === "active" ? "bg-primary/60" : "bg-muted-foreground/40"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIRING ── */}
      <section id="hiring" className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.18em" }}>Founding Team</span>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
            <h2 style={{ ...headingStyle, lineHeight: 0.92 }} className="text-5xl md:text-6xl uppercase text-foreground">
              OPEN<br />POSITIONS
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We are assembling the founding team that will take Apex MCC from campaign to construction to opening day. These are rare opportunities to shape something from scratch.
            </p>
          </div>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {ROLES.map((role) => (
              <div key={role.title}
                className="py-7 flex flex-col md:flex-row md:items-start gap-5 group hover:bg-secondary/20 -mx-6 px-6 transition-colors cursor-pointer">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold border border-muted text-muted-foreground px-2 py-0.5"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>{role.type}</span>
                    {role.urgent && (
                      <span className="text-xs font-bold border border-primary/50 text-primary px-2 py-0.5"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>PRIORITY HIRE</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
                    className="text-2xl uppercase text-foreground group-hover:text-primary transition-colors mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{role.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-primary flex-shrink-0 md:pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }} className="text-sm">APPLY</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            Don't see your role? Email <a href="mailto:team@apexmcc.org" className="text-primary hover:underline">team@apexmcc.org</a> — we are always looking for people who believe in this work.
          </p>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <h2 style={{ ...headingStyle, lineHeight: 0.92 }} className="text-5xl md:text-7xl uppercase text-primary-foreground">
            FOLLOW<br />THE BUILD
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Get quarterly updates on the capital campaign, site selection, hiring news, and community planning sessions. 4–6 emails per year, no spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="your@email.com"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-3 text-sm outline-none focus:border-primary-foreground/60 transition-colors" />
              <button className="bg-primary-foreground text-primary px-6 py-3 font-bold hover:bg-primary-foreground/90 transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.08em" }}>
                KEEP ME POSTED →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                {logo ? (
                  <img src={logo} alt="Apex MCC logo" className="h-8 w-auto object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Globe2 size={16} className="text-primary-foreground" />
                  </div>
                )}
                <div>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.06em" }}
                    className="text-lg text-foreground uppercase leading-none">APEX MCC</p>
                  <p className="text-muted-foreground text-[10px] tracking-widest uppercase mt-0.5">Multicultural Community Center</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                A nonprofit in development. Raising funds and building the founding team to open a permanent multicultural community center by 2027.
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Mail size={12} className="text-primary" /> hello@apexmcc.org</span>
                <span className="flex items-center gap-2"><MapPin size={12} className="text-primary" /> Eastside District (site TBD)</span>
              </div>
            </div>
            <div>
              <p style={labelStyle} className="text-foreground uppercase text-xs mb-4">Get Involved</p>
              <ul className="flex flex-col gap-2.5">
                {["Donate to the Campaign", "View Open Positions", "Attend a Planning Meeting", "Partner With Us", "Volunteer", "Request a Briefing"].map((item) => (
                  <li key={item}><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p style={labelStyle} className="text-foreground uppercase text-xs mb-4">About the Project</p>
              <ul className="flex flex-col gap-2.5">
                {["Our Vision", "Capital Campaign", "Roadmap", "Board of Directors", "Community Advisors", "Press & Media"].map((item) => (
                  <li key={item}><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</a></li>
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
    </div>
  );
}
