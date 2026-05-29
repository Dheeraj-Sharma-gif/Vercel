# Deployment Configuration

This directory contains files and configurations that make the project easily deployable to Vercel.

## Files Added

### 1. **vercel.json**
Configuration file for Vercel deployment with:
- Build command: `bun run build`
- Output directory: `.output/public`
- Node environment setup
- Proper framework detection

### 2. **.vercelignore**
Specifies files and folders that should NOT be uploaded to Vercel during deployment, reducing deployment size and time.

### 3. **.env.example**
Template file for environment variables. Copy this to `.env.local` and fill in actual values.

### 4. **api/README.md**
Documentation for optional serverless functions. Use this if you need additional Vercel Functions beyond TanStack Start routes.

### 5. **VERCEL_DEPLOYMENT.md**
Complete deployment guide with step-by-step instructions, troubleshooting, and monitoring tips.

## Quick Start for Deployment

```bash
# 1. Ensure everything is committed
git add .
git commit -m "Ready for Vercel deployment"

# 2. Deploy with Vercel CLI
vercel

# OR connect GitHub repo to Vercel dashboard and push
git push origin main
```

## Key Features of This Setup

✅ **Zero-configuration deployment** - Vercel auto-detects settings
✅ **SSR support** - Server-side rendering works out of the box
✅ **API routes** - TanStack Start routes + optional Vercel Functions
✅ **Environment variables** - Automatic injection from Vercel dashboard
✅ **Production-ready** - Optimized for performance and reliability

## Project Structure is Vercel-Ready

```
Founder's Weekly/
├── src/                         # Main application
│   ├── routes/                  # Auto-deployed TanStack routes
│   ├── server.ts               # Vercel-compatible entry
│   └── ...
├── api/ (optional)              # Additional serverless functions
├── public/                       # Static assets
├── vercel.json                  # ✨ NEW - Deployment config
├── .vercelignore                # ✨ NEW - Deployment filter
├── .env.example                 # ✨ NEW - Environment template
├── VERCEL_DEPLOYMENT.md         # ✨ NEW - Full guide
└── ... (other files)
```

## What Happens During Deployment

1. Vercel clones your repo
2. Runs `bun run build`
3. Uploads `.output/public` and `.output/server` to CDN/Functions
4. Routes all requests through your server
5. Serves static files from edge cache

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NODE_ENV=production
VITE_API_URL=https://your-domain.vercel.app
```

See `.env.example` for the template.

## Support

- Deployment guide: See `VERCEL_DEPLOYMENT.md`
- Vercel docs: https://vercel.com/docs
- TanStack Start: https://start.tanstack.com
