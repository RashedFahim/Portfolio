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
          html {
            scroll-behavior: auto !important;
            overflow-x: hidden;
            overflow-x: clip;
          }
          body {
            overflow-x: hidden;
            overflow-x: clip;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          * { box-sizing: border-box; }
          section, footer {
            overflow-x: hidden;
            overflow-x: clip;
          }
          .noise-bg {
            background-image:
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
              radial-gradient(circle at 15% 10%, ${C.green}1c 0%, transparent 35%),
              radial-gradient(circle at 85% 0%, ${C.green}12 0%, transparent 40%);
            background-size: 40px 40px, 40px 40px, auto, auto;
            mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 90%);
            -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 90%);
            pointer-events: none;
            transform: translateZ(0);
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
          @keyframes navMenuIn {
            from { opacity: 0; transform: translate3d(0, -6px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }
          .nav-menu-enter {
            transform-origin: top center;
            animation: navMenuIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .orbit-tag { transition: transform 0.2s ease, border-color 0.2s ease; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
          .orbit-tag:hover { transform: translateY(-3px); border-color: ${C.green}; }
          .nav-link { position: relative; transition: color 0.15s ease; }
          .nav-link:hover { color: ${C.text} !important; }
          .nav-active-indicator {
            position: absolute;
            left: 0;
            bottom: 1px;
            height: 2px;
            border-radius: 999px;
            pointer-events: none;
            transform-origin: left center;
            transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                        width 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.2s ease;
          }
          .ext-link { transition: border-color 0.15s ease, background 0.15s ease; }
          .ext-link:hover { border-color: ${C.green}; background: ${C.greenSoft}; }
          .motion-button {
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.2s ease,
                        box-shadow 0.25s ease,
                        background-color 0.2s ease;
          }
          .motion-button:active {
            transform: scale(0.97);
            transition-duration: 0.08s;
          }
          .motion-button svg {
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @media (hover: hover) and (pointer: fine) {
            .motion-button:hover { transform: translateY(-2px); }
            .motion-button:hover svg { transform: translateX(2px); }
          }
          .card-hover {
            transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.3s ease,
                        background-color 0.3s ease,
                        box-shadow 0.3s ease;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            transform: translateZ(0);
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

          @media (hover: hover) and (pointer: fine) {
            .card-hover:hover {
              transform: translate3d(0, -6px, 0) scale(1.005);
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
          }

          .scroll-animate {
            opacity: 0;
            transition: opacity 0.56s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.62s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: var(--scroll-delay, 0ms);
            will-change: opacity, transform;
          }

          .scroll-animate.animate-in {
            opacity: 1;
            will-change: auto;
          }

          .animate-up {
            transform: translate3d(0, 18px, 0);
          }
          .animate-up.animate-in {
            transform: translate3d(0, 0, 0);
          }

          .animate-down {
            transform: translate3d(0, -18px, 0);
          }
          .animate-down.animate-in {
            transform: translate3d(0, 0, 0);
          }

          .animate-left {
            transform: translate3d(-24px, 0, 0);
          }
          .animate-left.animate-in {
            transform: translate3d(0, 0, 0);
          }

          .animate-right {
            transform: translate3d(24px, 0, 0);
          }
          .animate-right.animate-in {
            transform: translate3d(0, 0, 0);
          }

          .animate-scale {
            transform: scale(0.97);
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
            transform: translate3d(0, 12px, 0);
            transition: opacity 0.48s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.48s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }

          .stagger-children.animate-in > *:nth-child(1),
          .scroll-animate.animate-in .stagger-children > *:nth-child(1) { transition-delay: 0.04s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(2),
          .scroll-animate.animate-in .stagger-children > *:nth-child(2) { transition-delay: 0.08s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(3),
          .scroll-animate.animate-in .stagger-children > *:nth-child(3) { transition-delay: 0.12s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(4),
          .scroll-animate.animate-in .stagger-children > *:nth-child(4) { transition-delay: 0.16s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(5),
          .scroll-animate.animate-in .stagger-children > *:nth-child(5) { transition-delay: 0.2s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(6),
          .scroll-animate.animate-in .stagger-children > *:nth-child(6) { transition-delay: 0.24s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(7),
          .scroll-animate.animate-in .stagger-children > *:nth-child(7) { transition-delay: 0.28s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(8),
          .scroll-animate.animate-in .stagger-children > *:nth-child(8) { transition-delay: 0.32s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(9),
          .scroll-animate.animate-in .stagger-children > *:nth-child(9) { transition-delay: 0.36s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }
          .stagger-children.animate-in > *:nth-child(10),
          .scroll-animate.animate-in .stagger-children > *:nth-child(10) { transition-delay: 0.4s; opacity: 1; transform: translate3d(0, 0, 0); will-change: auto; }

          .grid-stagger {
            display: grid;
          }

          .grid-stagger > * {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
            transition: opacity 0.52s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.52s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }

          .grid-stagger.animate-in > *:nth-child(1) { transition-delay: 0.04s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(2) { transition-delay: 0.08s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(3) { transition-delay: 0.12s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(4) { transition-delay: 0.16s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(5) { transition-delay: 0.2s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(6) { transition-delay: 0.24s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(7) { transition-delay: 0.28s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(8) { transition-delay: 0.32s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(9) { transition-delay: 0.36s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(10) { transition-delay: 0.4s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(11) { transition-delay: 0.44s; opacity: 1; transform: translate3d(0, 0, 0); }
          .grid-stagger.animate-in > *:nth-child(12) { transition-delay: 0.48s; opacity: 1; transform: translate3d(0, 0, 0); }

          .section-eyebrow,
          .section-title,
          .section-description {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
            transition: opacity 0.48s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.48s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .scroll-animate.animate-in .section-eyebrow,
          .scroll-animate.animate-in .section-title,
          .scroll-animate.animate-in .section-description {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            will-change: auto;
          }
          .scroll-animate.animate-in .section-eyebrow {
            transition-delay: calc(var(--scroll-delay, 0ms) + 40ms);
          }
          .scroll-animate.animate-in .section-title {
            transition-delay: calc(var(--scroll-delay, 0ms) + 100ms);
          }
          .scroll-animate.animate-in .section-description {
            transition-delay: calc(var(--scroll-delay, 0ms) + 150ms);
          }

          .hero-item {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: calc(var(--scroll-delay, 0ms) + var(--hero-delay, 0ms));
            will-change: opacity, transform;
          }
          .scroll-animate.animate-in .hero-item {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            will-change: auto;
          }

          .skill-tag {
            opacity: 0;
            transform: translate3d(0, 6px, 0);
            transition: opacity 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                        background-color 0.2s ease,
                        border-color 0.2s ease,
                        color 0.2s ease;
          }
          .grid-stagger.animate-in .skill-tag {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          .grid-stagger.animate-in > * {
            will-change: auto;
          }
          .grid-stagger.animate-in .skill-tag:nth-child(1) { transition-delay: 0.06s; }
          .grid-stagger.animate-in .skill-tag:nth-child(2) { transition-delay: 0.09s; }
          .grid-stagger.animate-in .skill-tag:nth-child(3) { transition-delay: 0.12s; }
          .grid-stagger.animate-in .skill-tag:nth-child(4) { transition-delay: 0.15s; }
          .grid-stagger.animate-in .skill-tag:nth-child(5) { transition-delay: 0.18s; }
          .grid-stagger.animate-in .skill-tag:nth-child(6) { transition-delay: 0.21s; }
          .grid-stagger.animate-in .skill-tag:nth-child(7) { transition-delay: 0.24s; }
          .grid-stagger.animate-in .skill-tag:nth-child(8) { transition-delay: 0.27s; }

          .project-accent {
            transform-origin: left center;
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .project-card h3 {
            transition: color 0.25s ease;
          }
          .project-link svg {
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .experience-icon {
            opacity: 0;
            transform: scale(0.82);
            transition: opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .scroll-animate.animate-in .experience-icon {
            opacity: 1;
            transform: scale(1);
            transition-delay: calc(var(--scroll-delay, 0ms) + 90ms);
          }
          @media (hover: hover) and (pointer: fine) {
            .grid-stagger.animate-in > .card-hover:hover {
              transform: translate3d(0, -6px, 0) scale(1.005);
            }
            .project-card:hover .project-accent {
              transform: scaleX(1.28);
            }
            .project-link:hover svg {
              transform: translate3d(2px, -2px, 0);
            }
          }

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

          @media (prefers-reduced-motion: reduce) {
            html,
            body {
              scroll-behavior: auto !important;
            }
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              transition-delay: 0ms !important;
            }
            .scroll-animate,
            .scroll-animate.animate-in,
            .section-eyebrow,
            .section-title,
            .section-description,
            .hero-item,
            .skill-tag,
            .experience-icon,
            .stagger-children > *,
            .grid-stagger > * {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
              transition-delay: 0ms !important;
              animation: none !important;
            }
            .nav-active-indicator {
              transition: none !important;
            }
          }

          @media (max-width: 640px) {
            .animate-left:not(.animate-in) {
              transform: translate3d(-18px, 0, 0);
            }
            .animate-right:not(.animate-in) {
              transform: translate3d(18px, 0, 0);
            }
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
