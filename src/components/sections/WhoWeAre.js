'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { whoWeAreData } from '@/data';
import { useScrollAnimation, animations } from '@/hooks/useScrollAnimation';

const markdownComponents = {
  // Render <p> as <span> so it inherits the wrapper styles.
  p: ({ children }) => <span>{children}</span>,
  strong: ({ children }) => <span className="font-fustat-medium text-turquoise">{children}</span>,
};

export default function WhoWeAre({
  badge = whoWeAreData.badge,
  titlePart1 = whoWeAreData.titlePart1,
  description = whoWeAreData.description,
  logo = whoWeAreData.logo,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={scrollRef} className={`w-full py-16 sm:py-20 lg:py-[100px] bg-white ${animations.fadeUp(isVisible)}`}>
      {/* MOBILE VERSION */}
      <div className="lg:hidden flex flex-col items-center px-6">
        {/* Logo Container - Oval with beige background */}
        <div className="mb-16">
          <div className="bg-[#F6F4EF] rounded-full w-[342px] h-[153px] flex items-center justify-center">
            <Image
              src={logo}
              alt="MCNAB VENTURES"
              width={100}
              height={60}
              className="w-[100px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Badge - "WHO WE ARE" */}
        <div className="mb-3">
          <span className="inline-flex items-center justify-center border border-navy rounded-full w-[115px] h-[29px] font-work-sans-medium text-navy text-xs tracking-wider uppercase">
            {badge}
          </span>
        </div>

        {/* Title (WYSIWYG HTML via ReactMarkdown + rehype-raw) - key forces remount on content change (fixes client nav) */}
        {titlePart1 && (
          <div className="font-fustat-medium text-navy text-[28px] leading-[34px] tracking-[-0.5px] text-center max-w-[90%] mb-4">
            <ReactMarkdown key={titlePart1} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {titlePart1}
            </ReactMarkdown>
          </div>
        )}
        {/* Description (same markdown pipeline as titlePart1) */}
        <div className="font-fustat-medium text-navy text-[28px] leading-[34px] tracking-[-0.5px] text-center max-w-[90%]">
          <ReactMarkdown key={description ?? ''} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
            {description ?? ''}
          </ReactMarkdown>
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Logo Container */}
        <div className="flex-shrink-0">
          <div className="bg-[#F6F4EF] rounded-r-full py-24 sm:py-28 lg:py-32 pl-0 pr-32 sm:pr-48 lg:pr-64 flex items-center justify-center min-w-[450px] sm:min-w-[600px] lg:min-w-[750px]">
            <div className="pl-24 sm:pl-36 lg:pl-48">
              <Image
                src={logo}
                alt="Company logo"
                width={175}
                height={105}
                className="w-[175px] h-[105px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-right pr-8 sm:pr-12 lg:pr-16">
          {/* Badge */}
          <span className="inline-block border border-navy/30 rounded-full px-4 py-1.5 font-work-sans-medium text-navy text-xs tracking-wider mb-6">
            {badge}
          </span>

          {/* Title (WYSIWYG HTML via ReactMarkdown + rehype-raw) - key forces remount on content change (fixes client nav) */}
          {titlePart1 && (
            <div className="font-fustat-medium text-navy text-[28px] sm:text-[32px] lg:text-[36px] leading-snug mb-6 max-w-2xl ml-auto">
              <ReactMarkdown key={titlePart1} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {titlePart1}
              </ReactMarkdown>
            </div>
          )}

          {/* Description */}
          <div className="font-fustat-medium text-navy/80 text-[20px] sm:text-[22px] lg:text-[24px] leading-relaxed max-w-2xl ml-auto">
            <ReactMarkdown key={description ?? ''} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {description ?? ''}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
