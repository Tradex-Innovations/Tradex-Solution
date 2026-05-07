/**
 * Get the base path for assets
 * This handles GitHub Pages deployment where the app is served from a subdirectory
 */
export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Get the full path for a public asset
 */
export function getAssetPath(path: string) {
  const basePath = getBasePath();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
