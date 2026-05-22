import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AmbientBackground from './components/AmbientBackground';

// Lazy load below-the-fold components for better initial load performance
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Footer = lazy(() => import('./components/Footer'));

// A minimal fallback UI while components load
const SectionLoader = () => (
  <div className="py-24 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-secondary rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen font-inter selection:bg-secondary-light selection:text-secondary-dark relative z-0 overflow-x-hidden w-full">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<SectionLoader />}>
          <Experience />
          <Projects />
          <Certifications />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20 bg-[#0F172A]"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
