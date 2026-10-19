// Logo options: fifteen flat marks to compare in the top bar, switchable live.
// Loaded with the other options (?lab links only) and adds a "Logo" row to their drawer.
// Every mark is drawn on a 128 × 128 grid and coloured through CSS variables (--logo-main, --logo-gold,
// --logo-cut, --logo-on), so it follows the dark and light themes. The two marks that use ش take the
// real glyph from Reem Kufi (weight 600), shaped with HarfBuzz, so the letter is exact.
(() => {
  const lab = document.querySelector('.lab'), brand = document.querySelector('.brand');
  if (!lab || !brand) return;
  const SHIN = 'M59 -64.2Q56.6 -64.2 54.9 -65.9Q53.2 -67.6 53.2 -70Q53.2 -72.4 54.9 -74.1Q56.6 -75.8 59 -75.8Q61.4 -75.8 63.1 -74.1Q64.8 -72.4 64.8 -70Q64.8 -67.6 63.1 -65.9Q61.4 -64.2 59 -64.2ZM67.6 -49.2Q65.2 -49.2 63.5 -50.9Q61.8 -52.6 61.8 -55Q61.8 -57.4 63.5 -59.1Q65.2 -60.8 67.6 -60.8Q70 -60.8 71.7 -59.1Q73.4 -57.4 73.4 -55Q73.4 -52.6 71.7 -50.9Q70 -49.2 67.6 -49.2ZM50.3 -49.2Q47.9 -49.2 46.2 -50.9Q44.5 -52.6 44.5 -55Q44.5 -57.4 46.2 -59.1Q47.9 -60.8 50.3 -60.8Q52.7 -60.8 54.4 -59.1Q56.1 -57.4 56.1 -55Q56.1 -52.6 54.4 -50.9Q52.7 -49.2 50.3 -49.2ZM42.5 -12.67H51.83V-29.87L64.5 -32.67V-12.67H71.83V-29.87L84.5 -32.67V-2.3Q84.5 -1.1 83.5 -0.6Q82.5 -0.1 81.5 -0.05Q80.5 0 80.5 0H42.5ZM21.6 20Q15.5 20 11.7 17.8Q7.9 15.6 5.9 12.3Q3.9 9 3.2 5.65Q2.5 2.3 2.5 0Q2.5 -4.4 4.35 -8.4Q6.2 -12.4 9.1 -15.55Q12 -18.7 15.1 -20.7Q15.3 -18.8 14.9 -17.1Q14.5 -15.4 13.1 -13.5Q14.2 -13 14.95 -11.72Q15.7 -10.43 16 -9Q16.3 -7.57 16 -6.37Q14.47 -7.63 13.05 -7.78Q11.63 -7.93 10.23 -7.27Q8.37 -6.5 7.3 -4.57Q6.23 -2.63 6.23 0.07Q6.23 3.93 7.92 7.15Q9.6 10.37 12.77 12.33Q15.93 14.3 20.4 14.3Q24.7 14.3 27.2 12.05Q29.7 9.8 30.77 5.65Q31.83 1.5 31.83 -4V-29.87L44.5 -32.67V0Q44.5 5.6 41.9 10.15Q39.3 14.7 34.25 17.35Q29.2 20 21.6 20Z';

  const svg = (inner) => `<svg viewBox="0 0 128 128" aria-hidden="true">${inner}</svg>`;
  const main = 'style="fill: var(--logo-main)"', gold = 'style="fill: var(--logo-gold)"';
  const line = (colour, width) => `fill="none" style="stroke: var(--logo-${colour})" stroke-width="${width}" stroke-linecap="square" stroke-linejoin="miter"`;
  const round = (colour, width) => `fill="none" style="stroke: var(--logo-${colour})" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`;
  const hexPts = (R) => Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 3;
    return `${(64 + Math.cos(a) * R).toFixed(1)},${(64 + Math.sin(a) * R).toFixed(1)}`;
  }).join(' ');
  const starPts = (R) => Array.from({ length: 16 }, (_, k) => {
    const a = -Math.PI / 2 + k * Math.PI / 8, r = k % 2 ? R * Math.SQRT1_2 / Math.cos(Math.PI / 8) : R;
    return `${(64 + Math.cos(a) * r).toFixed(1)},${(64 + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');

  const options = [
    { key: 'now', label: 'Now', html: '',
      note: '<strong>Now.</strong> The current logo: the flat M / ش ambigram (turned upside down, the M reads as ش and the three gold diamonds become its dots).' },
    { key: 'hex', label: 'Hex', html: svg(`
        <polygon points="${hexPts(56)}" ${line('main', 8)}/>
        <polyline points="40,86 40,44 64,70 88,44 88,86" ${line('main', 10)}/>
        <rect x="59" y="96" width="10" height="10" transform="rotate(45 64 101)" ${gold}/>`),
      note: '<strong>1 · Hex.</strong> The M inside a pointy-top hexagon, the shape of the .NET mark and of the Clean Architecture layers, with one gold diamond under the V.' },
    { key: 'layers', label: 'Layers', html: svg(`
        <polygon points="${hexPts(56)}" ${line('main', 6)} opacity=".45"/>
        <polygon points="${hexPts(38)}" ${line('main', 11)}/>
        <polygon points="${hexPts(17)}" ${gold}/>`),
      note: '<strong>2 · Layers.</strong> Clean Architecture flattened into a badge: two hexagonal rings around a gold Domain core. Flat, no 3D.' },
    { key: 'tag', label: 'Tag', html: svg(`
        <polyline points="26,42 8,64 26,86" ${line('gold', 8)}/>
        <polyline points="38,86 38,42 57,66 76,42 76,86" ${line('main', 9)}/>
        <line x1="88" y1="90" x2="98" y2="38" ${line('gold', 8)}/>
        <polyline points="104,42 122,64 104,86" ${line('gold', 8)}/>`),
      note: '<strong>3 · Tag.</strong> The M written as a self-closing component, <em>&lt;M /&gt;</em>, the way a Blazor or React component is used.' },
    { key: 'braces', label: 'Braces', html: svg(`
        <path d="M30 32 C20 32 22 44 22 52 C22 60 16 64 11 64 C16 64 22 68 22 76 C22 84 20 96 30 96" ${round('gold', 8)}/>
        <path d="M98 32 C108 32 106 44 106 52 C106 60 112 64 117 64 C112 64 106 68 106 76 C106 84 108 96 98 96" ${round('gold', 8)}/>
        <polyline points="40,86 40,44 64,70 88,44 88,86" ${line('main', 10)}/>`),
      note: '<strong>4 · Braces.</strong> The M inside C# curly braces: a block of code with his initial as the body.' },
    { key: 'dotnet', label: '.M', html: svg(`
        <rect x="10" y="74" width="20" height="20" ${gold}/>
        <polygon points="40,94 40,34 51,34 76,66 101,34 112,34 112,94 98,94 98,58 76,86 54,58 54,94" ${main}/>`),
      note: '<strong>5 · .M</strong> Named like <em>.NET</em>: a square gold dot before a heavy M. Short, bold, and instantly tied to his stack.' },
    { key: 'monoline', label: 'Monoline', html: svg(`
        <path d="M22 96 V38 Q22 24 33 35 L64 70 L95 35 Q106 24 106 38 V96" ${round('main', 10)}/>
        <circle cx="64" cy="100" r="8" ${gold}/>`),
      note: '<strong>6 · Monoline.</strong> The M drawn in one rounded stroke, like a pen line, with a single gold dot under the V.' },
    { key: 'matrix', label: 'Matrix', html: svg(
        [0, 1, 2, 3, 4].flatMap((c) => [0, 1, 2, 3, 4].map((r) => {
          const on = c === 0 || c === 4 || (r === 1 && (c === 1 || c === 3)) || (r === 2 && c === 2);
          const isGold = c === 2 && r === 4;
          return `<circle cx="${20 + c * 22}" cy="${20 + r * 22}" r="${on || isGold ? 8 : 4}" ${isGold ? gold : main} ${on || isGold ? '' : 'opacity=".22"'}/>`;
        })).join('')),
      note: '<strong>7 · Matrix.</strong> The M lit up on a 5 × 5 grid of dots, like an LED display, with the gold dot for ش underneath.' },
    { key: 'circuit', label: 'Circuit', html: svg(`
        <polyline points="24,104 24,36 64,76 104,36 104,104" ${round('main', 7)}/>
        <line x1="64" y1="76" x2="64" y2="104" ${round('main', 7)}/>
        <circle cx="24" cy="104" r="8" ${gold}/><circle cx="104" cy="104" r="8" ${gold}/><circle cx="64" cy="104" r="8" ${gold}/>
        <circle cx="24" cy="36" r="5" ${main}/><circle cx="104" cy="36" r="5" ${main}/>`),
      note: '<strong>8 · Circuit.</strong> The M as traces on a circuit board, with a third trace dropping from the V and three gold pads: the three dots of ش again.' },
    { key: 'bauhaus', label: 'Bauhaus', html: svg(`
        <rect x="14" y="28" width="24" height="80" ${main}/>
        <rect x="90" y="28" width="24" height="80" ${main}/>
        <polygon points="38,28 90,28 64,80" ${gold}/>`),
      note: '<strong>9 · Bauhaus.</strong> The M built from three flat shapes: two violet pillars and a gold triangle. Bold and geometric.' },
    { key: 'star', label: 'Star', html: svg(`
        <polygon points="${starPts(58)}" ${line('main', 6)}/>
        <polyline points="45,80 45,50 64,70 83,50 83,80" ${line('gold', 8)}/>`),
      note: '<strong>10 · Star.</strong> The eight-point star of Aleppo\'s stone and woodwork, with a gold M at its heart.' },
    { key: 'arch', label: 'Arch', html: svg(`
        <path d="M22 118 V58 C22 34 44 18 64 8 C84 18 106 34 106 58 V118" ${line('main', 8)}/>
        <polyline points="44,104 44,62 64,84 84,62 84,104" ${line('gold', 8)}/>`),
      note: '<strong>11 · Arch.</strong> A pointed Aleppo arch with the M standing in the doorway.' },
    { key: 'shin', label: 'ش', html: svg(`
        <rect x="8" y="8" width="112" height="112" rx="28" ${main}/>
        <path d="${SHIN}" transform="translate(31.37 84.93) scale(.75)" style="fill: var(--logo-on)"/>
        <rect x="48" y="104" width="32" height="5" rx="2.5" ${gold}/>`),
      note: '<strong>12 · ش.</strong> His Arabic initial, ش from شراباتي, in the site\'s Kufic font on a violet app-icon tile with a gold underline.' },
    { key: 'pair', label: 'M | ش', html: svg(`
        <polyline points="10,92 10,40 31,64 52,40 52,92" ${line('main', 9)}/>
        <rect x="61" y="30" width="6" height="68" ${gold}/>
        <path d="${SHIN}" transform="translate(68.42 81.69) scale(.634)" ${main}/>`),
      note: '<strong>13 · M | ش.</strong> Bilingual: the Latin M and the Arabic ش side by side, divided by a gold bar, like the site itself.' },
    { key: 'diamond', label: 'Diamond', html: svg(`
        <polygon points="64,4 124,64 64,124 4,64" ${main}/>
        <polyline points="42,80 42,50 64,72 86,50 86,80" fill="none" style="stroke: var(--logo-cut)" stroke-width="9" stroke-linecap="square"/>
        <polygon points="64,98 71,105 64,112 57,105" ${gold}/>`),
      note: '<strong>14 · Diamond.</strong> A solid violet diamond with the M cut out of it, picking up the diamond shapes of the current logo\'s dots.' },
    { key: 'fold', label: 'Fold', html: svg(`
        <rect x="16" y="28" width="22" height="80" ${main}/>
        <polygon points="16,28 40,28 76,82 52,82" style="fill: var(--logo-shade)"/>
        <polygon points="52,82 76,82 112,28 88,28" ${main}/>
        <rect x="90" y="28" width="22" height="80" style="fill: var(--logo-shade)"/>
        <polygon points="52,82 76,82 64,100" ${gold}/>`),
      note: '<strong>15 · Fold.</strong> The M as a folded ribbon in two shades of violet, with a gold tip where the fold meets.' },
  ];

  /* ── drawer row, top-bar swap and preview ── */
  const row = document.createElement('div');
  row.className = 'lab-row';
  row.innerHTML = '<span class="lab-label">Logo</span><div class="lab-bar"></div>';
  [...lab.querySelectorAll('.lab-row')].pop().after(row);
  const bar = row.querySelector('.lab-bar'), note = lab.querySelector('.lab-note');
  options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = i ? `${i} ${opt.label}` : opt.label; b.dataset.logo = opt.key;
    b.addEventListener('click', () => choose(opt.key, true));
    bar.append(b);
  });
  const slot = document.createElement('span');
  slot.className = 'lab-logo';
  brand.prepend(slot);

  const nowMark = '<img src="brand/mark.svg" alt="" width="64" height="64">';
  const nowMarkLight = '<img src="brand/mark-light.svg" alt="" width="64" height="64">';
  function preview(opt) {
    // the chosen mark at a readable size, on dark and on light, beside its note
    const dark = opt.html || nowMark, light = opt.html || nowMarkLight;
    return `<span class="lab-preview"><span class="lab-tile is-dark">${dark}</span><span class="lab-tile is-light">${light}</span></span>`;
  }
  function choose(key, announce) {
    const opt = options.find((o) => o.key === key) || options[0];
    slot.innerHTML = opt.html;
    document.documentElement.dataset.logo = opt.key;
    bar.querySelectorAll('[data-logo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.logo === opt.key)));
    if (announce) note.innerHTML = preview(opt) + '<span>' + opt.note + '</span>';
    const url = new URL(location.href);
    url.searchParams.set('logo', opt.key);
    history.replaceState(null, '', url);
  }
  choose(new URLSearchParams(location.search).get('logo') || 'now', false);
})();
