import { ExternalLink, GraduationCap } from "lucide-react";
import C from "./constants";
import SectionHeading from "./SectionHeading";
import ScrollAnimate from "./ScrollAnimate";

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

export default function Education() {
  return (
    <section id="education" className="py-24 px-3 md:px-6 w-full" style={{ background: C.bgAlt }}>
      <div className="max-w-[1850px] mx-auto w-full">
        <ScrollAnimate direction="up" delay={60}>
          <SectionHeading eyebrow="Education" title="Academic background" />
        </ScrollAnimate>
        
        <div className="space-y-5 w-full">
          {EDUCATION.map((e, index) => (
            <ScrollAnimate key={e.degree} direction="up" delay={70 + index * 60}>
              <div className="card-hover p-6 rounded-2xl grid md:grid-cols-4 gap-4 w-full" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
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
  );
}
