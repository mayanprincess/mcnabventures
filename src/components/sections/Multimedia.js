'use client';

import { useState } from 'react';
import Image from 'next/image';
import { multimediaData } from '@/data';

export default function Multimedia({ 
  photos = multimediaData.photos, 
  videos = multimediaData.videos 
}) {
  const [activeTab, setActiveTab] = useState('photos');
  const currentData = activeTab === 'photos' ? photos : videos;

  return (
    <section 
      className="w-full py-16 sm:py-20 lg:py-24 bg-white"
      aria-labelledby="multimedia-heading"
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 sm:mb-12">
          <h2 
            id="multimedia-heading"
            className="font-literata-light text-navy text-[36px] sm:text-[42px] lg:text-[48px]"
          >
            Multimedia
          </h2>
          
          {/* Tabs */}
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 sm:px-8 py-2.5 rounded-full font-work-sans-medium text-sm transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-gray-500 hover:text-navy'
              }`}
              aria-pressed={activeTab === 'photos'}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 sm:px-8 py-2.5 rounded-full font-work-sans-medium text-sm transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-gray-500 hover:text-navy'
              }`}
              aria-pressed={activeTab === 'videos'}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Masonry Grid */}
        <MasonryGrid items={currentData} />
      </div>
    </section>
  );
}

/**
 * Masonry Grid Component
 * Creates a Pinterest-style masonry layout
 */
function MasonryGrid({ items }) {
  if (!items || items.length === 0) return null;

  const large = items.find(i => i.size === 'large') || items[0];
  const tall = items.filter(i => i.size === 'tall');
  const medium = items.find(i => i.size === 'medium');
  const small = items.filter(i => i.size === 'small');

  return (
    <div className="grid grid-cols-12 gap-4 h-[500px] sm:h-[550px] lg:h-[600px]">
      {/* Left Column - Large + 2 Small */}
      <div className="col-span-12 sm:col-span-5 flex flex-col gap-4">
        {/* Large Image */}
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden group">
          <Image
            src={large.src}
            alt={large.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
          {/* Expand Button */}
          <button 
            className="absolute bottom-4 right-4 w-10 h-10 bg-navy/80 hover:bg-navy rounded-full flex items-center justify-center text-white transition-colors duration-300"
            aria-label="View full size"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {large.isVideo && <VideoOverlay />}
        </div>
        
        {/* 2 Small Images */}
        <div className="flex gap-4 h-[120px] sm:h-[140px]">
          {small.slice(0, 2).map((item, idx) => (
            <div key={item.id || idx} className="relative flex-1 rounded-2xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="20vw"
              />
              {item.isVideo && <VideoOverlay />}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Column - Small + Tall */}
      <div className="col-span-6 sm:col-span-3 flex flex-col gap-4">
        {/* Small Image */}
        <div className="relative h-[140px] sm:h-[160px] rounded-2xl overflow-hidden">
          <Image
            src={small[2]?.src || '/placeholder.jpg'}
            alt={small[2]?.alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="25vw"
          />
          {small[2]?.isVideo && <VideoOverlay />}
        </div>
        
        {/* Tall Image */}
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
          <Image
            src={medium?.src || tall[0]?.src || '/placeholder.jpg'}
            alt={medium?.alt || tall[0]?.alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="25vw"
          />
          {(medium?.isVideo || tall[0]?.isVideo) && <VideoOverlay />}
        </div>
      </div>

      {/* Right Column - Tall + Small */}
      <div className="col-span-6 sm:col-span-4 flex flex-col gap-4">
        {/* Tall Image */}
        <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
          <Image
            src={tall[0]?.src || small[3]?.src || '/placeholder.jpg'}
            alt={tall[0]?.alt || small[3]?.alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="30vw"
          />
          {(tall[0]?.isVideo || small[3]?.isVideo) && <VideoOverlay />}
        </div>
        
        {/* Small Image */}
        <div className="relative h-[140px] sm:h-[160px] rounded-2xl overflow-hidden">
          <Image
            src={small[4]?.src || '/placeholder.jpg'}
            alt={small[4]?.alt || 'Gallery image'}
            fill
            className="object-cover"
            sizes="30vw"
          />
          {small[4]?.isVideo && <VideoOverlay />}
        </div>
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
