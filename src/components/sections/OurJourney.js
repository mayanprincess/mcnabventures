'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ourJourneyData } from '@/data';

export default function OurJourney({ 
  title = ourJourneyData.title,
  items = ourJourneyData.items,
  defaultOpen = ourJourneyData.defaultOpen
}) {
  const [openItem, setOpenItem] = useState(defaultOpen);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section 
      className="w-full py-16 sm:py-20 lg:py-24 bg-[#F6F4EF]"
      aria-labelledby="journey-heading"
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">
        {/* Title */}
        <h2 
          id="journey-heading"
          className="font-literata-light text-navy text-[36px] sm:text-[42px] lg:text-[48px] mb-10 sm:mb-12"
        >
          {title}
        </h2>

        {/* Accordion */}
        <div className="space-y-0">
          {items.map((item) => (
            <div 
              key={item.id}
              className="border-t border-navy/20 last:border-b"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center gap-4 py-5 sm:py-6 text-left group"
                aria-expanded={openItem === item.id}
                aria-controls={`content-${item.id}`}
              >
                {/* Icon */}
                <span 
                  className={`w-[35px] h-[35px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openItem === item.id 
                      ? 'bg-sand' 
                      : 'bg-sand/70'
                  }`}
                >
                  <Image
                    src="/iconos/chevron_right.svg"
                    alt=""
                    width={14}
                    height={28}
                    className={`w-[10px] h-[20px] transition-transform duration-300 ${
                      openItem === item.id ? 'rotate-90' : ''
                    }`}
                  />
                </span>

                {/* Title */}
                <span className="font-fustat-extrabold text-navy text-lg transition-colors duration-300">
                  {item.title}
                </span>
              </button>

              {/* Content */}
              <div
                id={`content-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-12 pb-6 pr-4 sm:pr-8">
                  <p className="font-fustat-medium text-navy text-[18px] leading-[24px] tracking-[0px] sm:text-lg sm:leading-relaxed max-w-4xl">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
