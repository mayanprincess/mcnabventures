/**
 * Custom hook for scroll-based animations
 * Uses Intersection Observer to trigger animations when elements enter viewport
 */

import { useEffect, useState, useRef } from 'react';

export function useScrollAnimation(options = {}) {
  const { threshold = 0.15, triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Animation class presets for common patterns
 */
export const animations = {
  fadeUp: (isVisible) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
  
  fadeDown: (isVisible) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`,
  
  fadeLeft: (isVisible) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`,
  
  fadeRight: (isVisible) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`,
  
  fade: (isVisible) => 
    `transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`,
  
  scale: (isVisible) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`,
  
  // Slower variants
  fadeUpSlow: (isVisible) => 
    `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
  
  fadeLeftSlow: (isVisible) => 
    `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`,
  
  fadeRightSlow: (isVisible) => 
    `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`,
};

/**
 * Get delay style for staggered animations
 */
export const getDelay = (index, baseDelay = 100) => ({
  transitionDelay: `${index * baseDelay}ms`,
});
