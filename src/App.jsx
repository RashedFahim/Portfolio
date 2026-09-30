import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import PortfolioContent from "./Components/PortfolioContent";
import Resume from "./Components/Resume";
import { Analytics } from "@vercel/analytics/react";

/* ------------------------------------------------------------------ */
/*  SCROLL CONTROLLER & ROUTE RESET                                   */
/* ------------------------------------------------------------------ */

function ScrollController() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      window.__lenis = lenis;
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, lenis]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  MAIN APP WITH ROUTER & OPTIMIZED SMOOTH SCROLL                   */
/* ------------------------------------------------------------------ */

export default function App() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: prefersReducedMotion ? 1 : 0.09, // Keep native-feeling motion for reduced-motion users
        wheelMultiplier: 1.05, // Snappy wheel scroll distance
        touchMultiplier: 1.5,
        smoothWheel: !prefersReducedMotion,
        syncTouch: false, // Keep native 1:1 mobile touch scroll
        stopInertiaOnNavigate: true,
      }}
    >
      <Router>
        <ScrollController />
        <Routes>
          <Route path="/" element={<PortfolioContent />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
        <Analytics />
      </Router>
    </ReactLenis>
  );
}
