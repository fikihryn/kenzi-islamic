import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase body size limit to 10 MB
    },
  },
  api: {
    bodyParser: false, // Disable body parsing for APIs using formidable
  },
};

export default nextConfig;
