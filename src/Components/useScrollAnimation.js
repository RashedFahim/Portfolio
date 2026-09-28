import { useEffect } from "react";

export function useScrollAnimation(active = true) {
  useEffect(() => {
    if (!active) return;

    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Give DOM a frame to ensure display:block layout is calculated
    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll(".scroll-animate:not(.animate-in)");
      elements.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [active]);
}
