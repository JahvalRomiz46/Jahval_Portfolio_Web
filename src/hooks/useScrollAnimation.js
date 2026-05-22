import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    
    if (!el) return;

    const {
      y = 40,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = 'power2.out',
      trigger = el,
      start = 'top 85%',
      isStagger = false,
      staggerChildren = null // selector for children to stagger
    } = options;

    let animation;

    if (isStagger && staggerChildren) {
      const children = el.querySelectorAll(staggerChildren);
      
      // Set initial state
      gsap.set(children, { y, opacity });

      animation = gsap.to(children, {
        scrollTrigger: {
          trigger: trigger,
          start: start,
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: delay
      });
    } else {
      // Set initial state
      gsap.set(el, { y, opacity });

      animation = gsap.to(el, {
        scrollTrigger: {
          trigger: trigger,
          start: start,
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: duration,
        ease: ease,
        delay: delay
      });
    }

    return () => {
      if (animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === trigger) t.kill();
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  return ref;
};
