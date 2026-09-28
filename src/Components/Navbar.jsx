import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import C from "./constants";
import { scrollToId } from "./utils";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  // { id: "certifications", label: "Certifications" },
  // { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const EXT_LINKS = [
  // { label: "Blog", href: "#" },
  // { label: "Creations", href: "#" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Scroll detection to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page detection (Contact section)
      if (documentHeight - scrollPosition < 80) {
        setActiveSection("contact");
        return;
      }

      // Top of page (Hero section)
      if (window.scrollY < 180) {
        setActiveSection("");
        return;
      }

      const navOffset = 90; // Accounts for 64px navbar + detection boundary
      let currentSection = "";

      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navOffset && rect.bottom > navOffset) {
            currentSection = item.id;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    const handleUserScrollInterrupt = () => {
      isClickingRef.current = false;
    };

    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", handleUserScrollInterrupt, { passive: true });
    window.addEventListener("touchstart", handleUserScrollInterrupt, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", handleUserScrollInterrupt);
      window.removeEventListener("touchstart", handleUserScrollInterrupt);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    if (id === "hero") {
      setActiveSection("");
    } else {
      setActiveSection(id);
    }
    isClickingRef.current = true;
    scrollToId(id);
    setMenuOpen(false);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1100);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ 
        background: "rgba(11,12,16,0.72)", 
        backdropFilter: "blur(16px)", 
        WebkitBackdropFilter: "blur(16px)", 
        borderBottom: `1px solid ${C.border}` 
      }}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-4 h-16 flex items-center justify-between max-w-[1850px] mx-auto">
        <div className="pl-2 md:pl-0">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-0.5 font-bold"
            style={{ 
              color: C.green, 
              fontFamily: "'JetBrains Mono', monospace" 
            }}
          >
            <span className="text-xl">R</span>
            <span className="w-1.5 h-5 animate-pulse" style={{ background: C.green }}></span>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10 overflow-x-auto">
          {NAV.map((n) => {
            const isActive = activeSection === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="nav-link text-sm tracking-wide font-medium shrink-0 whitespace-nowrap relative py-1 hover:opacity-80 transition-colors"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  color: isActive ? C.text : C.textMuted 
                }}
              >
                {n.label.toUpperCase()}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full pointer-events-none transition-all duration-300 ease-out origin-center"
                  style={{
                    background: C.green,
                    boxShadow: `0 0 8px ${C.green}88`,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
          {EXT_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="ext-link flex items-center gap-1 px-3 py-1.5 rounded-md text-sm shrink-0 whitespace-nowrap"
              style={{ 
                border: `1px solid ${C.green}55`, 
                color: C.green, 
                fontFamily: "'JetBrains Mono', monospace" 
              }}
            >
              {l.label.toUpperCase()} <ExternalLink size={11} />
            </Link>
          ))}
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 text-sm">
          {/* Resume button - visible on mobile only */}
          <Link
            to="/resume"
            className="lg:hidden flex items-center gap-1 px-3 py-1.5 rounded-md text-sm shrink-0 whitespace-nowrap"
            style={{ 
              border: `1px solid ${C.green}55`, 
              color: C.green, 
              fontFamily: "'JetBrains Mono', monospace" 
            }}
          >
            RESUME <ExternalLink size={11} />
          </Link>
          
          {/* Open to Work - visible on desktop only with mobile style */}
          <div className="hidden lg:flex items-center gap-2">
            <span 
              className="w-1.5 h-1.5 rounded-full pulse-dot" 
              style={{ background: "#DC143C" }} 
            />
            <span 
              className="text-sm"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                color: C.green 
              }}
            >
              Open to Work
            </span>
          </div>
          
          {/* Hamburger menu button */}
          <button 
            className="lg:hidden ml-2" 
            onClick={() => setMenuOpen((v) => !v)} 
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto w-full">
          {NAV.map((n) => {
            const isActive = activeSection === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-left font-medium tracking-wide w-fit relative py-1 transition-colors"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  color: isActive ? C.text : C.textMuted 
                }}
              >
                {n.label.toUpperCase()}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full pointer-events-none transition-all duration-300 ease-out origin-center"
                  style={{
                    background: C.green,
                    boxShadow: `0 0 8px ${C.green}88`,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
          {/* Open to Work in dropdown with same style */}
          <div 
            className="flex items-center gap-2 text-sm pt-1"
            style={{ 
              fontFamily: "'JetBrains Mono', monospace", 
              color: C.green
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full pulse-dot" 
              style={{ background: "#DC143C" }} 
            />
            Open to Work
          </div>
        </div>
      )}
    </header>
  );
}
