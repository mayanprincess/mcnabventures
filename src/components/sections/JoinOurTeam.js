import Image from 'next/image';
import Link from 'next/link';
import { joinOurTeamData } from '@/data';

export default function JoinOurTeam({
  title = joinOurTeamData.title,
  description = joinOurTeamData.description,
  buttonText = joinOurTeamData.buttonText,
  buttonHref = joinOurTeamData.buttonHref,
  image = joinOurTeamData.image,
}) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="p-8 sm:p-12 lg:p-16 max-w-md">
              {/* Title */}
              <h2 className="font-literata-light-italic text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-tight mb-4">
                {title}
              </h2>

              {/* Description */}
              <p className="font-work-sans text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                {description}
              </p>

              {/* CTA Button */}
              <Link
                href={buttonHref}
                className="inline-flex items-center gap-3 bg-gold text-white px-6 py-3.5 rounded-full font-work-sans-semibold text-sm hover:bg-gold/90 transition-colors duration-300 w-fit"
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
    </section>
  );
}
