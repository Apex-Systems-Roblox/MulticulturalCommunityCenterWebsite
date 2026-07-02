// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE — donor list
//
// 1. Create a project at https://supabase.com
// 2. Run this SQL in the Supabase SQL editor to create the donors table:
//
//   create table donors (
//     id            bigint generated always as identity primary key,
//     name          text    not null,
//     amount        text    not null,
//     type          text    not null,
//     display_order int     not null default 0
//   );
//   alter table donors enable row level security;
//   create policy "public read" on donors for select using (true);
//
// 3. Add rows via the Supabase Table Editor (no code needed).
// 4. Add to your .env:

 VITE_SUPABASE_URL=https://htbatltuoshfcbizqevm.supabase.co
 VITE_SUPABASE_ANON_KEY=sb_publishable_axwpz6fwVnHt_oINdrCg_Q_gZkMsxjl
//
// Until configured, the page falls back to the hardcoded FALLBACK_DONORS list below.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const url  = import.meta.env.VITE_SUPABASE_URL     as string | undefined;
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && key ? createClient(url, key) : null;

export interface Donor {
  name:   string;
  amount: string;
  type:   string;
}

export const FALLBACK_DONORS: Donor[] = [
  { name: "Greenfield Family Foundation",   amount: "$500,000", type: "Lead Gift"    },
  { name: "City of Eastside Municipal Grant", amount: "$230,000", type: "Public Grant" },
  { name: "Horizon Community Trust",        amount: "$150,000", type: "Foundation"   },
  { name: "Anonymous Donor",               amount: "$100,000", type: "Individual"   },
  { name: "Regional Arts & Culture Fund",  amount: "$80,000",  type: "Grant"        },
  { name: "Community members & friends",   amount: "$320,000+", type: "Grassroots"  },
];

export async function fetchDonors(): Promise<Donor[]> {
  if (!supabase) return FALLBACK_DONORS;
  const { data, error } = await supabase
    .from("donors")
    .select("name, amount, type")
    .order("display_order", { ascending: true });
  if (error || !data?.length) return FALLBACK_DONORS;
  return data as Donor[];
}
