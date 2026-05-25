import React, { useState } from 'react';
import { certifications } from '../data/portfolioData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import CertModal from './CertModal';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section id="certifications" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center">
            Certifications & Credentials
          </h2>
          
          {/* Slider Controls */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={scrollPrev}
              className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary hover:bg-white transition-all shadow-sm cursor-pointer"
              aria-label="Previous certifications"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary hover:bg-white transition-all shadow-sm cursor-pointer"
              aria-label="Next certifications"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Carousel Slider */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="pl-6 flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                >
                  <div 
                    onClick={() => setSelectedCert(cert)}
                    className="cert-card relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-zoom-in border border-slate-100 aspect-[4/3] bg-slate-50"
                  >
                    <img 
                      src={cert.thumbnail || cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Bottom Pop-up Info Bar */}
                    <div className="absolute bottom-0 left-0 w-full bg-slate-900/70 backdrop-blur-md p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-t border-white/10">
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-tight">{cert.name}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-slate-300 text-xs">{cert.issuer}</span>
                        <span className="w-1 h-1 rounded-full bg-secondary"></span>
                        <span className="text-secondary-light font-mono text-xs">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      {/* Mobile Slider Controls */}
      <div className="flex md:hidden justify-center gap-4 mt-8">
          <button 
            onClick={scrollPrev}
            className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary hover:bg-white transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary hover:bg-white transition-all shadow-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedCert && (
        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  );
};

export default Certifications;
