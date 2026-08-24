import C from "./constants";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 px-3 md:px-6 w-full" style={{ background: C.bgAlt }}>
      <div className="max-w-[1850px] mx-auto w-full">
        <div className="scroll-animate animate-up">
          <SectionHeading eyebrow="About" title="Beyond the resume" />
        </div>

        <div className="grid md:grid-cols-5 gap-8 w-full">
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
              className="relative mb-8 p-6 rounded-2xl group w-full"
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
              className="card-hover p-6 rounded-2xl w-full"
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
  );
}
