'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { getHighlightsData } from '@/data';

export default function GetHighlights({ 
  title = getHighlightsData.title,
  items = getHighlightsData.items,
  variant = 'default', // 'default' | 'industry'
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
      <div className="w-full lg:w-[90%] max-w-[1400px] mx-auto px-6 lg:px-0">
        {/* Title */}
        <h2 
          id="highlights-heading"
          className="font-literata-light text-navy text-[36px] lg:text-[48px] mb-10 lg:mb-12"
        >
          {title}
        </h2>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className={`flex-shrink-0 ${
                  variant === 'industry' 
                    ? 'w-full lg:w-[320px]' 
                    : 'w-full lg:w-[45%]'
                }`}
              >
                {variant === 'industry' ? (
                  /* Industry Card Variant */
                  <div 
                    className="rounded-2xl p-8 lg:p-8 h-full flex flex-col items-center text-center"
                    style={{ background: 'linear-gradient(to bottom, #E8E1DA, #F7F4F1)' }}
                  >
                    {/* Title */}
                    <h3 className="font-fustat-medium text-navy text-xl lg:text-xl mb-6">
                      {item.title}
                    </h3>
                    
                    {/* Circular Image */}
                    <div className="relative w-[320px] h-[320px] lg:w-44 lg:h-44 rounded-full overflow-hidden mb-6 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1023px) 320px, 180px"
                      />
                    </div>
                    
                    {/* Description */}
                    <p className="font-fustat-medium text-[#1E1C1AE0] text-lg leading-relaxed mb-6 flex-grow max-w-[90%]">
                      {item.description}
                    </p>
                    
                    {/* Explore Button */}
                    {item.href && (
                      <Link
                        href={item.href}
                        className="inline-flex items-center justify-center bg-[#E8E1DA] text-[#1E1C1A] font-fustat-extrabold uppercase rounded-full hover:bg-[#DDD5CC] transition-colors duration-300 w-[101px] h-[40px] lg:w-auto lg:h-auto lg:px-6 lg:py-2.5 text-[14px] leading-[24px] tracking-[1.5px] lg:text-xs lg:tracking-wider"
                      >
                        EXPLORE
                      </Link>
                    )}
                  </div>
                ) : (
                  /* Default Highlight Card Variant */
                  <>
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1023px) 100vw, 45vw"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="max-w-md">
                      <p className="font-work-sans text-navy text-base lg:text-lg leading-relaxed">
                        <span className="font-work-sans-semibold">{item.title}.</span>{' '}
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10 lg:mt-12">
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
                  ? 'bg-[#D2D2D7] cursor-not-allowed opacity-50'
                  : 'bg-sand/70 hover:bg-sand lg:bg-sand/70'
              }`}
              aria-label="Previous slide"
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
                  ? 'bg-[#D2D2D7] cursor-not-allowed opacity-50'
                  : 'bg-sand/70 hover:bg-sand lg:bg-sand/70'
              }`}
              aria-label="Next slide"
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
