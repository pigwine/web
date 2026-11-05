# KaimaFind

## Product and design
Read docs/design-spec.md before UI work. Use the project frontend-design skill under .agents/skills/frontend-design. User direction overrides generic skill aesthetics.
The approved reference is Hannah Miles / Extract Studio: editorial typography, generous spacing, staggered photography, quiet monochrome surfaces. No gradient headlines, colored roadmap dashboard, glass cards or invented claims.
Preview content must be explicitly marked and must never automatically publish. Public records must come only from published snapshots. Keep the existing domain untouched until Cloudflare resources are verified.

## Engineering
Active application: app/, server/, shared/. Root pages/, components/, layouts/, content/, i18n/ and utils/ retain the previous site's source for migration; do not treat them as active Nuxt routes.
Use npm with the committed lockfile. Run npm run typecheck, npm test, npm run build, and targeted Playwright tests for changed behavior. Never commit .env, .data, credentials, private content or browser traces with private data.
Auth checks belong on every admin endpoint and unpublished media path. Never add a production localhost bypass. New behavior needs tests for actual user outcomes, not mirrored implementation.
