import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import Resume from './Resume';
import {
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Send,
  Award,
  GraduationCap,
  Briefcase,
} from "lucide-react";

// Inline Github icon component
const Github = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

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

const ORBIT_DURATION = 90;
const ORBIT_TAGS = [
  { label: "Full Stack Dev", angle: 270 },
  { label: "Software Dev", angle: 315 },
  { label: "Artificial Intelligence", angle: 0 },
  { label: "Machine Learning", angle: 45 },
  { label: "Video Editor", angle: 90 },
  { label: "UI/UX Designer", angle: 135 },
  { label: "Computer Vision", angle: 180 },
  { label: "Embedded Systems", angle: 225 },
];

const SKILLS = [
  {
    category: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV"
    ]
  },
  {
    category: "Programming",
    items: [
      "Python",
      "C",
      "C++",
      "JavaScript",
      "SQL"
    ]
  },
  {
    category: "Data & AI Tools",
    items: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Jupyter",
      "Google Colab"
    ]
  },
  {
    category: "Web Development",
    items: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Django",
      "REST API"
    ]
  },
  {
    category: "Databases",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB"
    ]
  },
  {
    category: "Computer Vision & AI",
    items: [
      "YOLO",
      "Ultralytics",
      "Roboflow",
      "Image Processing"
    ]
  },
  {
    category: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Linux",
      "VS Code",
      "Postman"
    ]
  },
  {
    category: "Hardware & Robotics",
    items: [
      "Arduino",
      "Raspberry Pi",
      "Embedded Systems",
      "Circuit Design"
    ]
  }
];

const PROJECTS = [
  {
    title: "Deep Learning for Automated Renal Function Analysis from DMSA Scans",
    desc: "Developed a deep learning pipeline using U-Net segmentation and ConvNeXt for automated kidney analysis from DMSA renal scans, addressing class imbalance and multi-view fusion for reliable clinical outputs.",
    tags: ["Deep Learning", "U-Net", "ConvNeXt", "Medical Image Analysis", "Python"],
    live: "#",
    repo: "https://github.com/RashedFahim/RenalHealthDL",
  },
  {
    title: "Projecting Student Depression using Machine Learning",
    desc: "Built predictive models (Random Forest, Logistic Regression, SVM) to identify at-risk students, achieving high F1-scores through feature selection and data preprocessing on mental health indicators.",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    live: "#",
    repo: "https://github.com/RashedFahim/Predicting-Student-Depression-Using-ML",
  },
  {
    title: "Neural Network Based Clustering of AG News Dataset",
    desc: "Designed a neural encoder compressing embeddings into 64D latent space with K-Means clustering, evaluated using Silhouette Score and Davies-Bouldin Index for semantic document representation.",
    tags: ["Sentence Transformer", "t-SNE", "K-Means", "Silhouette Score", "Davies-Bouldin Index"],
    live: "#",
    repo: "https://github.com/RashedFahim/Neural-Network-Based-Clutering-",
  },
  {
    title: "GameAid — Game Tracking & Community Web App",
    desc: "Built a Laravel web app for tracking game progress, rating games, and community interaction with premium features and an admin panel for content and user moderation.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "CSS"],
    live: "#",
    repo: "https://github.com/RashedFahim/GameAid",
  },
  {
    title: "Pac-Man Game",
    desc: "Developed an interactive Pac-Man game in Python with OpenGL, featuring smooth character movement, collision detection, score tracking, and level progression.",
    tags: ["Python", "OpenGL", "Glut"],
    live: "#",
    repo: "https://github.com/RashedFahim/PACMAN",
  },
  {
    title: "Smart Autonomous Rickshaw Robot",
    desc: "Built an Arduino-powered rickshaw robot with multi-sensor integration for automated fare calculation, speed monitoring, overload detection, obstacle avoidance, and telemetry logging.",
    tags: ["Arduino", "C++", "Embedded Systems", "Sensor Integration", "IoT"],
    live: "#",
    repo: "https://github.com/RashedFahim/Rickshaw-Robot",
  },
  {
    title: "Online Flight Reservation System",
    desc: "A PHP-based flight booking system with user authentication, flight search with filters, seat selection, booking management, and an admin panel for schedule management.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    live: "#",
    repo: "https://github.com/RashedFahim/Online-Flight-Reservation",
  },
  {
    title: "Real Estate Property Listing System",
    desc: "A comprehensive property listing platform connecting buyers, sellers, and agents with property search, filters, user authentication, and communication features.",
    tags: ["Web Development", "Database", "PHP", "MySQL"],
    live: "#",
    repo: "https://github.com/RashedFahim/Real-Estate-Property-Listing",
  },
];

const EXPERIENCE = [
  {
    role: "AI Hackathon Participant",
    org: "Solvio AI Hackathon 2025",
    period: "November 2025",
    desc: "Collaborated with a team to develop Credit AI, an AI-powered micro-credit scoring solution for underserved communities. Applied machine learning to financial and behavioral data and presented a functional prototype focused on real-world impact and scalability.",
  },
  {
    role: "Deep Learning Researcher — Renal Imaging",
    org: "Undergraduate Thesis",
    period: "2025 — 2026",
    desc: "Developed a deep learning-based system for automated kidney anatomical and functional analysis from DMSA renal scans. Designed a multi-stage pipeline combining U-Net segmentation and ConvNeXt for kidney localization, anatomical analysis, and functional prediction. Addressed real-world medical imaging challenges including class imbalance, multi-view fusion, and mask-guided learning to produce reliable diagnostic outputs.",
  },
];

const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    org: "BRAC University, Dhaka",
    period: "2021 — 2026",
    desc: "Focused on artificial intelligence, machine learning, software engineering, and data-driven systems, with hands-on experience developing practical AI and ML projects.",
    link: "https://www.bracu.ac.bd/",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    org: "Adamjee Cantonment College",
    period: "2018 — 2020",
    desc: "Completed Higher Secondary Certificate (HSC) in Science, GPA: 5.00",
    link: "https://www.acc.edu.bd/",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    org: "Monipur High School & College (Branch-1)",
    period: "2011 — 2018",
    desc: "Completed Secondary School Certificate (SSC) in Science, GPA: 5.00",
    link: "#",
  },
];

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                     */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#0A0A0B",
  bgAlt: "#0D0E0D",
  surface: "rgba(255,255,255,0.035)",
  border: "rgba(255,255,255,0.10)",
  text: "#F5F5F4",
  textMuted: "#9CA3A8",
  green: "#1FE38A",
  orange: "ff8c00",
  greenSoft: "rgba(31,227,138,0.16)",
};

function useGoogleFonts() {
  useEffect(() => {
    const id = "portfolio-rc-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

function Eyebrow({ children }) {
  return (
    <div
      className="inline-block mb-4 px-3 py-1.5 text-xs rounded-md"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: C.green,
        border: `1px solid ${C.green}55`,
        background: C.greenSoft,
      }}
    >
      {"// "}
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.text }}>
        {title}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO TERMINAL — animated code window with typing effect          */
/* ------------------------------------------------------------------ */

const TERMINAL_LINES = [
  { cmd: "whoami", out: "Md. Rashed Fahim Chowdhury" },
  { cmd: "role --current", out: "AI/ML Engineer · Frontend Developer" },
  { cmd: "focus --list", out: "AI · Machine Learning · Computer Vision" },
  { cmd: "status", out: "Open to opportunities ✓" },
  { cmd: "energy --level", out: "⚡ 100% | Ready to crush some code!" },
  { cmd: "sleep --hours", out: "💤 6 hours? Is that even legal?" },
  { cmd: "life --mode", out: "🎯 Code · Create · Sleep · Repeat" },
];

function TerminalOrb() {
  const [lineIdx, setLineIdx] = useState(0);
  const [cmdText, setCmdText] = useState("");
  const [outText, setOutText] = useState("");
  const [phase, setPhase] = useState("cmd");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const current = TERMINAL_LINES[lineIdx];
    let timeout;

    if (phase === "cmd") {
      if (cmdText.length < current.cmd.length) {
        timeout = setTimeout(() => setCmdText(current.cmd.slice(0, cmdText.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase("out"), 250);
      }
    } else if (phase === "out") {
      if (outText.length < current.out.length) {
        timeout = setTimeout(() => setOutText(current.out.slice(0, outText.length + 1)), 18);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 900);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => {
        setHistory((h) => [...h, current]);
        setCmdText("");
        setOutText("");
        if (lineIdx + 1 < TERMINAL_LINES.length) {
          setLineIdx((i) => i + 1);
          setPhase("cmd");
        } else {
          setPhase("clear");
        }
      }, 300);
    } else if (phase === "clear") {
      timeout = setTimeout(() => {
        setHistory([]);
        setLineIdx(0);
        setPhase("cmd");
      }, 1600);
    }
    return () => clearTimeout(timeout);
  }, [phase, cmdText, outText, lineIdx]);

  return (
    <div className="relative group">
      {/* Glow effect on hover */}
      <div 
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${C.green}15, transparent 70%)` }}
      />
      
      <div
        className="relative w-full flex flex-col overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(31,227,138,0.08)] group-hover:border-green-500/40 group-hover:scale-[1.01]"
        style={{ 
          fontFamily: "'JetBrains Mono', monospace",
          border: `1px solid transparent`,
        }}
      >
        <style>{`
          @keyframes terminalCursorBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          .cursor-blink { animation: terminalCursorBlink 1s step-end infinite; }
        `}</style>
        
        {/* Title bar with hover effect */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 shrink-0 transition-all duration-300 group-hover:bg-white/[0.06]"
          style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}
        >
          <span className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: "#FF5F56" }} />
          <span className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: "#FFBD2E" }} />
          <span className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: "#27C93F" }} />
          <span className="ml-3 text-sm transition-all duration-300 group-hover:text-green-400" style={{ color: C.textMuted }}>
            rashed@portfolio: ~
          </span>
        </div>

        {/* Terminal body - REMOVED min-h and overflow-hidden */}
        <div className="flex-1 px-5 py-4 text-sm leading-relaxed transition-all duration-300 group-hover:bg-white/[0.02]">
          {history.map((h, i) => (
            <div key={i} className="mb-3 transition-all duration-300 hover:translate-x-1">
              <div style={{ color: C.textMuted }} className="transition-all duration-300 group-hover:text-gray-300">
                <span style={{ color: C.green }} className="transition-all duration-300 group-hover:text-green-400">$</span> {h.cmd}
              </div>
              <div style={{ color: C.text }} className="pl-2 transition-all duration-300 group-hover:text-white">{h.out}</div>
            </div>
          ))}
          {phase !== "clear" && (
            <div className="transition-all duration-300 hover:translate-x-1">
              <div style={{ color: C.textMuted }} className="transition-all duration-300 group-hover:text-gray-300">
                <span style={{ color: C.green }} className="transition-all duration-300 group-hover:text-green-400">$</span> {cmdText}
                {phase === "cmd" && (
                  <span className="cursor-blink" style={{ color: C.green }}>
                    ▌
                  </span>
                )}
              </div>
              {(phase === "out" || phase === "pause") && (
                <div style={{ color: C.text }} className="pl-2 transition-all duration-300 group-hover:text-white">
                  {outText}
                  {phase === "out" && (
                    <span className="cursor-blink" style={{ color: C.green }}>
                      ▌
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SCROLL ANIMATION HOOK                                            */
/* ------------------------------------------------------------------ */

function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/*  CUSTOM ANIMATED CURSOR COMPONENT                                 */
/* ------------------------------------------------------------------ */

function DeveloperCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame;

    const updatePosition = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'a, button, .clickable, [role="button"], input, textarea, .ext-link, .nav-link, .card-hover'
      );
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (target.x - prev.x) * 0.12,
        y: prev.y + (target.y - prev.y) * 0.12,
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  if (!isVisible) return null;

  const darkGreen = '#10B981';

  return (
    <>
      <div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="rounded-full transition-all duration-200 ease-out"
          style={{
            width: isHovering ? '8px' : '5px',
            height: isHovering ? '8px' : '5px',
            background: darkGreen,
            boxShadow: `0 0 20px ${darkGreen}44`,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out"
          style={{
            width: isHovering ? '36px' : '22px',
            height: isHovering ? '36px' : '22px',
            border: `1.5px solid ${isHovering ? darkGreen : `${darkGreen}66`}`,
            opacity: isHovering ? 1 : 0.5,
          }}
        />
      </div>

      <style>{`
        * { cursor: none !important; }
        @media (hover: none) and (pointer: coarse) {
          * { cursor: auto !important; }
          .fixed.pointer-events-none { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  SCROLL ANIMATION COMPONENT                                       */
/* ------------------------------------------------------------------ */

function ScrollAnimate({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const directionClass = {
    up: 'animate-up',
    down: 'animate-down',
    left: 'animate-left',
    right: 'animate-right',
    scale: 'animate-scale',
    fade: 'animate-fade'
  }[direction] || 'animate-up';

  return (
    <div
      ref={ref}
      className={`scroll-animate ${directionClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOADING SCREEN COMPONENT                                         */
/* ------------------------------------------------------------------ */

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1 second = 1000ms
    // 100 steps / 1000ms = 10ms per step
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 100);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ 
        background: C.bg,
      }}
    >
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${C.green}08 0%, transparent 70%)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex items-center gap-1 font-bold" style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}>
          <span className="text-5xl md:text-6xl tracking-tight">R</span>
          <span 
            className="w-2.5 h-8 md:h-9 rounded-sm" 
            style={{ 
              background: C.green,
              animation: 'cursorBlink 1s ease-in-out infinite',
            }}
          />
        </div>

        <p 
          className="text-xs md:text-sm mb-8 tracking-[0.3em] uppercase"
          style={{ 
            fontFamily: "'JetBrains Mono', monospace",
            color: C.textMuted,
            letterSpacing: '0.3em',
          }}
        >
          Loading Portfolio
        </p>

        <div 
          className="w-64 md:w-80 h-[3px] rounded-full overflow-hidden relative"
          style={{ 
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div 
            className="h-full rounded-full transition-all duration-300 ease-out relative"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${C.green}88, ${C.green})`,
              boxShadow: `0 0 30px ${C.green}44, 0 0 60px ${C.green}22`,
            }}
          >
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'translateX(-100%)',
                animation: 'barShine 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span 
            className="text-xs md:text-sm font-medium"
            style={{ 
              fontFamily: "'JetBrains Mono', monospace",
              color: C.textMuted,
            }}
          >
            {progress}%
          </span>
          <span 
            className="w-1 h-1 rounded-full"
            style={{ 
              background: C.green,
              animation: 'pulseDot 1.2s ease-in-out infinite',
            }}
          />
        </div>

        <div 
          className="mt-6 text-[10px] md:text-xs opacity-50 transition-opacity duration-500"
          style={{ 
            fontFamily: "'JetBrains Mono', monospace",
            color: C.textMuted,
          }}
        >
          {progress < 30 && "Initializing systems..."}
          {progress >= 30 && progress < 60 && "Loading modules..."}
          {progress >= 60 && progress < 90 && "Preparing experience..."}
          {progress >= 90 && progress < 100 && "Almost ready..."}
          {progress >= 100 && "Welcome!"}
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes barShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  MAIN PORTFOLIO CONTENT                                           */
/* ------------------------------------------------------------------ */

function PortfolioContent() {
  useGoogleFonts();
  useScrollAnimation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  const SERVICE_ID = 'service_b4v41vb';
  const TEMPLATE_ID = 'template_zu78q4t';
  const PUBLIC_KEY = 'qffSSJUmEqdWyhGk1';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then((result) => {
        setSent(true);
        setTimeout(() => setSent(false), 3200);
        e.target.reset();
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send message. Please try again.');
      });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <div 
        style={{ 
          background: C.bg, 
          color: C.text, 
          fontFamily: "'Inter', sans-serif",
          display: loading ? 'none' : 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.8s ease'
        }} 
        className="min-h-screen"
      >
        <DeveloperCursor />

        <style>{`
          html { scroll-behavior: smooth; }
          .noise-bg {
            background-image:
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
              radial-gradient(circle at 15% 10%, ${C.green}1c 0%, transparent 35%),
              radial-gradient(circle at 85% 0%, ${C.green}12 0%, transparent 40%);
            background-size: 40px 40px, 40px 40px, auto, auto;
            mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 90%);
            -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 90%);
          }
          @keyframes spinSlow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
          .ring-spin { animation: spinSlow 90s linear infinite; }
          @keyframes orbitSpin { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
          }
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-15px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes orbitCounterSpin { 
            from { transform: translate(-50%, -50%) rotate(0deg); } 
            to { transform: translate(-50%, -50%) rotate(-360deg); } 
          }
          .orbit-rotator { animation: orbitSpin ${ORBIT_DURATION}s linear infinite; }
          .orbit-counter { animation: orbitCounterSpin ${ORBIT_DURATION}s linear infinite; }
          @keyframes pulseDot { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
          .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }
          .orbit-tag { transition: transform 0.2s ease, border-color 0.2s ease; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
          .orbit-tag:hover { transform: translateY(-3px); border-color: ${C.green}; }
          .nav-link { position: relative; transition: color 0.15s ease; }
          .nav-link:hover { color: ${C.text} !important; }
          .ext-link { transition: border-color 0.15s ease, background 0.15s ease; }
          .ext-link:hover { border-color: ${C.green}; background: ${C.greenSoft}; }
          .card-hover {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }


          /* Disable text selection */
            * {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }

            /* Disable image dragging */
            img {
              -webkit-user-drag: none;
              user-drag: none;
              pointer-events: none;
            }

            /* Keep text selectable on inputs */
            input, textarea, [contenteditable] {
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              user-select: text;
            }

          .card-hover:hover {
            transform: translateY(-10px);
            border-color: ${C.green}88 !important;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 15px 50px rgba(31, 227, 138, 0.08),
                        inset 0 0 30px rgba(31, 227, 138, 0.02);
          }

          .card-hover:hover h3 {
            color: ${C.green};
          }

          .card-hover:hover span {
            border-color: ${C.green}44 !important;
            background: rgba(31, 227, 138, 0.08) !important;
          }

          .scroll-animate {
            opacity: 0;
            transition: opacity 0.6s ease, transform 0.6s ease;
          }

          .scroll-animate.animate-in {
            opacity: 1;
          }

          .animate-up {
            transform: translateY(40px);
          }
          .animate-up.animate-in {
            transform: translateY(0);
          }

          .animate-down {
            transform: translateY(-40px);
          }
          .animate-down.animate-in {
            transform: translateY(0);
          }

          .animate-left {
            transform: translateX(-40px);
          }
          .animate-left.animate-in {
            transform: translateX(0);
          }

          .animate-right {
            transform: translateX(40px);
          }
          .animate-right.animate-in {
            transform: translateX(0);
          }

          .animate-scale {
            transform: scale(0.9);
          }
          .animate-scale.animate-in {
            transform: scale(1);
          }

          .animate-fade {
            opacity: 0;
          }
          .animate-fade.animate-in {
            opacity: 1;
          }

          .stagger-children > * {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }

          .stagger-children.animate-in > *:nth-child(1) { transition-delay: 0.05s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(2) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(3) { transition-delay: 0.15s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(4) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(5) { transition-delay: 0.25s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(6) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(7) { transition-delay: 0.35s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(8) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(9) { transition-delay: 0.45s; opacity: 1; transform: translateY(0); }
          .stagger-children.animate-in > *:nth-child(10) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }

          .grid-stagger {
            display: grid;
          }

          .grid-stagger > * {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }

          .grid-stagger.animate-in > *:nth-child(1) { transition-delay: 0.05s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(2) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(3) { transition-delay: 0.15s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(4) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(5) { transition-delay: 0.25s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(6) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(7) { transition-delay: 0.35s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(8) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(9) { transition-delay: 0.45s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(10) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(11) { transition-delay: 0.55s; opacity: 1; transform: translateY(0); }
          .grid-stagger.animate-in > *:nth-child(12) { transition-delay: 0.6s; opacity: 1; transform: translateY(0); }

          ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }

          ::-webkit-scrollbar-track {
            background: #1a1a1a;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: #2b3618;
            border-radius: 10px;
            transition: background 0.3s ease;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #2b3618;
          }

          * {
            scrollbar-width: thin;
            scrollbar-color: #2b3618 #1a1a1a;
          }

          body {
            -ms-overflow-style: -ms-autohiding-scrollbar;
          }

        `}</style>

        {/* ---------------- NAV ---------------- */}
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{ 
            background: "rgba(11,12,16,0.72)", 
            backdropFilter: "blur(16px)", 
            WebkitBackdropFilter: "blur(16px)", 
            borderBottom: `1px solid ${C.border}` 
          }}
        >
          <div className="max-w-[1850px] mx-auto px-2 md:px-4 h-16 flex items-center justify-between">
            <div>
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
            
            <div className="flex items-center gap-10 overflow-x-auto">
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
            
            <div 
              className="flex items-center gap-2 text-sm"
              style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                color: "#30D5C8" 
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full pulse-dot" 
                style={{ background: "#DC143C" }} 
              />
              <span className="hidden md:inline">Open to Work</span>
              <span className="md:hidden">●</span>
              
              <button 
                className="md:hidden ml-2" 
                onClick={() => setMenuOpen((v) => !v)} 
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
              {EXT_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm font-medium flex items-center gap-1"
                  style={{ 
                    fontFamily: "'JetBrains Mono', monospace", 
                    color: C.green 
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label.toUpperCase()} <ExternalLink size={11} />
                </Link>
              ))}
              <div 
                className="flex items-center gap-2 text-sm"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  color: C.green 
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full pulse-dot" 
                  style={{ background: C.green }} 
                />
                Open to Work
              </div>
            </div>
          )}
        </header>

        {/* ---------------- HERO ---------------- */}
        <section id="hero" className="relative pt-32 pb-28 px-3 md:px-6 overflow-hidden">
          <div className="noise-bg absolute inset-0 z-0" />
          <div className="relative z-10 max-w-[1850px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <ScrollAnimate direction="right" delay={100}>
              <div>
                <Eyebrow>CSE Graduate · BRAC University</Eyebrow>
                <p className="text-lg mb-2" style={{ color: C.textMuted }}>
                  Hello, I'm
                </p>
                <h1 className="leading-[0.95] mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ color: C.text }}>
                    MD. RASHED FAHIM
                  </span>
                  <span className="block text-6xl md:text-7xl lg:text-8xl mt-1" style={{ color: C.green }}>
                    CHOWDHURY
                  </span>
                </h1>
                <div className="w-16 h-1 rounded-full mb-6" style={{ background: C.green }} />
                <p
                  className="text-sm md:text-base tracking-wide mb-6"
                  style={{ color: C.textMuted, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  AI/ML ENGINEER · Frontend Developer
                </p>
                <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: C.textMuted }}>
                  A <b style={{ color: C.text }}>Computer Science graduate</b> focused on building intelligent systems at the intersection of{" "}
                  <b style={{ color: C.text }}>Artificial Intelligence, Machine Learning, and software engineering</b>. I enjoy turning complex problems into practical, scalable solutions — from AI-powered applications to real-world computer vision systems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(31,227,138,0.3)]"
                    style={{ background: C.green, color: "#17181C" }}
                  >
                    VIEW GITHUB <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:border-green-500 hover:bg-green-500/10"
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    GET IN TOUCH
                  </button>
                </div>
              </div>
            </ScrollAnimate>

            <ScrollAnimate direction="left" delay={200}>
              <div className="relative flex items-center justify-center ">
                <div 
                  className="w-full max-w-2xl p-6 rounded-2xl font-mono"
                  style={{ 
                    background: '#0d1117',
                    border: `1.5px solid ${C.green}`,
                    boxShadow: `0 0 60px -12px ${C.green}55, inset 0 0 60px -20px ${C.green}22`,
                  }}
                >
                  <TerminalOrb />
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="py-24 px-3 md:px-6" style={{ background: C.bgAlt }}>
          <div className="max-w-[1850px] mx-auto">
            <div className="scroll-animate animate-up">
              <SectionHeading eyebrow="About" title="Beyond the resume" />
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="scroll-animate animate-left md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer p-0.5 transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(31,227,138,0.15)]">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img 
                      src="/image.jpg" 
                      alt="Md. Rashed Fahim Chowdhury" 
                      className="w-full h-auto object-cover aspect-square grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    
                    {/* Animated border */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ 
                        border: `2px solid ${C.green}`,
                        boxShadow: `0 0 40px ${C.green}22, inset 0 0 40px ${C.green}11`,
                      }}
                    />
                    
                    <div 
                      className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    >
                      <div>
                        <p className="text-xs font-mono" style={{ color: C.green }}>// about me</p>
                        <p className="text-sm font-semibold text-white">Md. Rashed Fahim Chowdhury</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="scroll-animate animate-right md:col-span-3">
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.textMuted }}>
                  I build things where{" "}
                  <span className="font-semibold" style={{ color: C.text }}>AI meets software</span>. 
                  From machine learning and computer vision to web applications and intelligent 
                  systems, I enjoy turning complex ideas into products that are practical, useful, 
                  and reliable.
                </p>
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.textMuted }}>
                  I'm always learning, experimenting, and looking for the next problem worth solving. 
                  Currently exploring the intersection of <span className="font-semibold" style={{ color: C.green }}>deep learning</span> and 
                  <span className="font-semibold" style={{ color: C.green }}> medical image analysis</span>, 
                  while building real-world AI applications that make a difference.
                </p>
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.textMuted }}>
                  With a strong foundation in <span className="font-semibold" style={{ color: C.text }}>Computer Science</span> from BRAC University, 
                  I combine theoretical knowledge with practical implementation. My work spans across 
                  <span className="font-semibold" style={{ color: C.text }}> AI research, full-stack development, and embedded systems</span>, 
                  giving me a holistic view of how technology can solve real-world challenges.
                </p>

                <div 
                className="relative mb-8 p-6 rounded-2xl group"
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  transition: 'all 0.4s ease',
                }}
              >
                {/* Left accent line */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full transition-all duration-500 group-hover:h-20 group-hover:scale-y-110"
                  style={{ background: `linear-gradient(180deg, ${C.green}, ${C.green}44)` }}
                />
                
                {/* Quote mark */}
                <div className="pl-6">
                  <span className="text-4xl font-serif block -mb-4" style={{ color: C.green, opacity: 0.3 }}>"</span>
                  <p className="text-base md:text-lg italic leading-relaxed" style={{ color: C.textMuted }}>
                    The best way to predict the future is to build it. Every line of code, every model trained, 
                    and every problem solved brings us one step closer to a smarter, more efficient world.
                  </p>
                </div>
                
                <div className="flex items-center justify-end mt-4 gap-2">
                  <div className="w-8 h-px" style={{ background: C.green }} />
                  <span className="text-xs font-mono" style={{ color: C.green }}>Rashed Fahim</span>
                </div>
              </div>

                <div className="mt-8"></div>

                <div
                  className="card-hover p-6 rounded-2xl"
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: C.green }}
                    />
                    <p
                      className="text-xs tracking-wider uppercase"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: C.green,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {"// currently focusing on"}
                    </p>
                  </div>

                  <ul className="space-y-3 text-sm" style={{ color: C.textMuted }}>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-0.5">✦</span>
                      <span>Building AI/ML & computer vision projects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-0.5">✦</span>
                      <span>Exploring LLMs & AI agents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-0.5">✦</span>
                      <span>Open to freelance & full-time opportunities</span>
                    </li>
                  </ul>

                  <div className="mt-6 pt-4 border-t" style={{ borderColor: C.border }}>
                    <p className="text-xs" style={{ color: C.textMuted, opacity: 0.6 }}>
                      <span className="font-mono text-green-400">$</span> ready to collaborate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* ---------------- SKILLS ---------------- */}
        <section id="skills" className="py-24 px-3 md:px-6">
          <div className="max-w-[1850px] mx-auto">
            <div className="scroll-animate animate-up">
              <SectionHeading eyebrow="Skills" title="What I work with" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-5">
              {SKILLS.map((s, index) => (
                <div 
                  key={s.category} 
                  className="scroll-animate animate-up card-hover p-6 rounded-2xl flex flex-col h-full min-h-[200px] group transition-all duration-300 hover:-translate-y-2 hover:border-green-500/60 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(31,227,138,0.08)]"
                  style={{ 
                    background: C.surface, 
                    border: `1px solid ${C.border}`,
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Green accent line that expands on hover */}
                  <div className="w-10 h-1 rounded-full mb-4 transition-all duration-300 group-hover:w-16" style={{ background: C.green }} />
                  
                  <h3 className="font-semibold mb-4 transition-colors duration-300 group-hover:text-green-400">{s.category}</h3>
                  
                  <div className="flex flex-wrap gap-2 flex-1 content-start">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 rounded-md transition-all duration-300 hover:bg-white/15 hover:border-green-500/40 hover:text-white hover:scale-105"
                        style={{ 
                          background: "rgba(255, 255, 255, 0.05)", 
                          color: C.textMuted, 
                          border: "1px solid rgba(255, 255, 255, 0.1)", 
                          fontFamily: "'JetBrains Mono', monospace" 
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PROJECTS ---------------- */}
        <section id="projects" className="py-24 px-3 md:px-6" style={{ background: C.bgAlt }}>
          <div className="max-w-[1850px] mx-auto">
            <ScrollAnimate direction="up" delay={100}>
              <SectionHeading eyebrow="Projects" title="Selected work" />
            </ScrollAnimate>
            
            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.map((p, index) => (
                <ScrollAnimate key={p.title} direction="up" delay={100 + index * 100}>
                  <div className="card-hover p-6 rounded-2xl flex flex-col" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                    <div className="w-10 h-1 rounded-full mb-5" style={{ background: C.green }} />
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: C.textMuted }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md" style={{ background: C.bg, color: C.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-5">
                      <a href={p.live} className="text-sm font-medium flex items-center gap-1.5" style={{ color: C.green }}>
                        View Live <ArrowUpRight size={14} />
                      </a>
                      <a href={p.repo} className="text-sm font-medium flex items-center gap-1.5">
                        <Github size={14} /> GitHub
                      </a>
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- EXPERIENCE ---------------- */}
        <section id="experience" className="py-24 px-3 md:px-6">
          <div className="max-w-[1850px] mx-auto">
            <ScrollAnimate direction="up" delay={100}>
              <SectionHeading eyebrow="Experience" title="Where I've worked" />
            </ScrollAnimate>
            
            <div className="space-y-5">
              {EXPERIENCE.map((e, index) => (
                <ScrollAnimate key={e.role} direction="up" delay={100 + index * 100}>
                  <div className="card-hover p-6 rounded-2xl grid md:grid-cols-4 gap-4" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                    <div className="md:col-span-1 flex items-start gap-3">
                      <Briefcase size={18} style={{ color: C.green }} className="mt-0.5 shrink-0" />
                      <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: C.textMuted }}>
                        {e.period}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-bold mb-1">{e.role}</h3>
                      <p className="text-sm mb-2" style={{ color: C.green }}>{e.org}</p>
                      <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{e.desc}</p>
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- EDUCATION ---------------- */}
        <section id="education" className="py-24 px-3 md:px-6" style={{ background: C.bgAlt }}>
          <div className="max-w-[1850px] mx-auto">
            <ScrollAnimate direction="up" delay={100}>
              <SectionHeading eyebrow="Education" title="Academic background" />
            </ScrollAnimate>
            
            <div className="space-y-5">
              {EDUCATION.map((e, index) => (
                <ScrollAnimate key={e.degree} direction="up" delay={100 + index * 100}>
                  <div className="card-hover p-6 rounded-2xl grid md:grid-cols-4 gap-4" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                    <div className="md:col-span-1 flex items-start gap-3">
                      <GraduationCap size={18} style={{ color: C.green }} className="mt-0.5 shrink-0" />
                      <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: C.textMuted }}>
                        {e.period}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-bold mb-1">{e.degree}</h3>
                      {e.link ? (
                        <a 
                          href={e.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm mb-2 inline-flex items-center gap-1 hover:underline transition-opacity hover:opacity-80"
                          style={{ color: C.green }}
                        >
                          {e.org} <ExternalLink size={12} />
                        </a>
                      ) : (
                        <p className="text-sm mb-2" style={{ color: C.green }}>{e.org}</p>
                      )}
                      <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{e.desc}</p>
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="py-28 px-3 md:px-6">
          <div className="max-w-[1850px] mx-auto grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <ScrollAnimate direction="right" delay={100}>
                <Eyebrow>Contact</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Let's build something worth shipping
                </h2>
                <p className="text-sm mb-8" style={{ color: C.textMuted }}>
                  Open to internships, freelance work, and interesting
                  collaborations. I usually reply within a day.
                </p>
              </ScrollAnimate>
              
              <ScrollAnimate direction="right" delay={150}>
                <div className="space-y-4 mb-8">
                  <a href="mailto:rashedfahimchowdhury@gmail.com" className="flex items-center gap-3 text-sm">
                    <Mail size={16} style={{ color: C.green }} /> rashedfahimchowdhury@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-sm" style={{ color: C.textMuted }}>
                    <MapPin size={16} style={{ color: C.green }} /> Dhaka, Bangladesh
                  </div>
                </div>
              </ScrollAnimate>
              
              <ScrollAnimate direction="right" delay={200}>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/RashedFahim" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500/10"
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/rashedfahim/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500/10"
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </ScrollAnimate>
            </div>

            <div className="md:col-span-3">
              <ScrollAnimate direction="left" delay={100}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <input
                        required
                        type="text"
                        name="user_name"
                        placeholder=" "
                        className="w-full px-4 py-3.5 rounded-lg text-sm outline-none placeholder-transparent peer transition-all duration-300 hover:border-green-500/50 hover:bg-white/[0.03] focus:border-green-500 focus:shadow-[0_0_30px_rgba(31,227,138,0.08)]"
                        style={{ 
                          background: 'transparent', 
                          border: `1px solid ${C.border}`, 
                          color: C.text 
                        }}
                      />
                      <label 
                        className="absolute left-4 -top-2.5 text-xs transition-all duration-300 px-1 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#6B6D77] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-400 group-hover:text-green-400"
                        style={{ background: C.bg }}
                      >
                        Your name
                      </label>
                    </div>
                    <div className="relative group">
                      <input
                        required
                        type="email"
                        name="user_email"
                        placeholder=" "
                        className="w-full px-4 py-3.5 rounded-lg text-sm outline-none placeholder-transparent peer transition-all duration-300 hover:border-green-500/50 hover:bg-white/[0.03] focus:border-green-500 focus:shadow-[0_0_30px_rgba(31,227,138,0.08)]"
                        style={{ 
                          background: 'transparent', 
                          border: `1px solid ${C.border}`, 
                          color: C.text 
                        }}
                      />
                      <label 
                        className="absolute left-4 -top-2.5 text-xs transition-all duration-300 px-1 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#6B6D77] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-400 group-hover:text-green-400"
                        style={{ background: C.bg }}
                      >
                        Email address
                      </label>
                    </div>
                  </div>
                  <div className="relative group">
                    <textarea
                      required
                      rows={5}
                      name="message"
                      placeholder=" "
                      className="w-full px-4 py-3.5 rounded-lg text-sm outline-none placeholder-transparent peer transition-all duration-300 hover:border-green-500/50 hover:bg-white/[0.03] focus:border-green-500 focus:shadow-[0_0_30px_rgba(31,227,138,0.08)]"
                      style={{ 
                        background: 'transparent', 
                        border: `1px solid ${C.border}`, 
                        color: C.text 
                      }}
                    />
                    <label 
                      className="absolute left-4 -top-2.5 text-xs transition-all duration-300 px-1 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#6B6D77] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-400 group-hover:text-green-400"
                      style={{ background: C.bg }}
                    >
                      What are we building?
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(31,227,138,0.3)]"
                    style={{ background: C.green, color: "#17181C" }}
                  >
                    {sent ? "Message sent ✓" : "Send message"} <Send size={15} />
                  </button>
                </form>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* ---------------- Footer ---------------- */}
        <ScrollAnimate direction="up" delay={100}>
          <footer className="py-8 text-center text-xs" style={{ borderTop: `1px solid ${C.border}`, color: C.textMuted }}>
            © 2026 Md. Rashed Fahim Chowdhury.
          </footer>
        </ScrollAnimate>
      </div>
    </>
  );
}

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