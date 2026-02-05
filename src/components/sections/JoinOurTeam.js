'use client';

import Image from 'next/image';
import Link from 'next/link';
import { joinOurTeamData } from '@/data';
import { useScrollAnimation, animations } from '@/hooks/useScrollAnimation';

export default function JoinOurTeam({
  title = joinOurTeamData.title,
  description = joinOurTeamData.description,
  buttonText = joinOurTeamData.buttonText,
  buttonHref = joinOurTeamData.buttonHref,
  image = joinOurTeamData.image,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={scrollRef} className={`w-full py-16 sm:py-20 lg:py-[100px] bg-white ${animations.fadeUp(isVisible)}`}>
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* MOBILE VERSION */}
        <div className="lg:hidden">
          <div className="relative rounded-[60px] overflow-hidden min-h-[520px]">
            {/* Background Image */}
            <Image
              src={image}
              alt="Join our team"
              fill
              className="object-cover"
              sizes="90vw"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.71)_0%,rgba(0,0,0,0)_48.06%)]" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center text-center pt-10 pb-8 px-6">
              <div className="max-w-[360px]">
                {/* Title */}
                <h2 className="font-literata-light text-white text-[32px] leading-[38px] tracking-[-1px] mb-4">
                  {title}
                </h2>

                {/* Description */}
                <p className="font-fustat-medium text-white/90 text-[20px] leading-[26px] tracking-[0px] max-w-[285px] mx-auto">
                  {description}
                </p>
              </div>

              {/* CTA Button */}
              <Link
                href={buttonHref}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-gold text-white w-[263px] h-[56px] px-[23px] py-[15px] rounded-[24px] font-fustat-extrabold text-[16px] leading-[24px] tracking-[0px] hover:bg-gold/90 transition-colors duration-300"
              >
                {buttonText}
                <Image
                  src="/btn_arrow_white.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP VERSION - Keep original layout */}
        <div className="hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden min-h-[500px]">
            {/* Background Image */}
            <Image
              src={image}
              alt="Join our team"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 90vw, 1200px"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.71)_0%,rgba(0,0,0,0)_48.06%)]" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="p-8 sm:p-12 lg:p-16 max-w-xl">
                {/* Title */}
                <h2 className="font-literata-light text-white text-[48px] leading-[58px] tracking-[-1px] mb-4">
                  {title}
                </h2>

                {/* Description */}
                <p className="font-fustat-medium text-white/90 text-[20px] leading-[26px] tracking-[0px] mb-8 max-w-[285px]">
                  {description}
                </p>

                {/* CTA Button */}
                <Link
                  href={buttonHref}
                  className="inline-flex items-center justify-center gap-3 bg-gold text-white px-6 py-3.5 rounded-full font-bold text-[16px] leading-[26px] tracking-[-0.36px] text-center hover:bg-gold/90 transition-colors duration-300 w-fit"
                >
                  {buttonText}
                  <Image
                    src="/btn_arrow_white.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
