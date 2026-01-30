'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { stayInTheLoopData } from '@/data';

export default function StayInTheLoop({ 
  items = stayInTheLoopData.items, 
  title = stayInTheLoopData.title 
}) {
  // Mobile state
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);
  const [loadedMobile, setLoadedMobile] = useState(false);
  const [canPrevMobile, setCanPrevMobile] = useState(false);
  const [canNextMobile, setCanNextMobile] = useState(true);

  // Desktop state
  const [currentSlideDesktop, setCurrentSlideDesktop] = useState(0);
  const [loadedDesktop, setLoadedDesktop] = useState(false);
  const [canPrevDesktop, setCanPrevDesktop] = useState(false);
  const [canNextDesktop, setCanNextDesktop] = useState(true);

  // Mobile Keen Slider
  const [sliderRefMobile, instanceRefMobile] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      const details = slider.track.details;
      setCurrentSlideMobile(details.rel);
      setCanPrevMobile(details.abs > 0);
      setCanNextMobile(details.abs < details.maxIdx);
    },
    created(slider) {
      setLoadedMobile(true);
      const details = slider.track.details;
      setCanPrevMobile(details.abs > 0);
      setCanNextMobile(details.abs < details.maxIdx);
    },
    slides: {
      perView: 1.5,
      spacing: 30,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 1.3,
          spacing: 0,
        },
      },
    },
  });

  // Desktop Keen Slider
  const [sliderRefDesktop, instanceRefDesktop] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      const details = slider.track.details;
      setCurrentSlideDesktop(details.rel);
      setCanPrevDesktop(details.abs > 0);
      setCanNextDesktop(details.abs < details.maxIdx);
    },
    created(slider) {
      setLoadedDesktop(true);
      const details = slider.track.details;
      setCanPrevDesktop(details.abs > 0);
      setCanNextDesktop(details.abs < details.maxIdx);
    },
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      '(min-width: 1400px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
    },
  });

  return (
    <section 
      className="w-full py-16 sm:py-20 lg:py-[100px] bg-white"
      aria-labelledby="stay-in-loop-heading"
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">
        {/* MOBILE VERSION */}
        <div className="lg:hidden">
          {/* Header - Mobile */}
          <div className="flex flex-col mb-10">
            <h2 
              id="stay-in-loop-heading"
              className="font-literata-light text-navy text-[36px] mb-6"
            >
              {title}
            </h2>
            
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-3 bg-navy text-white rounded-full font-work-sans-medium text-sm hover:bg-opacity-90 transition-colors duration-300 w-[186px] h-[59px] mb-12"
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

          {/* Carousel - Mobile */}
          <div className="overflow-x-hidden overflow-y-visible -mx-4 sm:-mx-6 pb-12">
            <div ref={sliderRefMobile} className="keen-slider pl-4 sm:pl-6">
              {items.map((item) => (
                <div key={item.id} className="keen-slider__slide pb-6">
                  <article className="w-[260px] h-[453px]">
                    <Link 
                      href={item.href} 
                      className="block group rounded-2xl p-4 h-full transition-shadow duration-300 shadow-[0px_8px_16px_-8px_rgba(0,0,0,0.14),0px_13px_27px_-5px_rgba(50,50,93,0.09)]"
                      style={{ backgroundColor: '#F6F4EF' }}
                    >
                      {/* Image */}
                      <div className="relative w-[calc(100%+32px)] h-[220px] rounded-2xl overflow-hidden mb-4 bg-gray-100 -mx-4 -mt-4">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="260px"
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
                </div>
              ))}
            </div>
          </div>

          {/* Controls - Mobile */}
          {loadedMobile && instanceRefMobile.current && (
            <div className="flex items-center justify-between" suppressHydrationWarning>
              {/* Dots */}
              <div className="flex items-center gap-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      instanceRefMobile.current?.moveToIdx(index);
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{ 
                      width: index === currentSlideMobile ? '24px' : '8px',
                      height: '8px',
                      backgroundColor: index === currentSlideMobile ? '#CB9763' : '#D2D2D7' 
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRefMobile.current?.prev();
                  }}
                  disabled={!canPrevMobile}
                  className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    !canPrevMobile
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
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(38%) sepia(5%) saturate(1000%) hue-rotate(314deg) brightness(95%) contrast(88%)'
                    }}
                  />
                </button>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRefMobile.current?.next();
                  }}
                  disabled={!canNextMobile}
                  className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    !canNextMobile
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
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(38%) sepia(5%) saturate(1000%) hue-rotate(314deg) brightness(95%) contrast(88%)'
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP VERSION - Keep original layout */}
        <div className="hidden lg:block">
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
          <div className="overflow-hidden">
            <div ref={sliderRefDesktop} className="keen-slider">
              {items.map((item) => (
                <div key={item.id} className="keen-slider__slide">
                  <article className="w-[350px] h-[409px]">
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
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          {loadedDesktop && instanceRefDesktop.current && (() => {
            const perView = instanceRefDesktop.current.track.details.slidesPerView || 3;
            const totalPages = Math.max(1, items.length - perView + 1);
            return (
              <div className="flex items-center justify-between mt-8 sm:mt-10">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {[
                    ...Array(totalPages).keys(),
                  ].map((idx) => {
                    const isActive = idx === currentSlideDesktop;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          instanceRefDesktop.current?.moveToIdx(idx);
                        }}
                        className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                        style={{ 
                          backgroundColor: isActive ? '#CB9763' : '#D2D2D7' 
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRefDesktop.current?.prev();
                  }}
                  disabled={!canPrevDesktop}
                  className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    !canPrevDesktop
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
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRefDesktop.current?.next();
                  }}
                  disabled={!canNextDesktop}
                  className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    !canNextDesktop
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
            );
          })()}
        </div>
      </div>
    </section>
  );
}
