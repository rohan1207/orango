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
  async headers() {
    return [
      {
        // Long-cache scroll frames + static media for repeat visits
        source: "/frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/video.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: false,
      },
      {
        source: "/vending-machine",
        destination: "/the-machine",
        permanent: true,
      },
      {
        source: "/business-opportunity",
        destination: "/partners",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/find-orango",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
