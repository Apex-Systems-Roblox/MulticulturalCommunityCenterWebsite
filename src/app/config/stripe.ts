// ─────────────────────────────────────────────────────────────────────────────
// STRIPE PAYMENT LINKS
//
// 1. Go to https://dashboard.stripe.com/payment-links
// 2. Create a Payment Link for each tier (fixed price)
// 3. Create one more with "Customer chooses price" for custom amounts
// 4. Paste the URLs into your .env file:
//
//   VITE_STRIPE_LINK_50=https://buy.stripe.com/...
//   VITE_STRIPE_LINK_250=https://buy.stripe.com/...
//   VITE_STRIPE_LINK_1000=https://buy.stripe.com/...
//   VITE_STRIPE_LINK_5000=https://buy.stripe.com/...
//   VITE_STRIPE_LINK_CUSTOM=https://buy.stripe.com/...   ← customer chooses price
//
// Until links are set, donation buttons will show an "unavailable" message.
// ─────────────────────────────────────────────────────────────────────────────

export const stripeLinks: Record<string, string | null> = {
  "50":     import.meta.env.VITE_STRIPE_LINK_50     ?? null,
  "250":    import.meta.env.VITE_STRIPE_LINK_250    ?? null,
  "1000":   import.meta.env.VITE_STRIPE_LINK_1000   ?? null,
  "5000":   import.meta.env.VITE_STRIPE_LINK_5000   ?? null,
  "custom": import.meta.env.VITE_STRIPE_LINK_CUSTOM ?? null,
};

export function getStripeLink(amount: string): string | null {
  return stripeLinks[amount] ?? stripeLinks["custom"] ?? null;
}
