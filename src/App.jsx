import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PortfolioContent from "./Components/PortfolioContent";
import Resume from "./Components/Resume";

/* ------------------------------------------------------------------ */
/*  MAIN APP WITH ROUTER                                             */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioContent />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}
