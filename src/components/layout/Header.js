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
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Group', href: '/group/mayan-princess' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Apply Now', href: '/apply-now' },
  ];

  const linkBaseClass = `
    font-work-sans-medium text-sm xl:text-base uppercase tracking-wide
    transition-colors duration-200 outline-none
    px-3 py-2
  `;

  const linkColorClass = isTransparent
    ? 'text-white hover:text-turquoise'
    : 'text-navy hover:text-turquoise';

  return (
    <header
      className={`w-full transition-all duration-300 bg-white ${
        isTransparent
          ? 'lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:z-50 lg:bg-transparent'
          : ''
      }`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 outline-none"
            aria-label="MCNAB VENTURES Home"
          >
            <Image
              src={isTransparent ? '/logos/mcnab_logo_white.svg' : '/logos/Logo.svg'}
              alt="MCNAB VENTURES"
              width={120}
              height={52}
              className="h-10 sm:h-12 lg:h-14 w-auto hidden lg:block"
              priority
            />
            <Image
              src="/logos/Logo.svg"
              alt="MCNAB VENTURES"
              width={120}
              height={52}
              className="h-10 sm:h-12 lg:h-14 w-auto lg:hidden"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8" role="list">
            {navigationItems.map((item) =>
              item.label === 'Group' ? (
                <li key={item.label} className="relative group">
                  <button
                    type="button"
                    className={`${linkBaseClass} ${linkColorClass} inline-flex items-center gap-1`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Group
                    <svg
                      className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                    role="menu"
                  >
                    <div className="min-w-[220px] rounded-2xl bg-white shadow-lg shadow-black/8 ring-1 ring-black/5 overflow-hidden py-1">
                      {groupLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-5 py-2.5 font-work-sans-medium text-sm text-navy hover:text-turquoise hover:bg-sand/10 transition-colors duration-150"
                          role="menuitem"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${linkBaseClass} ${linkColorClass}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 rounded-lg text-navy hover:text-turquoise hover:bg-sand/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
            className="lg:hidden pb-6 pt-4 border-t border-sand/10"
            role="menu"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navigationItems.map((item) =>
                item.label === 'Group' ? (
                  <li key={item.label} className="flex flex-col">
                    <span className="font-work-sans-medium text-base uppercase tracking-wide px-3 py-2.5 text-navy">
                      Group
                    </span>
                    <ul className="flex flex-col" role="list">
                      {groupLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block font-work-sans-medium text-base px-6 py-2.5 text-navy hover:text-turquoise transition-colors duration-150"
                            onClick={() => setIsMobileMenuOpen(false)}
                            role="menuitem"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block font-work-sans-medium text-base uppercase tracking-wide px-3 py-2.5 text-navy hover:text-turquoise transition-colors duration-150"
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
