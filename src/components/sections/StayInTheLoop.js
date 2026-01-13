'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

// Sample news data - replace with actual data from PocketBase
const newsItems = [
  {
    id: 1,
    category: 'Galaxy Wave',
    title: 'Galaxy Wave Expands Service Between Roatán and Utila',
    date: 'September 24, 2025',
    image: '/placeholder-news-1.jpg',
    href: '/news/galaxy-wave-expands-service'
  },
  {
    id: 2,
    category: 'Galaxy Wave',
    title: 'Updated Departure Times for the Holiday Season',
    date: 'October 15, 2025',
    image: '/placeholder-news-2.jpg',
    href: '/news/updated-departure-times'
  },
  {
    id: 3,
    category: 'Galaxy Wave',
    title: 'Schedule Adjustments During Weather Conditions',
    date: 'November 10, 2025',
    image: '/placeholder-news-3.jpg',
    href: '/news/schedule-adjustments'
  },
  {
    id: 4,
    category: 'Galaxy Wave',
    title: 'Top Things to Do When You Arrive in Roatán',
    date: 'November 10, 2025',
    image: '/placeholder-news-4.jpg',
    href: '/news/top-things-roatan'
  },
  {
    id: 5,
    category: 'Galaxy Wave',
    title: 'New Routes Coming Soon',
    date: 'December 1, 2025',
    image: '/placeholder-news-5.jpg',
    href: '/news/new-routes'
  }
];

export default function StayInTheLoop({ items = newsItems }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false
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
      className="w-full py-16 sm:py-20 lg:py-24 bg-white"
      aria-labelledby="stay-in-loop-heading"
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 sm:mb-12">
          <h2 
            id="stay-in-loop-heading"
            className="font-literata-light text-navy text-[36px] sm:text-[42px] lg:text-[48px]"
          >
            Stay in the Loop
          </h2>
          
          <Link
            href="/news"
            className="inline-flex items-center gap-3 bg-navy text-white px-6 py-3 rounded-full font-work-sans-medium text-sm hover:bg-opacity-90 transition-colors duration-300 w-fit"
          >
            View All News
            <Image
              src="/btn_arrow.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </Link>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px]"
              >
                <Link href={item.href} className="block group">
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 320px"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <span className="font-work-sans-medium text-turquoise text-xs uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="font-work-sans-semibold text-navy text-lg leading-snug group-hover:text-turquoise transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-work-sans text-gray-500 text-sm">
                      {item.date}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 sm:mt-10">
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
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-navy text-navy hover:bg-navy hover:text-white'
              }`}
              aria-label="Previous slides"
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
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-navy text-navy hover:bg-navy hover:text-white'
              }`}
              aria-label="Next slides"
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
