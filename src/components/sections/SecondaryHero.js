'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { secondaryHeroData } from '@/data';

/**
 * SecondaryHero Component - MCNAB VENTURES
 * 
 * Hero section secundario con dos variantes de diseño:
 * - Default: Imagen de fondo con texto y botón CTA
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
  // Render based on design variant
  if (useVectorDesign) {
    return <VectorDesignHero heading={heading} linkLabel={linkLabel} linkUrl={linkUrl} />;
  }

  return <DefaultDesignHero image={image} heading={heading} linkLabel={linkLabel} linkUrl={linkUrl} />;
}

/**
 * Default Design Hero
 * White full-width background with rounded image container
 * Text and button overlay on top-left of the rounded image container
 * Parallax effect on scroll
 */
function DefaultDesignHero({ image, heading, linkLabel, linkUrl }) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Parallax effect (desktop only)
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleScroll = () => {
      if (imageRef.current && containerRef.current && window.innerWidth >= 1024) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = -rect.top * 0.3;
        imageRef.current.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    };

    // Set aspect ratio for desktop
    if (window.innerWidth >= 1024) {
      containerRef.current.style.aspectRatio = '1348 / 751';
      containerRef.current.style.height = 'auto';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative w-full bg-white lg:py-16"
      role="banner"
      aria-label="Hero section"
    >
      {image && (
        <div 
          ref={containerRef}
          className="relative w-full h-[600px] lg:h-auto lg:w-[90%] lg:mx-auto lg:rounded-2xl lg:rounded-3xl overflow-hidden"
        >
          {/* Background Image */}
          <div 
            ref={imageRef}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover w-full h-full"
              priority
              sizes="(max-width: 1023px) 100vw, 90vw"
            />
          </div>

          {/* Text Overlay - Mobile */}
          <div className="absolute inset-0 z-10 flex items-start pt-[20%] pl-6 pr-6 lg:hidden">
            <div className="max-w-[85%]">
              <h1 className="font-literata-light text-white text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.02em]">
                {heading}
              </h1>
            </div>
          </div>

          {/* Text and Button Overlay - Desktop */}
          <div className="absolute inset-0 z-10 hidden lg:flex items-start">
            <div style={{ paddingLeft: '118px', paddingTop: '106px' }}>
              <div className="max-w-2xl space-y-6 sm:space-y-8">
                {/* Heading */}
                <h1 className="font-literata-light text-white text-[64px] leading-[1.1] tracking-[-0.02em]">
                  {heading}
                </h1>

                {/* CTA Button */}
                {linkLabel && linkUrl && (
                  <div className="pt-2 sm:pt-4">
                    <a
                      href={linkUrl}
                      className="inline-flex items-center gap-3 bg-navy hover:bg-navy/90 text-white font-work-sans-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-colors duration-200 rounded"
                      aria-label={linkLabel}
                    >
                      <span>{linkLabel}</span>
                      <Image
                        src="/btn_arrow.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Mobile */}
          <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-10 lg:hidden">
            <div className="w-14 h-7 border border-white rounded-full flex items-center justify-center">
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

          {/* Scroll Indicator - Desktop */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
            <Image
              src="/down_arrow.svg"
              alt="Scroll down"
              width={56}
              height={21}
              className="w-12 sm:w-14 h-auto"
            />
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
function VectorDesignHero({ heading, linkLabel, linkUrl }) {
  return (
    <section 
      className="relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-white"
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
            {/* Vector SVG positioned in the middle-upper section */}
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
