'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { stayInTheLoopData } from '@/data';

export default function StayInTheLoop({ 
  items = stayInTheLoopData.items, 
  title = stayInTheLoopData.title 
}) {
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
            {title}
          </h2>
          
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-3 bg-navy text-white rounded-full font-work-sans-medium text-sm hover:bg-opacity-90 transition-colors duration-300 w-[186px] h-[59px]"
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
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex gap-6 py-4 -my-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex-shrink-0 w-[350px] h-[409px]"
              >
                <Link 
                  href={item.href} 
                  className="block group rounded-2xl p-4 h-full transition-shadow duration-300 hover:shadow-[0px_8px_16px_-8px_#00000024,0px_13px_27px_-5px_#32325D17]"
                >
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
                    <span className="font-fustat-extrabold text-[#6E6E73] text-xs uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="font-fustat-extrabold text-navy text-lg leading-snug mb-8">
                      {item.title}
                    </h3>
                    <p className="font-fustat-extrabold text-[#6E6E73] text-sm">
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
                className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                style={{ 
                  backgroundColor: index === selectedIndex ? '#CB9763' : '#D2D2D7' 
                }}
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
              className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                prevBtnDisabled
                  ? 'bg-sand/40 cursor-not-allowed opacity-50'
                  : 'bg-sand/70 hover:bg-sand'
              }`}
              aria-label="Previous slides"
            >
              <Image
                src="/iconos/chevron_left.svg"
                alt=""
                width={14}
                height={28}
                className="w-[10px] h-[20px]"
              />
            </button>
            
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                nextBtnDisabled
                  ? 'bg-sand/40 cursor-not-allowed opacity-50'
                  : 'bg-sand/70 hover:bg-sand'
              }`}
              aria-label="Next slides"
            >
              <Image
                src="/iconos/chevron_right.svg"
                alt=""
                width={14}
                height={28}
                className="w-[10px] h-[20px]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
