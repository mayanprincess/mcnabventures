'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useHeader } from '@/context/HeaderContext';

// Hero content - replace with actual data from PocketBase
const heroContent = {
  heading: 'Heart in Roatan,\nvision in Central America',
  primaryButton: { label: 'Discover our companies', href: '/companies' },
  secondaryButton: { label: 'Explore Our Industries', href: '/industries' },
  videoSrc: '/experience-jamaica.mp4',
};

export default function PrimaryHero({ content = heroContent }) {
  const { setIsTransparent } = useHeader();

  // Set header to transparent when this component mounts
  useEffect(() => {
    setIsTransparent(true);
    return () => setIsTransparent(false);
  }, [setIsTransparent]);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden"
      aria-labelledby="primary-hero-heading"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-navy/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 lg:px-20 xl:px-32 pt-20">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1 
            id="primary-hero-heading"
            className="font-literata-light text-white text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[80px] leading-[1.1] mb-8 sm:mb-10 whitespace-pre-line"
          >
            {content.heading}
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {content.primaryButton && (
              <Link
                href={content.primaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-navy text-white font-work-sans-medium text-sm sm:text-base rounded-full hover:bg-navy/90 transition-colors duration-300"
              >
                {content.primaryButton.label}
              </Link>
            )}
            
            {content.secondaryButton && (
              <Link
                href={content.secondaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#E91E63] text-white font-work-sans-medium text-sm sm:text-base rounded-full hover:bg-[#D81B60] transition-colors duration-300"
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
