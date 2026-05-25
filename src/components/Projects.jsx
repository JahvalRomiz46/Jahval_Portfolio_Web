import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center">
              Featured Projects
            </h2>
            <p className="text-muted max-w-2xl">
              A selection of my recent data analysis work, showcasing interactive dashboards, predictive models, and data-driven insights.
            </p>
          </div>
          
          {/* Slider Controls */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={scrollPrev}
              className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary hover:bg-white transition-all shadow-sm cursor-pointer"
              aria-label="Previous projects"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary hover:bg-white transition-all shadow-sm cursor-pointer"
              aria-label="Next projects"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="pl-6 flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="project-card cursor-pointer group relative bg-surface rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 h-[320px]"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={project.thumbnail || project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-slate-900/60 border border-white/20 text-white text-[10px] sm:text-xs font-mono px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-secondary transition-colors leading-snug">
                      {project.title}
                    </h3>
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

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
