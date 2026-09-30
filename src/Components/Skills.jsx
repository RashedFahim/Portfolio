import C from "./constants";
import SectionHeading from "./SectionHeading";

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

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-3 md:px-6 w-full">
      <div className="max-w-[1850px] mx-auto w-full">
        <div className="scroll-animate animate-up">
          <SectionHeading eyebrow="Skills" title="What I work with" />
        </div>
        
        <div className="scroll-animate animate-up grid-stagger grid md:grid-cols-3 gap-5 w-full">
          {SKILLS.map((s) => (
            <div 
              key={s.category} 
              className="skill-card card-hover p-6 rounded-2xl flex flex-col h-full min-h-[200px] group hover:border-green-500/60 hover:bg-white/[0.08] hover:shadow-[0_8px_40px_rgba(31,227,138,0.08)] w-full"
              style={{ 
                background: C.surface, 
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Green accent line that expands on hover */}
              <div className="w-10 h-1 rounded-full mb-4 transition-all duration-300 group-hover:w-16" style={{ background: C.green }} />
              
              <h3 className="font-semibold mb-4 transition-colors duration-300 group-hover:text-green-400">{s.category}</h3>
              
              <div className="flex flex-wrap gap-2 flex-1 content-start">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="skill-tag text-xs px-3 py-1.5 rounded-md transition-all duration-300 hover:bg-white/15 hover:border-green-500/40 hover:text-white hover:scale-[1.02]"
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
  );
}
