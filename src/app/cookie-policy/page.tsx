import { HeaderNav } from "@/components/HeaderNav";
import { BlackFooterBar } from "@/components/BlackFooterBar";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-light tracking-[-0.03em] sm:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
          Last updated: April 2026
        </p>

        <div className="mt-10 space-y-9 text-[15px] font-light leading-relaxed text-foreground/80">
          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              1. Who We Are
            </h2>
            <p className="mt-3">
              This Cookie Policy explains how EcoTrace Green Solutions Ltd uses cookies and similar
              technologies on this website and related UK-based SaaS services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              2. What Cookies We Use
            </h2>
            <p className="mt-3">
              We use essential cookies required for security, session continuity, and core platform
              functionality. Subject to consent, we may also use analytics and performance cookies
              to understand usage and improve reliability.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              3. Why We Use Cookies
            </h2>
            <p className="mt-3">
              Cookies help us operate the service securely, remember user preferences, and monitor
              technical performance. For non-essential cookies, processing is based on consent
              under UK GDPR and PECR requirements.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              4. Your Choices
            </h2>
            <p className="mt-3">
              You can accept all cookies or limit usage to essential cookies only. You may also
              control cookies through browser settings. Disabling some cookies may affect certain
              platform features.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              5. Contact
            </h2>
            <p className="mt-3">
              For questions about our use of cookies and related data practices, contact EcoTrace
              Green Solutions Ltd in London, United Kingdom.
            </p>
          </section>
        </div>
      </section>

      <BlackFooterBar />
    </main>
  );
}
