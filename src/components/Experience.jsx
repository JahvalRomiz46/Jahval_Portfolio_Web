import React from 'react';
import { experiences, education } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Experience = () => {
  const sectionRef = useScrollAnimation();
  const workRef = useScrollAnimation({ isStagger: true, staggerChildren: '.timeline-item', y: 30 });
  const eduRef = useScrollAnimation({ isStagger: true, staggerChildren: '.edu-item', y: 30 });

  return (
    <section id="experience" className="py-24 px-6 bg-slate-50/50" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Work Experience Section (Left) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 flex items-center">
              Work Experience
            </h2>
            
            <div ref={workRef} className="relative border-l-2 border-secondary/30 ml-4 md:ml-6 space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item relative pl-8 md:pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-secondary ring-4 ring-slate-50"></div>
                  
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                        <p className="text-lg font-medium text-secondary-dark">{exp.company} <span className="text-slate-400 text-sm font-normal">({exp.type})</span></p>
                      </div>
                      <div className="mt-3 xl:mt-0 text-left xl:text-right">
                        <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-mono mb-1 xl:mb-2">{exp.period}</span>
                        <p className="text-slate-500 text-sm">{exp.location}</p>
                      </div>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm leading-relaxed">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section (Right) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 flex items-center">
              Education Background
            </h2>
            
            <div ref={eduRef} className="relative border-l-2 border-secondary/30 ml-4 md:ml-6 space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="edu-item relative pl-8 md:pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-secondary ring-4 ring-slate-50"></div>
                  
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{edu.degree}</h3>
                        <p className="text-lg font-medium text-secondary-dark">{edu.school}</p>
                        <p className="text-slate-500 text-sm mt-1">{edu.location}</p>
                      </div>
                      <div className="mt-4 xl:mt-0 text-left xl:text-right">
                        <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-mono mb-2">{edu.period}</span>
                        <p className="font-semibold text-primary">GPA: {edu.gpa}</p>
                      </div>
                    </div>
                    
                    {edu.thesis && (
                      <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Thesis Title</span>
                        <p className="text-slate-700 italic text-sm leading-relaxed">
                          "{edu.thesis}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Experience;
