'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { missionStatementData } from '@/data';

const markdownComponents = {
  p: ({ children }) => <span className="text-navy">{children}</span>,
  strong: ({ children }) => <span className="font-fustat-medium text-turquoise">{children}</span>,
};

export default function MissionStatement({
  text = missionStatementData.text,
  vectorType = 'vector1', // 'vector1' | 'vector2'
}) {
  const vectors = {
    vector1: '/vector3.svg',
    vector2: '/vector.svg',
  };

  const vectorSrc = vectors[vectorType] || vectors.vector1;

  return (
    <section className="relative bg-white overflow-visible" style={{ height: '552px' }}>
      <div className="absolute -top-20 -left-1 sm:-top-8 sm:-left-2 xl:-top-12 xl:-left-2">
        <Image
          src={vectorSrc}
          alt=""
          width={527}
          height={366}
          className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[280px] xl:w-[527px] h-auto"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 pt-[180px] sm:pt-[200px] xl:hidden">
        <div className="max-w-xl text-left">
          <div
            className="font-literata font-medium text-navy"
            style={{
              fontSize: '32px',
              lineHeight: '40px',
              letterSpacing: '-0.5px',
            }}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex absolute inset-0 z-10 items-center justify-end pr-[10%] 2xl:pr-[12%]">
        <div className="max-w-xl text-right">
          <div className="font-literata font-medium text-navy text-[28px] leading-[1.5]">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
