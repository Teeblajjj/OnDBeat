import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
