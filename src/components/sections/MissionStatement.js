'use client';

import Image from 'next/image';

export default function MissionStatement() {
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
          <div className="max-w-xl lg:max-w-2xl text-center lg:text-right">
            <p className="font-literata-light-italic text-navy text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.5]">
              Driving the economic growth of{' '}
              <span className="text-turquoise">our region</span>,{' '}
              fostering the well-being of{' '}
              <span className="text-turquoise">our people</span>, nature,{' '}
              and{' '}
              <span className="text-turquoise">our communities</span>.{' '}
              With our heart on the island and our vision on Central America.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
