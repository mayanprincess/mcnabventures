'use client';

import Image from 'next/image';
import Link from 'next/link';
import { sustainabilityData } from '@/data';
import { useScrollAnimation, animations, getDelay } from '@/hooks/useScrollAnimation';

export default function SustainabilityInAction({
  title = sustainabilityData.title,
  backgroundImage = sustainabilityData.backgroundImage,
  cards = sustainabilityData.cards,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={scrollRef} className={`relative w-full overflow-hidden min-h-auto lg:h-[962px] py-12 lg:py-0 ${animations.fadeUp(isVisible)}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:h-full lg:items-center lg:justify-center px-6 lg:px-8">
        {/* Content Wrapper */}
        <div className="w-full lg:w-[1110px]">
          {/* Title */}
          <h2 className="font-literata-light text-white text-[32px] lg:text-[48px] mb-10 lg:mb-12 text-left">
            {title}
          </h2>

          {/* Cards Container */}
          <div className="flex flex-col lg:flex-row items-start gap-[30px]">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col w-full lg:w-[540px]">
              {/* Card Image */}
              <div 
                className="relative w-full lg:w-[540px] h-[280px] lg:h-[518px] rounded-2xl overflow-hidden mb-6 shadow-lg"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 540px"
                />
              </div>

              {/* Card Title */}
              <h3 className="font-fustat-medium text-white text-xl lg:text-4xl mb-4 lg:py-8">
                {card.title}
              </h3>

              {/* Learn More Button */}
              <Link
                href={card.href}
                className="inline-flex items-center gap-3 bg-[#E8E1DA] lg:bg-white hover:bg-[#DDD5CC] lg:hover:bg-white/90 text-[#1E1C1A] font-fustat-extrabold text-sm uppercase tracking-wider px-6 py-3 rounded-full transition-colors duration-300 w-fit"
              >
                LEARN MORE
                <span className="text-base">→</span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
