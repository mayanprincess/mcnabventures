'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useHeader } from '@/context/HeaderContext';

// Sample slides data - replace with actual data from PocketBase
const sampleSlides = [
  {
    id: 1,
    image: '/placeholder-hero-1.jpg',
    heading: 'Heart in Roatan,\nvision in Central America',
    primaryButton: { label: 'Discover our companies', href: '/companies' },
    secondaryButton: { label: 'Explore Our Industries', href: '/industries' },
  },
  {
    id: 2,
    image: '/placeholder-hero-2.jpg',
    heading: 'Building the future\nof Central America',
    primaryButton: { label: 'Discover our companies', href: '/companies' },
    secondaryButton: { label: 'Explore Our Industries', href: '/industries' },
  },
  {
    id: 3,
    image: '/placeholder-hero-3.jpg',
    heading: 'Sustainable growth,\nlasting impact',
    primaryButton: { label: 'Discover our companies', href: '/companies' },
    secondaryButton: { label: 'Explore Our Industries', href: '/industries' },
  },
];

export default function PrimaryHero({ slides = sampleSlides }) {
  const { setIsTransparent } = useHeader();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 w-full h-full"
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-navy/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Content - Static over carousel */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 lg:px-20 xl:px-32 pt-20">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1 
            id="primary-hero-heading"
            className="font-literata-light-italic text-white text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[80px] leading-[1.1] mb-8 sm:mb-10 whitespace-pre-line"
          >
            {slides[selectedIndex]?.heading}
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {slides[selectedIndex]?.primaryButton && (
              <Link
                href={slides[selectedIndex].primaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-navy text-white font-work-sans-medium text-sm sm:text-base rounded-full hover:bg-navy/90 transition-colors duration-300"
              >
                {slides[selectedIndex].primaryButton.label}
              </Link>
            )}
            
            {slides[selectedIndex]?.secondaryButton && (
              <Link
                href={slides[selectedIndex].secondaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#E91E63] text-white font-work-sans-medium text-sm sm:text-base rounded-full hover:bg-[#D81B60] transition-colors duration-300"
              >
                {slides[selectedIndex].secondaryButton.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 lg:right-20 z-20 flex items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-white ring-2 ring-white ring-offset-2 ring-offset-transparent' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Bottom Vector Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg 
          viewBox="0 0 1920 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120V80C320 20 640 0 960 20C1280 40 1600 80 1920 60V120H0Z" 
            fill="#00BFB3"
          />
        </svg>
      </div>
    </section>
  );
}
