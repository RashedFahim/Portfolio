import { ArrowUpRight } from "lucide-react";
import C from "./constants";
import { Github } from "./Icons";
import SectionHeading from "./SectionHeading";
import ScrollAnimate from "./ScrollAnimate";

const PROJECTS = [

  {
  title: "Polygon Resource — Agricultural Export Website",
  desc: "Designed and developed a modern, responsive corporate website for Polygon Resource, showcasing its agricultural export business, product portfolio, company information, and trade inquiry services for international customers.",
  tags: ["React", "Vite", "Tailwind CSS", "Responsive Design", "Web Development"],
  live: "https://polygon-resource.vercel.app/",
  repo: "https://github.com/RashedFahim/Polygon-Resource",
  },

  {
  title: "Axon — RAG-Powered Document Research Assistant",
  desc: "Developed a local RAG-powered document assistant that enables users to upload documents, ask natural-language questions, and receive context-aware answers with source citations using semantic search and local LLM inference.",
  tags: ["RAG", "Ollama", "ChromaDB", "FastAPI", "React"],
  live: "https://axon-rag.vercel.app/",
  repo: "https://github.com/RashedFahim/axon-rag-assistant",
},
  
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

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-3 md:px-6 w-full" style={{ background: C.bgAlt }}>
      <div className="max-w-[1850px] mx-auto w-full">
        <ScrollAnimate direction="up" delay={100}>
          <SectionHeading eyebrow="Projects" title="Selected work" />
        </ScrollAnimate>
        
        <div className="grid md:grid-cols-2 gap-6 w-full">
          {PROJECTS.map((p, index) => (
            <ScrollAnimate key={p.title} direction="up" delay={100 + index * 100}>
              <div className="card-hover p-6 rounded-2xl flex flex-col w-full" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
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
  );
}
