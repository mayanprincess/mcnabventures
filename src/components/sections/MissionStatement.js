'use client';

import Image from 'next/image';
import { missionStatementData } from '@/data';

export default function MissionStatement({ data = missionStatementData }) {
  const { content } = data;
  return (
    <section className="relative bg-white min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] overflow-visible flex items-center">
      {/* Vector decoration - top left, positioned to overflow */}
      <div className="absolute -top-12 -left-2 lg:-top-26">
        <Image
          src="/vector3.svg"
          alt=""
          width={527}
          height={366}
          className="w-[280px] sm:w-[400px] lg:w-[527px] h-auto"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 lg:pt-24">
        <div className="relative z-10 flex justify-end">
          <div className="max-w-xl text-center lg:text-right">
            <p className="font-literata font-medium text-navy text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.5]">
              {content.textBeforeHighlight1}{' '}
              <span className="text-turquoise">{content.highlight1}</span>
              {content.textBeforeHighlight2}{' '}
              <span className="text-turquoise">{content.highlight2}</span>
              {content.textBeforeHighlight3}{' '}
              <span className="text-turquoise">{content.highlight3}</span>
              {content.textAfter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
