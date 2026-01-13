'use client';

import { useState } from 'react';

// Sample data - replace with actual data from PocketBase
const sampleItems = [
  {
    id: 'history',
    title: 'History',
    content: 'Located in West Bay, Mayan Princess Beach and Dive Resort offers stunning white sand beaches and vibrant coral reefs for the perfect island escape. Whether you\'re on a romantic getaway or a family adventure, our all-inclusive resort provides unforgettable experiences. Enjoy snorkeling, paddleboarding, beachfront dining, and sunset walks, all designed to bring you closer to your loved ones. After nearly 20 years of redefining Roatán vacations, it\'s time for you to make lasting memories.',
  },
  {
    id: 'team',
    title: 'Our Team',
    content: 'Our dedicated team of hospitality professionals brings decades of combined experience to ensure every guest feels at home. From our front desk staff to our dive instructors, everyone shares a passion for creating memorable experiences.',
  },
  {
    id: 'values',
    title: 'Our Values',
    content: 'We believe in sustainable tourism, community engagement, and delivering exceptional service. Our commitment to preserving the natural beauty of Roatán guides every decision we make.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    content: 'To be the premier destination for travelers seeking authentic Caribbean experiences while maintaining the highest standards of hospitality and environmental stewardship.',
  },
];

export default function OurJourney({ 
  title = 'Our Journey',
  items = sampleItems,
  defaultOpen = 'history'
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
          className="font-literata-light-italic text-navy text-[36px] sm:text-[42px] lg:text-[48px] mb-10 sm:mb-12"
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
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openItem === item.id 
                      ? 'border-turquoise bg-turquoise text-white' 
                      : 'border-navy/30 text-navy/50 group-hover:border-navy group-hover:text-navy'
                  }`}
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${
                      openItem === item.id ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>

                {/* Title */}
                <span 
                  className={`font-work-sans-semibold text-lg sm:text-xl transition-colors duration-300 ${
                    openItem === item.id ? 'text-navy' : 'text-navy/70 group-hover:text-navy'
                  }`}
                >
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
                  <p className="font-work-sans text-navy/80 text-base sm:text-lg leading-relaxed max-w-4xl">
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
