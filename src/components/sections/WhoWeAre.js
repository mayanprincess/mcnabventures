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
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
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
