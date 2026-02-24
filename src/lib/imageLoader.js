/**
 * Custom image loader for Next.js.
 *
 * When loader:'custom' is active, Next.js disables /_next/image internally,
 * so we must handle every URL type ourselves:
 *
 * - Cloudinary (res.cloudinary.com): injects Cloudinary transformation params
 *   (f_auto, q_auto, c_limit, w_N) directly into the upload URL so images
 *   are never double-compressed. Cloudinary delivers WebP/AVIF natively.
 *
 * - Local files (/public): returned as-is. Static assets are served by
 *   Next.js without needing the image optimisation pipeline.
 *
 * - WordPress / any other remote URL: returned as-is. The browser receives
 *   the original URL and the server's own cache/CDN handles delivery.
 */
export default function imageLoader({ src, width, quality }) {
  // Cloudinary — use native transformations, no Next.js re-processing
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    const q = quality || 'auto';
    const params = `c_limit,w_${width},q_${q},f_auto`;
    return src.replace('/upload/', `/upload/${params}/`);
  }

  // Local public assets and all other remote URLs — pass through unchanged
  return src;
}
