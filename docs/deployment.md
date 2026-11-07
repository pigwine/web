# Cloudflare deployment runbook

Cloudflare account `708bffdc65774f72633a54eaf1b3ca95` owns the existing `web2` Pages project and `kaimafind.com`. The isolated `kaimafind-preview` D1 database was provisioned and migration `0001_content.sql` applied on 2026-11-06. R2 and Zero Trust Access are not enabled on this account, so the new Worker has not been deployed. No production deployment has been performed.

1. Enable R2 in the Cloudflare dashboard and create `kaimafind-preview-media`. The preview D1 database already exists and is bound in `wrangler.jsonc`. Keep production in a separate Wrangler configuration and separate buckets/database.
2. Migration `0001_content.sql` is already applied to the preview D1 database. Apply future migrations with `npx wrangler d1 migrations apply kaimafind-preview --remote` after Wrangler authentication is refreshed.
3. Configure Cloudflare Access for `/admin`, `/api/admin/*` and protect preview deployment access. Allow only the owner email. The Worker independently verifies JWTs even when an alternate route bypasses Access.
4. Set secrets NUXT_ACCESS_TEAM (team.cloudflareaccess.com), NUXT_ACCESS_AUDIENCE, NUXT_ADMIN_EMAIL. Do not configure NUXT_LOCAL_ADMIN in production. Configure the actual site URL.
5. Run typecheck, tests and `npm run build:cloudflare`; deploy using `npx wrangler deploy`. No automated deploy runs on PRs.
6. Verify anonymous draft/media denial, then upload a real project, preview it and publish each intended locale. Production has no demo gallery. Check mobile and mainland/overseas connectivity.
7. Export D1 regularly using `wrangler d1 export`; store encrypted backups in private backup storage, not Git. Configure a daily schedule with 30-day retention and a backup copy of R2 objects. JSON studio export contains metadata, not attachment bytes. Rehearse restoring both before cutover.
8. Confirm legacy route migration, domain ownership and previous-deployment rollback before moving kaimafind.com. Keep old deployment available during the transition.

Current v1 uses no dynamic shared cache. New published content is visible on the next request. Assets are immutable by ID. Media garbage collection, 30-day automatic trash cleanup and scheduled backups are operational follow-ups, not automatically enabled by this repository.
