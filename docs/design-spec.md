# KaimaFind — approved editorial direction

Reference: https://www.extract.studio/project/hannah-miles
The user's accepted choice supersedes the earlier blue / multicolored life-map concepts.

## Visual contract
- Paper #F3F3F0, ink #191919, secondary #666660; white only for selected functional surfaces. Color comes from actual images.
- Self-hosted OFL Bodoni Moda for the Latin masthead and display typography. Chinese body: PingFang SC / Microsoft YaHei; system sans fallbacks. No third-party font request.
- The homepage is a vertical project canvas: each project anchors its progress and work in chronological order. The editorial work gallery is a secondary route with an oversized KAIMAFIND masthead and staggered photographs.
- Fixed-scale readable project details. Desktop gallery does not trap scrolling. Mobile uses native vertical scrolling; maps are optional.
- Primary text 16–18px, metadata >=12px, article line height 1.85, readable column max 720px. Small visual captions supplement, never replace, a readable detail page.
- Keyboard focus always visible. Touch actions available without hover. Controls >=44px where practical. Reduced motion disables decorative transforms.
- Only meaningful transitions: reveal, focus, expand. No custom cursor, scroll hijacking, autoplay slideshows, floating elements, flashing lines or particle backgrounds.

## Content and review
Development-only sample gallery is labeled in the footer and project page. Unsplash preview images demonstrate layout, not authorship. Production empty state contains no demo portfolio.
Test 375, 768 and 1440px, plus 320px overflow and 200% text scaling. Inspect long Chinese/English titles, absent cover images and empty filters. Use axe plus keyboard/manual screenshot review; neither screenshot comparison nor automated accessibility scans prove aesthetic quality.

## Implementation boundary
Single Nuxt application, lazy-loaded Vue Flow and Tiptap. Keep UI content types separate from graph positions. Avoid WebGL. Initial relational links are project/branch references; layouts can change without rewriting content.
