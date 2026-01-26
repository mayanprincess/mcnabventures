'use client';

import Image from 'next/image';
import { diversifiedData } from '@/data';

export default function Diversified({
  title = diversifiedData.title,
  image = diversifiedData.image,
}) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* MOBILE VERSION */}
      <div className="lg:hidden">
        {/* Decorative SVG - Mobile */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/diversified.svg"
            alt=""
            width={1440}
            height={560}
            className="w-full h-auto absolute top-24 min-w-full max-w-[400px]"
          />
        </div>

        {/* Main Content - Mobile */}
        <div className="relative z-10 flex justify-center px-4">
          <div 
            className="relative w-[342px] h-[500px] overflow-hidden rounded-[800px_800px_32px_32px]"
          >
            {/* Background Image */}
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="342px"
              priority
            />

            {/* White Gradient Overlay - Top */}
            <div 
              className="absolute inset-x-0 top-0 h-[50%] pointer-events-none bg-gradient-to-b from-white/[0.84] to-transparent"
            />

            {/* Text Overlay - Mobile */}
            <div className="absolute inset-0 flex items-start justify-center pt-12">
              <h2 
                className="font-literata-light text-navy text-center px-4 text-[32px] leading-[38px] tracking-[-1px] font-light max-w-[280px]"
              >
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VERSION - Keep original layout */}
      <div className="hidden lg:block">
        {/* Decorative SVG - Left and Right */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/diversified.svg"
            alt=""
            width={1440}
            height={560}
            className="w-full h-auto absolute top-1/2 -translate-y-1/2 min-w-[1440px]"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex justify-center px-4">
          <div 
            className="relative w-full max-w-[1110px] overflow-hidden h-auto aspect-[1110/1024] rounded-[800px_800px_32px_32px]"
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
              className="absolute inset-x-0 top-0 h-[50%] pointer-events-none bg-gradient-to-b from-white/[0.84] to-transparent"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-start justify-center pt-12 sm:pt-16 lg:pt-20">
              <h2 className="font-literata-light text-navy text-center text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.3] max-w-md px-4">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
