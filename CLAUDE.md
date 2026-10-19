# Mahmoud Sharabati — portfolio

Single-page portfolio for Mahmoud Sharabati (محمود شراباتي), a senior .NET Core developer in Aleppo, Syria.
Everything is in `index.html`: inline CSS, two inline scripts and a Three.js module. There is no build step.
The site is bilingual: English by default, and Arabic (right to left) at `?lang=ar` (see "Languages"). It has dark and light themes, with dark as the default (see "Themes"). Both defaults were his choice: a first visit always opens dark and in English.

- Live: https://mahmoudsharabati.me/Profile/
- Repo: https://github.com/00mahmoud00/Profile (public). GitHub Pages builds from `master`.

## Working with the owner

- **Deploying:** commit straight to `master` and push; don't use branches or PRs. Push only when he says "push" or "publish". Until then, show him the change at a local URL.
- **After a push, confirm it's live.** Pages has taken 45–60 s to deploy. Poll the live page with a cache-buster (`curl -s "https://mahmoudsharabati.me/Profile/?nc=$RANDOM" | grep -q '<something new>'`) and tell him when it's up. `gh` is not authenticated on this machine, so you can't watch the Actions run.
- **Feedback:** he often sends a screenshot of the live page with a one-line request. Fix what the screenshot shows and check it at several viewport sizes.
- **Creative work:** he likes being offered several options he can try live on the real page, then picking one. The ?lab drawer did this for backgrounds, photo backdrops, logos, experience layouts and footers (see "Chosen design").
- **Facts are his.** Don't "correct" his numbers or titles from other sources (see Rules).

## Rules

- **His Arabic name is محمود شراباتي** (ش ر ا ب ا ت ي, with an alef after the ر). It was first misspelled شرباتي everywhere and fixed on 2026-10-19, including the outlined name in `brand/lockup-bilingual-*.svg`, which was redrawn with HarfBuzz and Reem Kufi at weight 600 and size 50, right-aligned at x 784.8.
- **Codeforces count:** use the number on codeforces.com/profile/00Mahmoud00 ("problems solved for all time": 548 on 2026-10-18). The page says "500+". Never recount from the public API: it undercounts, and once that put a wrong "450+" live.
- **Experience job titles:** keep each employer's real title. He is "Senior" in the hero and meta, but the timeline entries say ".NET Developer" until he says otherwise.
- **Content sources:** his CV PDF (`~/Downloads/Mahmoud_Sharabati_CV (1).pdf`, 3 pages) and LinkedIn screenshots, used on 2026-10-19. Where they disagree with what he said in conversation, his words win: Senior (not "Mid-Level" or "Fullstack"), HASH as the current job (not on LinkedIn), and Evolvo part-time then contract from May 2026.
- **Settled conflicts** (his answers, 2026-10-19):
  - Blue Bits ran **Nov 2020 – Nov 2022**, as the CV says. LinkedIn's Nov 2022 – Nov 2024 is wrong there.
  - Bronz stays **"supervised development"**, as the site says, not the CV's "contributed to the back end".
- **Store check, 2026-10-19:** all seven store links on the site are live.
  - Google Play downloads: Wasiitak 10K+, Mr Course 5K+, Bronz 1K+, Fly Order 500+, Ads Net 100+. Jenacom and Bronz are also on the App Store.
  - Wasiitak is also on the App Store (id6749491110, same bundle id `com.itlegend.wasiitk`), so its card links both stores.
  - Matp, 30-S and QrGermany have no public store listing.
  - Elkood's Play account (`developer?id=elKood`) lists more apps (Absher, Q2Auto, GetUp and others). **He hasn't said he worked on them, so don't add them.**
- **Writing style (senior CV):**
  - Lead with scope and outcome, then the how. Put the strongest evidence first: Matp, which he designed and built.
  - **Never say he "led the architecture"** (of Matp or anything else), nor "guided the team's technical decisions": he asked for that wording to be removed on 2026-10-19. Say "designed and built"; mentoring the developers is fine.
  - Drop generic filler bullets, and never invent metrics. Numbers on the site: 4+ years, 10K+ Wasiitak downloads, 99.9% uptime, 500+ Codeforces.
  - The "9 products built" fact counts the 6 apps in Projects plus Matp, 30-S and QrGermany. Keep it in step if either list changes.
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
- **Logo** (`brand/`, chosen 2026-10-19 from 15 options): **Hex**, an M inside a pointy-top hexagon (the .NET mark and the Clean Architecture layers), with one gold diamond under the V.
  - Drawn on a 128 × 128 grid: hexagon R 56, stroke 8; the M is a polyline `40,86 40,44 64,70 88,44 88,86`, stroke 10, square caps, miter joins; the diamond is a 10 px square rotated 45° at (64, 101).
  - Colours: on dark `#7b5cff` + `#f2c66d` (`mark.svg`); on light `#512bd4` + `#d4972c` (`mark-light.svg`); mono `#eee7d8` / `#120a26`.
  - `favicon.svg` switches colours with the browser's theme; `favicon.ico` (16/32/48), `apple-touch-icon.png` and `png/avatar-800.png` sit on `#120a26`.
  - The lockups place the hex at the old mark's height, with the words moved over by its extra width.
  - It replaced the earlier M / ش ambigram (and, before that, a 3D cube he rejected for being 3D). He wants flat and modern.
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
- **The Logs background and the Orbit tags follow the theme:** the background swaps its palette on `themechange`; the orbit tags use `var(--ink-2)` and `var(--stone)`.
- **`og-image.jpg`** should stay the dark hero: render it with `?theme=dark` added to the URL.

## Languages (English / Arabic)

Added 2026-10-19 at his request: "make it Arabic and English". He picked the whole site, with a switch like fat7i.dev's.

- **How it works:**
  1. The first `<script>` in `<head>` checks for `?lang=ar`. If it's there, it sets `<html lang="ar" dir="rtl">` and adds `.i18n-pending`, which keeps the body hidden.
  2. It then loads Noto Kufi Arabic from Google Fonts and `i18n/ar.js`.
  3. `ar.js` swaps the text as soon as `document.readyState` leaves `loading` (parse end), and un-hides the page. It deliberately does **not** wait for `DOMContentLoaded`, because that also waits for the deferred Three.js module from the CDN and showed English first on slow links. If it never runs, a 2.5 s timeout un-hides the page in English.
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
- **Switch:** `.lang-switch` is the last menu item. It reads عربي / English, and below 430 px it shortens to ع / EN; its `aria-label` keeps the full name. The classic script keeps other query parameters when switching. The bar was measured to fit at 360, 390 and 440 px.

## Page structure (`index.html`, in order)

1. **Head:** meta, Open Graph and Twitter tags, three JSON-LD blocks (Person, WebSite, ItemList of apps), fonts, and the import map for `three@0.170.0` from jsDelivr.
2. **`.topbar`:** fixed, with the language switch (عربي / English) as the last menu item. It frosts (`.is-scrolled`) after the page scrolls 24px.
3. **`.hero`:**
   - Copy: Arabic name, name, "Senior .NET Core developer in Aleppo, Syria", one-sentence intro, Download CV / Contact me buttons.
   - Portrait: `mahmoud-cutout-*.webp` on a soft CSS glow (`.portrait-frame::before`), with the **orbit** behind it (see "Chosen design").
   - `.hero-visual` centres the portrait with block padding 110px / 118px, so the head lines up with the Arabic name. Re-tune it whenever the copy changes height (it was 40/188 while the intro was a long paragraph); check 1000×566, 1280×720 and 1440×900.
   - **Hero copy is deliberately short** (his choice, 2026-10-19): name, role line, typing line, one sentence, two buttons (Download CV + Contact me → `#contact`), the four numbers. Details belong in Experience and Platforms, not here.
   - **`.hero-type`:** a terminal-style line under the role (`› I build …▍`). It types each phrase, holds it about 1.9 s with a blinking gold caret, deletes it, then types the next.
     - Phrases live in `data-phrases`, separated by `|`. Arabic gets its own list through `data-i18n-attr="data-phrases=type.phrases"`.
     - The script re-reads the phrases every round, and on `i18n:applied` it swaps in the Arabic first phrase.
     - Letters are split with `Intl.Segmenter`, so Arabic and emoji don't break mid-character.
     - The animated part is `aria-hidden`; screen readers get the full sentence (`type.static`). Reduced motion shows the first phrase still.
     - The line is `nowrap`; every phrase was measured to fit at 360 px in both languages. Keep new phrases about as short.
   - **`.facts`:** a strip of four key numbers under the buttons: 4+ years, 9 products, 10K+ downloads, 500+ problems.
   - **No 3D in the hero:** the rings behind the portrait were removed on 2026-10-19 at his request.
4. **`#projects`:** "Apps I've worked on".
   - `.showcase` cards are tinted by the app's colour in `--app`. Screenshots are dealt into a fan when the card scrolls into view and tilt under the pointer.
   - Wasiitak and Mr Course are full-width featured cards.
   - Apps: Wasiitak (Evolvo); Mr Course, Fly Order, Ads Net, Jenacom and Bronz (Elkood).
   - Cards with CV detail carry a `.chips` list of the features he built (Mr Course, Fly Order, Jenacom, Bronz).
5. **`#systems`:** "Platforms I've built", short case studies of systems without an app-store listing.
   - **Matp** is a featured card: Elkood, designed and built, multi-tenant WMS + OMS. It has a flat SVG diagram of three isolated tenants around a shared core, plus merchants and drivers. Gold dots flow along the wires as SMIL `animateMotion`, started at negative `begin` times so none rests at the SVG origin, and paused with `pauseAnimations()` for reduced motion.
   - **30-S** (freelance marketplace with reels), **QrGermany** (Elkood), and the **Clean Architecture template**, which is open source at gitlab.com/mahmoudsh792/template.
   - Names and tech-stack lines are wrapped in `<bdi>`, so their punctuation stays put in Arabic.
6. **`#experience`:** an `ol.timeline` of `.role` items. `.is-current` gets the gold hexagon. Order: HASH, Evolvo, Elkood. Each role has:
   - a `dl.role-stats` of numbers: Evolvo 10K+ and 99.9%; Elkood 7 products, Matp and 5K+. HASH has none yet, because there are no confirmed numbers.
   - bullets that lead with outcome and scope.
   - a `.role-foot` with "Built here" links to the matching cards (`#app-*`, `#sys-*`) and the stack as chips.
   - "7 products shipped" at Elkood counts Matp, Fly Order, Mr Course, Ads Net, Jenacom, QrGermany and Bronz.
   - `section[id]` and `h3[id]` have `scroll-margin-top`, so in-page links land below the fixed top bar.
   - **Scroll focus** (both timelines): an IntersectionObserver marks the role in the middle band of the screen `.is-focus`; the others dim and blur slightly, and a gold line (`.timeline::after`, height from `--p`) fills as you scroll.
7. **`#volunteering`:** "Volunteering & leadership", built with the same `ol.timeline` / `.role` markup as Experience: Sanad (volunteer instructor, ASP.NET Core MVC course at Al-Shahba Private University, Mar – May 2025) and BlueBitsTeam (content digitizer, Nov 2020 – Nov 2022), with three bullets each from his CV. Every `.role` in both lists has `data-org` (HASH, Evolvo, Elkood, Sanad, BlueBits).
8. **`#skills`:** "How I structure a .NET solution". A Three.js exploded stack of the layers (`startArchitecture()`): it flattens into a front view and explodes as you scroll. SVG leader lines join each layer to its `.layer[data-layer]` text, and hovering a layer focuses it.
9. **`#codeforces`:** "500+ problems solved" plus a honeycomb of 500 cells drawn by an inline script. ICPC 2022 certificate: the `#certificate` `<dialog>` shows `certificate.webp`, and the link falls back to `Certificate.pdf`.
10. **Education:** its own section now (it used to share a split with volunteering).
11. **`footer#contact`:** "Get in touch". The **Composer** design (chosen 2026-10-19).
    - **All channels are equal, and the visitor picks:** his explicit wish (2026-10-19). Never say one channel is "the quickest" or the preferred one.
    - **`.contact-split`:** on the left, `ul.channels`, six equal rows (`a.channel` tinted by `--c`): Email, Phone, WhatsApp (`wa.me/963985839618`), LinkedIn, GitLab, Codeforces. Each link's text includes the value in a `.visually-hidden` span. On the right, `form.compose`: name + message, then **Send by email** (opens `mailto:` with the subject and body filled in) or **Send on WhatsApp** (opens `wa.me` with the text). Nothing is sent or stored by the site; an empty message is blocked. The subject comes from `data-subject`, translated as `compose.subject`.
    - **Below:** Download CV (PDF), **Save contact card** (`contact/Mahmoud_Sharabati.vcf`, vCard 3.0, CRLF line endings), and the live local time in Aleppo (`Intl`, `Asia/Damascus`, UTC+3, 24-hour).
    - **Fineprint:** ©, Aleppo, and Back to top.

Scripts:
- **Classic inline script:** honeycomb, certificate dialog, showcase dealing and tilt, topbar frost, composer and clock, scroll focus, the hero orbit, theme toggle, language switch, typing line, and a 3-second timer that adds `.no-3d` if the module never ran.
- **Background script:** the live server logs on `canvas.page-bg` (its own `<script>` before the module).
- **Module:** Three.js, for the architecture section only. It is **lazy**: the module itself is tiny and imports `three` and `RoomEnvironment` only when `.stack-stage` comes within one screen (IntersectionObserver, `rootMargin: 100%`), so the first paint never waits for the ~170 KB library. It sets `has-3d` straight away (so the 3-second timer doesn't add `no-3d`); a failed import marks `.stack-visual` as `is-static`, which shows the SVG fallback.

## Chosen design (2026-10-19)

He compared options live in a `?lab` drawer and picked one per row: `?bg=logs&photo=orbit&logo=hex&exp=focus&footer=composer`. They are now permanent and the drawer is gone. The `lab/` files stay in git history if he ever wants to compare again.

- **Page background: Logs.** `canvas.page-bg` (fixed, behind everything, edges faded with a CSS mask) shows faint columns of structured server logs, one per service (`Ads.Api`, `Orders.Worker`, `Identity`, `Gateway`): requests, SQL, domain events, health checks.
  - Lines type in and glide up. Scrolling adds traffic (`energy`), and the mouse works as a reading light.
  - Engineering: devicePixelRatio is capped (2, or 1.5 on touch); fake resizes (address bar) are ignored; the loop pauses while the tab is hidden; reduced motion draws one still frame; the palette follows `themechange`.
  - **The canvas is `dir="ltr"` and sets `ctx.direction = 'ltr'`:** on the Arabic page an inherited right-to-left direction made the lines overlap.
- **Behind the photo: Orbit.** A static SVG in `.halo` (the cutout's own coordinates, `viewBox 0 0 1100 1316`) holds a violet glow, two tilted dashed rings and 12 skill tags.
  - A small script turns the tags around the rings; the far side shrinks and dims. It pauses off screen and is still with reduced motion.
  - Tags use `var(--ink-2)` / `var(--stone)`, so they suit both themes, and the SVG is `direction: ltr` so "C#" doesn't become "#C" in Arabic.
- **Logo: Hex.** See "Design system".
- **Experience and volunteering: Scroll focus.** See "Page structure".
- **Footer: Composer.** See "Page structure".

Other options he saw (all in git history under `lab/`, in case he wants another look):
- Page backgrounds: layers, blueprint, aurora, aleppo, contours, ripples, silk, pulse, beams, warp, contexts, ascii, words, growth.
- Photo backdrops: circle, hexagon, arch, star, name, ring, code, rays, blob, split, frame, sparkles, commits, spec.
- Logos: tag, braces, .M, monoline, matrix, circuit, bauhaus, star, arch, ش tile, M | ش, diamond, fold, layers, and the old ambigram.
- Experience layouts: cards, tabs, accordion, career bars, git log, center line, sticky, résumé, bento, chapters, terminal, card stack, metro, kanban.
- Footers: marquee, terminal, business card with QR code, big list.

## ATS CV (`cv/`)

`cv/Mahmoud_Sharabati_CV.pdf` is the file behind the **Download CV** buttons: the primary hero button, plus a button in the contact footer. It is A4, 2 pages. Its source is `cv/Mahmoud_Sharabati_CV.html`.

**Arabic CV:** `cv/Mahmoud_Sharabati_CV_AR.pdf` (source `cv/Mahmoud_Sharabati_CV_AR.html`, right to left, 2 pages), a translation of the English one. On the Arabic page both CV links switch to it through `data-i18n-attr="href=cv.href;download=cv.file"`.
- Arabic is set in **Geeza Pro**: it extracts as plain Arabic letters, whereas Arial extracts as presentation forms that ATS search misses.
- Latin runs (`.ltr`, `bdi`) are set in **Arial**, so emails and tool names extract without stray spaces.
- All 11 test phrases extract after NFKC normalisation and whitespace collapsing. **Keep the two CVs in step.**

- **ATS rules, keep them:**
  - one column; real selectable text in Arial
  - standard section names: Summary, Experience, Projects, Skills, Education, Awards & Competitive Programming, Volunteering
  - no tables, images, icons, or text in page headers and footers
  - dates as "Mon YYYY - Mon YYYY"; ligatures off so "fi" extracts as two letters
- **Content:** it mirrors the site, which is the source of truth, so **when the site's experience or projects change, update both CVs too**.
- **Rebuild after editing the HTML:**
  1. `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf="$PWD/cv/Mahmoud_Sharabati_CV.pdf" "file://$PWD/cv/Mahmoud_Sharabati_CV.html"`
  2. With pypdf, set the PDF metadata: Title "Mahmoud Sharabati - Senior .NET Core Developer - CV", Author, Subject, and Keywords listing the stack.
  3. Check that the text extracts in reading order (`PdfReader(...).pages[i].extract_text()`) and that it is still 2 pages.

## Derived assets (not reproducible from the repo alone)

- **`mahmoud-cutout-1100.webp` / `-640.webp`:**
  - Cut out on-device with Apple Vision (`VNGenerateForegroundInstanceMaskRequest` in a small Swift script).
  - Then the edge colours were cleaned up and small arm/torso gaps filled.
  - The source `20260907_135602.jpg` has EXIF orientation 8: bake the rotation in and strip EXIF.
- **`og-image.jpg`** (1200×630). Re-render it after **any** hero or topbar change:
  1. Serve a copy of `index.html` over HTTP next to the assets, with this injected in `<head>`: `<style>.nav, .theme-toggle, .hero-type, .hero-intro, .hero-actions, .facts, .skip-link { display: none !important; }</style>`.
  2. Screenshot it, with `?theme=dark` on the URL: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1200,630 --virtual-time-budget=5000 --screenshot=og-2x.png <url>`
  3. Convert it: `sips -s format jpeg -s formatOptions 88 -z 630 1200 og-2x.png --out og-image.jpg`
- **LinkedIn banners** (`linkedin-banner-1584x396.png`, `-3168x792.png`, rebuilt 2026-10-19):
  - An HTML page rendered at 1584×396 with `--force-device-scale-factor=2`, downscaled with Lanczos for the 1584 version.
  - Content: dark ink with violet glows and faint server-log text; "SENIOR .NET CORE DEVELOPER", the name ("Sharabati" in lilac), "Clean Architecture · Domain-Driven Design · Blazor", a facts line, seven stack chips, and the Hex mark with محمود شراباتي on the right.
  - Text starts at x 420, which leaves the bottom-left clear for the LinkedIn profile photo.
- **`certificate.webp`:** page 1 of `Certificate.pdf` rendered at 2× (PDFKit).
- **`apps/<key>/icon.webp` and `1..4.webp`** (440px wide): taken from the public store listings.
  - Google Play: the `<img>` URLs with alt "Icon image" or "Screenshot image", plus a `=s512` or `=h1600` suffix.
  - App Store: `itunes.apple.com/lookup?id=…` (`artworkUrl512`, `screenshotUrls`).

## Checking changes locally

- **Serve:** `python3 -m http.server 8000 --bind 127.0.0.1` from the repo, then open http://127.0.0.1:8000/.
- **Screenshots:** headless Chrome as above. Check 1440×900, 1280×720, 1000×540 (close to his laptop window) and 1920×1080.
  - Below about 500px wide, headless screenshots crop strangely, so check phone layout in a real browser.
- **Headless Chrome only paints about 2 animation frames,** so screenshots can't show motion. To check an animation:
  1. Load the page in an `<iframe>` inside a probe page.
  2. Fast-forward the loop in a loop of `tick(1/60); draw(1/60)`.
  3. Export the canvas with `toDataURL`, then read it back through `--dump-dom`.
- **WebGL in headless Chrome:** works without flags. `--disable-gpu`, or forcing SwiftShader with `--use-gl=angle`, turns it off.
- **Smoke test:** load the page in a probe iframe and collect `error` events. Headless iframes barely render frames, so check scroll-driven behaviour (scroll focus) with screenshots of a copy that hides the other sections instead.
- **Anchor URLs (`#contact`) don't scroll in headless screenshots;** hide the sections above instead.

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
  - The ?lab panel became a hideable drawer and gained a Logo row with 15 marks.
  - Store links checked; Wasiitak's App Store link and the Mr Course and Bronz download counts added. Experience roles gained numbers, "Built here" links and stack chips.
  - Added the hero typing line ("› I build …"), and Arabic now applies at parse end (no English flash).
  - Added an ATS-friendly 2-page CV (`cv/`) and a Download CV button.
  - Volunteering became its own "Volunteering & leadership" timeline section; ?lab gained an Exp. row with 10, then 15, layouts for it and Experience.
  - ?lab gained a Footer row with 5 designs; the portrait was lifted to line up with the Arabic name again.
  - The footer was rebuilt: six equal contact channels, copy buttons, a vCard, the local time in Aleppo, and Back to top.
  - He picked his options: Logs background, Orbit behind the photo, Hex logo (all brand files rebuilt), Scroll focus for Experience, Composer footer. The drawer was removed.
  - Three.js now lazy-loads near the Skills section; added an Arabic CV for the Arabic page; rebuilt the LinkedIn banners with Senior and the Hex logo.
  - Content rewritten from his CV and LinkedIn in senior-CV style. Added the key-numbers strip, the Platforms section (Matp, 30-S, QrGermany, template), feature chips on the app cards, tighter Evolvo and Elkood bullets, and EF Core, SOLID and Git in Skills.

## Open items

- Suggest he fix the Blue Bits dates on LinkedIn (Nov 2020 – Nov 2022).
- Confirm that +963 985 839 618 is on WhatsApp; remove the WhatsApp card if not.
- If he gives real numbers for HASH (systems, clients, users), add a `role-stats` row to that role.
- Confirm the HASH title, location and employment type.
- LinkedIn and others cache old link previews; refresh them with LinkedIn's Post Inspector after hero changes.
