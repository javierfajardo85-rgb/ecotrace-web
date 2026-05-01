import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";

const investorInter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-investor-inter",
});

const investorLora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-investor-lora",
});

export const metadata: Metadata = {
  title: "EcoTrace — Investor Overview",
  description:
    "EcoTrace Green Technologies Ltd — Pre-Seed SEIS Investment Overview. Physics-based carbon data infrastructure for global logistics.",
  alternates: { canonical: "https://www.ecotracegreen.com/investors" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "EcoTrace Green Technologies — Pre-Seed SEIS Investment",
    description:
      "Engineering a physics-based carbon data infrastructure for global logistics. £250k Pre-Seed SEIS round open.",
    url: "https://www.ecotracegreen.com/investors",
    type: "website",
    siteName: "EcoTrace Green Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoTrace Green Technologies — Pre-Seed SEIS Investment",
    description:
      "Engineering a physics-based carbon data infrastructure for global logistics. £250k Pre-Seed SEIS round open.",
  },
};

const investorCss = `
.investors-page,
.investors-page *,
.investors-page *::before,
.investors-page *::after { box-sizing: border-box; }
.investors-page * { margin: 0; padding: 0; }
.investors-page {
  font-family: var(--font-investor-inter), 'Inter', sans-serif;
  background: #f0f2ed;
  color: #1a1a1a;
  padding: 2rem 1rem;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.investors-page .w { max-width: 680px; margin: 0 auto; }
.investors-page .hero {
  background: #f5f7f2; border: 0.5px solid #d8e0d0;
  border-radius: 12px; padding: 2.5rem 2rem 2rem; margin-bottom: 10px;
  position: relative; overflow: hidden;
}
.investors-page .hero::before {
  content: ''; position: absolute; top: -40px; left: -40px;
  width: 320px; height: 320px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,158,106,0.12) 0%, transparent 70%);
}
.investors-page .hero::after {
  content: ''; position: absolute; bottom: -60px; right: 10%;
  width: 260px; height: 260px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,158,106,0.08) 0%, transparent 70%);
}
.investors-page .toprow { display: flex; align-items: center; gap: 10px; margin-bottom: 1.75rem; position: relative; z-index: 1; }
.investors-page .logo-mark { font-size: 17px; color: #1a1a1a; display: inline-flex; align-items: baseline; letter-spacing: -0.01em; }
.investors-page .logo-omega { font-size: 13px; color: #555; margin-right: 5px; font-weight: 300; }
.investors-page .logo-eco { font-weight: 300; }
.investors-page .logo-trace { font-weight: 500; }
.investors-page .seis-pill { margin-left: auto; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #4a7a60; border: 0.5px solid #4a7a60; padding: 4px 12px; border-radius: 20px; background: rgba(74,122,96,0.06); white-space: nowrap; }
.investors-page .hero-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-bottom: 0.75rem; position: relative; z-index: 1; }
.investors-page .hero-h1 { font-size: 26px; font-weight: 400; color: #1a1a1a; line-height: 1.25; margin-bottom: 0.85rem; position: relative; z-index: 1; font-family: var(--font-investor-lora), 'Lora', serif; }
.investors-page .hero-h1 strong { font-weight: 700; }
.investors-page .hero-sub { font-size: 13px; color: #555; line-height: 1.7; max-width: 520px; position: relative; z-index: 1; }
.investors-page .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 1.5rem; position: relative; z-index: 1; }
.investors-page .stat { background: #fff; border: 0.5px solid #d8e0d0; border-radius: 8px; padding: 0.85rem 1rem; }
.investors-page .stat-n { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1; margin-bottom: 4px; }
.investors-page .stat-l { font-size: 11px; color: #888; line-height: 1.4; }
.investors-page .sec-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #999; text-align: center; margin-bottom: 0.6rem; }
.investors-page .problem { background: #fff; border: 0.5px solid #e8e8e8; border-radius: 12px; padding: 1.5rem; margin-bottom: 10px; }
.investors-page .prob-h { font-size: 16px; font-weight: 400; color: #1a1a1a; line-height: 1.35; margin-bottom: 0.65rem; font-family: var(--font-investor-lora), 'Lora', serif; text-align: center; }
.investors-page .prob-body { font-size: 12px; color: #666; line-height: 1.7; text-align: center; max-width: 520px; margin: 0 auto 1rem; }
.investors-page .vs { display: grid; grid-template-columns: 1fr auto 1fr; align-items: start; gap: 10px; margin-top: 0.75rem; }
.investors-page .vs-col { padding: 0.85rem 1rem; border-radius: 8px; }
.investors-page .vs-col.neg { background: #fdf0f0; border: 0.5px solid #e8b4b4; }
.investors-page .vs-col.pos { background: #f2f7f2; border: 0.5px solid #a8c8a8; }
.investors-page .vs-head { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.investors-page .vs-col.neg .vs-head { color: #c04040; }
.investors-page .vs-col.pos .vs-head { color: #3a7040; }
.investors-page .vs-arrow { font-size: 14px; color: #bbb; align-self: center; text-align: center; }
.investors-page .vs-row { font-size: 11px; color: #666; line-height: 1.8; }
.investors-page .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.investors-page .card { background: #fff; border: 0.5px solid #e8e8e8; border-radius: 12px; padding: 1.25rem; }
.investors-page .card-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #999; margin-bottom: 0.6rem; }
.investors-page .card-h { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem; font-family: var(--font-investor-lora), 'Lora', serif; }
.investors-page .card-body { font-size: 12px; color: #666; line-height: 1.65; }
.investors-page .roadmap { background: #fff; border: 0.5px solid #e8e8e8; border-radius: 12px; padding: 1.5rem; margin-bottom: 10px; }
.investors-page .roadmap-h { font-size: 14px; font-weight: 400; color: #1a1a1a; font-family: var(--font-investor-lora), 'Lora', serif; text-align: center; margin-bottom: 1.25rem; }
.investors-page .timeline-v { display: flex; flex-direction: column; position: relative; padding-left: 2.5rem; }
.investors-page .timeline-v::before { content: ''; position: absolute; left: 0.6rem; top: 6px; bottom: 6px; width: 1px; background: #c8d8e0; }
.investors-page .tq { position: relative; padding-bottom: 0.9rem; display: flex; align-items: flex-start; gap: 0.75rem; }
.investors-page .tq:last-child { padding-bottom: 0; }
.investors-page .tq-dot { position: absolute; left: -1.9rem; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: #c8d8e0; border: 1.5px solid #fff; flex-shrink: 0; }
.investors-page .tq-dot.done { background: #4a7a60; }
.investors-page .tq-dot.next { background: #4a7a90; }
.investors-page .tq-q { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #999; min-width: 28px; margin-top: 2px; }
.investors-page .tq-content { flex: 1; }
.investors-page .tq-name { font-size: 13px; font-weight: 600; color: #1a1a1a; line-height: 1.3; margin-bottom: 2px; }
.investors-page .tq-name.done { color: #3a6a50; }
.investors-page .tq-detail { font-size: 11px; color: #888; line-height: 1.5; }
.investors-page .raise { background: #f5f7f2; border: 0.5px solid #d8e0d0; border-radius: 12px; padding: 1.5rem 1.75rem; margin-bottom: 10px; }
.investors-page .raise-top { text-align: center; margin-bottom: 1.25rem; }
.investors-page .raise-eyebrow { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #888; margin-bottom: 0.4rem; }
.investors-page .raise-amount { font-size: 36px; font-weight: 700; color: #1a1a1a; line-height: 1; font-family: var(--font-investor-lora), 'Lora', serif; }
.investors-page .raise-sub { font-size: 13px; color: #555; margin-top: 4px; }
.investors-page .raise-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; border-top: 0.5px solid #d8e0d0; padding-top: 1rem; margin-bottom: 1rem; }
.investors-page .ri-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #999; margin-bottom: 3px; }
.investors-page .ri-val { font-size: 13px; color: #1a1a1a; font-weight: 500; }
.investors-page .unlocks { border-top: 0.5px solid #d8e0d0; padding-top: 1rem; }
.investors-page .unlocks-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #999; margin-bottom: 0.65rem; }
.investors-page .unlock-row { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 0.55rem; }
.investors-page .unlock-row:last-child { margin-bottom: 0; }
.investors-page .unlock-num { font-size: 11px; font-weight: 700; color: #4a7a60; min-width: 18px; margin-top: 1px; flex-shrink: 0; }
.investors-page .unlock-text { font-size: 12px; color: #444; line-height: 1.5; }
.investors-page .unlock-text strong { font-weight: 600; color: #1a1a1a; }
.investors-page .loi-note { display: flex; align-items: flex-start; gap: 8px; margin-top: 0.85rem; background: #fffaf2; border: 0.5px solid #e0c870; border-radius: 8px; padding: 0.65rem 0.85rem; }
.investors-page .loi-icon { font-size: 12px; flex-shrink: 0; margin-top: 1px; color: #b07800; }
.investors-page .loi-text { font-size: 11px; color: #666; line-height: 1.5; }
.investors-page .loi-text strong { font-weight: 600; color: #1a1a1a; }
.investors-page .disclaimer { font-size: 10px; color: #aaa; line-height: 1.6; border-top: 0.5px solid #e8e8e8; padding-top: 0.75rem; margin-bottom: 10px; text-align: center; }
.investors-page .cta-row { display: flex; gap: 10px; margin-bottom: 10px; }
.investors-page .cta { flex: 1; padding: 0.85rem 1rem; border-radius: 50px; font-size: 12px; font-weight: 700; cursor: pointer; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; border: none; text-decoration: none; display: block; }
.investors-page .cta:hover { opacity: 0.88; }
.investors-page .cta-p { background: #4e8c62; color: #fff; }
.investors-page .cta-s { background: transparent; color: #1a1a1a; border: 1px solid #aaa; }
.investors-page .contact { background: #fff; border: 0.5px solid #e8e8e8; border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 12px; }
.investors-page .av { width: 38px; height: 38px; border-radius: 50%; background: #f0f4f0; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #4a7a60; flex-shrink: 0; border: 0.5px solid #d0ddd0; }
.investors-page .cn { font-size: 14px; font-weight: 600; color: #1a1a1a; }
.investors-page .cr { font-size: 11px; color: #888; margin-top: 1px; }
.investors-page .cl { margin-left: auto; display: flex; gap: 8px; }
.investors-page .clink { font-size: 11px; color: #4a7a60; text-decoration: none; padding: 5px 12px; border: 0.5px solid #4a7a60; border-radius: 50px; white-space: nowrap; }
@media (max-width: 520px) {
  .investors-page .stats { grid-template-columns: 1fr 1fr; }
  .investors-page .two-col { grid-template-columns: 1fr; }
  .investors-page .vs { grid-template-columns: 1fr; }
  .investors-page .vs-arrow { display: none; }
  .investors-page .raise-grid { grid-template-columns: 1fr; }
  .investors-page .contact { flex-wrap: wrap; }
  .investors-page .cl { margin-left: 0; margin-top: 8px; }
  .investors-page .hero-h1 { font-size: 22px; }
  .investors-page .raise-amount { font-size: 28px; }
}
`;

export default function InvestorsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: investorCss }} />
      <div
        className={`investors-page ${investorInter.variable} ${investorLora.variable}`}
      >
        <div className="w">
          <div className="hero">
            <div className="toprow">
              <div className="logo-mark">
                <span className="logo-omega">Ω</span>
                <span className="logo-eco">Eco</span>
                <span className="logo-trace">Trace</span>
              </div>
              <span className="seis-pill">
                SEIS Advance Assurance in progress
              </span>
            </div>
            <div className="hero-eyebrow">
              Pre-Seed Investment Overview · April 2026
            </div>
            <h1 className="hero-h1">
              Engineering a <strong>physics-based</strong> carbon data
              <br />
              infrastructure for global logistics
            </h1>
            <p className="hero-sub">
              EcoTrace Green Technologies Ltd is a pre-trading, deep-tech R&amp;D
              company developing the Omega (Ω) Engine — a proprietary
              Physics-Informed Neural Network architecture to process and
              calculate complex environmental data for the HGV logistics sector.
              Current PoC target: sub-1% MAPE on synthetic routes. Industrial
              real-world target: sub-3% calculation accuracy.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="stat-n">0.62%</div>
                <div className="stat-l">MAPE achieved on synthetic route PoC</div>
              </div>
              <div className="stat">
                <div className="stat-n">&lt;1% / &lt;3%</div>
                <div className="stat-l">
                  Synthetic target / Real-world target
                </div>
              </div>
              <div className="stat">
                <div className="stat-n">£250k</div>
                <div className="stat-l">Pre-Seed SEIS round · open</div>
              </div>
            </div>
          </div>

          <div className="problem">
            <div className="sec-label">
              Scientific Carbon Validation Engine (SCVE)
            </div>
            <h2 className="prob-h">
              A structural gap in logistics carbon data — with no physics-based
              solution at commercial grade
            </h2>
            <p className="prob-body">
              Current Scope 3 reporting relies on generalised statistical
              emission factors with error margins exceeding 30%. No commercially
              available system resolves this through first-principles physical
              computation. ISO 14083 and CSRD create structural demand for a new
              class of carbon data infrastructure.
            </p>
            <div className="vs">
              <div className="vs-col neg">
                <div className="vs-head">Industry today</div>
                <div className="vs-row">
                  Statistical emission factors
                  <br />
                  ±30% error margins
                  <br />
                  No physical traceability
                  <br />
                  CSRD compliance exposure
                </div>
              </div>
              <div className="vs-arrow">→</div>
              <div className="vs-col pos">
                <div className="vs-head">Omega (Ω) Engine target</div>
                <div className="vs-row">
                  Physics-informed computation
                  <br />
                  &lt;1% synthetic / &lt;3% real-world target
                  <br />
                  ISO 14083 engineering alignment (Q4)
                  <br />
                  Traceable, physics-grounded output
                </div>
              </div>
            </div>
          </div>

          <div className="two-col">
            <div className="card">
              <div className="card-label">Technology</div>
              <div className="card-h">Omega (Ω) Engine</div>
              <div className="card-body">
                A Physics-Informed Neural Network with 3 coupled PDEs,
                constrained by Newtonian mechanics and thermodynamics.
                Reconstructs fuel consumption from raw telemetry — including
                under GPS-degraded conditions. PoC experiments on synthetic data
                demonstrate parameter convergence within engineering targets.
              </div>
            </div>
            <div className="card">
              <div className="card-label">Differentiation</div>
              <div className="card-h">
                First-principles, not statistical proxies
              </div>
              <div className="card-body">
                Existing platforms — Watershed, Persefoni, IBM Envizi — use
                spend-based emission factors. The Omega (Ω) Engine addresses a
                structurally different engineering problem: physical energy
                consumption calculated via PINN-based inference, with no
                commercially deployed precedent.
              </div>
            </div>
          </div>

          <div className="roadmap">
            <div className="sec-label">Roadmap</div>
            <div className="roadmap-h">
              The Omega (Ω) Journey · 15-month R&amp;D programme
            </div>
            <div className="timeline-v">
              <div className="tq">
                <div className="tq-dot done"></div>
                <div className="tq-q">Pre</div>
                <div className="tq-content">
                  <div className="tq-name done">Foundational PoC</div>
                  <div className="tq-detail">
                    PINN experiments on synthetic data — 0.62% MAPE achieved.
                    Physics parameter convergence demonstrated.
                  </div>
                </div>
              </div>
              <div className="tq">
                <div className="tq-dot next"></div>
                <div className="tq-q">Q1</div>
                <div className="tq-content">
                  <div className="tq-name">Foundational infrastructure</div>
                  <div className="tq-detail">
                    HPC environment. Omega (Ω) Engine Data-Vault. CTO and Lead
                    Data Engineer onboarding.
                  </div>
                </div>
              </div>
              <div className="tq">
                <div className="tq-dot"></div>
                <div className="tq-q">Q2</div>
                <div className="tq-content">
                  <div className="tq-name">Neural core training</div>
                  <div className="tq-detail">
                    1M synthetic route simulations. Large-scale PINN training to
                    resolve high-dimensional physics.
                  </div>
                </div>
              </div>
              <div className="tq">
                <div className="tq-dot"></div>
                <div className="tq-q">Q3</div>
                <div className="tq-content">
                  <div className="tq-name">Enterprise integration</div>
                  <div className="tq-detail">
                    Non-commercial Technical Collaboration Agreements (TCAs).
                    150-unit technical stress-testing.
                  </div>
                </div>
              </div>
              <div className="tq">
                <div className="tq-dot"></div>
                <div className="tq-q">Q4</div>
                <div className="tq-content">
                  <div className="tq-name">Scientific validation</div>
                  <div className="tq-detail">
                    ISO 14083 engineering alignment. Industrial validation.
                    Transition to paid commercial pilot.
                  </div>
                </div>
              </div>
              <div className="tq">
                <div className="tq-dot"></div>
                <div className="tq-q">Q5</div>
                <div className="tq-content">
                  <div className="tq-name">Multi-modal expansion</div>
                  <div className="tq-detail">
                    Maritime and Rail PINN architecture. International
                    regulatory expansion.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="raise">
            <div className="raise-top">
              <div className="raise-eyebrow">The investment opportunity</div>
              <div className="raise-amount">£250,000</div>
              <div className="raise-sub">
                Pre-Seed Round · SEIS · 20% equity
              </div>
            </div>
            <div className="raise-grid">
              <div>
                <div className="ri-label">Tax relief</div>
                <div className="ri-val">
                  50% income tax relief + CGT exemption
                </div>
              </div>
              <div>
                <div className="ri-label">SEIS status</div>
                <div className="ri-val">
                  Advance Assurance in progress — documents prepared
                </div>
              </div>
              <div>
                <div className="ri-label">Use of proceeds</div>
                <div className="ri-val">
                  87% R&amp;D talent · 10% HPC · 3% governance
                </div>
              </div>
              <div>
                <div className="ri-label">Qualifying trade</div>
                <div className="ri-val">
                  Proprietary software R&amp;D — ITA 2007 s.192
                </div>
              </div>
            </div>
            <div className="unlocks">
              <div className="unlocks-label">
                What this investment unlocks
              </div>
              <div className="unlock-row">
                <div className="unlock-num">01</div>
                <div className="unlock-text">
                  <strong>CTO &amp; Lead Data Engineer</strong> — the two senior
                  technical hires required to transition the Omega (Ω) Engine
                  from PoC to a scalable R&amp;D system. Without this, Q1 cannot
                  begin.
                </div>
              </div>
              <div className="unlock-row">
                <div className="unlock-num">02</div>
                <div className="unlock-text">
                  <strong>HPC infrastructure</strong> — dedicated on-premise
                  high-performance computing nodes required for large-scale PINN
                  training across 1M+ synthetic routes. Cannot be replaced by
                  free-tier compute.
                </div>
              </div>
              <div className="unlock-row">
                <div className="unlock-num">03</div>
                <div className="unlock-text">
                  <strong>ISO 14083 engineering alignment</strong> — the
                  compliance framework to pursue certification in Q4, converting
                  the R&amp;D output into a commercially licensable data
                  product.
                </div>
              </div>
              <div className="loi-note">
                <div className="loi-icon">○</div>
                <div className="loi-text">
                  <strong>Letter of Intent required</strong> — a signed LOI from
                  an angel investor is the final document needed to complete the
                  SEIS Advance Assurance application package and submit it to
                  HMRC. This conversation is that step.
                </div>
              </div>
            </div>
          </div>

          <div className="disclaimer">
            This document is for discussion purposes only in the context of a
            SEIS pre-seed investment. EcoTrace Green Technologies Ltd is a
            pre-trading, pre-revenue entity. All forward-looking statements are
            contingent upon the successful resolution of substantial
            technological uncertainties. Investment carries a significant risk
            of capital loss. PoC results are based on synthetic data only and
            are not indicative of commercial performance. This is not a
            financial promotion under FSMA 2000.
          </div>

          <div className="cta-row">
            <a
              href="mailto:javier@ecotracegreen.com?subject=EcoTrace%20SEIS%20Investment%20Enquiry"
              className="cta cta-p"
            >
              Request investor pack
            </a>
            <a href="https://www.ecotracegreen.com" className="cta cta-s">
              ecotracegreen.com
            </a>
          </div>

          <div className="contact">
            <div className="av">JF</div>
            <div>
              <div className="cn">Javier Fajardo Valera</div>
              <div className="cr">
                Founder &amp; CEO · EcoTrace Green Technologies Ltd · Co. No.
                17180344
              </div>
            </div>
            <div className="cl">
              <a className="clink" href="https://www.ecotracegreen.com">
                ecotracegreen.com
              </a>
              <a className="clink" href="mailto:javier@ecotracegreen.com">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
