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

  const navigationItems = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Group', href: '/group' },
    { label: 'Our Impact', href: '/our-impact' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Careers', href: '/careers' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`w-full transition-all duration-300 ${
        isTransparent 
          ? 'absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent' 
          : 'bg-white border-b border-sand/20'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
            aria-label="MCNAB VENTURES Home"
          >
            <Image
              src={isTransparent ? "/logos/mcnab_logo_white.svg" : "/logos/Logo.svg"}
              alt="MCNAB VENTURES Logo"
              width={120}
              height={52}
              className="h-10 sm:h-12 lg:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-work-sans-medium text-sm xl:text-base uppercase tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                  isTransparent 
                    ? 'text-white hover:text-turquoise focus:ring-white' 
                    : 'text-navy hover:text-turquoise focus:ring-navy'
                }`}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
              isTransparent 
                ? 'text-white hover:text-turquoise hover:bg-white/10 focus:ring-white' 
                : 'text-navy hover:text-turquoise hover:bg-sand/10 focus:ring-navy'
            }`}
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
            className={`lg:hidden pb-6 pt-4 border-t ${
              isTransparent 
                ? 'border-white/20 bg-navy/90 backdrop-blur-sm' 
                : 'border-sand/20'
            }`}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-work-sans-medium text-base uppercase tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-2 ${
                    isTransparent 
                      ? 'text-white hover:text-turquoise focus:ring-white' 
                      : 'text-navy hover:text-turquoise focus:ring-navy'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
