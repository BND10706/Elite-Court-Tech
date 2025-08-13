import type { NextConfig } from 'next'

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const repoName = 'Elite-Court-Tech'

const nextConfig: NextConfig = {
  // Enable static export to work with GitHub Pages
  output: 'export',
  images: {
    // Allow remote images used in Hero and FeaturedGrid
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true, // required for static export on GitHub Pages
  },
  // When deployed on GitHub Pages, use basePath and assetPrefix
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? `/${repoName}` : '',
  },
  webpack: (config) => {
    // Silence critical dependency warning from supabase realtime-js dynamic requires
    config.module.parser = config.module.parser || {}
    // Add ignore for expression dependency (best-effort; warning only)
    config.ignoreWarnings = config.ignoreWarnings || []
    config.ignoreWarnings.push(
      /Critical dependency: the request of a dependency is an expression/
    )
    return config
  },
}

export default nextConfig
