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
}

export default nextConfig
