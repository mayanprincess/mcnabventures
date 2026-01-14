'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

// Sample data - replace with actual data from PocketBase
const sampleHighlights = [
  {
    id: 1,
    image: '/placeholder-highlight-1.jpg',
    title: 'All-Inclusive Comfort.',
    description: 'Savor island flavors at our restaurants and bars. Enjoy casual bites, gourmet dining, and refreshing cocktails—perfect for any moment.',
  },
  {
    id: 2,
    image: '/placeholder-highlight-2.jpg',
    title: 'Beachfront Suites.',
    description: 'Steps from the ocean with breathtaking views.',
  },
  {
    id: 3,
    image: '/placeholder-highlight-3.jpg',
    title: 'World-Class Diving.',
    description: 'Explore vibrant coral reefs and marine life with our expert dive team.',
  },
  {
    id: 4,
    image: '/placeholder-highlight-4.jpg',
    title: 'Spa & Wellness.',
    description: 'Rejuvenate your body and mind with our luxurious spa treatments.',
  },
];

export default function GetHighlights({ 
  title = 'Get the highlights.',
  items = sampleHighlights 
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
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

  return (
    <section 
      className="w-full py-16 sm:py-20 lg:py-24 bg-[#F6F4EF]"
      aria-labelledby="highlights-heading"
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">
        {/* Title */}
        <h2 
          id="highlights-heading"
          className="font-literata-light-italic text-navy text-[36px] sm:text-[42px] lg:text-[48px] mb-10 sm:mb-12"
        >
          {title}
        </h2>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[45%]"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 45vw"
                  />
                </div>
                
                {/* Content */}
                <div className="max-w-md">
                  <p className="font-work-sans text-navy text-base sm:text-lg leading-relaxed">
                    <span className="font-work-sans-semibold">{item.title}</span>{' '}
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10 sm:mt-12">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === selectedIndex 
                    ? 'bg-turquoise' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                prevBtnDisabled
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-navy text-navy hover:bg-navy hover:text-white'
              }`}
              aria-label="Previous slide"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                nextBtnDisabled
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-navy text-navy hover:bg-navy hover:text-white'
              }`}
              aria-label="Next slide"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
