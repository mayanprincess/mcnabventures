'use client';

import Image from 'next/image';
import { ourPartnersData } from '@/data';

export default function OurPartners({
  badge = ourPartnersData.badge,
  title = ourPartnersData.title,
  partners = ourPartnersData.partners,
}) {

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[100px] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* MOBILE VERSION - Semi-circular background with vertical stacked logos */}
        <div className="lg:hidden">
          {/* Text Content - Centered */}
          <div className="text-center mb-[48px]">
            {/* Badge */}
            <span className="inline-block border border-navy/30 rounded-full px-4 py-1.5 font-fustat-medium text-navy text-xs tracking-wider mb-6">
              {badge}
            </span>

            {/* Title */}
            <h2 
              className="font-literata-light text-navy"
              style={{
                fontSize: '32px',
                lineHeight: '38px',
                letterSpacing: '-1px'
              }}
            >
              {title}
            </h2>
          </div>

          {/* Semi-circular Background with Logos - Vertical Stack */}
          <div 
            className="bg-gold mx-auto flex flex-col items-center justify-center gap-8"
            style={{
              width: '342px',
              height: '352px',
              borderTopLeftRadius: '999px',
              borderTopRightRadius: '999px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
          >
            {partners.filter((p) => p.logo).map((partner, index) => (
              <div 
                key={index}
                className="flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name ?? ''}
                  width={Number(partner.width) || 158}
                  height={Number(partner.height) || 41}
                  className="object-contain"
                  style={{
                    width: '158px',
                    height: '41px',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VERSION - Keep original layout */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-8 lg:gap-12">
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
              {partners.filter((p) => p.logo).map((partner, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name ?? ''}
                    width={Number(partner.width) || 158}
                    height={Number(partner.height) || 41}
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
