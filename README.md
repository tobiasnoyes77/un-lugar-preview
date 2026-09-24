# site/ — private homepage preview

Plain static HTML/CSS/JS, no build step.

- `index.html`: the homepage (hero, "Lo que protege a un niño", programs, 2023 results, testimony, allies, sponsorship, "Hay un lugar para ti", header and footer). Copy sources are noted in HTML comments per section, and the full copy with source keys is in `../brand/HOMEPAGE_COPY_v3.md`.
- `css/tokens.css` holds the design tokens (Brand Guide v0.1, with the iteration-3 type scale, grid and radii). `css/styles.css` holds the mobile-first styles.
- `js/main.js`: mobile nav, submenu disclosure, click-to-play video, the swipeable program row on phones, current year.
- `js/splash3d.js`: "la mancha viva", the 3D paint splash in the hero (see below).
- `assets/`: images copied from `inventory/assets/` (provenance in `assets/README.md`).
- `_screenshots/` (git-ignored): the current renders, `iteration-1/` and `iteration-2/` (earlier renders), the before/after comparisons, and `_tools/` (wrapper pages for the automated checks, plus `linkcheck.txt`).

## Branches and the review URL

- `main` = iteration 2, published at <https://tobiasnoyes77.github.io/un-lugar-preview/> (GitHub Pages from the public repo `tobiasnoyes77/un-lugar-preview`). Unlisted and `noindex`, but not access-controlled.
- `iteration-3` = the redesign (2026-09-24). It is local only and **not pushed**. The owner decides whether it replaces the published preview.

Use the Command Line Tools git (`/usr/bin/git` is blocked by the Xcode licence on this Mac):

```
cd site
export PATH=/Library/Developer/CommandLineTools/usr/bin:$PATH
git checkout iteration-3        # or main, to see iteration 2 again
# publish iteration 3 only after the owner's go-ahead:
# git checkout main && git merge iteration-3 && git push
```

The page is live about 30 s after a push. To take the preview down: `gh repo delete tobiasnoyes77/un-lugar-preview`.

## Open the preview locally

```
cd site
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. The page carries `noindex` and a preview banner.

## The 3D splash (iteration 3)

`js/splash3d.js` draws a slowly moving 3D paint blob in brand blue behind the hero photo. It uses one WebGL fragment shader (a raymarched signed-distance blob) and no library: 13.5 KB, 5 KB gzipped.

- The SVG splash in `index.html` is the fallback. It stays visible until the first WebGL frame has rendered, and it comes back if anything fails (no WebGL, shader error, lost context).
- The 3D is skipped for `prefers-reduced-motion`, Save-Data, and software-only WebGL (`failIfMajorPerformanceCaveat`).
- It starts after `load` plus browser idle, pauses off-screen and in hidden tabs, lowers its resolution and then freezes on slow devices, and caps the pixel ratio at 2.
- The canvas is `aria-hidden`, ignores the pointer and sits behind the photograph. It never touches a photo of a child.
- The current state is exposed as `data-splash3d` on `.hero__visual` (`waiting`, `running`, `frozen`, `fallback:…`).
- Test hooks: `?no3d` forces the fallback. `?force3d` allows software WebGL so headless Chrome can render it.

## Re-run the checks (headless Chrome)

With the server running, the pages in `_screenshots/_tools/` do the checks:

- `wrap-360.html`, `wrap-768.html`, `wrap-1280.html`: a full-page render. The black bar reports scroll width against viewport width, any element wider than the viewport (content clipped on purpose, such as the program row and the hero splash, is ignored) and the 3D state. Add `?part=N` to show only the Nth 7000 px slice.
- `test-360.html`, `test-1280.html`: structure and interaction checks. They cover one h1, heading order, alt text, forbidden links, 44 px targets, gold buttons, the help-line links, the program row role, the menu, the submenu and Escape, the video, the footer shape, and (after about 6 s) the 3D state and the LCP element.
- `hero-360.html`, `hero-1280.html`: the first screen only, with `?mode=3d` (default), `?mode=no3d`, or `?mode=blocked` (splash3d.js replaced by a missing file).
- `state-360.html`, `state-1280.html`: the open menu and the open submenu.

Headless Chrome on this Mac (updated 2026-09-24):
- Pass `--use-angle=swiftshader --enable-unsafe-swiftshader` so WebGL renders.
- Pass `--virtual-time-budget=16000` or more so the wrapper timers run before the capture.
- Pass `--incognito` so edited pages are never served from Chrome's cache.
- Pass `--force-prefers-reduced-motion` to test the reduced-motion fallback.
- With SwiftShader, windows taller than about 8000 px never finish capturing, so take full pages in `?part=N` slices and stitch them with Pillow.
- Poll until the PNG is non-empty, then kill the process.

## Iteration 3 in one paragraph

The owner asked for a redo: copy that tells the story, a more professional look, and some 3D (approved 2026-09-24, `../DECISIONS.md`). The page now tells one story built on the foundation's name, *un lugar donde puedes crecer*:
1. the promise ("Un lugar para crecer con salud mental.")
2. what protects a child (a purpose, someone who listens, food on the table)
3. the six programs
4. the 2023 results and María's testimony
5. the allies
6. how sponsorship works
7. "Hay un lugar para ti" for families, volunteers and companies

The design uses a 12-column grid, a larger and tighter type scale, and hairlines instead of repeated cards. There is one brand-blue results band, the preview badges are quieter, the header is sticky, and on phones the program row can be swiped. The hero paint splash is now 3D.

Iteration 2 (owner: "dark and gloomy" → brighter; lighter gold, green-shirts hero photo, simplified footer) is kept on `main`.
