# KaimaFind

A bilingual personal portfolio and life map. Editorial design inspired by the Hannah Miles / Extract Studio reference selected by the owner.

## Develop

Node 22+ recommended. `npm ci`, copy `.env.example` to `.env`, set `NUXT_LOCAL_ADMIN=true`, then `npm run dev`.

- `/zh`, `/en`: public portfolio
- `/zh/map`: life map with list fallback
- `/admin`: content studio (development accepts local admin mode; VPS preview uses HTTP Basic authentication; Cloudflare Workers deployment requires Access)

Development starts with a clearly labeled visual sample gallery if there are no records. Creating real content replaces the samples. Samples never populate the database or appear in a production build.

Draft edits auto-save. Publish each language independently. Use “加入作品导览” and its sort number to curate the homepage, then publish to apply. Projects contain dated progress and works. Upload JPEG/PNG/WebP (10 MB max) or PDF (25 MB max). File content and permissions are checked on the server.

Local state is stored in ignored `.data/content`. JSON export contains content/metadata, not attachment bytes. Keep local state private.

## Checks

`npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`.

See docs/vps-deployment.md for the live VPS preview and docs/deployment.md for the alternative Cloudflare deployment. No main-domain cutover is automated.

## Legacy content

Old tools: `/zh/archive/tools`; investment content: `/zh/archive/investment`; clock embed: `/embed/widget/clock`. Legacy route redirects are explicit. Weather integration is temporarily disabled rather than shipping the old inline third-party API credential. Old root source directories are retained for migration and excluded from the new app's route discovery.

## Assets

Bodoni Moda is self-hosted under the SIL Open Font License; see public/fonts/OFL.txt. Preview photos are downloaded from Unsplash, for the local visual study only; see docs/preview-assets.md. Replace them with the owner's real work before publication. The project skill's source revision and license are in .agents/skills/frontend-design.
