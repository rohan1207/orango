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
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/home1",
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
