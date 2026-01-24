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
  // Static data - no API needed
  const logo = '/logos/mcnab_logo_text.svg';
  const logoLarge = '/logos/mcnab_logo.svg';
  const vector1 = '/logos/footer_vector_1.svg';
  const vector2 = '/logos/footer_vector_2.svg';

  const aboutUsLinks = [
    { label: 'Our Story', url: '/about-us' },
    { label: 'Leadership', url: '/leadership' },
    { label: 'Mission & Values', url: '/mission' },
    { label: 'Sustainability', url: '/sustainability' },
  ];

  const companyLinks = [
    { label: 'Tourism', url: '/industries/tourism' },
    { label: 'Aviation', url: '/industries/aviation' },
    { label: 'Energy', url: '/industries/energy' },
    { label: 'Real Estate', url: '/industries/real-estate' },
  ];

  const careersLinks = [
    { label: 'Open Positions', url: '/careers' },
    { label: 'Benefits', url: '/careers/benefits' },
    { label: 'Culture', url: '/careers/culture' },
    { label: 'Internships', url: '/careers/internships' },
  ];

  const socialLinks = [
    { platform: 'linkedin', url: 'https://linkedin.com/company/mcnabventures' },
    { platform: 'twitter', url: 'https://twitter.com/mcnabventures' },
    { platform: 'facebook', url: 'https://facebook.com/mcnabventures' },
  ];

  const mobileLinks = [
    { label: 'About Us', url: '/about-us' },
    { label: 'Our Group', url: '/our-group' },
    { label: 'Our Company', url: '/our-company' },
    { label: 'Mc Nab Careers', url: '/careers' },
    { label: 'McNab Experiences', url: '/experiences' },
    { label: 'Contact Us', url: '/contact' },
  ];

  const mobileSocialLinks = [
    { platform: 'instagram', url: '#', icon: '/insta.svg' },
    { platform: 'x', url: 'https://twitter.com/mcnabventures', icon: '/x.svg' },
    { platform: 'whatsapp', url: '#', icon: '/wha.svg' },
    { platform: 'facebook', url: 'https://facebook.com/mcnabventures', icon: '/face.svg' },
    { platform: 'youtube', url: '#', icon: '/youtube.svg' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/mcnabventures', icon: '/linkedin.svg' },
  ];

  return (
    <footer 
      className="relative w-full bg-navy overflow-hidden"
      style={{ minHeight: '945px' }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* MOBILE VERSION */}
      <div className="lg:hidden relative z-10 px-6 pt-14 pb-28 text-white" style={{ height: '880px' }}>
        <div className="flex flex-col items-center text-center mb-8">
          <Image
            src={logo}
            alt="MCNAB VENTURES"
            width={180}
            height={60}
            className="w-40 h-auto"
          />
        </div>

        <ul className="w-full text-center">
          {mobileLinks.map((link) => (
            <li key={link.label} className="border-b border-white/20">
              <Link
                href={link.url}
                className="block py-4 font-fustat-medium text-white/90 text-[18px] leading-[24px] tracking-[0px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-[58px] flex items-center justify-center gap-[30px]">
          {mobileSocialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${social.platform}`}
              className="inline-flex"
            >
              <Image
                src={social.icon}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Waves - Outside mobile container to stick to footer bottom */}
      <div className="lg:hidden absolute inset-x-0 bottom-0 z-0 pointer-events-none">
        <Image
          src={vector1}
          alt=""
          width={1728}
          height={466}
          className="w-[120%] h-auto opacity-20"
        />
        <Image
          src={vector2}
          alt=""
          width={1728}
          height={373}
          className="w-[120%] h-auto opacity-20 -mt-18                                                                                                                                                                                                                                                                                                "
        />
      </div>

      {/* DESKTOP VERSION - Keep original layout */}
      <div className="hidden lg:block">
        {/* Decorative Vectors - Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Vector 1 - Upper wave */}
          <div 
            className="absolute w-[120%] -left-[10%]"
            style={{ top: '35%' }}
          >
            <Image
              src={vector1}
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
              src={vector2}
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
              src={logoLarge}
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
                  src={logo}
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
      </div>
    </footer>
  );
}
