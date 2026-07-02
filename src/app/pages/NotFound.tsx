import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="text-center px-6">
        <p
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.01em" }}
          className="text-[10rem] text-border leading-none select-none"
        >
          404
        </p>
        <h1
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.01em" }}
          className="text-4xl uppercase text-foreground mb-3 -mt-4"
        >
          PAGE NOT FOUND
        </h1>
        <p className="text-muted-foreground mb-8">This page doesn't exist yet — just like our building.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-bold hover:bg-primary/90 transition-colors"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
