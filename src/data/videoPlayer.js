/**
 * VideoPlayer - Test Data
 * 
 * Supports two video sources:
 * - videoUrl: External URL (Vimeo, YouTube) - preferred for bandwidth savings
 * - videoSrc: Local/hosted MP4 file - fallback
 * 
 * Priority: videoUrl > videoSrc (if videoUrl is set, it takes precedence)
 */
export const videoPlayerData = {
  // External video URL (Vimeo/YouTube) - set to null to use local video
  videoUrl: null, // e.g., 'https://vimeo.com/123456789' or 'https://www.youtube.com/watch?v=VIDEO_ID'
  // Local/hosted MP4 video
  videoSrc: '/imagenes/featured_video.mp4',
  // Poster image shown before video plays
  posterImage: '/imagenes/video.png',
};
