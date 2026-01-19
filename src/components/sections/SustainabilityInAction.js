'use client';

import Image from 'next/image';
import Link from 'next/link';
import { sustainabilityData } from '@/data';

export default function SustainabilityInAction({
  title = sustainabilityData.title,
  backgroundImage = sustainabilityData.backgroundImage,
  cards = sustainabilityData.cards,
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '962px' }}>
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Content Wrapper - Same width as cards */}
        <div style={{ width: '1110px' }}>
          {/* Title */}
          <h2 className="font-literata-light text-white text-[32px] sm:text-[40px] lg:text-[48px] mb-10 sm:mb-12 text-left">
            {title}
          </h2>

          {/* Cards Container */}
          <div className="flex flex-col md:flex-row items-start gap-[30px]">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col" style={{ width: '540px' }}>
              {/* Card Image */}
              <div 
                className="relative rounded-2xl overflow-hidden mb-6 shadow-lg"
                style={{ width: '540px', height: '518px' }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="540px"
                />
              </div>

              {/* Card Title */}
              <h3 className="font-fustat-medium text-white text-xl sm:text-4xl mb-4 py-8">
                {card.title}
              </h3>

              {/* Learn More Button */}
              <Link
                href={card.href}
                className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-[#1E1C1A] font-fustat-extrabold text-sm uppercase tracking-wider px-6 py-3 rounded-full transition-colors duration-300 w-fit"
              >
                Learn More
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
