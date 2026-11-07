# KaimaFind — approved editorial direction

Reference: https://www.extract.studio/project/hannah-miles
The user's accepted choice supersedes the earlier blue / multicolored life-map concepts.

## Visual contract
- Paper #F3F3F0, ink #191919, secondary #666660; white only for selected functional surfaces. Color comes from actual images.
- Self-hosted OFL Bodoni Moda for the Latin masthead and display typography. Chinese body: PingFang SC / Microsoft YaHei; system sans fallbacks. No third-party font request.
- The homepage contains only the site header, a bounded project flow canvas, and the footer. The five established main branches remain visible even when empty; published projects, progress, and work connect to their branch. The gallery is reached from the header and presents published works and selected projects through staggered image-led entries. The about page states only what the site contains and provides a contact link.
- Main branches use dark, generous rounded nodes; projects use light rounded cards, while progress and work use smaller cards with different corner treatments. Status is visible as text and shape, with solid, dashed, or dotted connecting lines: planned, ongoing, completed, and paused remain readable without color. On narrow screens the same relationships become a readable vertical list instead of a scaled-down diagram.
- Fixed-scale readable project details. The gallery uses native vertical scrolling and image-led pacing: a 4:5 portrait anchor, 3:2 landscapes, and occasional 4:5 detail crops, with alternating widths and offsets rather than uniform cards. Image corners are 18px on desktop and 14px on mobile; enlarged images retain gentle corners. Captions stay small and readable. Page-to-page navigation lives in the header rather than repeated return buttons.
- Primary text 16–18px, metadata >=12px, article line height 1.85, readable column max 720px. Small visual captions supplement, never replace, a readable detail page.
- Keyboard focus always visible. Touch actions available without hover. Controls >=44px where practical. Reduced motion disables decorative transforms.
- Motion follows interaction: an ongoing connector may drift slowly, a card border may respond to pointer position, and a selected node may grow slightly. The reader advances images manually. Reduced-motion preference disables these effects. No custom cursor, scroll hijacking, autoplay slideshows, flashing lines or particle backgrounds.

## Content and review
Development-only sample gallery is labeled in the footer and project page. Unsplash preview images demonstrate layout, not authorship. Production empty state contains no demo portfolio.
Test 375, 768 and 1440px, plus 320px overflow and 200% text scaling. Inspect long Chinese/English titles, absent cover images and empty filters. Use axe plus keyboard/manual screenshot review; neither screenshot comparison nor automated accessibility scans prove aesthetic quality.

## Implementation boundary
Single Nuxt application, lazy-loaded Vue Flow and Tiptap. Keep UI content types separate from graph positions. Avoid WebGL. Initial relational links are project/branch references; layouts can change without rewriting content.
