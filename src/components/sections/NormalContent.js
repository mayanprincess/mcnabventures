'use client';

import { normalContentData } from '@/data';
import { useScrollAnimation, animations } from '@/hooks/useScrollAnimation';

/**
 * NormalContent Component - MCNAB VENTURES
 *
 * Simple content block with an optional heading and rich text body.
 * Maps to the WordPress 'normal-content' flexible content block.
 *
 * WP fields:
 *   - heading (text)
 *   - content (wysiwyg → rendered as raw HTML)
 */
export default function NormalContent({
  heading = normalContentData.heading,
  content = normalContentData.content,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={scrollRef}
      className={`w-full py-16 sm:py-20 lg:py-[100px] bg-white ${animations.fadeUp(isVisible)}`}
    >
      <div className="w-[90%] max-w-[760px] mx-auto">

        {heading && (
          <>
            <h2 className="font-literata-light text-navy text-[32px] sm:text-[38px] lg:text-[44px] leading-tight mb-4">
              {heading}
            </h2>
            {/* Decorative accent line */}
            <div className="w-12 h-[2px] bg-gold mb-8 sm:mb-10" />
          </>
        )}

        {content && (
          <div
            className="
              font-fustat-regular text-navy/80 text-[16px] sm:text-[17px] leading-[1.85]
              [&_p]:mb-5 [&_p:last-child]:mb-0
              [&_strong]:font-fustat-semibold [&_strong]:text-navy
              [&_a]:text-turquoise [&_a]:underline [&_a:hover]:text-navy
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul_li]:mb-1.5
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5 [&_ol_li]:mb-1.5
              [&_h3]:font-literata-light [&_h3]:text-navy [&_h3]:text-[22px] [&_h3]:mb-3
            "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

      </div>
    </section>
  );
}
