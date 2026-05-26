import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const [readmeContent, setReadmeContent] = useState(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

  useEffect(() => {
    // Fetch README if URL is provided
    if (project?.githubReadmeUrl && project.githubReadmeUrl.includes("YOUR_REPO_NAME") === false) {
      setIsLoadingReadme(true);
      fetch(project.githubReadmeUrl)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.text();
        })
        .then(text => {
          setReadmeContent(text);
          setIsLoadingReadme(false);
        })
        .catch(err => {
          console.error("Failed to fetch README", err);
          setIsLoadingReadme(false);
        });
    } else {
      setReadmeContent(null);
    }
  }, [project]);

  useEffect(() => {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';

    // Animation in
    const tl = gsap.timeline();
    tl.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
        "-=0.1"
      );

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Animation out
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, "-=0.1");
  };

  // Close when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  // Calculate base URL for relative images in README
  let baseUrl = '';
  if (project?.githubReadmeUrl) {
    const parts = project.githubReadmeUrl.split('/');
    parts.pop(); // remove filename (e.g., README.md)
    baseUrl = parts.join('/') + '/';
  }

  return createPortal(
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 pb-6 px-4 sm:px-6 bg-slate-900/40 backdrop-blur-sm opacity-0"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-2xl relative minimal-scrollbar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Sticky Close Button */}
        <div className="sticky top-4 z-50 flex justify-end px-4 w-full h-0 pointer-events-none">
          <button 
            onClick={handleClose}
            className="pointer-events-auto w-10 h-10 bg-white shadow-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Header Image */}
        <div className="w-full h-48 sm:h-64 relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="bg-white/20 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 sm:p-16">
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-primary mb-5">
                {readmeContent ? "Project Documentation" : "Project Overview"}
              </h3>
              
              {isLoadingReadme ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-slate-200 border-t-secondary rounded-full animate-spin"></div>
                </div>
              ) : readmeContent ? (
                <div className="text-muted leading-relaxed break-words">
                  {project?.githubReadmeUrl && (
                    <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 flex-shrink-0">
                          <Github className="text-slate-700" size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">GitHub Repository Documentation</p>
                          <p className="text-xs text-slate-500">This description is dynamically loaded from the project's original README file.</p>
                        </div>
                      </div>
                      <a 
                        href={project.githubReadmeUrl.replace('raw.githubusercontent.com', 'github.com').replace(/\/(main|master)\/README\.md$/, '')} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="whitespace-nowrap inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        View Original
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-primary mt-8 mb-4 border-b border-slate-200 pb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold text-primary mt-8 mb-4 border-b border-slate-100 pb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold text-primary mt-6 mb-3" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 text-slate-600" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 text-slate-600 space-y-1" {...props} />,
                      a: ({node, ...props}) => <a className="text-secondary hover:text-secondary-dark hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-secondary-light pl-4 italic text-slate-500 mb-4 bg-slate-50 py-2 rounded-r-lg" {...props} />,
                      code: ({node, inline, className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                          <div className="bg-slate-800 rounded-lg overflow-hidden mb-6">
                            <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-400 font-mono flex justify-between">
                              <span>{match ? match[1] : 'code'}</span>
                            </div>
                            <pre className="p-4 overflow-x-auto text-sm text-slate-200 font-mono">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className="bg-slate-100 text-secondary-dark px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200" {...props}>
                            {children}
                          </code>
                        )
                      },
                      img: ({node, src, ...props}) => {
                        // Fix relative image paths to point to the raw GitHub URL
                        const isRelative = src && !src.startsWith('http') && !src.startsWith('data:');
                        const finalSrc = isRelative ? baseUrl + src.replace(/^\.\//, '') : src;
                        return <img src={finalSrc} className="rounded-lg shadow-sm border border-slate-200 my-6 max-w-full h-auto" {...props} />
                      },
                      table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse border border-slate-200 text-sm text-left" {...props} /></div>,
                      thead: ({node, ...props}) => <thead className="bg-slate-50 text-slate-700" {...props} />,
                      tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-slate-200" {...props} />,
                      tr: ({node, ...props}) => <tr className="hover:bg-slate-50/50 transition-colors" {...props} />,
                      th: ({node, ...props}) => <th className="border border-slate-200 px-4 py-3 font-semibold whitespace-nowrap" {...props} />,
                      td: ({node, ...props}) => <td className="border border-slate-200 px-4 py-3 text-slate-600" {...props} />,
                      hr: ({node, ...props}) => <hr className="border-t border-slate-200 my-8" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />
                    }}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted leading-relaxed">
                  {project.description}
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
