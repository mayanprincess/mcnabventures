'use client';

import Image from 'next/image';
import { ourPartnersData } from '@/data';

export default function OurPartners({
  badge = ourPartnersData.badge,
  title = ourPartnersData.title,
  partners = ourPartnersData.partners,
}) {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden pt-[80px] pb-[160px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-shrink-0 max-w-[380px]">
            {/* Badge */}
            <span className="inline-block border border-navy/30 rounded-full px-4 py-1.5 font-fustat-medium text-navy text-xs tracking-wider mb-6">
              {badge}
            </span>

            {/* Title */}
            <h2 className="font-literata-light text-navy text-[28px] sm:text-[32px] lg:text-[36px] leading-snug">
              {title}
            </h2>
          </div>

          {/* Right Side - Partners Logos Container - Extends to edge */}
          <div className="flex-1 flex justify-end -mr-4 sm:-mr-6 lg:-mr-8">
            <div 
              className="bg-gold py-12 sm:py-16 lg:py-20 pl-12 sm:pl-16 lg:pl-24 pr-[calc((100vw-100%)/2+2rem)] flex items-center justify-center gap-8 sm:gap-12 lg:gap-16"
              style={{ 
                borderTopLeftRadius: '999px',
                borderBottomLeftRadius: '999px',
                marginRight: 'calc(-1 * (100vw - 100%) / 2)',
              }}
            >
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
