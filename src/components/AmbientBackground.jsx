import React, { useEffect, useRef } from 'react';

const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // We start the mouse target at center, and mouse current at center
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize(); // Initial sizing

    let time = 0;

    const draw = () => {
      time += 0.0015; // Slow, ambient drift
      
      // Smooth interpolation for mouse movement (fluidity)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Calculate parallax offset based on center of screen
      const offsetX = (mouse.x - width / 2) * 0.03;
      const offsetY = (mouse.y - height / 2) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // Define blobs using a combination of sine/cosine for organic orbital movement
      const blobs = [
        { 
          x: width * 0.4 + Math.cos(time) * width * 0.3, 
          y: height * 0.4 + Math.sin(time * 0.8) * height * 0.3, 
          r: Math.max(width, height) * 0.45, 
          color: 'rgba(56, 189, 248, 0.15)' // --color-secondary
        },
        { 
          x: width * 0.6 + Math.sin(time * 1.2) * width * 0.3, 
          y: height * 0.6 + Math.cos(time * 1.1) * height * 0.3, 
          r: Math.max(width, height) * 0.5, 
          color: 'rgba(14, 165, 233, 0.12)' // --color-secondary-dark
        },
        { 
          x: width * 0.5 + Math.cos(time * 0.9) * width * 0.2, 
          y: height * 0.5 + Math.sin(time * 1.3) * height * 0.2, 
          r: Math.max(width, height) * 0.4, 
          color: 'rgba(224, 242, 254, 0.6)' // --color-secondary-light
        }
      ];

      blobs.forEach((blob, i) => {
        ctx.beginPath();
        
        // Apply parallax. Farther background elements move less.
        const parallaxX = blob.x + offsetX * (i + 1);
        const parallaxY = blob.y + offsetY * (i + 1);
        
        const gradient = ctx.createRadialGradient(
          parallaxX, parallaxY, 0,
          parallaxX, parallaxY, blob.r
        );
        // Fading to the background color with 0 opacity prevents muddy grayish blending
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0)'); 
        
        ctx.fillStyle = gradient;
        ctx.arc(parallaxX, parallaxY, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};

export default AmbientBackground;
