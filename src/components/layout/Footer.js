import Image from 'next/image';
import Link from 'next/link';

/**
 * Footer Component - MCNAB VENTURES
 * 
 * Static footer section with logo, navigation links, social media icons, and decorative vectors.
 * 
 * @component
 */
export default function Footer() {
  // Static footer data
  const aboutUsLinks = [
    { label: 'Lorem Ipsum', url: '#' },
    { label: 'Dolor Sit Amet', url: '#' },
    { label: 'Consectetur', url: '#' },
    { label: 'Adipiscing Elit', url: '#' },
  ];

  const companyLinks = [
    { label: 'Sed do Eiusmod', url: '#' },
    { label: 'Tempor incididunt', url: '#' },
    { label: 'Labore et Dolore', url: '#' },
    { label: 'Magna Aliqua', url: '#' },
  ];

  const careersLinks = [
    { label: 'Ut Enim Ad Minim', url: '#' },
    { label: 'Veniam, Quis Nostrud', url: '#' },
    { label: 'Exercitation Ullamco', url: '#' },
    { label: 'Laboris Nisi ut Aliquip', url: '#' },
  ];

  const socialLinks = [
    { platform: 'linkedin', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'facebook', url: '#' },
  ];

  return (
    <footer 
      className="relative w-full bg-navy overflow-hidden"
      style={{ minHeight: '945px' }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Decorative Vectors - Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Vector 1 - Upper wave */}
        <div 
          className="absolute w-[120%] -left-[10%]"
          style={{ top: '35%' }}
        >
          <Image
            src="/logos/footer_vector_1.svg"
            alt=""
            width={1728}
            height={466}
            className="w-full h-auto opacity-15"
          />
        </div>
        {/* Vector 2 - Lower wave */}
        <div 
          className="absolute w-[120%] -left-[10%]"
          style={{ bottom: '-100px' }}
        >
          <Image
            src="/logos/footer_vector_2.svg"
            alt=""
            width={1728}
            height={373}
            className="w-full h-auto opacity-15"
          />
        </div>
      </div>

      {/* Large Background Logo - Bottom Center */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 z-[1]"
        style={{ bottom: '0px' }}
      >
        <Image
          src="/logos/mcnab_logo.svg"
          alt=""
          width={400}
          height={580}
          className="w-[320px] sm:w-[360px] lg:w-[400px] h-auto opacity-80"
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo Section - Top Left */}
          <div className="lg:col-span-1">
            <Link 
              href="/" 
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded"
              aria-label="MCNAB VENTURES Home"
            >
              <Image
                src="/logos/mcnab_logo_text.svg"
                alt="MCNAB VENTURES"
                width={166}
                height={174}
                className="w-32 sm:w-40 h-auto"
              />
            </Link>
          </div>

          {/* About Us Column */}
          <div className="lg:col-span-1">
            <h3 className="font-work-sans-extrabold text-white text-base mb-4 uppercase tracking-wide">
              About Us
            </h3>
            <ul className="space-y-3">
              {aboutUsLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="font-work-sans-medium text-white/80 text-sm hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1">
            <h3 className="font-work-sans-extrabold text-white text-base mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="font-work-sans-medium text-white/80 text-sm hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Careers Column */}
          <div className="lg:col-span-1">
            <h3 className="font-work-sans-extrabold text-white text-base mb-4 uppercase tracking-wide">
              Careers
            </h3>
            <ul className="space-y-3">
              {careersLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="font-work-sans-medium text-white/80 text-sm hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="lg:col-span-1">
            <h3 className="font-work-sans-extrabold text-white text-base mb-4 uppercase tracking-wide">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const iconMap = {
                  facebook: '/logos/Facebook.svg',
                  linkedin: '/logos/Linkedin.svg',
                  twitter: '/logos/Twitter.svg',
                };

                const iconPath = iconMap[social.platform?.toLowerCase()] || social.icon;

                if (!iconPath) return null;

                return (
                  <a
                    key={index}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded-full"
                    aria-label={`Follow us on ${social.platform || 'social media'}`}
                  >
                    <Image
                      src={iconPath}
                      alt={social.platform || 'Social media icon'}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
