// ─────────────────────────────────────────────────────────────────────────────
// LOOPS MAILING LIST  (https://loops.so)
//
// 1. Create a free account at loops.so
// 2. Go to Audience → Forms → Create a Form
// 3. Copy the Form ID from the form's embed code (the part after /api/newsletter-form/)
// 4. Add to your .env:
//
//   VITE_LOOPS_FORM_ID=your-form-id-here
//
// Until set, the newsletter form will show a "not yet configured" notice.
// ─────────────────────────────────────────────────────────────────────────────

export const loopsFormId: string | null = import.meta.env.VITE_LOOPS_FORM_ID ?? null;

export async function subscribeToLoops(email: string): Promise<{ ok: boolean; message: string }> {
  if (!loopsFormId) {
    return { ok: false, message: "Mailing list not configured yet." };
  }
  try {
    const res = await fetch(`https://app.loops.so/api/newsletter-form/${loopsFormId}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }),
    });
    if (res.ok) return { ok: true, message: "You're in! We'll be in touch." };
    const body = await res.json().catch(() => ({}));
    return { ok: false, message: body?.message ?? "Something went wrong. Try again." };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}
