import * as React from "react";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type SwallowHeaderMotion = {
  yPx: number;
  opacity: number;
  hidden: boolean;
};

/**
 * Drives a Solugen-like header “escape” animation during the hero swallow.
 *
 * Model:
 * - While the hero is in its sticky runway, we compute a normalized progress.
 * - After ~50% progress, the header slides up and fades out, synced to the swallow.
 */
export function useSwallowHeaderMotion(): SwallowHeaderMotion {
  const rafRef = React.useRef<number | null>(null);
  const latestYRef = React.useRef(0);
  const [state, setState] = React.useState<SwallowHeaderMotion>({
    yPx: 0,
    opacity: 1,
    hidden: false,
  });

  React.useEffect(() => {
    function compute() {
      rafRef.current = null;
      const scrollY = latestYRef.current;
      const hero = document.getElementById("page-lead");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroTop = scrollY + rect.top;
      const heroHeight = hero.offsetHeight || 1;
      const vh = window.innerHeight || 1;

      // Hero is taller than the viewport (runway). Normalize progress across the runway.
      const runway = Math.max(1, heroHeight - vh);
      const p = clamp01((scrollY - heroTop) / runway);

      // Start hiding around halfway through the swallow, finish by ~85%.
      const hideT = clamp01((p - 0.5) / 0.35);
      const eased = easeInOutCubic(hideT);

      const yPx = -110 * eased;
      const opacity = 1 - eased;
      const hidden = opacity <= 0.02;

      setState({ yPx, opacity, hidden });
    }

    function onScroll() {
      latestYRef.current = window.scrollY || 0;
      if (rafRef.current == null) rafRef.current = window.requestAnimationFrame(compute);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return state;
}

