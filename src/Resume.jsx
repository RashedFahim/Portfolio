import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X, Download, ArrowLeft } from "lucide-react";

const C = {
  bg: "#0A0A0B",
  bgAlt: "#0D0E0D",
  surface: "rgba(255,255,255,0.035)",
  border: "rgba(255,255,255,0.10)",
  text: "#F5F5F4",
  textMuted: "#9CA3A8",
  green: "#1FE38A",
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

export default function Resume() {
  useGoogleFonts();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleDownloadPDF = () => {
    const pdfUrl = '/CV_Rashed Fahim Chowdhury.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'CV_Rashed Fahim Chowdhury.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen"
    >
      {/* Custom Cursor */}
      <DeveloperCursor />

      <style>{`
        html { scroll-behavior: smooth; }
        .nav-link { position: relative; transition: color 0.15s ease; }
        .nav-link:hover { color: ${C.text} !important; }
        ::selection { background: ${C.green}44; }
        .resume-section {
          border-bottom: 1px solid ${C.border};
          padding-bottom: 2rem;
          margin-bottom: 2rem;
        }
        .resume-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
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

        /* Scroll Animation Styles */
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

        /* ============================================ */
        /* CUSTOM SCROLLBAR - Dark Theme Gray, Olive Thumb */
        /* ============================================ */

        /* For Chrome, Edge, and Safari */
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

        /* For Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #2b3618 #1a1a1a;
        }

        body {
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }
      `}</style>

      {/* NAVBAR */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(11,12,16,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="max-w-[1850px] mx-auto px-2 md:px-4 h-16 flex items-center">
          <div className="flex items-center gap-2 shrink-0 w-[100px]">
            <Link
              to="/"
              className="flex items-center gap-0.5 font-bold"
              style={{
                color: C.green,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span className="text-xl">R</span>
              <span className="w-1.5 h-5 animate-pulse" style={{ background: C.green }}></span>
            </Link>
          </div>

          <div className="flex items-center gap-6 md:gap-10 overflow-x-auto flex-1 justify-center">
            <Link
              to="/"
              className="nav-link text-sm tracking-wide font-medium shrink-0 whitespace-nowrap"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: C.textMuted,
              }}
            >
              PORTFOLIO
            </Link>
            <span
              className="text-sm tracking-wide font-medium shrink-0 whitespace-nowrap"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: C.green,
              }}
            >
              RESUME
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-[100px] justify-end">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(31,227,138,0.3)] whitespace-nowrap"
              style={{
                background: C.green,
                color: "#17181C",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
            <Link
              to="/"
              className="text-sm font-medium"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: C.textMuted,
              }}
              onClick={() => setMenuOpen(false)}
            >
              PORTFOLIO
            </Link>
            <span
              className="text-sm font-medium"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: C.green,
              }}
            >
              RESUME
            </span>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{
                background: C.green,
                color: "#17181C",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        )}
      </header>

      {/* RESUME CONTENT with scroll animations */}
      <section className="pt-28 pb-16 px-1 md:px-3">
        <div className="max-w-[1200px] mx-auto">
          <ScrollAnimate direction="up" delay={100}>
            <div className="flex items-center gap-4 mb-8">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm transition-all duration-300 hover:text-green-400"
                style={{ color: C.textMuted }}
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </Link>
              <div className="flex-1 h-px" style={{ background: C.border }} />
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={150}>
            <div className="mb-12">
              <h1
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                <span style={{ color: C.text }}>Rashed Fahim</span>
                <span style={{ color: C.green }}> Chowdhury</span>
              </h1>
              <p className="text-sm" style={{ color: C.textMuted }}>
                Dhaka, Bangladesh · AI/ML Engineer
              </p>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={200}>
            <div className="resume-section">
              <Eyebrow>Objective</Eyebrow>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
                Computer Science and Engineering graduate from BRAC University with a strong focus on 
                artificial intelligence and machine learning, particularly in deep learning and medical 
                image analysis. Experienced in developing data-driven models and applying advanced 
                techniques such as neural networks and computer vision to solve real-world problems. 
                Eager to apply my skills in AI and ML to real-world challenges while gaining practical 
                experience and contributing to innovative, data-driven solutions.
              </p>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={250}>
            <div className="resume-section">
              <Eyebrow>Education</Eyebrow>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-base">BRAC University</h3>
                  <p className="text-sm" style={{ color: C.green }}>B.Sc. in Computer Science and Engineering</p>
                  <p className="text-sm" style={{ color: C.textMuted }}>CGPA: 3.81/4.00 · 2021 — 2026</p>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Adamjee Cantonment College</h3>
                  <p className="text-sm" style={{ color: C.green }}>Higher Secondary Certificate (HSC)</p>
                  <p className="text-sm" style={{ color: C.textMuted }}>GPA: 5.00/5.00 · 2018 — 2020</p>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Monipur High School & College</h3>
                  <p className="text-sm" style={{ color: C.green }}>Secondary School Certificate (SSC)</p>
                  <p className="text-sm" style={{ color: C.textMuted }}>GPA: 5.00/5.00 · 2011 — 2018</p>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={300}>
            <div className="resume-section">
              <Eyebrow>Experience</Eyebrow>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-base">Participant, Solvio AI Hackathon 2025</h3>
                  <p className="text-sm" style={{ color: C.green }}>Team Member · November 2025 · Dhaka, Bangladesh</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1" style={{ color: C.textMuted }}>
                    <li>Collaborated in a team to develop Credit AI, an AI-powered micro-credit scoring solution for underserved communities.</li>
                    <li>Implemented machine learning models to analyze financial and behavioral data for accurate credit scoring.</li>
                    <li>Presented the working prototype to judges, demonstrating real-world impact and scalability.</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={350}>
            <div className="resume-section">
              <Eyebrow>Skills</Eyebrow>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Languages</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>Python, C, C++, PHP, SQL, JavaScript, CSS, HTML</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Machine Learning & AI</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>Artificial Intelligence, Machine Learning, Deep Learning (CNN, ANN, RNN), Computer Vision, Medical Image Analysis</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Frameworks</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>Laravel, Django</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Developer Tools</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>LaTeX, GitHub, MySQL, XAMPP, VS Code, Figma</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Libraries</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>TensorFlow, PyTorch, Scikit-learn, OpenCV, NumPy, Pandas</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Platforms & OS</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>Linux, Arduino, Raspberry Pi</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-semibold mb-2" style={{ color: C.green }}>Soft Skills</h4>
                  <p className="text-sm" style={{ color: C.textMuted }}>Problem Solving, Critical Thinking, Teamwork & Collaboration, Communication Skills, Time Management</p>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={400}>
            <div className="resume-section">
              <Eyebrow>Projects</Eyebrow>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-base">Projecting Student Depression using Machine Learning</h3>
                  <p className="text-sm" style={{ color: C.green }}>2025 · Python, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1" style={{ color: C.textMuted }}>
                    <li>Developed a predictive model for student depression using machine learning techniques to identify at-risk students.</li>
                    <li>Implemented Python-based ML algorithms (Random Forest, Logistic Regression, SVM) for accurate prediction.</li>
                    <li>Applied feature selection and data preprocessing methods to analyze key factors contributing to student mental health.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base">GameAid — Game Tracking & Community Web App</h3>
                  <p className="text-sm" style={{ color: C.green }}>2025 · Laravel, PHP, MySQL, JavaScript, Bootstrap, CSS</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1" style={{ color: C.textMuted }}>
                    <li>Built a web application for users to track game progress, rate played games, and interact with other players.</li>
                    <li>Implemented premium features and a robust admin panel for managing content, users, and moderation.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Neural Network Based Clustering of AG News Dataset</h3>
                  <p className="text-sm" style={{ color: C.green }}>2025 · Sentence Transformer, t-SNE, K-Means, Silhouette Score</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1" style={{ color: C.textMuted }}>
                    <li>Developed a neural network-based encoder to cluster AG News articles, compressing embeddings into 64D latent space.</li>
                    <li>Implemented unsupervised clustering using K-Means with t-SNE visualization for semantic document representation.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Pac-Man Game</h3>
                  <p className="text-sm" style={{ color: C.green }}>2024 · Python, OpenGL, Glut</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1" style={{ color: C.textMuted }}>
                    <li>Developed an interactive Pac-Man game using Python and OpenGL with smooth character movement and maze navigation.</li>
                    <li>Implemented collision detection, food pellet collection, score tracking, and level progression.</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={450}>
            <div className="resume-section">
              <Eyebrow>Research</Eyebrow>
              <div>
                <h3 className="font-semibold text-base">Deep Learning for Automated Renal Function and Anatomical Analysis from DMSA Scans</h3>
                <p className="text-sm" style={{ color: C.green }}>2025-2026 · Undergraduate Thesis</p>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1" style={{ color: C.textMuted }}>
                  <li>Developed a deep learning-based system for automated kidney analysis using DMSA renal scans, improving diagnostic efficiency.</li>
                  <li>Implemented a multi-stage pipeline using U-Net segmentation and ConvNeXt for anatomical and functional prediction.</li>
                  <li>Handled real-world medical data challenges including class imbalance, multi-view fusion, and mask-guided learning.</li>
                </ul>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate direction="up" delay={500}>
            <footer className="py-8 text-center text-xs" style={{ borderTop: `1px solid ${C.border}`, color: C.textMuted }}>
              © 2026 Md. Rashed Fahim Chowdhury.
            </footer>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  );
}