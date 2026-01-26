'use client';

import { useState } from 'react';
import Image from 'next/image';
import { experiencesGalleryData } from '@/data';

export default function ExperiencesGallery({
  slides = experiencesGalleryData.slides,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goToPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setSelectedIndex(index);
  };

  const currentSlide = slides[selectedIndex];

  return (
    <section className="w-full bg-white">
      <div className="h-full flex flex-col">
        {/* Image Container - Full Screen Width */}
        <div className="relative w-full h-[410px] lg:h-[640px]">
          {/* Images with Fade */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === selectedIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.backgroundImage}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Text Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col lg:flex-row items-center justify-center">
            {/* Left Text - Top in mobile, Left in desktop */}
            <h2 
              className="absolute top-8 lg:top-auto lg:left-8 sm:left-16 lg:left-24 font-fustat-extrabold lg:font-literata-light text-white text-[101.96px] leading-[100%] tracking-[-0.8px] lg:text-[96px] xl:text-[120px] lg:tracking-wider uppercase"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              {currentSlide.leftText}
            </h2>

            {/* Right Text - Bottom in mobile, Right in desktop */}
            <h2 
              className="absolute bottom-8 lg:bottom-auto lg:right-8 sm:right-16 lg:right-24 font-fustat-extrabold lg:font-literata-light text-white text-[101.96px] leading-[100%] tracking-[-0.8px] lg:text-[96px] xl:text-[120px] lg:tracking-wider uppercase"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              {currentSlide.rightText}
            </h2>
          </div>

          {/* Center Dots - On top of image at bottom - Desktop Only */}
          <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 items-center gap-3 px-6 py-4 rounded-full" style={{ backgroundColor: 'rgba(139, 119, 101, 0.8)' }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: selectedIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                  width: selectedIndex === index ? '28px' : '10px'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Controls - Container Width */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-[106px]">
          <div className="w-full max-w-[1110px] mx-auto flex items-center justify-between mt-12 lg:mt-0 lg:py-6">
            {/* Left Dots (Page indicator) */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                  style={{ 
                    backgroundColor: selectedIndex === index ? '#CB9763' : '#D2D2D7'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrev}
                className="w-[35px] h-[35px] rounded-full bg-sand/70 hover:bg-sand flex items-center justify-center transition-all duration-300"
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
                onClick={goToNext}
                className="w-[35px] h-[35px] rounded-full bg-sand/70 hover:bg-sand flex items-center justify-center transition-all duration-300"
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
      </div>
    </section>
  );
}
