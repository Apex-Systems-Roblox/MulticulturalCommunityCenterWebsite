const headingStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.01em" };

export const FUNDING_GOAL    = 2_400_000;
export const FUNDING_RAISED  = 1_380_000;

export function FundingBar({ raised, goal }: { raised: number; goal: number }) {
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
        <span style={headingStyle} className="text-foreground">${raised.toLocaleString()}</span>
        <span>of ${(goal / 1_000_000).toFixed(1)}M goal</span>
      </div>
    </div>
  );
}
