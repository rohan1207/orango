/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@google/model-viewer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
