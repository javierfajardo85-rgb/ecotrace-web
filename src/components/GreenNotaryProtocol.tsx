import { cn } from "@/lib/utils";
import { BadgeCheck, FileText, FlaskConical } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const steps: Step[] = [
  {
    title: "Ingestion",
    description: "Automated capture of invoices and delivery notes.",
    icon: FileText,
  },
  {
    title: "Processing",
    description: "Standardized chemical/mathematical analysis.",
    icon: FlaskConical,
  },
  {
    title: "Certification",
    description: "Issuance of the immutable EcoTrace seal.",
    icon: BadgeCheck,
  },
];

export function GreenNotaryProtocol({ className }: { className?: string }) {
  return (
    <section
      id="protocolo"
      className={cn("bg-background text-foreground", className)}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Green Notary Protocol
          </p>
          <h2 className="mt-3 font-heading text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
            Three steps to certify the truth
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            A technical, auditable workflow that turns operational evidence into a robust
            environmental certification.
          </p>
        </div>

        <div className="relative mt-10 md:mt-12">
          {/* Desktop connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden md:block">
            <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  {/* Mobile vertical connector */}
                  <div className="pointer-events-none absolute -left-2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent sm:-left-3 sm:block md:hidden" />

                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-accent transition-colors duration-200 group-hover:border-accent/35">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            Step {idx + 1}
                          </span>
                          <span className="font-heading text-xl leading-snug tracking-[-0.02em]">
                            {step.title}
                          </span>
                        </div>
                      </div>

                      <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(27,191,60,0.20),transparent_60%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

