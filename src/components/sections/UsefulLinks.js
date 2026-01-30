'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usefulLinksData } from '@/data';

export default function UsefulLinks({ links = usefulLinksData.links }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialLinks = links.slice(0, 4);
  const remainingLinks = links.slice(4);

  return (
    <section 
      className="w-full bg-white py-12 sm:py-16 lg:py-[100px]"
      aria-labelledby="useful-links-heading"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <h2 
          id="useful-links-heading"
          className="font-literata-light text-navy text-[32px] lg:text-[48px] mb-8 lg:mb-12"
        >
          Useful Links
        </h2>

        {/* Mobile Layout - Vertical Stack */}
        <div className="lg:hidden flex flex-col gap-4">
          {/* Initial Links */}
          {initialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href || '#'}
              className="group relative flex flex-row items-center p-5 lg:p-8 rounded-2xl border border-sand/40 bg-white hover:bg-sand transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              aria-label={link.label}
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-sand bg-sand group-hover:bg-white transition-colors duration-300 mr-4 lg:mr-6 flex-shrink-0">
                {link.icon && (
                  <Image
                    src={link.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                )}
              </div>

              {/* Label */}
              <span className="font-fustat-medium text-navy text-[20px] leading-[26px] tracking-[0px] lg:font-work-sans-medium lg:text-[24px] lg:leading-tight">
                {link.label}
              </span>
            </Link>
          ))}

          {/* Expanded Links - Dropdown */}
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-4">
              {remainingLinks.map((link, index) => (
                <Link
                  key={index + 4}
                  href={link.href || '#'}
                  className="group relative flex flex-row items-center p-5 lg:p-8 rounded-2xl border border-sand/40 bg-white hover:bg-sand transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
                  aria-label={link.label}
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-sand bg-sand group-hover:bg-white transition-colors duration-300 mr-4 lg:mr-6 flex-shrink-0">
                    {link.icon && (
                      <Image
                        src={link.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span className="font-fustat-medium text-navy text-[20px] leading-[26px] tracking-[0px] lg:font-work-sans-medium lg:text-[24px] lg:leading-tight">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* View All / View Less Button - Mobile */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center mt-4"
            aria-label={isExpanded ? "Hide additional links" : "View all useful links"}
            aria-expanded={isExpanded}
          >
            <div className="flex items-center gap-3">
              {/* Plus/Minus Icon Circle */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-sand bg-sand">
                <span className="text-navy text-2xl font-light leading-none">
                  {isExpanded ? '−' : '+'}
                </span>
              </div>
              {/* View All / View Less Text */}
              <span className="font-fustat-extrabold text-navy text-sm uppercase tracking-wider">
                {isExpanded ? 'VIEW LESS' : 'VIEW ALL'}
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href || '#'}
              className="group relative flex flex-col items-start p-8 rounded-2xl border border-sand/40 bg-white hover:bg-sand transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              aria-label={link.label}
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-sand bg-sand group-hover:bg-white transition-colors duration-300 mb-6">
                {link.icon && (
                  <Image
                    src={link.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                )}
              </div>

              {/* Label */}
              <span className="font-work-sans-medium text-navy text-[24px] leading-tight">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
