# uuid.airat.top

[![uuid.airat.top](https://raw.githubusercontent.com/AiratTop/uuid.airat.top/main/public_html/screenshot.png)](https://uuid.airat.top/)

Static, privacy-first UUID v4/v7 generator that runs fully in the browser. Deployed as static assets on Cloudflare Workers.

- Live site: https://uuid.airat.top
- Status page: https://status.airat.top

UUID API repo: https://github.com/AiratTop/uuid.api.airat.top

## Advantages

- Fully local generation using `window.crypto`.
- UUID v4 and UUID v7 list generation from 1 to 10,000 values with one-click copy.
- Quick version switcher (v4 random or v7 time-ordered).
- Default version is v4.
- Download generated UUIDs as a `.txt` file.
- No history or analytics; only local settings are stored.
- Instant copy on click with clear feedback.
- Mobile-first layout that scales to desktop.
- Offline-friendly static files for easy hosting.

## What is inside

- `public_html/index.html` - layout and metadata.
- `public_html/styles.css` - theme, layout, and animations.
- `public_html/app.js` - UUID generator logic and UI wiring.
- `wrangler.jsonc` - Cloudflare Worker and static asset configuration.

## Deployment

Cloudflare Workers Builds deploys the contents of `public_html` as static assets. The project has no build step; deployment uses `npx wrangler deploy` with the settings in `wrangler.jsonc`.

## License

The original source code, configuration, and documentation in this repository are licensed under
the [Apache License 2.0](LICENSE), with copyright details in [NOTICE](NOTICE).

---

## Author

**AiratTop (Airat Halitov)**

- Website: [airat.top](https://airat.top)
- GitHub: [@AiratTop](https://github.com/AiratTop)
- Email: [mail@airat.top](mailto:mail@airat.top)
- Repository: [uuid.airat.top](https://github.com/AiratTop/uuid.airat.top)
