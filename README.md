# site/ — private preview of the whole site

Plain static HTML/CSS/JS, no build step. The homepage (iteration 3, without the 3D splash) and 30 interior pages built by five page families, merged on 2026-09-25 (branch `pages/integration`).

- `index.html`: the homepage (hero, "Lo que protege a un niño", programs, 2023 results, testimony, allies, sponsorship, "Hay un lugar para ti", header and footer). Copy sources are noted in HTML comments per section, and the full copy with source keys is in `../brand/HOMEPAGE_COPY_v3.md`. Its menu and content links point to the local pages; only Tienda, the forms, the PDFs and social links stay external.
- `<slug>/index.html`: the interior pages (list below). Their copy with source keys is in `../copy/` (start with `../copy/README.md`).
- `css/tokens.css` holds the design tokens (Brand Guide v0.1, with the iteration-3 type scale, grid and radii, plus `--fs-page-title`). `css/styles.css` holds the homepage styles, `css/pages.css` the shared interior components, and `css/family-<id>.css` the few family-only ones.
- `js/main.js`: mobile nav, submenu disclosure, click-to-play video, the swipeable program row on phones, current year.
- `assets/`: images copied from `inventory/assets/` (provenance in `assets/README.md`); interior-page images are in `assets/pages/<family>/` or, when shared, `assets/photos/`.
- `_templates/page.html`: the starting point for any new interior page. It is not a publishable page.
- `_screenshots/` (git-ignored): renders and the overview sheets.

## Pages by family

| Family | Pages (URL · menu or page name) |
|---|---|
| Home | `/` — iteration 3 |
| 01 Programas (8) | `/programas-08/` Nuestros programas · `/alimentarte/` · `/formate/` Formarte · `/capacitarte/` Educarte · `/bienestar-infantil/` · `/cuidarte/` Dignificarte · `/abrigarte/` Tu mente tu aliada · `/inscribete-programas/` Inscríbete |
| 02 Ayuda (6) | `/ways-to-help/` Ayuda · `/apadrinar/` · `/dona/` Donaciones · `/voluntariado/` · `/patrocinar-causas/` · `/contacto/` |
| 03 Impacto y transparencia (6) | `/nuestro-trabajo/` Conoce nuestro trabajo · `/efecto/` · `/objetivos/` ODS · `/agenda-de-desarrollo-nacional/` · `/boletines/` · `/certificado-de-trayectoria/` |
| 04 Quiénes somos (6) | `/quienes-somos/` Conoce la fundación · `/nuestro-objetivo/` · `/mision-y-vision/` · `/nuestro-equipo/` · `/organigrama/` · `/reconocimientos/` |
| 05 Legal y estado (4) | `/terminos-y-condiciones/` · `/tratamiento-de-datos/` (footer) · `/gracias/` · `/falla/` (after a form or payment; not in the menu) |

Slugs are the live site's (`inventory/SITE_ARCHITECTURE.md`; the renames there are still proposals). Every interior page is one folder deep, so its local paths start with `../`. Rules, the URL map and page anatomy: `../prompts/04-pages/00-shared-rules.md`.

## Open the preview locally

```
cd "/Users/tobiasnoyes/Desktop/Fundacion Lugar"
python3 -m http.server 8010 --directory worktrees/integration
```

Then open <http://localhost:8010/>. Every page carries `noindex` and a preview banner, and "Ver pendientes" jumps to the page's list of items the foundation still has to confirm.

Main actions that would take a payment or a form (Quiero apadrinar, Donar en línea, Quiero ser voluntario, Patrocinar un programa) still open the **live** WordPress pages, which have returned HTTP 500 since 2026-09-24. That is expected in the preview.

## Re-run the checks

The tools are in `../tools/page-checks/` and need the **project root** served:

```
python3 -m http.server 8106 --directory "/Users/tobiasnoyes/Desktop/Fundacion Lugar"
python3 tools/page-checks/run.py check --port 8106 --widths 360,1280 /worktrees/integration/ /worktrees/integration/dona/ …
python3 tools/page-checks/run.py shot --port 8106 --widths 360,768,1280 --out-dir worktrees/integration/_screenshots /worktrees/integration/dona/
```

`check` reports structure, SEO basics, images and consent badges, 44 px targets, gold buttons, contrast, overflow, the menus and every link. Interior pages must end with `RESULT: PASS` and print the template's `header-hash` / `footer-hash`. The homepage fails only on the breadcrumb (it has none) and the paint splash (its signature), and its hashes differ because its paths start at the root. `shot --state submenu` opens "Nuestro trabajo"; add `&sub=0` in `wrap.html` for "Quiénes somos".

Headless Chrome on this Mac: `run.py` already passes `--incognito`, `--virtual-time-budget` and 7000 px slices, and polls and kills Chrome.

## Branches and the review URL

- `main` = iteration 2, published at <https://tobiasnoyes77.github.io/un-lugar-preview/> (GitHub Pages from the public repo `tobiasnoyes77/un-lugar-preview`). Unlisted and `noindex`, but not access-controlled.
- `pages/integration` (worktree `../worktrees/integration/`) = the whole site: `pages-base` plus the five family branches `pages/01-programas` … `pages/05-legal`, merged on 2026-09-25. **Local only, not pushed.**
- `pages-base` = iteration 3 without the 3D splash, plus the interior-page base. `iteration-3` (`f19520c`) is the historical record with the 3D splash. `iteration-2-3d` (checked out in `site/`) was rejected; don't use it for review.

Use the Command Line Tools git (`/usr/bin/git` is blocked by the Xcode licence on this Mac):

```
export PATH=/Library/Developer/CommandLineTools/usr/bin:$PATH
# publish only after the owner's go-ahead (the repository is public, and no child photo has recorded consent):
# git -C site checkout main && git -C site merge pages/integration && git -C site push
```

The page is live about 30 s after a push. To take the preview down: `gh repo delete tobiasnoyes77/un-lugar-preview`.

Keep the family worktrees until the owner approves. Cleanup: `git -C site worktree remove ../worktrees/<NN-id>` and `git -C site branch -d pages/<NN-id>`.

## Paint splash

The hero's paint splash is the SVG in `index.html` (Brand Guide §7, one per page, homepage only). The moving 3D version ("la mancha viva") was removed on 2026-09-25 at the owner's request ("No, I don't like the 3d backdrop!"). It remains in the history on branch `iteration-3`.

## Iteration 3 in one paragraph

The owner asked for a redo: copy that tells the story, a more professional look, and some 3D (approved 2026-09-24, `../DECISIONS.md`). The page tells one story built on the foundation's name, *un lugar donde puedes crecer*:
1. the promise ("Un lugar para crecer con salud mental.")
2. what protects a child (a purpose, someone who listens, food on the table)
3. the six programs
4. the 2023 results and María's testimony
5. the allies
6. how sponsorship works
7. "Hay un lugar para ti" for families, volunteers and companies

The design uses a 12-column grid, a larger and tighter type scale, and hairlines instead of repeated cards. There is one brand-blue results band, the preview badges are quieter, the header is sticky, and on phones the program row can be swiped. Iteration 2 (owner: "dark and gloomy" → brighter; lighter gold, green-shirts hero photo, simplified footer) is kept on `main`.
