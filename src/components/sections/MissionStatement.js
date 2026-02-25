'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { missionStatementData } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { markdownComponentsNavy as markdownComponents } from '@/lib/markdown';

const VECTORS = {
  vector1: '/vector3.svg',
  vector2: '/vector.svg',
};

/**
 * MissionStatement Component - MCNAB VENTURES
 *
 * Decorative wave vector + mission text.
 * Mobile: left-aligned text below vector
 * Desktop: right-aligned text, vertically centered
 */
export default function MissionStatement({
  text = missionStatementData.text,
  vectorType = 'vector1',
}) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const vectorSrc = VECTORS[vectorType] || VECTORS.vector1;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-visible
        min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[552px]"
    >
      {/* Decorative wave vector — slides in from left */}
      <div
        className={`
          absolute -top-16 -left-1 sm:-top-10 md:-top-12 xl:-top-12
          transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}
        `}
      >
        <Image
          src={vectorSrc}
          alt=""
          width={527}
          height={366}
          className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px] xl:w-[527px] h-auto"
          aria-hidden="true"
        />
      </div>

      {/* Mission text — unified responsive block */}
      <div
        className="
          relative z-10 container mx-auto
          px-6 sm:px-8 md:px-10
          pt-[140px] sm:pt-[160px] md:pt-[170px] lg:pt-[180px]
          xl:pt-0 xl:absolute xl:inset-0 xl:flex xl:items-center xl:justify-end xl:pr-[6%] 2xl:pr-[8%]
        "
      >
        <div
          className={`
            max-w-lg xl:max-w-2xl 2xl:max-w-3xl
            text-left xl:text-right
            transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isVisible
              ? 'opacity-100 translate-x-0 xl:translate-x-0'
              : 'opacity-0 -translate-x-10 xl:translate-x-10'}
          `}
          style={{ transitionDelay: '400ms' }}
        >
          <div
            className="
              font-literata font-medium text-navy
              text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]
              leading-[1.45] sm:leading-[1.5]
              tracking-[-0.3px]
            "
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
