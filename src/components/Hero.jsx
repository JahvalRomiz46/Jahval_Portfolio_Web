import React, { useState, useEffect, useRef } from 'react';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const heroRef = useRef(null);
  
  // Typing animation effect
  useEffect(() => {
    const currentPhrase = personalInfo.typingPhrases[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500); // pause at end of phrase
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % personalInfo.typingPhrases.length);
      } else {
        setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content > *', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-12 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full hero-content">
        <p className="text-secondary font-medium mb-4 text-xl">
          Hi, I'm {personalInfo.name} 👋
        </p>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 tracking-tight">
          A Data Analyst who <br className="hidden md:block" />
          <span className="text-secondary font-mono text-2xl md:text-4xl lg:text-5xl inline-block mt-2 h-[1.2em]">
            {text}
            <span className="typing-cursor inline-block w-[3px] h-[1em] bg-secondary ml-1 align-middle -mt-2"></span>
          </span>
        </h1>
        
        <p className="text-lg text-muted max-w-2xl mb-10 leading-relaxed">
          {personalInfo.subtitle}
        </p>
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-center font-medium transition-colors shadow-lg shadow-slate-200 cursor-pointer"
            >
              View My Work
            </button>
            <a 
              href={personalInfo.resumeLink}
              download="CV_Jahval_Romiz_Septrada.pdf"
              className="bg-white border-2 border-slate-200 hover:border-secondary hover:text-secondary text-primary px-8 py-4 rounded-xl text-center font-medium transition-all flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>

          <div className="flex items-center gap-4 mt-2 lg:mt-0">
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all text-slate-600 shadow-sm cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-[#24292F] hover:border-[#24292F] hover:text-white transition-all text-slate-600 shadow-sm cursor-pointer"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a 
              href={socialLinks.email} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-white transition-all text-slate-600 shadow-sm cursor-pointer"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Inline styles for the scroll arrow animation */}
      <style>{`
        @keyframes scroll-arrow {
          0% { opacity: 0; transform: translateY(-10px) scale(0.8); }
          50% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(10px) scale(0.8); }
        }
        .animate-arrow-1 { animation: scroll-arrow 2s infinite; }
        .animate-arrow-2 { animation: scroll-arrow 2s infinite; animation-delay: 0.15s; }
        .animate-arrow-3 { animation: scroll-arrow 2s infinite; animation-delay: 0.3s; }
      `}</style>
      
      {/* Scroll Down Indicator */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('about');
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer bg-transparent border-none"
        aria-label="Scroll down to About section"
      >
        <ChevronDown size={28} className="text-secondary animate-arrow-1 -mb-4" />
        <ChevronDown size={28} className="text-secondary animate-arrow-2 -mb-4" />
        <ChevronDown size={28} className="text-secondary animate-arrow-3" />
      </button>
    </section>
  );
};

export default Hero;
