/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo is named something like 'username.github.io', leave basePath empty
  // Otherwise, set it to your repo name: basePath: '/your-repo-name'
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
