# Vercel Deployment Guide

This project uses **TanStack Start** with **Nitro** for server-side rendering and API routes. It's fully optimized for Vercel deployment.

## Project Structure for Vercel

```
Founder's Weekly/
├── src/                    # Main application code
│   ├── routes/            # TanStack Router pages (auto-deployed)
│   ├── components/        # React components
│   ├── server.ts          # Vercel-compatible server entry
│   ├── router.tsx         # TanStack Router config
│   └── ...
├── api/                   # Optional: Additional Vercel Functions
│   └── README.md
├── public/                # Static assets
├── vercel.json           # Vercel deployment config
├── .vercelignore         # Files to exclude from deployment
├── .env.example          # Environment variables template
├── vite.config.ts        # Already configured for TanStack Start
├── tsconfig.json         # TypeScript config
└── package.json
```

## Deployment Steps

### 1. **Prepare Your Repository**
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Vercel deployment"
```

### 2. **Connect to Vercel**

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Using GitHub Integration**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel will auto-detect the settings

### 3. **Configure Environment Variables**
In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add any required variables (copy from `.env.example` if needed)
3. Make sure to set for all environments (Preview, Production)

Example variables:
```
NODE_ENV=production
VITE_API_URL=https://your-domain.vercel.app
```

## Building & Testing Locally

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Build for production (same as Vercel)
bun run build

# Test production build locally
bun run preview
```

## What Happens During Deployment

1. **Build Phase**
   - Runs `bun run build`
   - Generates `.output/` directory containing:
     - Static assets in `.output/public`
     - Server bundle in `.output/server`
   - Output is ~5-10MB typical

2. **Deployment Phase**
   - Vercel deploys the server as Functions
   - Static assets served from CDN
   - Server routes handled by the Nitro runtime

3. **Time to First Byte (TTFB)**
   - Cold start: ~500ms (first request to new instance)
   - Warm start: ~50-100ms
   - Subsequent requests very fast due to CDN

## Environment-Specific Configuration

Create different `.env` files for different environments:

**.env.production**
```
VITE_API_URL=https://your-production-domain.vercel.app
```

**.env.preview**
```
VITE_API_URL=https://your-staging-domain.vercel.app
```

Then reference in your code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Optional: API Routes (Serverless Functions)

If you need additional serverless functions:

```typescript
// api/webhooks/github.ts
export default function handler(req: Request) {
  if (req.method === 'POST') {
    // Handle webhook
    return new Response(JSON.stringify({ success: true }));
  }
  return new Response('Not found', { status: 404 });
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm run build` works locally first |
| Routes return 404 | Ensure routes are in `src/routes/**` with proper file naming |
| Environment variables not working | Verify they're added in Vercel dashboard AND referenced with `import.meta.env` |
| Large bundle size | Run `bun run build` with `VITE_ANALYZE=true` to see bundle breakdown |
| Database connection issues | Store connection strings in Vercel environment variables, not `.env` files |

## Performance Tips

1. **Enable Auto-Scaling**
   - Vercel does this automatically

2. **Use Edge Middleware** (advanced)
   - For authentication, redirects, etc.
   - Add middleware functions if needed

3. **Optimize Images**
   - Store images in `public/` or use CDN

4. **Monitor Deployment**
   - Check Vercel dashboard → Analytics
   - Monitor function execution time and memory

## Monitoring & Logs

View deployment logs:
```bash
vercel logs
```

Monitor in dashboard:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Check "Analytics" tab for performance metrics
4. Check "Deployments" tab for build logs

## Rollback

```bash
vercel rollback  # Revert to previous deployment
```

Or use Vercel dashboard → Deployments → select and promote

## Next Steps

1. ✅ Commit all files to git
2. ✅ Connect repository to Vercel
3. ✅ Set environment variables
4. ✅ Trigger first deployment
5. ✅ Monitor deployment status
6. ✅ Test all routes and features

For more info: https://vercel.com/docs
