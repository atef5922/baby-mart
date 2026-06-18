import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i5.walmartimages.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "www.mustelausa.com" },
      { protocol: "https", hostname: "target.scene7.com" },
      { protocol: "https", hostname: "dw.cartersstorefront.com" },
      { protocol: "https", hostname: "slimages.macysassets.com" },
      { protocol: "https", hostname: "static.nike.com" }
    ]
  }
};

export default nextConfig;
