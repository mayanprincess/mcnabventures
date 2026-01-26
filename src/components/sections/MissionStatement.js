'use client';

import Image from 'next/image';
import { missionStatementData } from '@/data';

/**
 * Highlights specific words/phrases in a text string
 */
function highlightText(text, highlights) {
  if (!highlights || highlights.length === 0) return text;

  // Create regex pattern from highlights array
  const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  
  // Split text by highlights
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
    if (isHighlight) {
      return <span key={index} className="text-turquoise">{part}</span>;
    }
    return part;
  });
}

export default function MissionStatement({ 
  text = missionStatementData.text,
  highlights = missionStatementData.highlights,
  vectorType = 'vector1' // 'vector1' | 'vector2'
}) {
  // Vector options
  const vectors = {
    vector1: '/vector3.svg', // Waves pattern (top-left overflow)
    vector2: '/vector.svg',  // Curved stripes pattern
  };

  const vectorSrc = vectors[vectorType] || vectors.vector1;

  return (
    <section className="relative bg-white overflow-visible" style={{ height: '552px' }}>
      {/* Vector decoration - top left, positioned to overflow */}
      <div className="absolute -top-20 -left-1 sm:-top-8 sm:-left-2 xl:-top-12 xl:-left-2">
        <Image
          src={vectorSrc}
          alt=""
          width={527}
          height={366}
          className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[280px] xl:w-[527px] h-auto"
        />
      </div>

      {/* Mobile version - Large text, left-aligned (up to 1280px) */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 pt-[180px] sm:pt-[200px] xl:hidden">
        <div className="max-w-xl text-left">
          <p 
            className="font-literata font-medium text-navy"
            style={{
              fontSize: '32px',
              lineHeight: '40px', // 1.25 ratio
              letterSpacing: '-0.5px'
            }}
          >
            {highlightText(text, highlights)}
          </p>
        </div>
      </div>

      {/* Desktop version - Keep original styling (1280px+) */}
      <div className="hidden xl:flex absolute inset-0 z-10 items-center justify-end pr-[10%] 2xl:pr-[12%]">
        <div className="max-w-xl text-right">
          <p className="font-literata font-medium text-navy text-[28px] leading-[1.5]">
            {highlightText(text, highlights)}
          </p>
        </div>
      </div>
    </section>
  );
}
