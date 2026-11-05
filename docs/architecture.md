# Personal portfolio architecture

Nuxt 4 + Vue serves public SSR pages and Nitro endpoints. Vue Flow is loaded only on the map route; Tiptap only in the studio. Reka UI provides the preview dialog's keyboard/focus behavior.

## Storage and publishing
D1 stores a versioned content document in one singleton row, guarded by an optimistic revision compare-and-swap. This is a deliberate v1 simplification for one owner and a small personal archive, not a multi-user CMS. Entries retain editable drafts, up to 20 prior draft snapshots, and independent zh/en published snapshots. JSON export is available to the administrator. A future normalized schema migration can preserve entry IDs.
Local development uses Nitro filesystem storage under .data/content, excluded from Git. Production refuses to operate without D1. File bytes use private R2 objects in production, local base64 storage only in development. Production media is served only if referenced by a public snapshot, otherwise requires administrator auth. Responses are no-store so unpublished files cannot be revived by shared caches.

## Security
Cloudflare Access JWT signature/issuer/audience/email are verified server-side. Every mutation checks Origin. The local bypass requires development build, explicit NUXT_LOCAL_ADMIN=true, and loopback host. No production bypass. Structured rich text is allowlisted and rendered without v-html. Uploads validate MIME, magic bytes, size and filename disposition. Preview/gallery demo data is development-only.

## Versioning
The aggregate revision prevents concurrent Worker writes from overwriting unrelated changes. Per-entry version checks prevent silent overwrites across browser tabs. Conflicts leave client changes unsaved with an explicit error. Public content routes never receive draft/history fields.

## Remaining operational setup
Before production: provision separate preview and production D1/R2, apply migrations, configure Access and its secrets, set the custom domain, schedule database and object backups, rehearse restore, review legacy route coverage and upload real portfolio material. See deployment.md. Do not cut over the domain before these steps.
