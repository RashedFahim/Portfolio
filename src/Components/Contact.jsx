import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send } from "lucide-react";
import C from "./constants";
import { Github, Linkedin } from "./Icons";
import { Eyebrow } from "./SectionHeading";
import ScrollAnimate from "./ScrollAnimate";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const SERVICE_ID = 'service_b4v41vb';
  const TEMPLATE_ID = 'template_zu78q4t';
  const PUBLIC_KEY = 'qffSSJUmEqdWyhGk1';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        setSent(true);
        setTimeout(() => setSent(false), 3200);
        e.target.reset();
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <section id="contact" className="py-28 px-3 md:px-6 w-full">
      <div className="max-w-[1850px] mx-auto grid md:grid-cols-5 gap-12 w-full">
        <div className="md:col-span-2">
          <ScrollAnimate direction="right" delay={100}>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Let's build something worth shipping
            </h2>
            <p className="text-sm mb-8" style={{ color: C.textMuted }}>
              Open to internships, freelance work, and interesting
              collaborations. I usually reply within a day.
            </p>
          </ScrollAnimate>
          
          <ScrollAnimate direction="right" delay={150}>
            <div className="space-y-4 mb-8">
              <a href="mailto:rashedfahimchowdhury@gmail.com" className="flex items-center gap-3 text-sm">
                <Mail size={16} style={{ color: C.green }} /> rashedfahimchowdhury@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: C.textMuted }}>
                <MapPin size={16} style={{ color: C.green }} /> Dhaka, Bangladesh
              </div>
            </div>
          </ScrollAnimate>
          
          <ScrollAnimate direction="right" delay={200}>
            <div className="flex gap-4">
              <a 
                href="https://github.com/RashedFahim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500/10"
                style={{ border: `1px solid ${C.border}` }}
              >
                <Github size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/in/rashedfahim/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500/10"
                style={{ border: `1px solid ${C.border}` }}
              >
                <Linkedin size={16} />
              </a>
            </div>
          </ScrollAnimate>
        </div>

        <div className="md:col-span-3">
          <ScrollAnimate direction="left" delay={100}>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <input
                    required
                    type="text"
                    name="user_name"
                    placeholder=" "
                    className="w-full px-4 py-3.5 rounded-lg text-sm outline-none placeholder-transparent peer transition-all duration-300 hover:border-green-500/50 hover:bg-white/[0.03] focus:border-green-500 focus:shadow-[0_0_30px_rgba(31,227,138,0.08)]"
                    style={{ 
                      background: 'transparent', 
                      border: `1px solid ${C.border}`, 
                      color: C.text 
                    }}
                  />
                  <label 
                    className="absolute left-4 -top-2.5 text-xs transition-all duration-300 px-1 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#6B6D77] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-400 group-hover:text-green-400"
                    style={{ background: C.bg }}
                  >
                    Your name
                  </label>
                </div>
                <div className="relative group">
                  <input
                    required
                    type="email"
                    name="user_email"
                    placeholder=" "
                    className="w-full px-4 py-3.5 rounded-lg text-sm outline-none placeholder-transparent peer transition-all duration-300 hover:border-green-500/50 hover:bg-white/[0.03] focus:border-green-500 focus:shadow-[0_0_30px_rgba(31,227,138,0.08)]"
                    style={{ 
                      background: 'transparent', 
                      border: `1px solid ${C.border}`, 
                      color: C.text 
                    }}
                  />
                  <label 
                    className="absolute left-4 -top-2.5 text-xs transition-all duration-300 px-1 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#6B6D77] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-400 group-hover:text-green-400"
                    style={{ background: C.bg }}
                  >
                    Email address
                  </label>
                </div>
              </div>
              <div className="relative group">
                <textarea
                  required
                  rows={5}
                  name="message"
                  placeholder=" "
                  className="w-full px-4 py-3.5 rounded-lg text-sm outline-none placeholder-transparent peer transition-all duration-300 hover:border-green-500/50 hover:bg-white/[0.03] focus:border-green-500 focus:shadow-[0_0_30px_rgba(31,227,138,0.08)]"
                  style={{ 
                    background: 'transparent', 
                    border: `1px solid ${C.border}`, 
                    color: C.text 
                  }}
                />
                <label 
                  className="absolute left-4 -top-2.5 text-xs transition-all duration-300 px-1 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#6B6D77] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-400 group-hover:text-green-400"
                  style={{ background: C.bg }}
                >
                  What are we building?
                </label>
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(31,227,138,0.3)]"
                style={{ background: C.green, color: "#17181C" }}
              >
                {sent ? "Message sent ✓" : "Send message"} <Send size={15} />
              </button>
            </form>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
