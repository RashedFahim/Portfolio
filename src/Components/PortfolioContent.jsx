import { useCallback, useEffect, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import DeveloperCursor from "./DeveloperCursor";
import GlobalStyles from "./GlobalStyles";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";

export default function PortfolioContent() {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  useScrollAnimation(revealed);

  // Stable callbacks so LoadingScreen's effect isn't restarted mid-fade
  const handleLoaderFadeStart = useCallback(() => setLoading(false), []);
  const handleLoaderExited = useCallback(() => setLoaderGone(true), []);

  // Safety net: force-reveal content if LoadingScreen can't finish
  // (e.g. rAF throttled in a background tab)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaderGone(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // The content div is rendered with display:none while loading; flip it to
  // visible first, then set opacity on the next frame so the 0.8s fade-in
  // actually plays (transitions don't run straight out of display:none).
  useEffect(() => {
    if (!loading) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [loading]);

  // === DISABLE INSPECT ===
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for inspect
    const handleKeyDown = (e) => {
      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+S
      if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {!loaderGone && (
        <LoadingScreen
          onComplete={handleLoaderFadeStart}
          onExited={handleLoaderExited}
        />
      )}

      <div 
        style={{ 
          background: "#0A0A0B", 
          color: "#F5F5F4", 
          fontFamily: "'Inter', sans-serif",
          display: loading ? 'none' : 'block',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: revealed ? 'auto' : 'none',
          // Clip transformed reveal edges without turning this wrapper into a vertical scroll container.
          overflow: 'clip',
          width: '100%',
          maxWidth: '100vw',
        }} 
        className="min-h-screen w-full"
      >
        <DeveloperCursor />

        <GlobalStyles />

        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
