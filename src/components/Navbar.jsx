import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Certifications', id: 'certifications' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for fixed navbar
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-primary tracking-tight">
          {personalInfo.name}<span className="text-secondary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-muted hover:text-secondary-dark transition-colors text-sm font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <a 
            href={personalInfo.resumeLink}
            className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Download Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-border py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-primary font-medium py-2 border-b border-slate-100 text-left cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <a 
            href={personalInfo.resumeLink}
            className="bg-secondary text-white text-center px-5 py-3 rounded-lg font-medium mt-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
