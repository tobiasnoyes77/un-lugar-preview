# site/assets — provenance

Every file is a copy of an item in `inventory/assets/` (see `inventory/assets/ASSET_MANIFEST.csv` for the
source URL, the pages it appeared on and the consent/children columns). Filenames are kept so the
manifest row can be found by name; `-w800` / `-w600` suffixes are smaller variants for `srcset`.
Processing: resized with Pillow (LANCZOS), EXIF orientation applied, JPEG quality 78–82, PNG optimized.
No image was cropped, retouched, recolored or filtered.

| File in `site/assets/` | Source in `inventory/assets/` | Used for | Shows children | Consent recorded |
|---|---|---|---|---|
| `logo/Logo-fundacion.png` (600 px) | `logo/Logo-fundacion.png` | header, footer (white panel on navy) | no | n/a |
| `photos/WhatsApp-Image-2024-08-02-at-1.06.40-PM.jpeg` (1280 px, source size) + `-w800` | same (current homepage) | hero photo — owner's choice 2026-09-20 (first iteration-2 build used `IMG_1929`; iteration 1 `IMG_3350`). Source is only 1280 × 960; a higher-resolution original would help on retina desktops | yes — badge | **no** |
| `photos/IMG_3829-scaled.jpeg` (1000 px) + `-w600` | `photos/IMG_3829-scaled.jpeg` (home, `/nuestro-objetivo/`) | "Cómo trabajamos" side photo | hands only, no face | n/a (review) |
| `photos/IMG_3815.jpeg` (800 px) | `photos/IMG_3815.jpeg` (page `/abrigarte/`) | program card "Tu mente tu aliada" | yes — badge | **no** |
| `photos/maria-.png` (487 × 272, as-is) | `photos/maria-.png` (home lightbox) | poster of YouTube `wYzOMGHGs_k` | adults | **no** |
| `program-graphics/1-3.jpg` | `program-graphics/1-3.png` (`/programas-08/`, tile 1) | program card Alimentarte | yes — badge | **no** |
| `program-graphics/7.jpg` | `program-graphics/7.png` (`/formate/`, `/programas-08/`) | program card Formarte (iteration 2; replaced tile `9`, indoor) | yes — badge | **no** |
| `photos/WhatsApp-Image-2024-08-02-at-1.01.47-PM.jpeg` (800 px) | same (current homepage) | program card Educarte (iteration 2; replaced tile `10`, dim indoor) — illustrative: children at an outdoor educational activity, not the online platform itself | yes — badge | **no** |
| `program-graphics/2-3.jpg` | `program-graphics/2-3.png` (`/bienestar-infantil/`) | program card Bienestar infantil | yes — badge | **no** |
| `program-graphics/12.jpg` | `program-graphics/12.png` (`/ayudarte/`, `/nuestros-programas/`, `/programas-08/`) | program card Dignificarte (families receiving food/hygiene kits; replaced tile `8` in iteration 2, then took over when its daylight photo moved to the hero) | yes — badge | **no** |
| `partner-logos/3-2.png` | same | Banco de Alimentos Bogotá | — | ally status pending |
| `partner-logos/maloka-1.jpg` | same | Maloka | — | pending |
| `partner-logos/parque-mundo-aventura-1.jpg` | same | Parque Mundo Aventura | — | pending |
| `partner-logos/logo_teleperformance-1.png` | same | Teleperformance | — | pending |
| `partner-logos/distripen-logo-1706910565-1.png` | same | Distripen | — | pending |
| `partner-logos/WhatsApp-Image-2024-10-04-at-4.41.37-AM-1.jpeg` | same | OFFCORSS | — | pending |
| `partner-logos/6-1.png` | same | CUN | — | pending |
| `partner-logos/2-2.png` | same | 4-72 | — | pending |
| `partner-logos/11-1.png` | same | Salach | — | pending |

Not used on purpose: stock photos (`kids-*`, `hands-*`, `child-*`, `male-*`, `align-fingers-*`, `Diseno-sin-titulo-*`),
Canva schedule posters (`photos/1.png`–`6.png`), screenshots, team portraits, the medical-setting tile (`program-graphics/6-1.png`),
the "problemática" cards, and the ally images excluded in `DECISIONS.md` (churches, scout/explorer groups, #ReinaElCorazón, StarsKids, the lawyer's card).

Brief §7 suggested tiles 7 and 12 for Bienestar infantil and Tu mente tu aliada; this preview uses the images the two program
pages themselves show (`2-3.png`, `IMG_3815.jpeg`) because they depict the program activity more directly. Proposal, open for review.

**Removed in iteration 2 (2026-09-20, "brighter" feedback):** `photos/IMG_3350.jpg` + `-w800` (hero, grey sky → `IMG_1929`, then → the green-shirts photo at the owner's request; `IMG_1929` files removed again),
`program-graphics/9.jpg` (Formarte → tile `7`, the image `/formate/` itself uses), `program-graphics/10.jpg` (Educarte → daylight
photo from the current homepage) and `program-graphics/8.jpg` (Dignificarte → tile `12`). The three
replaced tiles still exist in `inventory/assets/program-graphics/` and can come back if the owner prefers topical fit over light;
`8.png` (haircut brigade) is the most literal Dignificarte image. `1-3` (Alimentarte) was kept: it is bright, but it remains a
close-up portrait — swap is an open question for the review round.

## Interior pages (page-family rollout, merged 2026-09-25)

Added by the five page families (`handoff/01…05`). Same processing: Pillow LANCZOS, EXIF orientation applied, longest edge
1600 px with an 800 px-wide `-w800` variant, JPEG quality 80, progressive, **all metadata dropped** (the live originals of
`IMG_1929`, `IMG_3350` and `IMG_3815` carry GPS coordinates; an EXIF scan of all 43 images here found none). No crop or
retouching; framings (4:3, 4:5, `object-position`) are CSS. At integration the two identical copies of `IMG_1929`
(families 02 and 04) became one file in `photos/`.

| File in `site/assets/` | Source URL | Used on | Shows children | Consent recorded |
|---|---|---|---|---|
| `photos/IMG_1929.jpg` (1200 × 1600) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/09/IMG_1929.jpg (live `/nuestro-objetivo/`) | `/nuestro-objetivo/` intro (4:5); `/dona/` intro; `/ways-to-help/` donation card | yes — badge | **no** |
| `pages/programas/8.jpg` (480 × 480, source size) | https://fundacionunlugar.com/wp-content/uploads/2024/03/8.png (live `/programas-08/`, `/dignificarte/`) | `/cuidarte/` intro (haircut brigade) | yes (one boy) — badge | **no** |
| `pages/ayuda/IMG_3333-scaled.jpeg` (1200 × 1600) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/08/IMG_3333-scaled.jpeg (live `/ways-to-help/`) | `/voluntariado/` intro and `og:image`; `/ways-to-help/` volunteering card | no (volunteer shirt, face out of frame) | n/a |
| `pages/ayuda/IMG_3350-1-scaled.jpg` (1200 × 1600) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/09/IMG_3350-1-scaled.jpg (live `/ways-to-help/`) | `/voluntariado/` photo beside the requirements | yes — badge | **no** |
| `pages/ayuda/IMG_1790-scaled.jpeg` (1200 × 1600) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/08/IMG_1790-scaled.jpeg (live `/ways-to-help/`, `/agenda-de-desarrollo-nacional/`) | `/patrocinar-causas/` intro; `/ways-to-help/` company card | yes (adolescents) — badge | **no** |
| `pages/impacto/IMG_1015-scaled.jpeg` (1600 × 1200) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/08/IMG_1015-scaled.jpeg (live homepage, `/certificado-de-trayectoria/`) | `/nuestro-trabajo/` intro | yes — badge | **no** |
| `pages/impacto/IMG_3350.jpg` (1200 × 1600) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/09/IMG_3350.jpg (live `/efecto/`; the iteration-1 hero) | `/efecto/` intro (4:5) | yes — badge | **no** |
| `pages/impacto/ods-01.png`, `ods-02`, `ods-03`, `ods-04`, `ods-08`, `ods-10`, `ods-13` (≈133 px squares) | https://fundacionunlugar.com/wp-content/uploads/2024/03/Captura-de-Pantalla-2024-03-06-a-las-7.14.27-p.-m.png … `7.15.30` (live `/objetivos/`), trimmed to the icon | `/objetivos/`, decorative (`alt=""`) | no | n/a — screenshots; replace with the official UN Spanish icons before launch |
| `pages/quienes-somos/IMG_1743-scaled.jpeg` (1200 × 1600) + `-w800` | https://fundacionunlugar.com/wp-content/uploads/2025/08/IMG_1743-scaled.jpeg (live homepage) | `/quienes-somos/` intro (4:3, upper part kept) | yes — badge | **no** |

Homepage images reused on interior pages (add to their "Used for" above):

| File | Also used on | Shows children | Consent recorded |
|---|---|---|---|
| `photos/IMG_3829-scaled.jpeg` + `-w600` | `/abrigarte/` intro; `/apadrinar/` intro and `og:image`; `/ways-to-help/` sponsorship card; `/gracias/` intro | hands only | n/a |
| `program-graphics/12.jpg` | `/programas-08/` Dignificarte card; **`/alimentarte/` intro** (a group at a food delivery) | yes — badge | **no** |
| `program-graphics/1-3.jpg` | `/programas-08/` Alimentarte card | yes — badge | **no** |
| `program-graphics/7.jpg` | `/formate/` intro; `/programas-08/` card | yes — badge | **no** |
| `program-graphics/2-3.jpg` | `/bienestar-infantil/` intro; `/programas-08/` card | yes — badge | **no** |
| `photos/WhatsApp-Image-2024-08-02-at-1.01.47-PM.jpeg` | `/capacitarte/` intro; `/programas-08/` card | yes — badge | **no** |
| `photos/IMG_3815.jpeg` | `/programas-08/` Tu mente tu aliada card | yes — badge | **no** |

Open for review (proposals in `PROJECT_BRIEF.md`): tile `12` stands for Dignificarte on the homepage and overview but for
Alimentarte on `/alimentarte/`; `IMG_1929` appears on three pages and `IMG_3829` on six; the Tu mente tu aliada card shows an
identifiable child next to psychological care. Not used on purpose (per family): stock and Canva images, schedule posters,
screenshots of text, team portraits, the org-chart image, UNICEF/WHO and payment logos, `program-graphics/6-1.png` (medical
setting), `IMG_0842-2` ("Go People" banner), `IMG_0767` (religious cards), `IMG_2229` (close portrait) and the 2023 bulletin
image (names a child; linked as a document on `/boletines/`, not displayed).
