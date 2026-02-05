'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useHeader } from '@/context/HeaderContext';
import { primaryHeroData } from '@/data';

export default function PrimaryHero({ content = primaryHeroData }) {
  const { setIsTransparent } = useHeader();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Set header to transparent when this component mounts
  useEffect(() => {
    setIsTransparent(true);
    return () => setIsTransparent(false);
  }, [setIsTransparent]);

  // Trigger animations after mount
  useEffect(() => {
    // Small delay to ensure smooth animation start
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    const contentTimer = setTimeout(() => setShowContent(true), 400);
    
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section 
      className="relative w-full h-[600px] lg:h-[75vh] overflow-hidden"
      aria-labelledby="primary-hero-heading"
    >
      {/* Background Video */}
      <div 
        className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={content.videoSrc} type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div 
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            isLoaded ? 'bg-navy/30' : 'bg-navy/60'
          }`} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-start lg:justify-center h-full px-6 sm:px-12 lg:px-20 xl:px-32 pt-20">
        <div className="max-w-5xl">
          {/* Heading with staggered word animation */}
          <h1 
            id="primary-hero-heading"
            className="font-literata font-extralight text-white text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[80px] leading-[1.1] mb-8 sm:mb-10 pt-[40px] lg:pt-0"
          >
            {content.heading?.split('\n').map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <span 
                  className={`inline-block transition-all duration-700 ease-out ${
                    showContent 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-full'
                  }`}
                  style={{ 
                    transitionDelay: `${lineIndex * 150 + 200}ms` 
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Buttons with fade and slide animation */}
          <div 
            className={`flex flex-wrap gap-4 sm:gap-6 transition-all duration-700 ease-out ${
              showContent 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {content.primaryButton && (
              <Link
                href={content.primaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-navy text-white font-work-sans-medium text-sm sm:text-base rounded-full hover:bg-navy/90 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {content.primaryButton.label}
              </Link>
            )}
            
            {content.secondaryButton && (
              <Link
                href={content.secondaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#E91E63] text-white font-work-sans-medium text-sm sm:text-base rounded-full hover:bg-[#D81B60] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {content.secondaryButton.label}
              </Link>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
