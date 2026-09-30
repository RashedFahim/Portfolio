export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (window.__lenis) {
    window.__lenis.scrollTo(el, {
      offset: -68,
      duration: prefersReducedMotion ? 0 : 1.1,
      immediate: prefersReducedMotion,
    });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
};
