'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

// Company logos for the bottom section
const companyLogos = [
  { name: 'Mayan Princess', logo: '/logos/empresas/mayanprincess.svg', width: 120, height: 80 },
  { name: 'Turquoise Bay', logo: '/logos/empresas/turq.svg', width: 100, height: 80 },
  { name: 'Acqua di Mare Resort', logo: '/logos/empresas/acqua.svg', width: 140, height: 70 },
  { name: 'Galaxy Wave', logo: '/logos/empresas/galaxywave.svg', width: 100, height: 50 },
  { name: 'CM Airlines', logo: '/logos/empresas/cmairlines.svg', width: 140, height: 40 },
  { name: 'Petroa', logo: '/logos/empresas/petroa.svg', width: 100, height: 50 },
];

// Sample slides data - replace with PocketBase data
const sampleSlides = [
  {
    id: 1,
    mainImage: '/placeholder-resort.jpg',
    circleImage: '/placeholder-person.jpg',
    badge: 'Group Snapshot',
    title: 'Tourism & Hospitality',
    description: 'Creating world-class stays and memorable getaways.',
    highlights: [
      'Mayan Princess',
      'Las Sirenas',
      'Acqua di Mare',
      'Turquoise Bay',
    ],
  },
  {
    id: 2,
    mainImage: '/placeholder-resort-2.jpg',
    circleImage: '/placeholder-person-2.jpg',
    badge: 'Group Snapshot',
    title: 'Aviation & Transport',
    description: 'Connecting communities across Central America.',
    highlights: [
      'CM Airlines',
      'Galaxy Wave',
      'Air Services',
    ],
  },
];

export default function GroupSnapshot({ slides = sampleSlides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Area */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide) => (
              <div key={slide.id} className="embla__slide flex-shrink-0 w-full min-w-0">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                  {/* Left Side - Images */}
                  <div className="relative flex-1 w-full lg:w-auto">
                    {/* Main Image */}
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
                      <Image
                        src={slide.mainImage}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Circle Image - Overlapping */}
                    <div className="absolute -bottom-8 right-8 sm:right-16 lg:-right-12 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <Image
                        src={slide.circleImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1 pt-12 lg:pt-0">
                    {/* Badge */}
                    <span className="inline-block border border-navy/30 rounded-full px-4 py-1.5 font-fustat-medium text-navy text-xs tracking-wider mb-6">
                      {slide.badge}
                    </span>

                    {/* Title */}
                    <h2 className="font-literata-light text-navy text-[36px] sm:text-[44px] lg:text-[52px] leading-tight mb-4">
                      {slide.title}
                    </h2>

                    {/* Description */}
                    <p className="font-fustat-regular text-navy/70 text-lg mb-8">
                      {slide.description}
                    </p>

                    {/* Highlights List */}
                    <ul className="space-y-3">
                      {slide.highlights.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="text-turquoise font-fustat-medium">→</span>
                          <span className="font-fustat-medium text-navy text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mt-12 lg:mt-16">
          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border-2 border-turquoise text-turquoise flex items-center justify-center hover:bg-turquoise hover:text-white transition-colors duration-200"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedIndex === index 
                    ? 'bg-turquoise w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-turquoise text-white flex items-center justify-center hover:bg-turquoise/90 transition-colors duration-200"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Company Logos Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 border-t border-sand/40">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8 lg:gap-12">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
