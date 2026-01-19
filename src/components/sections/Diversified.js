'use client';

import Image from 'next/image';
import { diversifiedData } from '@/data';

export default function Diversified({
  title = diversifiedData.title,
  image = diversifiedData.image,
}) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative SVG - Left and Right */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/diversified.svg"
          alt=""
          width={1440}
          height={560}
          className="w-full h-auto absolute top-1/2 -translate-y-1/2"
          style={{ minWidth: '1440px' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center px-4">
        <div 
          className="relative w-full max-w-[1110px] overflow-hidden"
          style={{
            height: 'auto',
            aspectRatio: '1110 / 1024',
            borderRadius: '800px 800px 32px 32px',
          }}
        >
          {/* Background Image */}
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1110px) 100vw, 1110px"
            priority
          />

          {/* White Gradient Overlay - Top */}
          <div 
            className="absolute inset-x-0 top-0 h-[50%] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-start justify-center pt-12 sm:pt-16 lg:pt-20">
            <h2 className="font-literata-light text-navy text-center text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.3] max-w-md px-4">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
