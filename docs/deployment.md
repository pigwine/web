# Cloudflare deployment runbook

This repository does not contain verified Cloudflare account/project IDs. No production deployment has been performed.

1. Create preview resources (`wrangler d1 create kaimafind-preview`, `wrangler r2 bucket create kaimafind-preview-media`). Put the returned D1 ID into wrangler.jsonc. Keep production in a separate Wrangler configuration and separate buckets/database.
2. Apply `npx wrangler d1 migrations apply kaimafind-preview --remote`.
3. Configure Cloudflare Access for `/admin`, `/api/admin/*` and protect preview deployment access. Allow only the owner email. The Worker independently verifies JWTs even when an alternate route bypasses Access.
4. Set secrets NUXT_ACCESS_TEAM (team.cloudflareaccess.com), NUXT_ACCESS_AUDIENCE, NUXT_ADMIN_EMAIL. Do not configure NUXT_LOCAL_ADMIN in production. Configure the actual site URL.
5. Run typecheck, tests and `npm run build:cloudflare`; deploy using `npx wrangler deploy`. No automated deploy runs on PRs.
6. Verify anonymous draft/media denial, then upload a real project, preview it and publish each intended locale. Production has no demo gallery. Check mobile and mainland/overseas connectivity.
7. Export D1 regularly using `wrangler d1 export`; store encrypted backups in private backup storage, not Git. Configure a daily schedule with 30-day retention and a backup copy of R2 objects. JSON studio export contains metadata, not attachment bytes. Rehearse restoring both before cutover.
8. Confirm legacy route migration, domain ownership and previous-deployment rollback before moving kaimafind.com. Keep old deployment available during the transition.

Current v1 uses no dynamic shared cache. New published content is visible on the next request. Assets are immutable by ID. Media garbage collection, 30-day automatic trash cleanup and scheduled backups are operational follow-ups, not automatically enabled by this repository.
