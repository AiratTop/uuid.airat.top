# AGENTS.md

## Purpose
Public privacy-first UUID generator tool (`uuid.airat.top`).

## Repository Role
- Category: `*.airat.top` (public static tool).
- Deployment platform: Cloudflare Workers (static assets).
- Deployment configuration: `wrangler.jsonc`.
- Main content directory: `public_html`.
- Related API: `../uuid.api.airat.top`.

## Content and Structure
- Main page: `public_html/index.html`.
- Styling: `public_html/styles.css`.
- Logic: `public_html/app.js`.

## Site Conventions
- Keep UI style consistent with AiratTop tools.
- Keep SEO metadata and social tags in `index.html`.
- Keep the Google Analytics counter and other required site-verification tags; Yandex verification is intentionally not used.
- Publish static assets from `public_html`.

## AI Working Notes
- Preserve UUID generation semantics (`v4` and `v7`).
- Keep local-only generation and no-backend dependency.
