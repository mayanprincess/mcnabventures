/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Custom loader: Cloudinary URLs use Cloudinary transformations natively
    // (no double-compression). All other URLs go through Next.js at quality 85.
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mcnabventures.up.railway.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
