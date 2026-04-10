import * as React from "react";

type UseParallaxOptions = {
  maxOffsetPx?: number;
  strength?: number;
};

export function useParallax({
  maxOffsetPx = 80,
  strength = 0.25,
}: UseParallaxOptions = {}) {
  const rafRef = React.useRef<number | null>(null);
  const latestYRef = React.useRef(0);
  const [offsetPx, setOffsetPx] = React.useState(0);

  React.useEffect(() => {
    function update() {
      rafRef.current = null;
      const y = latestYRef.current;
      const next = Math.max(-maxOffsetPx, Math.min(maxOffsetPx, y * strength));
      setOffsetPx(next);
    }

    function onScroll() {
      latestYRef.current = window.scrollY || 0;
      if (rafRef.current == null) rafRef.current = window.requestAnimationFrame(update);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [maxOffsetPx, strength]);

  return offsetPx;
}

