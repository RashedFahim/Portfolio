import { useEffect } from "react";

export function useScrollAnimation(active = true) {
  useEffect(() => {
    if (!active) return;

    const elements = Array.from(
      document.querySelectorAll(".scroll-animate:not(.animate-in)")
    );

    if (!elements.length) return;

    const revealAll = () => {
      elements.forEach((element) => element.classList.add("animate-in"));
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    // Wait for display/layout changes before measuring the initial viewport.
    const raf = requestAnimationFrame(() => {
      elements.forEach((element) => observer.observe(element));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [active]);
}
