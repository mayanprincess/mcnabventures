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
      <div className="absolute -top-20 -left-1 sm:-top-8 sm:-left-2 lg:-top-12 lg:-left-2">
        <Image
          src={vectorSrc}
          alt=""
          width={527}
          height={366}
          className="w-[200px] sm:w-[240px] md:w-[400px] lg:w-[280px] xl:w-[527px] h-auto"
        />
      </div>

      {/* Mobile version - Large text, left-aligned */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 pt-[180px] sm:pt-[200px] lg:hidden">
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

      {/* Desktop version - Keep original styling */}
      <div 
        className="hidden lg:block absolute z-10 max-w-xl text-right"
        style={{ 
          right: '163px', 
          top: '150px',
          left: 'calc(527px + 127px)' // vector width + gap
        }}
      >
        <p className="font-literata font-medium text-navy text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.5]">
          {highlightText(text, highlights)}
        </p>
      </div>
    </section>
  );
}
