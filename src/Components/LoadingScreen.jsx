import { useEffect, useState } from "react";
import C from "./constants";

function LoadingScreen({ onComplete, onExited }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress is derived from elapsed time so the bar always reaches 100%
    // in ~1s, even on slow devices where timers/frames are throttled.
    // Once full: hold briefly (letting the width transition settle), then
    // start fading out while signalling the parent to fade the content in
    // at the same time — a crossfade with no white flash in between.
    const duration = 1000;
    const start = performance.now();
    let raf;
    let fadeTimer;
    let exitTimer;

    const tick = (now) => {
      const nextProgress = Math.min(100, Math.floor(((now - start) / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        fadeTimer = setTimeout(() => {
          setFadeOut(true);
          onComplete?.();
          exitTimer = setTimeout(() => onExited?.(), 700);
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete, onExited]);

  return (
    <div 
      className={`fixed inset-0 z-99999 flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
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
          className="w-64 md:w-80 h-0.75 rounded-full overflow-hidden relative"
          style={{ 
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div 
            className="h-full rounded-full relative"
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

export default LoadingScreen;
