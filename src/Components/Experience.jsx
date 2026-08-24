import { Briefcase } from "lucide-react";
import C from "./constants";
import SectionHeading from "./SectionHeading";
import ScrollAnimate from "./ScrollAnimate";

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

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-3 md:px-6 w-full">
      <div className="max-w-[1850px] mx-auto w-full">
        <ScrollAnimate direction="up" delay={100}>
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
        </ScrollAnimate>
        
        <div className="space-y-5 w-full">
          {EXPERIENCE.map((e, index) => (
            <ScrollAnimate key={e.role} direction="up" delay={100 + index * 100}>
              <div className="card-hover p-6 rounded-2xl grid md:grid-cols-4 gap-4 w-full" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
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
  );
}
