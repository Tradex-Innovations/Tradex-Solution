# GitHub Pages Deployment Guide

## ✅ Configuration Complete

Your Next.js application is now configured for GitHub Pages deployment with the following changes:

### 1. **Next.js Configuration** (`next.config.mjs`)
- Added `output: 'export'` for static site generation
- Added `images: { unoptimized: true }` for static image handling
- Added `basePath` support for subdirectory deployment

### 2. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- Automated build and deployment on push to `main` branch
- Handles Node.js setup, dependency installation, and build
- Automatically deploys to GitHub Pages

### 3. **Fixed Issues**
- ✅ **WebGL Errors**: Added dimension checking before initializing Spline 3D viewers
- ✅ **404 Image Errors**: Created asset path utility to handle basePath correctly
- ✅ **Static Export**: Configured for GitHub Pages compatibility

## 🚀 Deployment Steps

### Step 1: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

### Step 2: Update Repository Name (if needed)
If your repository is **NOT** named `username.github.io`:
- The workflow automatically uses your repo name as the base path
- Your site will be at: `https://username.github.io/repo-name`

If your repository **IS** named `username.github.io`:
- Update `.github/workflows/deploy.yml` line 35 to:
  ```yaml
  NEXT_PUBLIC_BASE_PATH: ""
  ```

### Step 3: Deploy
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### Step 4: Monitor Deployment
1. Go to **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow
3. Once complete (green checkmark), your site is live!

## 🌐 Your Site URL

- **If repo is `username.github.io`**: `https://username.github.io`
- **Otherwise**: `https://username.github.io/repo-name`

## 🔧 Troubleshooting

### Build Fails
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Images Not Loading
- Images are now handled with the `getAssetPath()` utility
- Ensure all images are in the `/public` folder
- Check browser console for 404 errors

### WebGL Errors
- Fixed: Spline viewers now wait for container dimensions
- If issues persist, check browser WebGL support

### 404 on Page Refresh
- GitHub Pages doesn't support client-side routing by default
- Consider adding a 404.html that redirects to index.html
- Or use hash-based routing

## 📝 Notes

- **First deployment** may take 5-10 minutes
- **Subsequent deployments** are faster (2-3 minutes)
- **Custom domain**: Can be configured in GitHub Pages settings
- **Branch**: Currently set to deploy from `main` (change in workflow if needed)

## 🎨 Local Testing

Test the production build locally:
```bash
npm run build
npx serve@latest out
```

This simulates the GitHub Pages environment.

## 📦 What Was Changed

### Files Modified:
- `next.config.mjs` - Static export configuration
- `package.json` - Added export script
- `components/EnergyOrb.tsx` - Fixed WebGL initialization
- `components/FabricMesh.tsx` - Fixed WebGL initialization
- `app/tradex-solution/page.tsx` - Fixed image paths
- `app/tradex-innovation/page.tsx` - Fixed image paths

### Files Created:
- `.github/workflows/deploy.yml` - Deployment automation
- `lib/utils.ts` - Asset path utility
- `public/.nojekyll` - Prevents Jekyll processing
- `DEPLOYMENT.md` - This guide

## 🎯 Next Steps

1. Push your changes to GitHub
2. Enable GitHub Pages in repository settings
3. Wait for the workflow to complete
4. Visit your live site!

---

**Need help?** Check the Actions tab for deployment logs or open an issue in your repository.
