'use client';

import { useState } from 'react';
import Image from 'next/image';
import { groupSnapshotData, companyLogosData } from '@/data';

export default function GroupSnapshot({ 
  slides = groupSnapshotData.slides,
  companyLogos = companyLogosData 
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

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* MOBILE VERSION - Vertical layout: Text → Controls → Images */}
        <div className="lg:hidden pb-24">
          <div className="relative min-h-[400px]">
            {/* Slides with fade effect */}
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`transition-opacity duration-700 ease-in-out ${
                  index === selectedIndex 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                {/* Text Content - Top */}
                <div className="mb-8">
                  {/* Badge */}
                  <span className="inline-block border border-navy/30 rounded-full px-4 py-1.5 font-fustat-medium text-navy text-xs tracking-wider mb-6">
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h2 className="font-literata-light text-navy text-[36px] sm:text-[44px] leading-tight mb-4">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="font-fustat-regular text-navy/70 text-lg mb-8">
                    {slide.description}
                  </p>

                  {/* Highlights List */}
                  <ul className="space-y-3">
                    {slide.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="text-turquoise font-fustat-medium">→</span>
                        <span className="font-fustat-medium text-navy text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls - Middle */}
          <div className="flex items-center justify-between my-[48px] my-[24px]">
            {/* Dots with background container - Left */}
            <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="h-3 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: selectedIndex === index ? '#CB9763' : '#D2D2D7',
                    width: selectedIndex === index ? '28px' : '10px'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows - Right */}
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <button
                onClick={goToPrev}
                className="w-[35px] h-[35px] rounded-full bg-sand/70 flex items-center justify-center"
                aria-label="Previous slide"
              >
                <Image
                  src="/iconos/chevron_left.svg"
                  alt=""
                  width={10}
                  height={20}
                  className="w-[10px] h-[20px]"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(38%) sepia(5%) saturate(1000%) hue-rotate(314deg) brightness(95%) contrast(88%)'
                  }}
                />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="w-[35px] h-[35px] rounded-full bg-sand flex items-center justify-center"
                aria-label="Next slide"
              >
                <Image
                  src="/iconos/chevron_right.svg"
                  alt=""
                  width={10}
                  height={20}
                  className="w-[10px] h-[20px]"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(38%) sepia(5%) saturate(1000%) hue-rotate(314deg) brightness(95%) contrast(88%)'
                  }}
                />
              </button>
            </div>
          </div>

          {/* Images - Bottom */}
          <div className="relative -mx-4 sm:-mx-6">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`transition-opacity duration-700 ease-in-out ${
                  index === selectedIndex 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                {/* Main Image - No left padding, extends to screen edge */}
                <div 
                  className="relative overflow-hidden w-full"
                  style={{ 
                    height: '250px',
                    borderTopRightRadius: '500px',
                    borderBottomRightRadius: '500px'
                  }}
                >
                  <Image
                    src={slide.mainImage}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Overlay Image */}
                <div 
                  className="absolute -bottom-[60px] right-4 overflow-hidden bg-white shadow-xl"
                  style={{ 
                    width: '120px', 
                    height: '180px', 
                    borderWidth: '6px',
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderRadius: '122px'
                  }}
                >
                  <Image
                    src={slide.circleImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VERSION - Keep original layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Slides with fade effect */}
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`transition-opacity duration-700 ease-in-out ${
                  index === selectedIndex 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                  {/* Left Side - Images */}
                  <div className="relative flex-1 w-full lg:w-auto">
                    {/* Main Image */}
                    <div 
                      className="relative overflow-hidden"
                      style={{ 
                        width: '798px', 
                        height: '450px',
                        borderTopRightRadius: '500px',
                        borderBottomRightRadius: '500px'
                      }}
                    >
                      <Image
                        src={slide.mainImage}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Overlay Image */}
                    <div 
                      className="absolute -bottom-[90px] right-5 sm:right-8 overflow-hidden bg-white shadow-xl"
                      style={{ 
                        width: '191px', 
                        height: '289px', 
                        borderWidth: '12px',
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderRadius: '122px'
                      }}
                    >
                      <Image
                        src={slide.circleImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="191px"
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
                      {slide.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
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

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8" style={{ maxWidth: '798px' }}>
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full border-2 border-turquoise text-turquoise flex items-center justify-center hover:bg-turquoise hover:text-white transition-colors duration-200"
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

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="h-3 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: selectedIndex === index ? '#00BFB3' : '#D2D2D7',
                    width: selectedIndex === index ? '24px' : '12px'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-turquoise text-white flex items-center justify-center hover:bg-turquoise/90 transition-colors duration-200"
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

        {/* Company Logos Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
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
