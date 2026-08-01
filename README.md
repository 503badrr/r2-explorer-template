# Switch private R2 explorer

This Worker provides a read-only operational view of Switch assets in Cloudflare
R2. It is intentionally not a public file browser and must not be deployed until
Cloudflare Access is configured for the target Worker.

## Release topology

| Environment | Worker | Bucket |
| --- | --- | --- |
| Preview | `switch-r2-explorer-preview` | `r2-explorer-bucket-preview` |
| Production | `switch-r2-explorer` | `r2-explorer-bucket` |

The binding name stays `bucket` because that is the contract expected by
`r2-explorer`. Bindings are repeated under `env.production` because Wrangler
does not inherit resource bindings into named environments.

## Security gate

Before either environment is deployed:

1. Create a Cloudflare Access **Self-hosted** application for the Worker.
2. Attach an explicit Allow policy for the Switch operations group.
3. Keep `workers_dev` and `preview_urls` disabled.
4. Verify an anonymous request is denied and an approved identity can sign in.
5. Keep `readonly: true` and `cors: false` in `src/index.ts`.

Cloudflare recommends linking Access directly to a Worker (including previews)
as the safest way to protect every route. The configuration deliberately does
not embed a team name, account ID, token, route, or identity policy.

## Local verification

```bash
npm ci
npx tsc --noEmit
npx wrangler deploy --dry-run --env=""
npx wrangler deploy --dry-run --env production
```

These commands bundle and validate both environments without publishing them.

## Controlled deployment

Only after the Access gate and both buckets exist:

```bash
npx wrangler deploy --env=""
npx wrangler deploy --env production
```

Deployment is intentionally outside the unified release build step.
