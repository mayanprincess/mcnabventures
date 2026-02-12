'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useHeader } from '@/context/HeaderContext';

/**
 * Header Component - MCNAB VENTURES
 * 
 * Static navigation header with logo and menu items.
 * Responsive design with mobile hamburger menu.
 * Supports transparent mode for pages with PrimaryHero.
 * 
 * @component
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isTransparent } = useHeader();

  const groupLinks = [
    { label: 'CM Airlines', href: '/group/cm-airlines' },
    { label: 'Galaxy Wave', href: '/group/galaxy-wave' },
    { label: 'Mayan Princess', href: '/group/mayan-princess' },
    { label: 'Turquoise Bay', href: '/group/turquoise-bay' },
    { label: 'Acqua Di Mare', href: '/group/acqua-di-mare-resort' },
    { label: 'PetroGas', href: '/group/petrogas' },
  ];

  const navigationItems = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Group', href: '/group/mayan-princess' }, // href kept for key/back-compat; rendered as dropdown
    { label: 'Experiences', href: '/experiences' },
    { label: 'Careers', href: '/#careers' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`w-full transition-all duration-300 bg-white border-b border-sand/20 ${
        isTransparent 
          ? 'lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:z-50 lg:bg-transparent lg:border-transparent' 
          : ''
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center outline-none"
            aria-label="MCNAB VENTURES Home"
          >
            <Image
              src={isTransparent ? '/logos/mcnab_logo_white.svg' : '/logos/Logo.svg'}
              alt="MCNAB VENTURES Logo"
              width={120}
              height={52}
              className="h-10 sm:h-12 lg:h-14 w-auto lg:block hidden"
              priority
            />
            <Image
              src="/logos/Logo.svg"
              alt="MCNAB VENTURES Logo"
              width={120}
              height={52}
              className="h-10 sm:h-12 lg:h-14 w-auto lg:hidden"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navigationItems.map((item) =>
              item.label === 'Group' ? (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className={`font-work-sans-medium text-sm xl:text-base uppercase tracking-wide transition-colors duration-200 outline-none px-2 py-1 ${
                      isTransparent
                        ? 'text-white hover:text-turquoise'
                        : 'text-navy hover:text-turquoise'
                    }`}
                    aria-haspopup="menu"
                    aria-label="Open Group menu"
                  >
                    Group
                  </button>
                  <div
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full pt-3 z-50"
                    role="menu"
                    aria-label="Group links"
                  >
                    <div className="min-w-[220px] rounded-2xl bg-white border border-sand/20 shadow-lg overflow-hidden">
                      {groupLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-5 py-3 font-work-sans-medium text-sm text-navy hover:text-turquoise hover:bg-sand/10 outline-none"
                          role="menuitem"
                          aria-label={`Navigate to ${link.label}`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-work-sans-medium text-sm xl:text-base uppercase tracking-wide transition-colors duration-200 outline-none px-2 py-1 ${
                    isTransparent
                      ? 'text-white hover:text-turquoise'
                      : 'text-navy hover:text-turquoise'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 text-navy hover:text-turquoise hover:bg-sand/10 focus:ring-navy"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden pb-6 pt-4 border-t border-sand/20"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) =>
                item.label === 'Group' ? (
                  <div key={item.label} className="flex flex-col gap-3">
                    <div className="font-work-sans-medium text-base uppercase tracking-wide px-2 py-2 text-navy">
                      Group
                    </div>
                    <div className="flex flex-col">
                      {groupLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="font-work-sans-medium text-base transition-colors duration-200 outline-none px-4 py-2 text-navy hover:text-turquoise"
                          onClick={() => setIsMobileMenuOpen(false)}
                          role="menuitem"
                          aria-label={`Navigate to ${link.label}`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-work-sans-medium text-base uppercase tracking-wide transition-colors duration-200 outline-none px-2 py-2 text-navy hover:text-turquoise"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
