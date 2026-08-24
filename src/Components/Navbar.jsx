import { useState } from "react";
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

  const scrollTo = (id) => {
    scrollToId(id);
    setMenuOpen(false);
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
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="nav-link text-sm tracking-wide font-medium shrink-0 whitespace-nowrap hover:opacity-80 transition-opacity"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                color: C.textMuted 
              }}
            >
              {n.label.toUpperCase()}
            </button>
          ))}
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
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => { scrollTo(n.id); setMenuOpen(false); }}
              className="text-sm text-left font-medium tracking-wide"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                color: C.textMuted 
              }}
            >
              {n.label.toUpperCase()}
            </button>
          ))}
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
