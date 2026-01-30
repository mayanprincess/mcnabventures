'use client';

import Image from 'next/image';
import { featuredExperiencesData } from '@/data';

export default function FeaturedExperiences({
  title = featuredExperiencesData.title,
  description = featuredExperiencesData.description,
}) {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[100px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16 max-w-2xl">
          <h2 className="font-literata-light text-navy text-[32px] sm:text-[40px] lg:text-[48px] leading-tight mb-4">
            {title}
          </h2>
          <p className="font-fustat-regular text-navy/70 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* DESKTOP VERSION - Bento Grid */}
        <div 
          className="hidden lg:grid rounded-3xl overflow-hidden"
          style={{
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'repeat(5, 180px)',
          }}
        >
          {/* ROW 1 */}
          {/* Beachfront getaways - cols 1-2, row 1 (370×180) */}
          <div 
            className="bg-navy flex items-center justify-center p-4"
            style={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}
          >
            <span className="font-literata-light text-white text-xl lg:text-2xl text-center">
              Beachfront getaways
            </span>
          </div>

          {/* Wave icon sand - col 3, row 1 (185×180) */}
          <div 
            className="bg-sand flex items-center justify-center"
            style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}
          >
            <Image src="/vector5.svg" alt="" width={70} height={42} />
          </div>

          {/* Island image - cols 4-6, row 1 (555×180) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '4 / 7', gridRow: '1 / 2' }}
          >
            <Image
              src="/imagenes/featured1.jpg"
              alt="Island view"
              fill
              className="object-cover"
            />
          </div>

          {/* ROW 2-3 */}
          {/* Ferry image - cols 1-2, rows 2-3 (370×360) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '1 / 3', gridRow: '2 / 4' }}
          >
            <Image
              src="/imagenes/featured2.jpg"
              alt="Ferry"
              fill
              className="object-cover"
            />
          </div>

          {/* Woman image - col 3, rows 2-3 (185×360) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '3 / 4', gridRow: '2 / 4' }}
          >
            <Image
              src="/imagenes/featured5.jpg"
              alt="Woman"
              fill
              className="object-cover"
            />
          </div>

          {/* From Land to sea - cols 4-5, row 2 (370×180) */}
          <div 
            className="bg-gold flex items-center justify-center p-4"
            style={{ gridColumn: '4 / 6', gridRow: '2 / 3' }}
          >
            <span className="font-literata-light text-white text-xl lg:text-2xl text-center">
              From Land to sea
            </span>
          </div>

          {/* Wave icon turquoise - col 6, row 2 (185×180) */}
          <div 
            className="bg-turquoise flex items-center justify-center"
            style={{ gridColumn: '6 / 7', gridRow: '2 / 3' }}
          >
            <Image src="/vector7.svg" alt="" width={70} height={42} className="[filter:brightness(0)_saturate(100%)_invert(19%)_sepia(96%)_saturate(1015%)_hue-rotate(166deg)_brightness(93%)_contrast(101%)]" />
          </div>

          {/* Connecting the world - col 4, row 3 (185×180) */}
          <div 
            className="bg-turquoise flex items-center justify-center p-4"
            style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}
          >
            <span className="font-literata-light text-navy text-xl lg:text-2xl text-center leading-tight">
              Connecting<br />the world
            </span>
          </div>

          {/* Airplane image - cols 5-6, rows 3-4 (370×360) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '5 / 7', gridRow: '3 / 5' }}
          >
            <Image
              src="/imagenes/featured4.jpg"
              alt="Airplane boarding"
              fill
              className="object-cover"
            />
          </div>

          {/* ROW 4-5 */}
          {/* Discover Roatan - col 1, rows 4-5 (185×360) */}
          <div 
            className="bg-gold flex items-end justify-start p-4"
            style={{ gridColumn: '1 / 2', gridRow: '4 / 6' }}
          >
            <span className="font-literata-light text-white text-xl lg:text-2xl leading-tight">
              Discover<br />Roatan
            </span>
          </div>

          {/* Girl with parrot - col 2, row 4 (185×180) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '2 / 3', gridRow: '4 / 5' }}
          >
            <Image
              src="/imagenes/featured6.png"
              alt="Girl with parrot"
              fill
              className="object-cover"
            />
          </div>

          {/* Sustainable Fishing - col 3, row 4 (185×180) */}
          <div 
            className="bg-sand flex items-center justify-center p-4"
            style={{ gridColumn: '3 / 4', gridRow: '4 / 5' }}
          >
            <span className="font-literata-light text-navy text-xl lg:text-2xl text-center leading-tight">
              Sustainable<br />Fishing
            </span>
          </div>

          {/* Beach shadow - col 4, row 4 (185×180) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '4 / 5', gridRow: '4 / 5' }}
          >
            <Image
              src="/imagenes/featured3.jpg"
              alt="Beach"
              fill
              className="object-cover"
            />
          </div>

          {/* ROW 5 */}
          {/* Diving image - cols 2-3, row 5 (370×180) */}
          <div 
            className="relative overflow-hidden"
            style={{ gridColumn: '2 / 4', gridRow: '5 / 6' }}
          >
            <Image
              src="/imagenes/featured3.jpg"
              alt="Diving"
              fill
              className="object-cover"
            />
          </div>

          {/* Logo icon turquoise - col 4, row 5 (185×180) */}
          <div 
            className="bg-navy flex items-center justify-center"
            style={{ gridColumn: '4 / 5', gridRow: '5 / 6' }}
          >
            <Image src="/vector6.svg" alt="" width={80} height={60} />
          </div>

          {/* Fuel for our island - cols 5-6, row 5 (370×180) */}
          <div 
            className="bg-sand flex items-center justify-center p-4"
            style={{ gridColumn: '5 / 7', gridRow: '5 / 6' }}
          >
            <span className="font-literata-light text-navy text-xl lg:text-2xl text-center">
              Fuel for our island
            </span>
          </div>
        </div>

        {/* MOBILE VERSION - Stacked blocks with rounded corners */}
        <div className="lg:hidden rounded-[32px] overflow-hidden">
          {/* Block 1: Island image - full width */}
          <div className="relative w-full h-[200px]">
            <Image
              src="/imagenes/featured1.jpg"
              alt="Tropical island"
              fill
              className="object-cover"
            />
          </div>

          {/* Block 2: Beachfront getaways - navy background */}
          <div className="bg-navy w-full h-[80px] flex items-center justify-center px-6">
            <span className="font-literata-light text-white text-[18px] text-center">
              Beachfront getaways
            </span>
          </div>

          {/* Block 3: Two-column - Icon (sand) & Text (turquoise) */}
          <div className="flex w-full h-[160px]">
            <div className="w-1/2 bg-sand flex items-center justify-center">
              <Image src="/vector5.svg" alt="" width={60} height={36} />
            </div>
            <div className="w-1/2 bg-turquoise flex items-center justify-center px-4">
              <span className="font-literata-light text-white text-[18px] text-center leading-tight">
                Connecting<br />the world
              </span>
            </div>
          </div>

          {/* Block 4: Airplane image - full width */}
          <div className="relative w-full h-[200px]">
            <Image
              src="/imagenes/featured4.jpg"
              alt="Airplane boarding"
              fill
              className="object-cover"
            />
          </div>

          {/* Block 5: Two-column - Icon (turquoise) & Image */}
          <div className="flex w-full h-[200px]">
            <div className="w-1/2 bg-turquoise flex items-center justify-center">
              <Image src="/vector7.svg" alt="" width={60} height={36} className="[filter:brightness(0)_saturate(100%)_invert(19%)_sepia(96%)_saturate(1015%)_hue-rotate(166deg)_brightness(93%)_contrast(101%)]" />
            </div>
            <div className="w-1/2 relative">
              <Image
                src="/imagenes/featured6.png"
                alt="Girl with parrot"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Block 6: Discover Roatan - gold background */}
          <div className="bg-gold w-full h-[80px] flex items-center justify-center px-6">
            <span className="font-literata-light text-white text-[18px] text-center">
              Discover Roatan
            </span>
          </div>

          {/* Block 7: Ferry image - full width */}
          <div className="relative w-full h-[200px]">
            <Image
              src="/imagenes/featured2.jpg"
              alt="Ferries"
              fill
              className="object-cover"
            />
          </div>

          {/* Block 8: From Land to sea - gold background */}
          <div className="bg-gold w-full h-[80px] flex items-center justify-center px-6">
            <span className="font-literata-light text-white text-[18px] text-center">
              From Land to sea
            </span>
          </div>

          {/* Block 9: Two-column - Image & Text (sand) */}
          <div className="flex w-full h-[200px]">
            <div className="w-1/2 relative">
              <Image
                src="/imagenes/featured3.jpg"
                alt="Diving"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-1/2 bg-sand flex items-center justify-center px-4">
              <span className="font-literata-light text-navy text-[18px] text-center leading-tight">
                Sustainable<br />Fishing
              </span>
            </div>
          </div>

          {/* Block 10: Two-column - Icon (navy) & Image */}
          <div className="flex w-full h-[200px]">
            <div className="w-1/2 bg-navy flex items-center justify-center">
              <Image src="/vector6.svg" alt="" width={70} height={50} />
            </div>
            <div className="w-1/2 relative">
              <Image
                src="/imagenes/featured5.jpg"
                alt="Woman"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Block 11: Fuel for our island - sand background */}
          <div className="bg-sand w-full h-[80px] flex items-center justify-center px-6">
            <span className="font-literata-light text-navy text-[18px] text-center leading-tight">
              Fuel for our Island
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
