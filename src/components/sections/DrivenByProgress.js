'use client';

import Image from 'next/image';
import { useScrollAnimation, animations, getDelay } from '@/hooks/useScrollAnimation';

const defaultStats = [
  {
    icon: '/edificio.svg',
    value: '9',
    label: 'Industries',
  },
  {
    icon: '/people.svg',
    value: '12',
    label: 'Companies',
  },
  {
    icon: '/world.svg',
    value: '1',
    label: 'Vision for Progress',
  },
  {
    icon: '/leaf.svg',
    value: '100%',
    label: 'Committed to Sustainability',
  },
];

export default function DrivenByProgress({
  title = 'Driven by Progress',
  description = 'Building a legacy of sustainable growth and regional development through strategic diversification and commitment to excellence.',
  image = '/imagenes/imagendriven.jpg',
  stats = defaultStats,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section 
      ref={scrollRef}
      className={`relative w-full py-16 sm:py-20 lg:py-[100px] overflow-hidden ${animations.fadeUp(isVisible)}`}
      style={{ backgroundColor: '#00354A' }}
    >
      {/* Background Vector - Desktop Only */}
      <div className="hidden lg:block absolute bottom-0 left-0 pointer-events-none">
        <Image
          src="/vector6.svg"
          alt=""
          width={864}
          height={38}
          className="w-[50vw] h-auto opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-[90%] lg:max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-literata-light text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-tight mb-4">
            {title}
          </h2>
          <p className="font-fustat-medium text-white text-base lg:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full lg:w-[90%] max-w-[1110px] mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="relative w-full h-[400px] lg:max-h-[400px] lg:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={image}
              alt="Team"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 342px, (max-width: 1110px) 90vw, 1110px"
              priority
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-3 sm:mb-4">
                <Image
                  src={stat.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] lg:w-10 lg:h-10"
                />
              </div>
              
              {/* Value */}
              <span className="font-fustat-extrabold text-white text-[28px] sm:text-[32px] lg:text-[36px] leading-tight">
                {stat.value}
              </span>
              
              {/* Label */}
              <span className="font-fustat-medium text-white text-[18px] leading-[24px] tracking-[0px] lg:text-lg mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
