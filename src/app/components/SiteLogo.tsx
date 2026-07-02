import { Globe2 } from "lucide-react";
import { logoSrc, siteName, tagline } from "@/app/config/brand";

export function SiteLogo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0">
      {logoSrc ? (
        <img src={logoSrc} alt={`${siteName} logo`} className="h-8 w-auto object-contain" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Globe2 size={16} className="text-primary-foreground" />
        </div>
      )}
      <div className="flex flex-col leading-none">
        <span
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: "0.06em" }}
          className="text-lg text-foreground uppercase leading-none"
        >
          {siteName}
        </span>
        {showTagline && (
          <span className="text-muted-foreground text-[10px] tracking-widest uppercase leading-none mt-0.5">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}
