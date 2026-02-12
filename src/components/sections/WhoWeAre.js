'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { whoWeAreData } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Module-level constant — avoids re-creation on every render
 * (per rerender-memo: hoist non-primitive defaults)
 */
const markdownComponents = {
  p: ({ children }) => <span>{children}</span>,
  strong: ({ children }) => (
    <span className="font-fustat-medium text-turquoise">{children}</span>
  ),
};

/**
 * WhoWeAre Component - MCNAB VENTURES
 *
 * Company identity section with asymmetric layout:
 * - Mobile: centered vertical stack with oval logo
 * - Tablet+: horizontal layout with full-bleed left pill + right-aligned text
 *
 * Unified responsive layout — single render block, no duplication.
 */
export default function WhoWeAre({
  badge = whoWeAreData.badge,
  titlePart1 = whoWeAreData.titlePart1,
  description = whoWeAreData.description,
  logo = whoWeAreData.logo,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={scrollRef}
      className="w-full py-16 sm:py-20 lg:py-24 xl:py-[100px] bg-white overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8 lg:gap-12 xl:gap-16">
        {/* ── Logo Container ──
            Mobile: centered oval pill
            Tablet+: full-bleed left pill with rounded right edge
            Proportions matched to Figma (~35% tablet, ~40% desktop) */}
        <div
          className={`
            md:flex-shrink-0
            transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
          `}
        >
          <div
            className="
              bg-[#F6F4EF] flex items-center justify-center
              rounded-full w-[280px] sm:w-[342px] h-[130px] sm:h-[153px]
              md:rounded-none md:rounded-r-full md:w-auto md:h-auto
              md:min-w-[260px] lg:min-w-[380px] xl:min-w-[540px] 2xl:min-w-[680px]
              md:py-14 lg:py-20 xl:py-28 2xl:py-32
              md:pr-12 lg:pr-24 xl:pr-40 2xl:pr-56
            "
          >
            <div className="md:pl-12 lg:pl-24 xl:pl-36 2xl:pl-48">
              <Image
                src={logo}
                alt="MCNAB VENTURES"
                width={175}
                height={105}
                className="w-[90px] sm:w-[100px] md:w-[100px] lg:w-[130px] xl:w-[160px] 2xl:w-[175px] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0 text-center md:text-right px-6 md:px-0 md:pr-8 lg:pr-[10%] xl:pr-[10%]">
          {/* Badge */}
          <div
            className={`
              mb-3 md:mb-3 lg:mb-5
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="inline-flex items-center justify-center border border-navy/30 rounded-full px-4 py-1.5 font-work-sans-medium text-navy text-xs tracking-wider uppercase">
              {badge}
            </span>
          </div>

          {/* Title — same size as description on mobile, differentiated from md+ */}
          {titlePart1 ? (
            <div
              className={`
                font-fustat-medium text-navy
                text-[24px] sm:text-[28px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]
                leading-snug tracking-[-0.3px]
                mb-3 sm:mb-4 lg:mb-5
                max-w-[90%] mx-auto md:max-w-none md:mx-0
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: '400ms' }}
            >
              <ReactMarkdown
                key={titlePart1}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {titlePart1}
              </ReactMarkdown>
            </div>
          ) : null}

          {/* Description — lighter color from md+ for visual hierarchy */}
          <div
            className={`
              font-fustat-medium text-navy md:text-navy/80
              text-[24px] sm:text-[28px] md:text-[15px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px]
              leading-relaxed
              max-w-[90%] mx-auto md:max-w-none md:mx-0
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: '600ms' }}
          >
            <ReactMarkdown
              key={description ?? ''}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {description ?? ''}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
