'use client';

import Image from 'next/image';
import Link from 'next/link';

// Social media icons configuration
const socialLinks = [
  { name: 'Instagram', icon: '/iconos/social/instagram.svg', href: '#' },
  { name: 'X', icon: '/iconos/social/x.svg', href: '#' },
  { name: 'WhatsApp', icon: '/iconos/social/whatsapp.svg', href: '#' },
  { name: 'Facebook', icon: '/iconos/social/facebook.svg', href: '#' },
  { name: 'YouTube', icon: '/iconos/social/youtube.svg', href: '#' },
  { name: 'LinkedIn', icon: '/iconos/social/linkedin.svg', href: '#' },
];

export default function ContactCard({
  title = 'Contact Card',
  contactType = 'Press Contact',
  name = 'María Fernanda López',
  position = 'Director of Corporate Communications',
  email = 'press@cmayanpricess.hn',
  phone = '+504 2200-5500 ext. 340',
  website = 'www.mayanprincess.hn',
  address = '1234 Aviation Way, Tegucigalpa, Honduras',
  image = '/placeholder-contact.jpg',
  socials = socialLinks,
}) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content Side */}
            <div className="p-8 sm:p-10 lg:p-12 bg-[#F6F4EF]">
              {/* Title */}
              <h2 className="font-literata-light text-navy text-[32px] sm:text-[36px] lg:text-[40px] mb-8">
                {title}
              </h2>

              {/* Divider */}
              <div className="w-full h-px bg-navy/20 mb-6" />

              {/* Contact Type */}
              <p className="font-work-sans-extrabold text-navy text-[20px] mb-4">
                {contactType}
              </p>

              {/* Name & Position */}
              <div className="mb-6">
                <p className="font-work-sans-medium text-navy text-lg">
                  {name}
                </p>
                <p className="font-work-sans text-navy/70 text-sm">
                  {position}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                {/* Email */}
                <div>
                  <p className="font-work-sans-medium text-navy text-[14px] mb-1">
                    Email
                  </p>
                  <Link 
                    href={`mailto:${email}`}
                    className="font-work-sans-medium text-navy text-[20px] hover:underline"
                  >
                    {email}
                  </Link>
                </div>

                {/* Phone */}
                <div>
                  <p className="font-work-sans-medium text-navy text-[14px] mb-1">
                    Phone
                  </p>
                  <Link 
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-work-sans-medium text-navy text-[20px] hover:underline"
                  >
                    {phone}
                  </Link>
                </div>

                {/* Website */}
                <div>
                  <p className="font-work-sans-medium text-navy text-[14px] mb-1">
                    Website
                  </p>
                  <Link 
                    href={`https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-work-sans-medium text-navy text-[20px] hover:underline"
                  >
                    {website}
                  </Link>
                </div>

                {/* Address */}
                <div>
                  <p className="font-work-sans-medium text-navy text-[14px] mb-1">
                    Address
                  </p>
                  <p className="font-work-sans-medium text-navy text-[20px]">
                    {address}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-navy/20 mb-6" />

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-navy hover:text-turquoise transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative min-h-[300px] lg:min-h-full">
              <Image
                src={image}
                alt="Contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
