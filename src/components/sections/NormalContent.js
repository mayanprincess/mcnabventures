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
      className={`w-full py-16 sm:py-20 lg:py-[100px] bg-cream ${animations.fadeUp(isVisible)}`}
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">

        {heading && (
          <h2 className="font-literata-light text-navy text-[36px] sm:text-[42px] lg:text-[48px] mb-8 sm:mb-10">
            {heading}
          </h2>
        )}

        {content && (
          <div
            className="font-fustat-medium text-navy text-[18px] leading-[1.7] max-w-4xl wysiwyg-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

      </div>
    </section>
  );
}
