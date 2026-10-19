# Mahmoud Sharabati — portfolio

Single-page portfolio for Mahmoud Sharabati (محمود شرباتي), a senior .NET Core developer in Aleppo, Syria.
Everything is in `index.html`: inline CSS, two inline scripts and a Three.js module. There is no build step.

- Live: https://mahmoudsharabati.me/Profile/
- Repo: https://github.com/00mahmoud00/Profile (public). GitHub Pages builds from `master`.
- Background options preview: https://mahmoudsharabati.me/Profile/?lab (see "Background lab" below)

## Working with the owner

- **Deploying:** commit straight to `master` and push; don't use branches or PRs. Push only when he says "push" or "publish". Until then, show him the change at a local URL.
- **After a push, confirm it's live.** Pages has taken 45–60 s to deploy. Poll the live page with a cache-buster (`curl -s "https://mahmoudsharabati.me/Profile/?nc=$RANDOM" | grep -q '<something new>'`) and tell him when it's up. `gh` is not authenticated on this machine, so you can't watch the Actions run.
- **Feedback:** he often sends a screenshot of the live page with a one-line request. Fix what the screenshot shows and check it at several viewport sizes.
- **Creative work:** he likes being offered several options he can try live. The ?lab switcher exists so he and his friends can compare backgrounds on the real page.
- **Facts are his.** Don't "correct" his numbers or titles from other sources (see Rules).

## Rules

- **Codeforces count:** use the number on codeforces.com/profile/00Mahmoud00 ("problems solved for all time": 548 on 2026-10-18). The page says "500+". Never recount from the public API: it undercounts, and once that put a wrong "450+" live.
- **Experience job titles:** keep each employer's real title. He is "Senior" in the hero and meta, but the timeline entries say ".NET Developer" until he says otherwise.
- **HASH entry:** some details are my guesses that he hasn't confirmed: the title ".NET Developer", the location "Remote", and no employment type. The company is HASH Information Technology (hashsd.com, Sudan), Apr 2026 – present. Ask him before treating these as fact.
- **Evolvo:** Nov 2025 – present. He was part-time until May 2026 and has been on contract since. He works on the back end of Wasiitak there.
- **Elkood:** May 2022 – Apr 2024, full-time, .NET Backend Developer.
- **The Arabic font** (Reem Kufi 600) is loaded from Google Fonts with `text=` set to only the letters of محمود شرباتي. Any other Arabic text falls back to a system font unless it uses only those letters. مرحبا works.
- **Large originals:** `20260907_135602.jpg` (the source photo, 5.9 MB, no GPS data), `linkedin-banner-1584x396.png` and `linkedin-banner-3168x792.png` are tracked and therefore public. He committed them himself on 2026-10-19.

## Design system

- **Concept:** Clean Architecture as hexagonal layers (pointy-top hexagons, like the .NET mark), in a violet .NET palette with a gold Domain core.
- **Colour tokens** (`:root`):
  - `--ink #120a26` (page background)
  - `--ink-2 #1a1036`
  - `--line #2c2152`
  - `--violet #512bd4`
  - `--lilac #b6a3ff`
  - `--stone #eee7d8` (text)
  - `--haze #a49bc2` (secondary text)
  - `--sun #f2c66d` (gold accent; also marks the current job)
- **Layer colours:**
  - domain: `--sun`
  - application: `#8b6dff`
  - presentation: `#6a46f0`
  - infrastructure: `#4b2cc6`
  - hosting: `--lilac`
- **Type:** Archivo variable (wdth 62–125, wght 100–900). Headings use `font-stretch` 108–125%. Arabic uses `--font-ar` (Reem Kufi).
- **Layout:**
  - `.wrap` is at most 1240px wide; the gutter is `clamp(20px, 5vw, 64px)`; section spacing is `--space`.
  - At 960px and below everything stacks into one column.
  - The page must work at phone width with no horizontal scroll.
- **Logo** (`brand/`): a flat ambigram. Upright it's a wide monoline M (stroke 24, width 128). Turned 180° it reads as ش: the legs become its three teeth, and three gold Kufic diamonds under the M become its dots.
  - On dark: M `#7b5cff`, diamonds `#f2c66d`.
  - On light: M `#512bd4`, diamonds `#d4972c`.
  - Shapes are filled polygons only. The topbar loads `brand/mark.svg` at 42px.
  - He rejected an earlier 3D isometric cube because it was 3D; he wants flat and modern.
- **Motion:** respect `prefers-reduced-motion` everywhere. 3D views have static SVG fallbacks (`.fallback`, shown with `.no-3d` / `.is-static`).

## Page structure (`index.html`, in order)

1. **Head:** meta, Open Graph and Twitter tags, three JSON-LD blocks (Person, WebSite, ItemList of apps), fonts, and the import map for `three@0.170.0` from jsDelivr.
2. **`.topbar`:** fixed. It frosts (`.is-scrolled`) after the page scrolls 24px.
3. **`.hero`:**
   - Copy: Arabic name, name, "Senior .NET Core developer in Aleppo, Syria", intro, Email/LinkedIn buttons.
   - Portrait: `mahmoud-cutout-*.webp` on a soft CSS glow (`.portrait-frame::before`).
   - `.hero-visual` is vertically centred with the copy, using the same 132/96px block padding.
   - **No 3D in the hero:** the rings behind the portrait were removed on 2026-10-19 at his request.
4. **`#projects`:** "Apps I've worked on".
   - `.showcase` cards are tinted by the app's colour in `--app`. Screenshots are dealt into a fan when the card scrolls into view and tilt under the pointer.
   - Wasiitak and Mr Course are full-width featured cards.
   - Apps: Wasiitak (Evolvo); Mr Course, Fly Order, Ads Net, Jenacom and Bronz (Elkood).
5. **`#experience`:** an `ol.timeline` of `.role` items. `.is-current` gets the gold hexagon. Order: HASH, Evolvo, Elkood.
6. **`#skills`:** "How I structure a .NET solution". A Three.js exploded stack of the layers (`startArchitecture()`): it flattens into a front view and explodes as you scroll. SVG leader lines join each layer to its `.layer[data-layer]` text, and hovering a layer focuses it.
7. **`#codeforces`:** "500+ problems solved" plus a honeycomb of 500 cells drawn by an inline script. ICPC 2022 certificate: the `#certificate` `<dialog>` shows `certificate.webp`, and the link falls back to `Certificate.pdf`.
8. **Education and volunteering** (no id).
9. **`footer#contact`.**

Scripts:
- **Classic inline script:** honeycomb, certificate dialog, showcase dealing and tilt, topbar frost, and a 3-second timer that adds `.no-3d` if the module never ran.
- **Module:** Three.js, for the architecture section only.
- **Last script:** the `?lab` loader.

## Background lab (`lab/`, under review)

A review-only switcher of 15 animated page backgrounds.

- It loads only when the URL has `?lab` (or `?bg=`), via the small loader at the end of `index.html`. Normal visitors see the flat background.
- `?bg=<key>` opens a specific option. Keys 1–9 and 0 pick the first ten options, and the panel can be hidden.
- He and a friend are choosing one.

| # | key | Idea | Inspired by |
|---|---|---|---|
| 1 | layers | Hexagonal rings around a Domain core; gold requests travel in, lilac responses travel out. The cursor is a client. | fat7i.dev's canvas backdrop (concept, not code) |
| 2 | blueprint | Honeycomb grid lit by a lamp that follows the cursor; gold signals pass from cell to cell like circuit traces | Vercel/Linear grids |
| 3 | aurora | Soft colour fields under film grain; the colour follows the section (each app's `--app` on its card) | Stripe/Linear gradients |
| 4 | aleppo | Eight-point star pattern (Hankin's method on an octagon-square tiling) with a sweep of warm light | Aleppo stone and woodwork |
| 5 | contours | Topographic lines from 3D simplex noise; the cursor raises a hill | survey maps (DDD as mapping a domain) |
| 6 | ripples | Dot field; mouse moves and clicks send out ripples | event-driven systems |
| 7 | logs | Faint columns of structured server logs; scrolling adds traffic | production logs |
| 8 | silk | Flow-field particles with fading trails; the cursor stirs a vortex (`persist: true`) | Tyler Hobbs' flow fields |
| 9 | pulse | Ridge-plot metric lines with a gold heartbeat | Joy Division's *Unknown Pleasures* (Peter Saville) |
| 10 | beams | Light running down pipeline columns; stages flash | CI/CD |
| 11 | warp | WebGL domain-warped fbm on its own canvas (`gl: true`) | Inigo Quilez / Shadertoy |
| 12 | contexts | Voronoi map of DDD bounded contexts; hovering founds "Your context" | Eric Evans' DDD |
| 13 | ascii | Hexagonal ring rendered in characters with a depth buffer | Andy Sloane's donut.c |
| 14 | words | Particles steer into a word per section (محمود, SHIPPED, .NET, DDD, 548, مرحبا) | Daniel Shiffman's steering behaviours |
| 15 | growth | Gray-Scott reaction-diffusion, coral-like | Karl Sims |

How the lab code works:
- Every option is an object `{ key, label, note, init, resize, draw(dt), persist?, gl? }`. Each draws on one fixed 2D canvas behind the page, except Warp, which uses a WebGL canvas.
- All options share smoothed inputs in `S`: time, scroll position, scroll speed (`energy`), pointer, and whether the pointer is over the page.
- Seeded randomness keeps layouts identical on every visit.
- `resize()` does nothing when the size didn't really change, because phones fire `resize` when the address bar shows or hides.
- The loop pauses while the tab is hidden. With reduced motion, each option draws one still frame.

**When he picks one:**
1. Move that option into `index.html` as a permanent background. Keep the engineering above: DPR caps, the pause when hidden, reduced motion, the resize guard, and the CSS mask that fades the edges.
2. Delete `lab/` and the `?lab` loader.
3. Re-check text contrast over the background.

## Derived assets (not reproducible from the repo alone)

- **`mahmoud-cutout-1100.webp` / `-640.webp`:**
  - Cut out on-device with Apple Vision (`VNGenerateForegroundInstanceMaskRequest` in a small Swift script).
  - Then the edge colours were cleaned up and small arm/torso gaps filled.
  - The source `20260907_135602.jpg` has EXIF orientation 8: bake the rotation in and strip EXIF.
- **`og-image.jpg`** (1200×630). Re-render it after **any** hero or topbar change:
  1. Serve a copy of `index.html` over HTTP next to the assets, with this injected in `<head>`: `<style>.nav, .hero-intro, .hero-actions, .skip-link { display: none !important; }</style>`.
  2. Screenshot it: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1200,630 --virtual-time-budget=5000 --screenshot=og-2x.png <url>`
  3. Convert it: `sips -s format jpeg -s formatOptions 88 -z 630 1200 og-2x.png --out og-image.jpg`
- **`certificate.webp`:** page 1 of `Certificate.pdf` rendered at 2× (PDFKit).
- **`apps/<key>/icon.webp` and `1..4.webp`** (440px wide): taken from the public store listings.
  - Google Play: the `<img>` URLs with alt "Icon image" or "Screenshot image", plus a `=s512` or `=h1600` suffix.
  - App Store: `itunes.apple.com/lookup?id=…` (`artworkUrl512`, `screenshotUrls`).

## Checking changes locally

- **Serve:** `python3 -m http.server 8000 --bind 127.0.0.1` from the repo, then open http://127.0.0.1:8000/ (add `?lab` for the lab).
- **Screenshots:** headless Chrome as above. Check 1440×900, 1280×720, 1000×540 (close to his laptop window) and 1920×1080.
  - Below about 500px wide, headless screenshots crop strangely, so check phone layout in a real browser.
- **Headless Chrome only paints about 2 animation frames,** so screenshots can't show motion. To check an animation:
  1. Load the page in an `<iframe>` inside a probe page.
  2. Fast-forward the loop in a loop of `tick(1/60); draw(1/60)`.
  3. Export the canvas with `toDataURL`, then read it back through `--dump-dom`.
- **WebGL in headless Chrome:** works without flags. `--disable-gpu`, or forcing SwiftShader with `--use-gl=angle`, turns it off.
- **Smoke test:** in the probe iframe, click every `.lab-bar [data-key]` button and collect `error` events.

## History

- **2026-10-16:** redesign: violet palette, Archivo, 3D Clean Architecture layers, new photo cutout.
- **2026-10-17:** flat M / ش ambigram logo.
- **2026-10-18:** shipped-app showcases; Codeforces count kept at 500+ (548 on the profile).
- **2026-10-19:**
  - Added HASH; Evolvo moved to contract.
  - Added the ?lab background preview: 10 options, then 15.
  - Removed the 3D rings from the hero (the 3D stays in Skills).
  - Mid-level became Senior.
  - The portrait was centred with the hero text.

## Open items

- Pick a background from ?lab, then make it permanent and delete `lab/`.
- Confirm the HASH title, location and employment type.
- LinkedIn and others cache old link previews; refresh them with LinkedIn's Post Inspector after hero changes.
