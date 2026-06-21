import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/map",
        destination: "/dashboard/map",
        permanent: true,
      },
      {
        source: "/report/new",
        destination: "/dashboard/upload",
        permanent: true,
      },
      {
        source: "/:locale(en|hi|mr|te|kn)/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
