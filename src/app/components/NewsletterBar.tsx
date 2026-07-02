import { useState } from "react";
import { subscribeToLoops, loopsFormId } from "@/app/config/loops";

export function NewsletterBar() {
  const [emailVal, setEmailVal] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailVal.trim()) return;
    setState("loading");
    const result = await subscribeToLoops(emailVal.trim());
    setState(result.ok ? "success" : "error");
    setMessage(result.message);
    if (result.ok) setEmailVal("");
  }

  return (
    <section className="bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <h2
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, lineHeight: 0.92, letterSpacing: "0.01em" }}
          className="text-5xl md:text-7xl uppercase text-primary-foreground"
        >
          FOLLOW<br />THE BUILD
        </h2>

        <div className="flex flex-col gap-5">
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Get quarterly updates on the capital campaign, site selection, hiring news, and community planning sessions.
            {!loopsFormId && (
              <span className="block mt-2 text-primary-foreground/50 text-sm italic">
                (Mailing list not yet connected — add VITE_LOOPS_FORM_ID to .env)
              </span>
            )}
          </p>

          {state === "success" ? (
            <div className="border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-4">
              <p className="text-primary-foreground font-semibold">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-3 text-sm outline-none focus:border-primary-foreground/60 transition-colors"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="bg-primary-foreground text-primary px-6 py-3 font-bold hover:bg-primary-foreground/90 transition-colors whitespace-nowrap disabled:opacity-60"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.08em" }}
              >
                {state === "loading" ? "SENDING…" : "KEEP ME POSTED →"}
              </button>
            </form>
          )}

          {state === "error" && (
            <p className="text-primary-foreground/70 text-sm">{message}</p>
          )}
          <p className="text-primary-foreground/40 text-xs">4–6 emails per year. No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
