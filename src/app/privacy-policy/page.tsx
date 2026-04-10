import { HeaderNav } from "@/components/HeaderNav";
import { BlackFooterBar } from "@/components/BlackFooterBar";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-light tracking-[-0.03em] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
          Last updated: April 2026
        </p>

        <div className="mt-10 space-y-9 text-[15px] font-light leading-relaxed text-foreground/80">
          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              1. Data Controller and Jurisdiction
            </h2>
            <p className="mt-3">
              EcoTrace Green Solutions Ltd is the data controller for the personal data processed
              through this website and related SaaS services. This Privacy Policy is governed by
              the laws and data protection framework applicable in London, United Kingdom.
            </p>
            <p className="mt-3">
              Note: EcoTrace is committed to full compliance with the UK Information
              Commissioner&apos;s Office (ICO) standards for industrial data processing.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              2. Data Collection &amp; Algorithm Integration
            </h2>
            <p className="mt-3">
              We collect identification and contact information (name, email, company, and phone
              number) and technical usage data. Specifically, our platform processes transactional
              and supply chain data required for the execution of Algorithm Ω to provide verifiable
              Scope 3 auditing.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              3. Purpose of Processing
            </h2>
            <p className="mt-3">
              We process data to provide our autonomous auditing services, meet regulatory
              compliance (including UK SDR and CBAM frameworks), and maintain the integrity of our
              SaaS infrastructure. All processing is performed under lawful bases defined by UK
              GDPR.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-medium tracking-[-0.02em] text-foreground">
              4. Industrial Data Sovereignty &amp; Security Protocol
            </h2>
            <p className="mt-3">
              At EcoTrace, we recognize that industrial transactional data is the lifeblood of
              your competitive advantage. Our platform is engineered to ensure Data Sovereignty
              through the application of Algorithm Ω, which facilitates the autonomous auditing of
              supply chain emissions without compromising sensitive commercial information.
            </p>
            <p className="mt-3">
              All data processed for Scope 3 transparency is subject to military-grade encryption
              (AES-256) and stored within high-availability UK-based cloud environments, ensuring a
              secure Chain of Custody that meets the rigorous standards of international industrial
              compliance.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              5. User Rights (GDPR)
            </h2>
            <p className="mt-3">
              Subject to UK law, you have the right to access, rectification, erasure, and
              portability of your data. You also have the right to lodge a complaint with the UK
              Information Commissioner&apos;s Office (ICO).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
              6. Contact Information
            </h2>
            <p className="mt-3">
              For privacy requests regarding our technical protocols or data handling, please
              contact EcoTrace Green Solutions Ltd at our operations in London, United Kingdom.
            </p>
          </section>
        </div>
      </section>

      <BlackFooterBar />
    </main>
  );
}
