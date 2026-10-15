"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the leading number of `value` (e.g. "20+", "100%", "24/7") up from zero
 * when it scrolls into view. Renders the final value on the server and when the
 * visitor prefers reduced motion.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (target === null || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setCurrent(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {current === null || target === null ? value : `${current}${suffix}`}
    </span>
  );
}
