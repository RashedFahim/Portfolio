import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  HIGH-PERFORMANCE HARDWARE-ACCELERATED CUSTOM CURSOR              */
/* ------------------------------------------------------------------ */

function DeveloperCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Keep the pointer effect for fine mouse input only.
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let rafId;
    let isLoopRunning = false;
    let isVisible = false;
    let isHovering = false;

    // Mouse target coordinates
    let mouseX = -100;
    let mouseY = -100;

    // Trailing ring coordinates
    let ringX = -100;
    let ringY = -100;

    // Only keep the follower loop alive while a mouse is inside the page.
    const render = () => {
      if (!isVisible) {
        isLoopRunning = false;
        rafId = null;
        return;
      }

      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const startRender = () => {
      if (isLoopRunning) return;
      isLoopRunning = true;
      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      startRender();

      // Hardware-accelerated direct transform on compositor thread
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      isLoopRunning = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactive = !!target.closest(
        'a, button, .clickable, [role="button"], input, textarea, .ext-link, .nav-link, .card-hover'
      );

      if (interactive !== isHovering) {
        isHovering = interactive;
        if (ringRef.current && dotRef.current) {
          if (isHovering) {
            ringRef.current.style.width = "38px";
            ringRef.current.style.height = "38px";
            ringRef.current.style.borderColor = "#10B981";
            ringRef.current.style.opacity = "1";
            dotRef.current.style.width = "8px";
            dotRef.current.style.height = "8px";
          } else {
            ringRef.current.style.width = "22px";
            ringRef.current.style.height = "22px";
            ringRef.current.style.borderColor = "rgba(16, 185, 129, 0.45)";
            ringRef.current.style.opacity = "0.6";
            dotRef.current.style.width = "5px";
            dotRef.current.style.height = "5px";
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Central dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform"
        style={{
          width: "5px",
          height: "5px",
          background: "#10B981",
          boxShadow: "0 0 16px rgba(16, 185, 129, 0.6)",
          opacity: 0,
          transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease",
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />

      {/* Trailing smooth ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full will-change-transform"
        style={{
          width: "22px",
          height: "22px",
          border: "1.5px solid rgba(16, 185, 129, 0.45)",
          opacity: 0,
          transition: "opacity 0.2s ease, width 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s ease",
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
        @media (hover: none), (pointer: coarse) {
          .fixed.pointer-events-none { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { cursor: auto !important; }
          .fixed.pointer-events-none { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default DeveloperCursor;
