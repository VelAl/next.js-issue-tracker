import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true, // Disables automatic caching for fresh data fetching.
  },
}

export default nextConfig
