import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PortfolioContent from "./Components/PortfolioContent";
import Resume from "./Components/Resume";
import { Analytics } from "@vercel/analytics/react"

/* ------------------------------------------------------------------ */
/*  SCROLL TO TOP ON ROUTE CHANGE                                    */
/* ------------------------------------------------------------------ */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  MAIN APP WITH ROUTER                                             */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioContent />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      <Analytics />
    </Router>
  );
}
