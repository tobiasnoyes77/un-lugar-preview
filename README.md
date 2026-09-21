# site/ — private homepage preview (iteration 2, 2026-09-20)

Plain static HTML/CSS/JS, no build step.

- `index.html` — the homepage (nine sections + header/footer; copy sources noted in HTML comments per section)
- `css/tokens.css` — design tokens from Brand Guide v0.1 · `css/styles.css` — mobile-first styles
- `js/main.js` — mobile nav, submenu disclosure, click-to-play video, current year
- `assets/` — images copied from `inventory/assets/` (provenance in `assets/README.md`)
- `_screenshots/` — full-page renders at 360 / 768 / 1280 px plus the open-menu states (iteration 2); `iteration-1/` keeps the
  previous renders; `comparison-iteration-1-vs-2.png` is the before/after; `_tools/` holds the wrapper pages used for the
  automated checks and `linkcheck.txt`

## Open the preview

```
cd site
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Nothing in this folder is published; the page carries `noindex` and a preview banner.

## Re-run the checks (headless Chrome)

With the server running, load `http://localhost:8000/_screenshots/_tools/wrap-360.html` (or `-768`, `-1280`): the black bar reports
scroll width vs. viewport width and any element wider than the viewport. `test-360.html` / `test-1280.html` run the interaction and
structure checks (one h1, heading order, alt text, forbidden links, 44 px targets, menu, submenu + Escape, video, footer shape).

Headless Chrome tip (2026-09-20): pass `--virtual-time-budget=8000` together with `--screenshot`, otherwise Chrome may capture the
wrapper before its timers have resized the iframe (magenta page). Poll until the PNG is non-empty, then kill the process.

## Iteration 2 in one paragraph

Owner feedback on iteration 1: "feels dark and gloomy". Iteration 2 keeps copy, links, section order and behaviour and changes the
surfaces and imagery: blue-050 bands instead of grey-100, a blue-100 band instead of navy for the story/video section, navy kept
only in the footer; body text grey-800 and headings navy-700; cards, stats and recognitions without grey borders (soft shadow or
tinted background); lighter preview bar and badges; one paint-splash accent (own SVG, blue-600) behind the hero photo; colour ally
logos; secondary buttons outlined in blue-600; a sunnier hero photo and three brighter program tiles (see `assets/README.md`). Same-day owner requests: lighter gold, the green-shirts hero photo, and a footer reduced to brand + contact + transparency (no nav mirror, no form).
