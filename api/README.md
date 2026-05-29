# API Routes (Serverless Functions)

This directory is optional and can be used for additional Vercel serverless functions if needed.

For most functionality, use the TanStack Start server endpoints defined in `src/routes/**` instead.

## When to use this directory:

1. **Webhooks**: External integrations that need dedicated endpoints
2. **Cron jobs**: Scheduled tasks via Vercel Cron
3. **Legacy integrations**: Endpoints that don't fit the TanStack Start routing model
4. **File uploads**: Direct upload handling if needed

## Example structure:

```
api/
├── webhooks/
│   └── github.ts
├── cron/
│   └── sync-data.ts
└── utils/
    └── auth.ts
```

See [Vercel Functions documentation](https://vercel.com/docs/functions/serverless-functions) for more details.
