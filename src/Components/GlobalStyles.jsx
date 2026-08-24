import { useEffect } from "react";
import C from "./constants";

const ORBIT_DURATION = 90;

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

export default function GlobalStyles() {
  useGoogleFonts();

  return (
    <style>{`
          html { scroll-behavior: smooth; overflow-x: hidden; }
          body { overflow-x: hidden; width: 100%; max-width: 100vw; margin: 0; padding: 0; }
          * { box-sizing: border-box; }
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
            transform: translateX(40px);
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

          /* Mobile-specific width fixes */
          @media (max-width: 768px) {
            .max-w-\\[1850px\\] {
              max-width: 100% !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            section {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .px-3 {
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
            }
            .md\\:px-6 {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .px-4 {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .grid {
              width: 100% !important;
              max-width: 100% !important;
            }
            .w-full {
              width: 100% !important;
              max-width: 100% !important;
            }
            .max-w-2xl {
              max-width: 100% !important;
            }
            .max-w-xl {
              max-width: 100% !important;
            }
            .space-y-5 > * + * {
              margin-top: 1.25rem !important;
            }
          }

          @media (max-width: 480px) {
            .px-3 {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            section {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            .max-w-\\[1850px\\] {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            .p-6 {
              padding: 1rem !important;
            }
            .gap-4 {
              gap: 0.75rem !important;
            }
            .gap-2 {
              gap: 0.5rem !important;
            }
          }
        `}</style>
  );
}
