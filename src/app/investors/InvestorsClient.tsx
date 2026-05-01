"use client";

import { Inter, Lora } from "next/font/google";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
.investors-page .timeline-v::before { display: none; }
.investors-page .timeline-line { position: absolute; left: 0.6rem; top: 6px; bottom: 6px; width: 1px; background: #c8d8e0; }
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

// ─── Shared animation variants ───────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const dotPop = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  },
};

const tqSlide = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

// ─── Animated counter: 0 → 0.62% ─────────────────────────────────────────────

function MAPECounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0.00");

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(mv, 0.62, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) { setDisplay(v.toFixed(2)); },
    });
    return () => ctrl.stop();
  }, [isInView, mv]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-n">{display}%</div>
      <div className="stat-l">MAPE achieved on synthetic route PoC</div>
    </div>
  );
}

// ─── Animated counter: 0 → £250k ─────────────────────────────────────────────

function FundCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(mv, 250, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) { setDisplay(String(Math.round(v))); },
    });
    return () => ctrl.stop();
  }, [isInView, mv]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-n">£{display}k</div>
      <div className="stat-l">Pre-Seed SEIS round · open</div>
    </div>
  );
}

// ─── Timeline data ────────────────────────────────────────────────────────────

const timelineItems = [
  { q: "Pre", name: "Foundational PoC",           done: true,  next: false, detail: "PINN experiments on synthetic data — 0.62% MAPE achieved. Physics parameter convergence demonstrated." },
  { q: "Q1",  name: "Foundational infrastructure", done: false, next: true,  detail: "HPC environment. Omega (Ω) Engine Data-Vault. CTO and Lead Data Engineer onboarding." },
  { q: "Q2",  name: "Neural core training",         done: false, next: false, detail: "1M synthetic route simulations. Large-scale PINN training to resolve high-dimensional physics." },
  { q: "Q3",  name: "Enterprise integration",       done: false, next: false, detail: "Non-commercial Technical Collaboration Agreements (TCAs). 150-unit technical stress-testing." },
  { q: "Q4",  name: "Scientific validation",        done: false, next: false, detail: "ISO 14083 engineering alignment. Industrial validation. Transition to paid commercial pilot." },
  { q: "Q5",  name: "Multi-modal expansion",        done: false, next: false, detail: "Maritime and Rail PINN architecture. International regulatory expansion." },
];

// ─── Main client component ────────────────────────────────────────────────────

export default function InvestorsClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: investorCss }} />
      <div className={`investors-page ${investorInter.variable} ${investorLora.variable}`}>
        <div className="w">

          {/* ── HERO ── */}
          <motion.div
            className="hero"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="toprow" variants={fadeUp}>
              <div className="logo-mark">
                <span className="logo-omega">Ω</span>
                <span className="logo-eco">Eco</span>
                <span className="logo-trace">Trace</span>
              </div>
              <span className="seis-pill">SEIS Advance Assurance in progress</span>
            </motion.div>

            <motion.div className="hero-eyebrow" variants={fadeUp}>
              Pre-Seed Investment Overview · April 2026
            </motion.div>

            <motion.h1 className="hero-h1" variants={fadeUp}>
              Engineering a <strong>physics-based</strong> carbon data
              <br />
              infrastructure for global logistics
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              EcoTrace Green Technologies Ltd is a pre-trading, deep-tech R&amp;D
              company developing the Omega (Ω) Engine — a proprietary
              Physics-Informed Neural Network architecture to process and
              calculate complex environmental data for the HGV logistics sector.
              Current PoC target: sub-1% MAPE on synthetic routes. Industrial
              real-world target: sub-3% calculation accuracy.
            </motion.p>

            <motion.div className="stats" variants={fadeUp}>
              <MAPECounter />
              <motion.div
                className="stat"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              >
                <div className="stat-n">&lt;1% / &lt;3%</div>
                <div className="stat-l">Synthetic target / Real-world target</div>
              </motion.div>
              <FundCounter />
            </motion.div>
          </motion.div>

          {/* ── PROBLEM ── */}
          <motion.div
            className="problem"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="sec-label" variants={fadeUp}>
              Scientific Carbon Validation Engine (SCVE)
            </motion.div>
            <motion.h2 className="prob-h" variants={fadeUp}>
              A structural gap in logistics carbon data — with no physics-based
              solution at commercial grade
            </motion.h2>
            <motion.p className="prob-body" variants={fadeUp}>
              Current Scope 3 reporting relies on generalised statistical
              emission factors with error margins exceeding 30%. No commercially
              available system resolves this through first-principles physical
              computation. ISO 14083 and CSRD create structural demand for a new
              class of carbon data infrastructure.
            </motion.p>
            <motion.div className="vs" variants={fadeUp}>
              <div className="vs-col neg">
                <div className="vs-head">Industry today</div>
                <div className="vs-row">
                  Statistical emission factors<br />
                  ±30% error margins<br />
                  No physical traceability<br />
                  CSRD compliance exposure
                </div>
              </div>
              <div className="vs-arrow">→</div>
              <div className="vs-col pos">
                <div className="vs-head">Omega (Ω) Engine target</div>
                <div className="vs-row">
                  Physics-informed computation<br />
                  &lt;1% synthetic / &lt;3% real-world target<br />
                  ISO 14083 engineering alignment (Q4)<br />
                  Traceable, physics-grounded output
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── TWO-COL CARDS ── */}
          <div className="two-col">
            {[
              {
                label: "Technology",
                title: "Omega (Ω) Engine",
                body: "A Physics-Informed Neural Network with 3 coupled PDEs, constrained by Newtonian mechanics and thermodynamics. Reconstructs fuel consumption from raw telemetry — including under GPS-degraded conditions. PoC experiments on synthetic data demonstrate parameter convergence within engineering targets.",
              },
              {
                label: "Differentiation",
                title: "First-principles, not statistical proxies",
                body: "Existing platforms — Watershed, Persefoni, IBM Envizi — use spend-based emission factors. The Omega (Ω) Engine addresses a structurally different engineering problem: physical energy consumption calculated via PINN-based inference, with no commercially deployed precedent.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className="card-label">{card.label}</div>
                <div className="card-h">{card.title}</div>
                <div className="card-body">{card.body}</div>
              </motion.div>
            ))}
          </div>

          {/* ── ROADMAP ── */}
          <motion.div
            className="roadmap"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="sec-label" variants={fadeUp}>Roadmap</motion.div>
            <motion.div className="roadmap-h" variants={fadeUp}>
              The Omega (Ω) Journey · 15-month R&amp;D programme
            </motion.div>

            <motion.div
              className="timeline-v"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              }}
            >
              {/* Animated line replaces the ::before pseudo-element */}
              <motion.div
                className="timeline-line"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                style={{ transformOrigin: "top" }}
              />

              {timelineItems.map((item, i) => (
                <motion.div key={i} className="tq" variants={tqSlide}>
                  <motion.div
                    className={`tq-dot${item.done ? " done" : item.next ? " next" : ""}`}
                    variants={dotPop}
                  />
                  <div className="tq-q">{item.q}</div>
                  <div className="tq-content">
                    <div className={`tq-name${item.done ? " done" : ""}`}>{item.name}</div>
                    <div className="tq-detail">{item.detail}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RAISE ── */}
          <motion.div
            className="raise"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="raise-top" variants={fadeUp}>
              <div className="raise-eyebrow">The investment opportunity</div>
              <div className="raise-amount">£250,000</div>
              <div className="raise-sub">Pre-Seed Round · SEIS · 20% equity</div>
            </motion.div>

            <motion.div className="raise-grid" variants={fadeUp}>
              <div>
                <div className="ri-label">Tax relief</div>
                <div className="ri-val">50% income tax relief + CGT exemption</div>
              </div>
              <div>
                <div className="ri-label">SEIS status</div>
                <div className="ri-val">Advance Assurance in progress — documents prepared</div>
              </div>
              <div>
                <div className="ri-label">Use of proceeds</div>
                <div className="ri-val">87% R&amp;D talent · 10% HPC · 3% governance</div>
              </div>
              <div>
                <div className="ri-label">Qualifying trade</div>
                <div className="ri-val">Proprietary software R&amp;D — ITA 2007 s.192</div>
              </div>
            </motion.div>

            <motion.div className="unlocks" variants={fadeUp}>
              <div className="unlocks-label">What this investment unlocks</div>
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
                  the R&amp;D output into a commercially licensable data product.
                </div>
              </div>

              {/* LOI note — slides in from left after 0.3s delay */}
              <motion.div
                className="loi-note"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              >
                <div className="loi-icon">○</div>
                <div className="loi-text">
                  <strong>Letter of Intent required</strong> — a signed LOI from
                  an angel investor is the final document needed to complete the
                  SEIS Advance Assurance application package and submit it to
                  HMRC. This conversation is that step.
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── DISCLAIMER ── */}
          <motion.div
            className="disclaimer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            This document is for discussion purposes only in the context of a
            SEIS pre-seed investment. EcoTrace Green Technologies Ltd is a
            pre-trading, pre-revenue entity. All forward-looking statements are
            contingent upon the successful resolution of substantial
            technological uncertainties. Investment carries a significant risk
            of capital loss. PoC results are based on synthetic data only and
            are not indicative of commercial performance. This is not a
            financial promotion under FSMA 2000.
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Primary CTA — subtle repeating pulse */}
            <motion.a
              href="mailto:javier@ecotracegreen.com?subject=EcoTrace%20SEIS%20Investment%20Enquiry"
              className="cta cta-p"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              Request investor pack
            </motion.a>
            <a href="https://www.ecotracegreen.com" className="cta cta-s">
              ecotracegreen.com
            </a>
          </motion.div>

          {/* ── CONTACT ── */}
          <motion.div
            className="contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
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
          </motion.div>

        </div>
      </div>
    </>
  );
}
