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
