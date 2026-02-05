'use client';

import { useState } from 'react';
import Image from 'next/image';
import { multimediaData } from '@/data';
import { useScrollAnimation, animations } from '@/hooks/useScrollAnimation';

const isExternalUrl = (src) =>
  typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));

const hasValidSrc = (item) => item?.src && String(item.src).trim() !== '';

export default function Multimedia({ 
  photos = multimediaData.photos, 
  videos = multimediaData.videos 
}) {
  const [activeTab, setActiveTab] = useState('photos');
  const currentData = activeTab === 'photos' ? photos : videos;
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section 
      ref={scrollRef}
      className={`w-full py-16 sm:py-20 lg:py-[100px] bg-white ${animations.fadeUp(isVisible)}`}
      aria-labelledby="multimedia-heading"
    >
      <div className="w-full lg:w-[90%] max-w-[1400px] mx-auto px-6 lg:px-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 lg:mb-12">
          <h2 
            id="multimedia-heading"
            className="font-literata-light text-navy text-[32px] lg:text-[48px]"
          >
            Multimedia
          </h2>
          
          {/* Tabs */}
          <div className="flex items-center w-full lg:w-auto bg-[#F6F4EF] lg:bg-gray-100 rounded-full p-1.5 lg:p-1">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 lg:flex-none lg:px-8 py-2.5 rounded-full font-work-sans-medium text-sm transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-navy hover:text-navy/80 lg:text-gray-500 lg:hover:text-navy'
              }`}
              aria-pressed={activeTab === 'photos'}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 lg:flex-none lg:px-8 py-2.5 rounded-full font-work-sans-medium text-sm transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-navy hover:text-navy/80 lg:text-gray-500 lg:hover:text-navy'
              }`}
              aria-pressed={activeTab === 'videos'}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Mobile Layout - Single Column Masonry (same logic as desktop) */}
        <div className="lg:hidden">
          <MobileMasonryGrid items={currentData} />
        </div>

        {/* Desktop Layout - Masonry Grid */}
        <div className="hidden lg:block">
          <MasonryGrid items={currentData} />
        </div>
      </div>
    </section>
  );
}

/**
 * Mobile Masonry Grid Component
 * Two-column masonry layout like the mockup
 */
function MobileMasonryGrid({ items }) {
  const validItems = (items || []).filter(hasValidSrc);
  if (validItems.length === 0) return null;

  const large = validItems.find(i => i.size === 'large') || validItems[0];
  const tall = validItems.filter(i => i.size === 'tall');
  const medium = validItems.find(i => i.size === 'medium');
  const small = validItems.filter(i => i.size === 'small');

  return (
    <div className="flex flex-col gap-4">
      {/* Large Image - Full Width */}
      {large?.src && (
      <div className="relative h-[280px] rounded-2xl overflow-hidden">
        <Image
          src={large.src}
          alt={large.alt}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized={isExternalUrl(large.src)}
          quality={isExternalUrl(large.src) ? undefined : 95}
        />
        {large.isVideo && <VideoOverlay />}
      </div>
      )}
      
      {/* Two Column Masonry Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {small[0]?.src && (
          <div className="relative h-[140px] rounded-2xl overflow-hidden">
            <Image
              src={small[0].src}
              alt={small[0].alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 600px"
              unoptimized={isExternalUrl(small[0].src)}
              quality={isExternalUrl(small[0].src) ? undefined : 95}
            />
            {small[0].isVideo && <VideoOverlay />}
          </div>
          )}
          {medium?.src && (
          <div className="relative h-[220px] rounded-2xl overflow-hidden">
            <Image
              src={medium.src}
              alt={medium.alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 600px"
              unoptimized={isExternalUrl(medium.src)}
              quality={isExternalUrl(medium.src) ? undefined : 95}
            />
            {medium.isVideo && <VideoOverlay />}
          </div>
          )}
          {small[2]?.src && (
          <div className="relative h-[140px] rounded-2xl overflow-hidden">
            <Image
              src={small[2].src}
              alt={small[2].alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 600px"
              unoptimized={isExternalUrl(small[2].src)}
              quality={isExternalUrl(small[2].src) ? undefined : 95}
            />
            {small[2].isVideo && <VideoOverlay />}
          </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {tall[0]?.src && (
          <div className="relative h-[220px] rounded-2xl overflow-hidden">
            <Image
              src={tall[0].src}
              alt={tall[0].alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 600px"
              unoptimized={isExternalUrl(tall[0].src)}
              quality={isExternalUrl(tall[0].src) ? undefined : 95}
            />
            {tall[0].isVideo && <VideoOverlay />}
          </div>
          )}
          {small[1]?.src && (
          <div className="relative h-[140px] rounded-2xl overflow-hidden">
            <Image
              src={small[1].src}
              alt={small[1].alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 600px"
              unoptimized={isExternalUrl(small[1].src)}
              quality={isExternalUrl(small[1].src) ? undefined : 95}
            />
            {small[1].isVideo && <VideoOverlay />}
          </div>
          )}
          {small[3]?.src && (
          <div className="relative h-[140px] rounded-2xl overflow-hidden">
            <Image
              src={small[3].src}
              alt={small[3].alt || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 600px"
              unoptimized={isExternalUrl(small[3].src)}
              quality={isExternalUrl(small[3].src) ? undefined : 95}
            />
            {small[3].isVideo && <VideoOverlay />}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Masonry Grid Component
 * Creates a Pinterest-style masonry layout
 */
function MasonryGrid({ items }) {
  const validItems = (items || []).filter(hasValidSrc);
  if (validItems.length === 0) return null;

  const large = validItems.find(i => i.size === 'large') || validItems[0];
  const tall = validItems.filter(i => i.size === 'tall');
  const medium = validItems.find(i => i.size === 'medium');
  const small = validItems.filter(i => i.size === 'small');

  return (
    <div className="grid grid-cols-12 gap-4 h-[500px] sm:h-[550px] lg:h-[600px]">
      {/* Left Column - Large + 2 Small */}
      <div className="col-span-12 sm:col-span-5 flex flex-col gap-4">
        {large?.src && (
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden group">
          <Image
            src={large.src}
            alt={large.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 800px"
            unoptimized={isExternalUrl(large.src)}
            quality={isExternalUrl(large.src) ? undefined : 95}
          />
          {large.isVideo && <VideoOverlay />}
        </div>
        )}
        <div className="flex gap-4 h-[120px] sm:h-[140px]">
          {small.slice(0, 2).filter((item) => item.src).map((item, idx) => (
            <div key={item.id || idx} className="relative flex-1 rounded-2xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 500px"
                unoptimized={isExternalUrl(item.src)}
                quality={isExternalUrl(item.src) ? undefined : 95}
              />
              {item.isVideo && <VideoOverlay />}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Column - Small + Tall */}
      <div className="col-span-6 sm:col-span-3 flex flex-col gap-4">
        {small[2]?.src && (
        <div className="relative h-[140px] sm:h-[160px] rounded-2xl overflow-hidden">
          <Image
            src={small[2].src}
            alt={small[2].alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 500px"
            unoptimized={isExternalUrl(small[2].src)}
            quality={isExternalUrl(small[2].src) ? undefined : 95}
          />
          {small[2].isVideo && <VideoOverlay />}
        </div>
        )}
        {(medium?.src || tall[0]?.src) && (
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
          <Image
            src={medium?.src || tall[0].src}
            alt={medium?.alt || tall[0]?.alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 500px"
            unoptimized={isExternalUrl(medium?.src || tall[0]?.src)}
            quality={isExternalUrl(medium?.src || tall[0]?.src) ? undefined : 95}
          />
          {(medium?.isVideo || tall[0]?.isVideo) && <VideoOverlay />}
        </div>
        )}
      </div>

      {/* Right Column - Tall + Small */}
      <div className="col-span-6 sm:col-span-4 flex flex-col gap-4">
        {(tall[0]?.src || small[3]?.src) && (
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
          <Image
            src={tall[0]?.src || small[3].src}
            alt={tall[0]?.alt || small[3]?.alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 600px"
            unoptimized={isExternalUrl(tall[0]?.src || small[3]?.src)}
            quality={isExternalUrl(tall[0]?.src || small[3]?.src) ? undefined : 95}
          />
          {(tall[0]?.isVideo || small[3]?.isVideo) && <VideoOverlay />}
        </div>
        )}
        {small[4]?.src && (
        <div className="relative h-[140px] sm:h-[160px] rounded-2xl overflow-hidden">
          <Image
            src={small[4].src}
            alt={small[4].alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 600px"
            unoptimized={isExternalUrl(small[4].src)}
            quality={isExternalUrl(small[4].src) ? undefined : 95}
          />
          {small[4].isVideo && <VideoOverlay />}
        </div>
        )}
      </div>
    </div>
  );
}

/**
 * Video Overlay - Shows play button for video items
 */
function VideoOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-300">
      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="text-navy ml-1"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}
