import type { NextConfig } from "next";

function getImageHosts(): string[] {
  const hosts = new Set<string>();

  // Parse background image URL
  if (process.env.IMAGE_BACKGROUND) {
    try {
      const url = new URL(process.env.IMAGE_BACKGROUND);
      hosts.add(url.hostname);
    } catch {
      console.warn('Invalid IMAGE_BACKGROUND URL:', process.env.IMAGE_BACKGROUND);
    }
  }

  // Parse wordmark image URL
  if (process.env.IMAGE_WORDMARK) {
    try {
      const url = new URL(process.env.IMAGE_WORDMARK);
      hosts.add(url.hostname);
    } catch {
      console.warn('Invalid IMAGE_WORDMARK URL:', process.env.IMAGE_WORDMARK);
    }
  }

  return Array.from(hosts);
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getImageHosts().map(hostname => ({
      protocol: 'https' as const,
      hostname,
    })),
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
