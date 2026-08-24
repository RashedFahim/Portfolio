import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import C from "./constants";
import { scrollToId } from "./utils";
import { Eyebrow } from "./SectionHeading";
import ScrollAnimate from "./ScrollAnimate";

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
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, cmdText, outText, phase]);

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
          .terminal-scroll::-webkit-scrollbar { display: none; }
          .terminal-scroll { scrollbar-width: none; -ms-overflow-style: none; }
          @media (max-width: 640px) {
            .terminal-scroll { height: 200px !important; }
          }
        `}</style>
        
        {/* Title bar with hover effect */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 shrink-0 transition-all duration-300 group-hover:bg-white/6"
          style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}
        >
          <span className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: "#FF5F56" }} />
          <span className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: "#FFBD2E" }} />
          <span className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: "#27C93F" }} />
          <span className="ml-3 text-sm transition-all duration-300 group-hover:text-green-400" style={{ color: C.textMuted }}>
            rashed@portfolio: ~
          </span>
        </div>

        {/* Terminal body — fixed height + internal scroll so the box never resizes the page as lines type/clear */}
        <div
          ref={scrollRef}
          className="terminal-scroll px-5 py-4 text-sm leading-relaxed transition-all duration-300 group-hover:bg-white/[0.02] overflow-y-auto"
          style={{ height: 260 }}
        >
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

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-28 px-3 md:px-6 overflow-hidden w-full">
      <div className="noise-bg absolute inset-0 z-0" />
      <div className="relative z-10 max-w-[1850px] mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
        <ScrollAnimate direction="right" delay={100}>
          <div className="w-full">
            <Eyebrow>CSE Graduate · BRAC University</Eyebrow>
            <p className="text-lg mb-2" style={{ color: C.textMuted }}>
              Hello, I'm
            </p>
            <h1 className="leading-[0.95] mb-6" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl" style={{ color: C.text }}>
                MD. RASHED FAHIM
              </span>
              <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl mt-1" style={{ color: C.green }}>
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
                onClick={() => scrollToId("projects")}
                className="px-6 py-3.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(31,227,138,0.3)]"
                style={{ background: C.green, color: "#17181C" }}
              >
                VIEW GITHUB <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToId("contact")}
                className="px-6 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:border-green-500 hover:bg-green-500/10"
                style={{ border: `1px solid ${C.border}` }}
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate direction="left" delay={200}>
          <div className="relative flex items-center justify-center w-full">
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
  );
}
