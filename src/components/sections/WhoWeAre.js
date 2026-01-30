import Image from 'next/image';
import { whoWeAreData } from '@/data';

export default function WhoWeAre({
  badge = whoWeAreData.badge,
  titlePart1 = whoWeAreData.titlePart1,
  titleHighlight = whoWeAreData.titleHighlight,
  description = whoWeAreData.description,
  logo = whoWeAreData.logo,
}) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-[100px] bg-white">
      {/* MOBILE VERSION */}
      <div className="lg:hidden flex flex-col items-center px-6">
        {/* Logo Container - Oval with beige background */}
        <div className="mb-16">
          <div className="bg-[#F6F4EF] rounded-full w-[342px] h-[153px] flex items-center justify-center">
            <Image
              src={logo}
              alt="MCNAB VENTURES"
              width={100}
              height={60}
              className="w-[100px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Badge - "WHO WE ARE" */}
        <div className="mb-3">
          <span className="inline-flex items-center justify-center border border-navy rounded-full w-[115px] h-[29px] font-work-sans-medium text-navy text-xs tracking-wider uppercase">
            {badge}
          </span>
        </div>

        {/* Description - Centered, Fustat Medium */}
        <p className="font-fustat-medium text-navy text-[28px] leading-[34px] tracking-[-0.5px] text-center max-w-[90%]">
          {description}
        </p>
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Logo Container */}
        <div className="flex-shrink-0">
          <div className="bg-[#F6F4EF] rounded-r-full py-24 sm:py-28 lg:py-32 pl-0 pr-32 sm:pr-48 lg:pr-64 flex items-center justify-center min-w-[450px] sm:min-w-[600px] lg:min-w-[750px]">
            <div className="pl-24 sm:pl-36 lg:pl-48">
              <Image
                src={logo}
                alt="Company logo"
                width={175}
                height={105}
                className="w-[175px] h-[105px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-right pr-8 sm:pr-12 lg:pr-16">
          {/* Badge */}
          <span className="inline-block border border-navy/30 rounded-full px-4 py-1.5 font-work-sans-medium text-navy text-xs tracking-wider mb-6">
            {badge}
          </span>

          {/* Title */}
          <h2 className="font-fustat-medium text-[28px] sm:text-[32px] lg:text-[36px] leading-snug mb-6">
            <span className="text-navy">{titlePart1}</span>
            <br />
            <span className="text-turquoise">{titleHighlight}</span>
          </h2>

          {/* Description */}
          <p className="font-fustat-medium text-navy/80 text-[20px] sm:text-[22px] lg:text-[24px] leading-relaxed max-w-2xl ml-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
