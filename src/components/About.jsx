import React from 'react';
import { personalInfo, skills } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const sectionRef = useScrollAnimation();
  const skillsRef = useScrollAnimation({ 
    isStagger: true, 
    staggerChildren: '.skill-tag',
    stagger: 0.05,
    delay: 0.2
  });

  return (
    <section id="about" className="py-24 px-6 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 flex items-center">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Photo Column */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-8">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply z-10"></div>
              <img 
                src={personalInfo.photo} 
                alt={personalInfo.name} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          {/* Bio & Skills Column */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center h-full">
            <div className="prose prose-lg text-slate-600 mb-10 leading-relaxed">
              <p>{personalInfo.bio}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-6">Core Competencies</h3>
              <div className="flex flex-wrap gap-3" ref={skillsRef}>
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="skill-tag bg-secondary-light text-secondary-dark font-mono text-sm px-4 py-2 rounded-full border border-sky-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
