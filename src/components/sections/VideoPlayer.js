'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function VideoPlayer({
  videoSrc = '/imagenes/featured_video.mp4',
  posterImage = '/imagenes/video.png',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
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
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
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
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-[90%] max-w-[1110px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-black">
          {/* Poster Image - Shows before video starts */}
          {!hasStarted && (
            <Image
              src={posterImage}
              alt="Video thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 1110px) 90vw, 1110px"
              priority
            />
          )}

          {/* Video Element */}
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

          {/* Play Button Overlay */}
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

          {/* Click to pause when playing */}
          {isPlaying && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 z-10"
              aria-label="Pause video"
            />
          )}

          {/* Progress Bar */}
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
        </div>
      </div>
    </section>
  );
}
