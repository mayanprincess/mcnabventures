'use client';

import Image from 'next/image';
import Link from 'next/link';
import { theExperiencesData } from '@/data';
import { useScrollAnimation, animations } from '@/hooks/useScrollAnimation';

export default function TheExperiences({
  title = theExperiencesData.title,
  items = theExperiencesData.items,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={scrollRef} className={`w-full py-16 sm:py-20 lg:py-[100px] bg-cream ${animations.fadeUp(isVisible)}`}>
      <div className="container mx-auto px-6 lg:px-8 max-w-[1110px]">
        {/* Section Title */}
        <h2 className="font-literata-light text-navy text-[36px] lg:text-[48px] mb-12 lg:mb-20">
          {title}
        </h2>

        {/* Items */}
        <div className="space-y-20 lg:space-y-32">
          {items.map((item, index) => (
            <ExperienceItem 
              key={item.id} 
              item={item} 
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ item, isReversed }) {
  // Layout: single (full width image on top)
  if (item.layout === 'single') {
    return (
      <div className="flex flex-col">
        {/* Full Width Image */}
        <div className="relative w-full h-[280px] lg:h-[350px] rounded-3xl overflow-hidden mb-6">
          <Image
            src={item.mainImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 1110px"
            quality={90}
          />
        </div>
        {/* Content Below */}
        <div className="max-w-md">
          <h3 className="font-fustat-extrabold text-navy text-xl mb-2">
            {item.title}
          </h3>
          <p className="font-fustat-medium text-[#668591] text-lg leading-[24px] tracking-[0px] mb-5">
            {item.description}
          </p>
          {item.buttonText && item.buttonHref && (
            <Link
              href={item.buttonHref}
              className="inline-flex items-center justify-center gap-2 bg-[#E8E1DA] text-[#1E1C1A] font-fustat-extrabold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#DDD5CC] transition-colors duration-300"
            >
              {item.buttonText}
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Layout: two-images (small portrait + large landscape, supports reverse)
  if (item.layout === 'two-images') {
    return (
      <div className="flex flex-col">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Main Image Container with Overlapping Secondary Image */}
          <div className="relative w-full mb-6">
            {/* Main Image */}
            <div className="relative w-full h-[259px] rounded-3xl overflow-hidden">
              <Image
                src={item.secondaryImage || item.mainImage}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
            </div>
            
            {/* Secondary Image - Overlapping */}
            {item.mainImage && item.secondaryImage && (
              <div className="absolute right-[-8px] bottom-[-60px] w-[117px] h-[206px] rounded-[20px] overflow-hidden z-10">
                <Image
                  src={item.mainImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="117px"
                  quality={90}
                />
              </div>
            )}
          </div>
          
          {/* Content Below */}
          <div className="max-w-md pt-8">
            <h3 className="font-fustat-extrabold text-navy text-xl mb-2">
              {item.title}
            </h3>
            <p className="font-fustat-medium text-[#668591] text-lg leading-[24px] tracking-[0px] mb-5">
              {item.description}
            </p>
            {item.buttonText && item.buttonHref && (
              <Link
                href={item.buttonHref}
                className="inline-flex items-center justify-center gap-2 bg-[#E8E1DA] text-[#1E1C1A] font-fustat-extrabold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#DDD5CC] transition-colors duration-300"
              >
                {item.buttonText}
                <span>→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Images row with 125px gap */}
          <div 
            className={`relative flex items-start ${isReversed ? 'flex-row-reverse' : ''}`}
            style={{ gap: '125px' }}
          >
            {/* Small portrait image (255x450), positioned 130px below */}
            <div 
              className="relative flex-shrink-0 rounded-3xl overflow-hidden"
              style={{ width: '255px', height: '450px', marginTop: '130px' }}
            >
              <Image
                src={item.mainImage}
                alt=""
                fill
                className="object-cover"
                sizes="255px"
                quality={90}
              />
            </div>
            
            {/* Large landscape image (635x450) + content below */}
            <div className="flex-1">
              {item.secondaryImage && (
                <div 
                  className="relative rounded-3xl overflow-hidden mb-5"
                  style={{ width: '635px', height: '450px' }}
                >
                  <Image
                    src={item.secondaryImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="635px"
                    quality={90}
                  />
                </div>
              )}
              {/* Content below the large image */}
              <div className="max-w-md">
                <h3 className="font-fustat-extrabold text-navy text-xl mb-2">
                  {item.title}
                </h3>
                <p className="font-fustat-medium text-[#668591] text-lg leading-relaxed mb-5">
                  {item.description}
                </p>
                {item.buttonText && item.buttonHref && (
                  <Link
                    href={item.buttonHref}
                    className="inline-flex items-center justify-center gap-2 bg-[#E8E1DA] text-[#1E1C1A] font-fustat-extrabold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#DDD5CC] transition-colors duration-300"
                  >
                    {item.buttonText}
                    <span>→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Default fallback
  return null;
}
