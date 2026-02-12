'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { secondaryHeroData } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * SecondaryHero Component - MCNAB VENTURES
 *
 * Hero section secundario con dos variantes de diseño:
 * - Default: Imagen de fondo con overlay elegante, texto animado y botón CTA
 * - Vector: Diseño con barras curvas turquesa
 *
 * Se alimenta de datos JSON (futuro REST API)
 */
export default function SecondaryHero({
  image = secondaryHeroData.image,
  heading = secondaryHeroData.heading,
  linkLabel = secondaryHeroData.linkLabel,
  linkUrl = secondaryHeroData.linkUrl,
  useVectorDesign = secondaryHeroData.useVectorDesign,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  if (useVectorDesign) {
    return (
      <VectorDesignHero
        heading={heading}
        linkLabel={linkLabel}
        linkUrl={linkUrl}
        scrollRef={scrollRef}
        isVisible={isVisible}
      />
    );
  }

  return (
    <DefaultDesignHero
      image={image}
      heading={heading}
      linkLabel={linkLabel}
      linkUrl={linkUrl}
      scrollRef={scrollRef}
      isVisible={isVisible}
    />
  );
}

/**
 * Default Design Hero
 * Elegant full-width hero with cinematic overlay, parallax image,
 * and orchestrated staggered entrance animation.
 */
function DefaultDesignHero({ image, heading, linkLabel, linkUrl, scrollRef, isVisible }) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Trigger entrance animation after first paint
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsRevealed(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Parallax effect (desktop only) - passive listeners for performance
  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      if (!imageRef.current || !containerRef.current) return;

      if (window.innerWidth >= 1024) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = -rect.top * 0.18;
        imageRef.current.style.transform = `translateY(${offset}px) scale(1.08)`;
      } else {
        imageRef.current.style.transform = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={scrollRef}
      className="relative w-full bg-white lg:pt-6 lg:pb-12"
      role="banner"
      aria-label="Hero section"
    >
      {image && (
        <div
          ref={containerRef}
          className={`
            relative w-full overflow-hidden
            h-[450px] sm:h-[480px] md:h-[500px] max-h-[70vh]
            lg:h-auto lg:aspect-[1348/600] lg:max-h-[75vh]
            lg:w-[90%] lg:mx-auto lg:rounded-3xl
            transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}
          `}
        >
          {/* Background Image — cinematic zoom-in reveal */}
          <div
            ref={imageRef}
            className={`
              absolute inset-0 w-full h-full
              transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]
              ${isRevealed ? 'scale-[1.02] opacity-100' : 'scale-[1.15] opacity-0'}
            `}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="(max-width: 1023px) 100vw, 90vw"
            />
          </div>

          {/* ── Elegant Multi-Layer Overlay ── */}
          <div
            className={`
              absolute inset-0 z-[1]
              transition-opacity duration-[2.2s] ease-out
              ${isRevealed ? 'opacity-100' : 'opacity-0'}
            `}
            aria-hidden="true"
          >
            {/* Layer 1: Soft left gradient — just enough for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/8 to-transparent" />

            {/* Layer 2: Gentle bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            {/* Layer 3: Very subtle brand tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/5 via-transparent to-transparent" />
          </div>

          {/* ── Text & Button Overlay — Unified Responsive ── */}
          <div className="absolute inset-0 z-10 flex flex-col justify-start
            pl-6 sm:pl-8 md:pl-14 lg:pl-[118px]
            pr-6 sm:pr-8 md:pr-14 lg:pr-0
            pt-16 sm:pt-20 md:pt-24 lg:pt-20 xl:pt-24"
          >
            <div className="max-w-[90%] sm:max-w-[85%] md:max-w-lg lg:max-w-2xl space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Heading */}
              <h1
                className={`
                  font-literata-light text-white
                  text-[28px] sm:text-[34px] md:text-[42px] lg:text-[52px] xl:text-[60px]
                  leading-[1.18] md:leading-[1.14] lg:leading-[1.12]
                  tracking-[-0.01em]
                  drop-shadow-[0_1px_6px_rgba(0,0,0,0.15)] [text-shadow:_0_1px_10px_rgba(0,0,0,0.1)]
                  transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[500ms]
                  ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                {heading}
              </h1>

              {/* CTA Button */}
              {linkLabel && linkUrl && (
                <div
                  className={`
                    transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[800ms]
                    ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                  `}
                >
                  <a
                    href={linkUrl}
                    className="group inline-flex items-center gap-3 bg-navy/90 hover:bg-navy text-white font-work-sans-medium
                      px-5 sm:px-6 md:px-7 lg:px-8
                      py-2.5 sm:py-3 md:py-3.5 lg:py-4
                      text-sm sm:text-base md:text-[17px] lg:text-lg
                      transition-all duration-300 rounded-full shadow-md hover:gap-4 hover:shadow-lg"
                    aria-label={linkLabel}
                  >
                    <span>{linkLabel}</span>
                    <Image
                      src="/btn_arrow.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-5 h-5 md:w-[22px] md:h-[22px] lg:w-6 lg:h-6 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* ── Scroll Indicator — Mobile ── */}
          <div
            className={`
              absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10 lg:hidden
              transition-all duration-700 ease-out delay-[1300ms]
              ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="w-14 h-7 border border-white/60 rounded-full flex items-center justify-center secondary-hero-bounce">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* ── Scroll Indicator — Desktop ── */}
          <div
            className={`
              absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block
              transition-all duration-700 ease-out delay-[1300ms]
              ${isRevealed ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="secondary-hero-bounce">
              <Image
                src="/down_arrow.svg"
                alt="Scroll down"
                width={56}
                height={21}
                className="w-14 h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Vector Design Hero
 * Alternative design with turquoise curved stripes and dark vertical bar
 */
function VectorDesignHero({ heading, linkLabel, linkUrl, scrollRef, isVisible }) {
  return (
    <section
      ref={scrollRef}
      className={`
        relative w-full overflow-hidden bg-white
        min-h-[500px] sm:min-h-[550px] lg:min-h-[600px]
        max-h-[75vh]
        transition-opacity duration-700 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      role="banner"
      aria-label="Hero section"
    >
      <div className="relative h-full flex items-center">
        {/* Dark Vertical Bar - Left */}
        <div className="absolute left-0 top-0 bottom-0 w-[12%] sm:w-[15%] bg-navy z-10" />

        {/* White Background Area */}
        <div className="absolute left-[12%] sm:left-[15%] right-0 top-0 bottom-0 bg-white z-0" />

        {/* Vector SVG - Positioned to create curved stripes effect */}
        <div className="absolute left-[12%] sm:left-[15%] right-0 top-0 bottom-0 z-[1] overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute top-[35%] left-0 w-full">
              <svg
                width="100%"
                height="auto"
                viewBox="0 0 416 314"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
                style={{ minHeight: '400px' }}
              >
                <path
                  d="M-111 253.115V314C-38.7383 255.985 52.8952 221.238 152.5 221.238C252.105 221.238 343.738 255.999 416 314V253.115C338.81 200.675 247.83 172.47 152.5 172.47C57.1703 172.47 -33.81 200.675 -111 253.115ZM152.5 0C60.154 0 -29.2231 19.4029 -111 56.2164V110.173C-30.0989 70.014 59.5603 48.7675 152.5 48.7675C245.44 48.7675 335.099 70.0289 416 110.173V56.2164C334.223 19.388 244.861 0 152.5 0ZM-111 149.038V205.18C-32.2662 157.558 58.1649 132.118 152.5 132.118C246.835 132.118 337.266 157.558 416 205.18V149.038C335.871 106.114 245.944 83.3359 152.5 83.3359C59.0555 83.3359 -30.8708 106.114 -111 149.038Z"
                  fill="#00BFB3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Blurred Background Image Layer */}
        <div className="absolute left-[12%] sm:left-[15%] right-0 top-0 bottom-0 z-[2] opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-sand/30 to-navy/10" />
        </div>

        {/* Content - Positioned to the right of the dark bar */}
        <div className="relative z-20 w-full pl-[18%] sm:pl-[20%] pr-4 sm:pr-6 lg:pr-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            <h1 className="font-literata-light text-navy text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {heading}
            </h1>

            {/* CTA Button */}
            {linkLabel && linkUrl && (
              <div className="pt-4">
                <a
                  href={linkUrl}
                  className="inline-flex items-center gap-3 bg-navy hover:bg-navy/90 text-white font-work-sans-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-colors duration-200 rounded"
                  aria-label={linkLabel}
                >
                  <span>{linkLabel}</span>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
