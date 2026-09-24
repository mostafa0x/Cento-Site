import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    qualities: [75, 85],
  },
};

export default nextConfig;
