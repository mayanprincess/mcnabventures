/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mcnabventuresapi.up.railway.app',
        port: '',
        pathname: '/api/files/**',
      },
    ],
  },
};

export default nextConfig;
