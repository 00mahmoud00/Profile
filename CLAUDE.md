# Mahmoud Sharabati — portfolio

Single-page portfolio for Mahmoud Sharabati (محمود شراباتي), a senior .NET Core developer in Aleppo, Syria.
Everything is in `index.html`: inline CSS, two inline scripts and a Three.js module. There is no build step.
The site is bilingual: English by default, and Arabic (right to left) at `?lang=ar` (see "Languages"). It has dark and light themes, with dark as the default (see "Themes"). Both defaults were his choice: a first visit always opens dark and in English.

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

- **His Arabic name is محمود شراباتي** (ش ر ا ب ا ت ي, with an alef after the ر). It was first misspelled شرباتي everywhere and fixed on 2026-10-19, including the outlined name in `brand/lockup-bilingual-*.svg`, which was redrawn with HarfBuzz and Reem Kufi at weight 600 and size 50, right-aligned at x 784.8.
- **Codeforces count:** use the number on codeforces.com/profile/00Mahmoud00 ("problems solved for all time": 548 on 2026-10-18). The page says "500+". Never recount from the public API: it undercounts, and once that put a wrong "450+" live.
- **Experience job titles:** keep each employer's real title. He is "Senior" in the hero and meta, but the timeline entries say ".NET Developer" until he says otherwise.
- **HASH entry:** some details are my guesses that he hasn't confirmed: the title ".NET Developer", the location "Remote", and no employment type. The company is HASH Information Technology (hashsd.com, Sudan), Apr 2026 – present. Ask him before treating these as fact.
- **Evolvo:** Nov 2025 – present. He was part-time until May 2026 and has been on contract since. He works on the back end of Wasiitak there.
- **Elkood:** May 2022 – Apr 2024, full-time, .NET Backend Developer.
- **The Arabic font** (Reem Kufi 600) is loaded from Google Fonts with `text=` set to only the letters of محمود شراباتي. Any other Arabic text falls back to a system font unless it uses only those letters. مرحبا works.
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

## Themes (dark / light)

Added 2026-10-19 at his request.

- **How the theme is picked:**
  1. The `<head>` script sets `<html data-theme="dark|light">` before the first paint, so nothing flashes.
  2. **Dark is the default for every first visit** (his decision, 2026-10-19); the system setting is ignored. Light is used only after the visitor picks it (saved in `localStorage.theme`).
  3. `?theme=light` or `?theme=dark` forces a theme for that visit without saving it. Use it for screenshots and for sharing a link to one theme.
- **Toggle:** the round sun/moon button (`[data-theme-toggle]`) after the menu.
  - Clicking it flips the theme, saves the choice, eases colours across with `.theme-switching` (about 0.4 s), updates `<meta name="theme-color">`, and fires a `themechange` event on `document`.
  - Its `aria-label` and `title` come from `data-label-light` / `data-label-dark`, which `ar.js` translates. `ar.js` fires `i18n:applied` so the label is refreshed after translation.
- **Colours are tokens.** Dark is the `:root` default; light overrides them in `:root[data-theme="light"]`:
  - page `--ink #f6f2ea` (warm paper), `--ink-2 #fffdf8`, `--line #ddd4ec`
  - text `--stone #1c1336` (deep violet ink), `--haze #5d5577`
  - accent `--lilac #5634d6` and `--sun #d4972c`, the logo's light colours
  - Translucent tones are tokens too: `--frost` (frosted topbar), `--hairline`, `--shade`, `--rim` and `--halo` (portrait glow), `--glow-gold` and `--glow-violet` (portrait backdrop), `--leader`, `--tag`, `--tag-line`, `--shot-line`, `--icon-line`, `--backdrop` (certificate dialog).
  - **Never hard-code a colour in page CSS:** use a token, or add one to both themes.
- **Logo:** `.brand` holds both marks. `mark.svg` is shown in dark and `mark-light.svg` in light.
- **Skills 3D:** unfocused layers fade toward the current `--ink` (`readInk()`, re-read on `themechange`). The slab colours themselves work on both themes.
- **The honeycomb gradient** ends in `#4b2cc6` in light (it is `#2c2152` in dark), set through CSS `stop-color`.
- **On phones (≤ 430 px),** "Skills" (`.nav-wide`) is hidden to make room for the toggle. It's still reachable by scrolling. The bar was measured to fit at 360 and 390 px in both languages.
- **The ?lab backgrounds and photo backdrops follow the theme:**
  - `backgrounds.js` swaps its palette (`C.lilac`, `C.sun`, `C.text`, `C.ink`) on `themechange` and re-inits the current scene. Warp takes the page colour as the `uInk` uniform.
  - In `photo.js`, text that sits on the page itself uses `style="fill: var(--stone)"`. Text on the backdrops' own dark cards keeps its fixed colours.
- **`og-image.jpg`** should stay the dark hero: render it with `?theme=dark` added to the URL.

## Languages (English / Arabic)

Added 2026-10-19 at his request: "make it Arabic and English". He picked the whole site, with a switch like fat7i.dev's.

- **How it works:**
  1. The first `<script>` in `<head>` checks for `?lang=ar`. If it's there, it sets `<html lang="ar" dir="rtl">` and adds `.i18n-pending`, which keeps the body hidden.
  2. It then loads Noto Kufi Arabic from Google Fonts and `i18n/ar.js`.
  3. `ar.js` swaps the text on `DOMContentLoaded` and un-hides the page. If it never runs, a 2.5 s timeout un-hides the page in English.
  - English visitors download none of this.
- **Keys:** every translatable element has `data-i18n="key"` (its inner HTML is replaced) and/or `data-i18n-attr="attr=key;attr=key"` (for `aria-label` and `alt`). `i18n/ar.js` maps each key to Arabic HTML; a missing key simply stays English.
  - **When you add or change text, update both** the English in `index.html` and the Arabic in `i18n/ar.js` under the same key.
  - Check coverage with the regex comparison of `data-i18n` keys against the dictionary keys.
  - Put the key on the element whose text changes. Replacing an element's inner HTML drops any listeners on its children, which is why the certificate link has its own key (`cp.cert`) instead of sharing its paragraph's.
- **The hero swaps names in Arabic:** the headline becomes محمود شراباتي in Reem Kufi, and the small line becomes "Mahmoud Sharabati" in Archivo. This is done in `apply()` in `ar.js`.
- **`ar.js` also updates the meta:** `<title>`, the description, og:title and og:description, og:locale, and the canonical (`?lang=ar`). The head has hreflang alternates for en, ar and x-default. Social previews stay English, because their crawlers don't run JS.
- **Arabic text rules:**
  - Wrap Latin terms that start or end with punctuation in `<bdi dir="ltr">`: `.NET`, `.NET Core/6+`, `C#`, `99.9%`. Otherwise the dot or sign appears to jump. Chrome showed them correctly with plain `<bdi>` too, but the explicit `dir` is deterministic.
  - Put a space after the conjunction و before a Latin word ("و Blazor"). Joined, the isolated Kufi و looks like a Latin "g". Use باستخدام rather than attaching بـ to a Latin word.
  - Months use the names used in Syria (كانون الثاني … كانون الأول), and digits stay Western (2026, 548).
  - Tool tags (`.tools li`) are forced to left-to-right so "C#" and "Blazor (SSR & WASM)" read correctly.
- **CSS:**
  - Anything directional uses logical properties (`inset-inline-start`, `margin-inline-start`, `padding-inline-start`). Grids and flex rows flip by themselves.
  - Arabic overrides live under `:root[lang="ar"]`: `--font` becomes Archivo with Noto Kufi Arabic for Arabic glyphs; line-height is 1.85; there is no negative letter-spacing, because it breaks joined letters.
  - Don't use plain `[lang="ar"]` for page-level rules: English elements such as `.hero-ar` carry `lang="ar"` too.
- **3D leaders:** when `dir="rtl"`, the Skills module mirrors the stack's anchors and draws leaders to each title's right edge. Both directions were checked numerically.
- **Switch:** `.lang-switch` is the last menu item. It reads عربي / English, and below 430 px it shortens to ع / EN; its `aria-label` keeps the full name. The classic script keeps other query parameters (such as `?lab`) when switching. The bar was measured to fit at 360, 390 and 440 px.
- **The ?lab panel stays in English.** Portrait-centred lab backgrounds (Layers, ASCII) mirror in Arabic.

## Page structure (`index.html`, in order)

1. **Head:** meta, Open Graph and Twitter tags, three JSON-LD blocks (Person, WebSite, ItemList of apps), fonts, and the import map for `three@0.170.0` from jsDelivr.
2. **`.topbar`:** fixed, with the language switch (عربي / English) as the last menu item. It frosts (`.is-scrolled`) after the page scrolls 24px.
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

A review-only panel with two rows: **Page** switches between 15 animated page backgrounds (`lab/backgrounds.js`), and **Photo** switches between 15 backdrops behind the portrait (`lab/photo.js`).

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

**Photo backdrops** (`lab/photo.js`, the "Photo" row of the same panel, `?photo=<key>`):
- On 2026-10-19 he said the portrait alone "is not good" and asked for something behind it, but **not the 3D structure**.
- Each backdrop is one SVG in a `.halo` div prepended to `.portrait-frame`. It sits behind the cutout (`.portrait` has z-index 1) and above the CSS glow.
- The SVG uses the cutout's own coordinates (`viewBox 0 0 1100 1316`). The head spans x 435–748 from y 12, and the shoulders widen to full width below y ≈ 420.
- A shared loop calls each option's `frame(el, t)`. With reduced motion it gets `t = null` and draws a still frame.
- Options (`?photo=` key):
  - **none:** the portrait alone, as the live page is now.
  - **circle:** violet disc with a gold rim and a slowly turning dotted ring.
  - **hexagon:** flat hexagon badge with a gold dashed outline that marches round.
  - **arch:** Aleppo pointed arch with a gold outline and a star lattice inside.
  - **star:** slowly turning eight-point star.
  - **name:** giant Kufic محمود with a gold offset outline.
  - **ring:** rotating circular text, "SENIOR .NET DEVELOPER • CLEAN ARCHITECTURE • …".
  - **orbit:** the real Skills tags orbiting on two tilted rings.
  - **code:** an editor window behind him with a C# DDD aggregate typing out. It uses non-breaking spaces because SVG collapses ordinary ones.
  - **rays:** a rotating sunburst.
  - **blob:** a morphing gradient shape.
  - **split:** after Adham Dannaway's designer | coder hero. One card split through the face: a C# endpoint on the left (back end) and a Blazor-style dashboard on the right (front end).
  - **frame:** the offset photo frame common in developer portfolios (Brittany Chiang's is the best known). A violet panel with a gold outline offset behind it that slides in on hover; the hover rule is in `backgrounds.css`.
  - **sparkles:** after Josh W. Comeau's animated sparkles. Four-point stars pop in, turn and fade around the head.
  - **commits:** a GitHub contribution graph in violet, with gold for the busiest days; new commits flash.
  - **spec:** a technical drawing on grid paper with numbered callouts drawn to him. Labels on the right must stay short to clear the head (x > 750).
- Without a `photo` parameter, `?lab` opens on Circle.

**When he picks one:**
1. Move the chosen option (page background and/or photo backdrop) into `index.html` as a permanent part. For page backgrounds, keep the engineering above: DPR caps, the pause when hidden, reduced motion, the resize guard, and the CSS mask that fades the edges.
2. Delete `lab/` and the `?lab` loader.
3. Re-check text contrast over the background.
4. If the hero changed, re-render `og-image.jpg`.

## Derived assets (not reproducible from the repo alone)

- **`mahmoud-cutout-1100.webp` / `-640.webp`:**
  - Cut out on-device with Apple Vision (`VNGenerateForegroundInstanceMaskRequest` in a small Swift script).
  - Then the edge colours were cleaned up and small arm/torso gaps filled.
  - The source `20260907_135602.jpg` has EXIF orientation 8: bake the rotation in and strip EXIF.
- **`og-image.jpg`** (1200×630). Re-render it after **any** hero or topbar change:
  1. Serve a copy of `index.html` over HTTP next to the assets, with this injected in `<head>`: `<style>.nav, .hero-intro, .hero-actions, .skip-link { display: none !important; }</style>`.
  2. Screenshot it, with `?theme=dark` on the URL: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1200,630 --virtual-time-budget=5000 --screenshot=og-2x.png <url>`
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
  - Added 10, then 15, photo-backdrop options to ?lab (he wants something behind the portrait, but not 3D). The last five came from a look at famous developer portfolios.
  - The whole site became bilingual: an Arabic version at `?lang=ar`, right to left, with a عربي / English switch.
  - His Arabic surname was corrected to شراباتي.
  - Added dark and light themes with a sun/moon toggle.

## Open items

- Pick a page background and a photo backdrop from ?lab, then make them permanent and delete `lab/`.
- Confirm the HASH title, location and employment type.
- LinkedIn and others cache old link previews; refresh them with LinkedIn's Post Inspector after hero changes.
