'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { videoPlayerData } from '@/data';
import { useScrollAnimation, animations } from '@/hooks/useScrollAnimation';

// Note: useScrollAnimation is imported and used below

/**
 * Parse external video URL to get provider and embed ID
 * Supports: Vimeo, YouTube
 */
function parseVideoUrl(url) {
  if (!url) return null;

  // Vimeo patterns:
  // https://vimeo.com/123456789
  // https://player.vimeo.com/video/123456789
  // https://vimeo.com/channels/staffpicks/123456789
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
    /vimeo\.com\/channels\/[\w-]+\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return { provider: 'vimeo', id: match[1] };
    }
  }

  // YouTube patterns:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  const youtubePatterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { provider: 'youtube', id: match[1] };
    }
  }

  return null;
}

/**
 * Get embed URL for external video providers
 */
function getEmbedUrl(videoInfo, autoplay = false) {
  if (!videoInfo) return null;

  const { provider, id } = videoInfo;

  if (provider === 'vimeo') {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      loop: '0',
      byline: '0',
      portrait: '0',
      title: '0',
      transparent: '0',
      background: '0',
    });
    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
  }

  if (provider === 'youtube') {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }

  return null;
}

export default function VideoPlayer({
  videoSrc = videoPlayerData.videoSrc,
  videoUrl = videoPlayerData.videoUrl,
  posterImage = videoPlayerData.posterImage,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  
  // Scroll animation
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Determine if we're using an external video (Vimeo/YouTube)
  const externalVideo = useMemo(() => parseVideoUrl(videoUrl), [videoUrl]);
  const isExternal = Boolean(externalVideo);

  // For native video controls
  const handlePlayPause = () => {
    if (isExternal) {
      // For external videos, just show the iframe
      setHasStarted(true);
      setIsPlaying(true);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setHasStarted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isExternal) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && !isExternal) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section ref={scrollRef} className={`w-full py-16 sm:py-20 lg:py-[100px] bg-white ${animations.fadeUp(isVisible)}`}>
      <div className="w-[90%] max-w-[1110px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-black">
          {/* Poster Image - Shows before video starts */}
          {!hasStarted && posterImage && (
            <Image
              src={posterImage}
              alt="Video thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 1110px) 90vw, 1110px"
              priority
            />
          )}

          {/* External Video (Vimeo/YouTube) via iframe */}
          {isExternal && hasStarted && (
            <iframe
              ref={iframeRef}
              src={getEmbedUrl(externalVideo, true)}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Video player"
            />
          )}

          {/* Native Video Element (MP4) */}
          {!isExternal && (
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${!hasStarted ? 'opacity-0' : 'opacity-100'}`}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Play Button Overlay - Shows when not playing */}
          {!isPlaying && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center z-10 group"
              aria-label="Play video"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-sand flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gold ml-1" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* Click to pause when playing (only for native video) */}
          {isPlaying && !isExternal && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 z-10"
              aria-label="Pause video"
            />
          )}

          {/* Progress Bar (only for native video) */}
          {!isExternal && (
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20">
              <div 
                className="h-1 bg-white/40 rounded-full cursor-pointer overflow-hidden"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
