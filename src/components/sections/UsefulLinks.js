import Link from 'next/link';
import Image from 'next/image';

const usefulLinksData = [
  { label: 'Flight Deals', href: '/flight-deals', icon: '/iconos/etiqueta.svg' },
  { label: 'Route Map', href: '/route-map', icon: '/iconos/location.svg' },
  { label: 'Cargo Services', href: '/cargo-services', icon: '/iconos/box.svg' },
  { label: 'Our Fleet', href: '/our-fleet', icon: '/iconos/flight.svg' },
  { label: 'Baggage Policy', href: '/baggage-policy', icon: '/iconos/bag.svg' },
  { label: 'Check-in', href: '/check-in', icon: '/iconos/check.svg' },
  { label: 'Travel Tips', href: '/travel-tips', icon: '/iconos/idea.svg' },
  { label: 'FAQs', href: '/faqs', icon: '/iconos/question.svg' },
];

export default function UsefulLinks({ links = usefulLinksData }) {
  return (
    <section 
      className="w-full bg-white py-12 sm:py-16 lg:py-20"
      aria-labelledby="useful-links-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 
          id="useful-links-heading"
          className="font-literata-light text-navy text-[48px] mb-8 sm:mb-10 lg:mb-12"
        >
          Useful Links
        </h2>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {links.map((link, index) => (
              <Link
                key={index}
                href={link.href || '#'}
                className="group relative flex flex-col items-start p-5 sm:p-6 lg:p-8 rounded-2xl border border-sand/40 bg-white hover:bg-sand transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
                aria-label={link.label}
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-sand bg-sand group-hover:bg-white transition-colors duration-300 mb-4 sm:mb-6">
                  {link.icon && (
                    <Image
                      src={link.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  )}
                </div>

                {/* Label */}
                <span className="font-work-sans-medium text-navy text-[24px] leading-tight">
                  {link.label}
                </span>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
