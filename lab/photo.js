// Photo backdrops: ten candidates for what sits behind the hero portrait, switchable live.
// Loaded with the background options (?lab links only) and adds a "Photo" row to their panel.
// Each backdrop is an SVG in the cutout's own coordinates (1100 × 1316): the head spans
// x 435–748 from y 12, the neck ends near y 400 and the shoulders widen to the full width below.
(() => {
  const portrait = document.querySelector('.portrait-frame'), lab = document.querySelector('.lab');
  if (!portrait || !lab) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;

  const holder = document.createElement('div');
  holder.className = 'halo';
  holder.setAttribute('aria-hidden', 'true');
  portrait.prepend(holder);

  const svg = (inner) => `<svg viewBox="0 0 1100 1316">${inner}</svg>`;
  const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const hex = (cx, cy, R) => pts(Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 3;
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
  }));
  // the eight-point star of two overlapping squares: points on R, inner corners on R·cos45°/cos22.5°
  const star = (cx, cy, R, turn = 0) => pts(Array.from({ length: 16 }, (_, k) => {
    const a = turn - Math.PI / 2 + k * Math.PI / 8, r = k % 2 ? R * Math.SQRT1_2 / Math.cos(Math.PI / 8) : R;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  }));
  const spin = (el, deg, cx, cy) => el && el.setAttribute('transform', `rotate(${deg.toFixed(2)} ${cx} ${cy})`);

  /* ── 1. Circle ── */
  const circle = {
    key: 'circle', label: 'Circle',
    note: '<strong>1 · Circle.</strong> The classic: a disc of colour behind the head and shoulders with a thin <em>gold rim</em>, the head just breaking out of the top, and a dotted ring turning slowly around it. Clean and safe.',
    html: svg(`
      <defs><radialGradient id="h-circle" cx="50%" cy="30%" r="70%">
        <stop offset="0" stop-color="#7b5cff"/><stop offset=".55" stop-color="#4b2cc6"/><stop offset="1" stop-color="#1a1036"/>
      </radialGradient></defs>
      <circle cx="585" cy="500" r="470" fill="url(#h-circle)"/>
      <circle cx="585" cy="500" r="470" fill="none" stroke="#f2c66d" stroke-opacity=".75" stroke-width="3"/>
      <circle data-spin cx="585" cy="500" r="515" fill="none" stroke="#b6a3ff" stroke-opacity=".45" stroke-width="5" stroke-dasharray="1 22" stroke-linecap="round"/>`),
    frame: (el, t) => spin(el.querySelector('[data-spin]'), t * 4, 585, 500),
  };

  /* ── 2. Hexagon ── */
  const hexagon = {
    key: 'hexagon', label: 'Hexagon',
    note: '<strong>2 · Hexagon.</strong> A flat badge in the shape of the logo and the layer diagram: a violet hexagon whose top point frames the head, with a <em>gold dashed outline marching</em> around it.',
    html: svg(`
      <defs><linearGradient id="h-hex" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a46f0"/><stop offset="1" stop-color="#1f1147"/>
      </linearGradient></defs>
      <polygon points="${hex(585, 560, 560)}" fill="url(#h-hex)" stroke="#b6a3ff" stroke-opacity=".6" stroke-width="3"/>
      <polygon points="${hex(585, 560, 495)}" fill="none" stroke="#b6a3ff" stroke-opacity=".2" stroke-width="2"/>
      <polygon data-march points="${hex(585, 560, 615)}" fill="none" stroke="#f2c66d" stroke-opacity=".6" stroke-width="3" stroke-dasharray="44 22"/>`),
    frame: (el, t) => el.querySelector('[data-march]')?.setAttribute('stroke-dashoffset', (-t * 18).toFixed(1)),
  };

  /* ── 3. Arch ── */
  const arch = {
    key: 'arch', label: 'Arch',
    note: '<strong>3 · Arch.</strong> A pointed arch like the doorways and mihrabs of Aleppo, with a <em>gold outline</em> and a faint eight-point star lattice inside, lit softly from the top. He stands in the doorway; the shoulders break past its sides.',
    html: svg(`
      <defs>
        <linearGradient id="h-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3a1f9a"/><stop offset=".6" stop-color="#22124f"/><stop offset="1" stop-color="#1a1036"/>
        </linearGradient>
        <radialGradient id="h-arch-light" gradientUnits="userSpaceOnUse" cx="585" cy="120" r="520">
          <stop offset="0" stop-color="#f2c66d" stop-opacity=".35"/><stop offset="1" stop-color="#f2c66d" stop-opacity="0"/>
        </radialGradient>
        <pattern id="h-arch-stars" width="96" height="96" patternUnits="userSpaceOnUse">
          <polygon points="${star(48, 48, 34)}" fill="none" stroke="#b6a3ff" stroke-opacity=".28" stroke-width="2"/>
        </pattern>
      </defs>
      <path d="M190 1316 V430 C190 190 410 70 585 -20 C760 70 980 190 980 430 V1316 Z" fill="url(#h-arch)" stroke="#f2c66d" stroke-opacity=".8" stroke-width="4"/>
      <path d="M238 1316 V440 C238 226 436 118 585 34 C734 118 932 226 932 440 V1316 Z" fill="url(#h-arch-stars)" stroke="#b6a3ff" stroke-opacity=".4" stroke-width="2"/>
      <path d="M238 1316 V440 C238 226 436 118 585 34 C734 118 932 226 932 440 V1316 Z" fill="url(#h-arch-light)"/>`),
  };

  /* ── 4. Star ── */
  const starOption = {
    key: 'star', label: 'Star',
    note: '<strong>4 · Star.</strong> The eight-point star of Aleppo\'s carved stone (two overlapping squares), large behind the head and shoulders with nested outlines in gold and lilac, <em>turning very slowly</em>.',
    html: svg(`
      <defs><radialGradient id="h-star" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#6a46f0"/><stop offset="1" stop-color="#2c1a6e"/>
      </radialGradient></defs>
      <g data-spin>
        <polygon points="${star(590, 380, 500)}" fill="url(#h-star)" stroke="#f2c66d" stroke-opacity=".8" stroke-width="3"/>
        <polygon points="${star(590, 380, 420, Math.PI / 8)}" fill="none" stroke="#b6a3ff" stroke-opacity=".35" stroke-width="2"/>
        <polygon points="${star(590, 380, 330)}" fill="none" stroke="#f2c66d" stroke-opacity=".3" stroke-width="2"/>
      </g>`),
    frame: (el, t) => spin(el.querySelector('[data-spin]'), t * 3, 590, 380),
  };

  /* ── 5. Name ── */
  const name = {
    key: 'name', label: 'Name',
    note: '<strong>5 · Name.</strong> Editorial, like a magazine cover: a giant <em>محمود</em> in Kufic letters behind the head, filled with a violet fade and echoed by a thin gold outline.',
    html: svg(`
      <defs><linearGradient id="h-name" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b6a3ff" stop-opacity=".95"/><stop offset="1" stop-color="#512bd4" stop-opacity=".3"/>
      </linearGradient></defs>
      <text x="600" y="360" text-anchor="middle" font-family="'Reem Kufi', 'Geeza Pro', sans-serif" font-weight="600" font-size="500"
        fill="none" stroke="#f2c66d" stroke-opacity=".55" stroke-width="2.5" transform="translate(16 16)">محمود</text>
      <text x="600" y="360" text-anchor="middle" font-family="'Reem Kufi', 'Geeza Pro', sans-serif" font-weight="600" font-size="500" fill="url(#h-name)">محمود</text>`),
  };

  /* ── 6. Ring text ── */
  const ring = {
    key: 'ring', label: 'Ring text',
    note: '<strong>6 · Ring text.</strong> A circular badge around the head: <em>SENIOR .NET DEVELOPER • CLEAN ARCHITECTURE • DOMAIN-DRIVEN DESIGN • BLAZOR</em> running round it, turning slowly, over a soft violet disc.',
    html: svg(`
      <defs>
        <path id="h-ring-path" d="M590 -60 a370 370 0 1 1 0 740 a370 370 0 1 1 0 -740"/>
        <radialGradient id="h-ring" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#6a46f0" stop-opacity=".85"/><stop offset=".75" stop-color="#4b2cc6" stop-opacity=".45"/><stop offset="1" stop-color="#4b2cc6" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="590" cy="310" r="335" fill="url(#h-ring)"/>
      <circle cx="590" cy="310" r="322" fill="none" stroke="#b6a3ff" stroke-opacity=".3" stroke-width="2"/>
      <circle cx="590" cy="310" r="418" fill="none" stroke="#b6a3ff" stroke-opacity=".3" stroke-width="2"/>
      <g data-spin>
        <text font-family="Archivo, sans-serif" font-weight="700" font-size="40" style="font-stretch: 118%; fill: var(--stone)" fill-opacity=".85">
          <textPath href="#h-ring-path" textLength="2290" lengthAdjust="spacing">SENIOR .NET DEVELOPER <tspan fill="#f2c66d">•</tspan> CLEAN ARCHITECTURE <tspan fill="#f2c66d">•</tspan> DOMAIN-DRIVEN DESIGN <tspan fill="#f2c66d">•</tspan> BLAZOR <tspan fill="#f2c66d">•</tspan></textPath>
        </text>
      </g>`),
    frame: (el, t) => spin(el.querySelector('[data-spin]'), t * 6, 590, 310),
  };

  /* ── 7. Orbit ── */
  const orbits = [
    { cx: 590, cy: 300, rx: 520, ry: 150, tilt: -10, speed: .16, labels: ['C#', '.NET Core', 'Blazor', 'PostgreSQL', 'Docker', 'DDD'] },
    { cx: 590, cy: 470, rx: 500, ry: 135, tilt: 12, speed: -.12, labels: ['ASP.NET Core', 'Clean Architecture', 'MudBlazor', 'Linux', 'Nginx', 'Stripe API'] },
  ];
  const orbit = {
    key: 'orbit', label: 'Orbit',
    note: '<strong>7 · Orbit.</strong> The real stack from the Skills section (C#, .NET Core, Blazor, PostgreSQL, Docker, DDD…) as tags <em>orbiting on two tilted rings</em> around the head; tags on the far side shrink and dim.',
    html: svg(`
      <defs><radialGradient id="h-orbit" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#6a46f0" stop-opacity=".7"/><stop offset="1" stop-color="#6a46f0" stop-opacity="0"/>
      </radialGradient></defs>
      <circle cx="590" cy="360" r="420" fill="url(#h-orbit)"/>
      ${orbits.map((o) => `<ellipse cx="${o.cx}" cy="${o.cy}" rx="${o.rx}" ry="${o.ry}" transform="rotate(${o.tilt} ${o.cx} ${o.cy})" fill="none" stroke="#b6a3ff" stroke-opacity=".3" stroke-width="2" stroke-dasharray="6 10"/>`).join('')}
      ${orbits.map((o, i) => o.labels.map((l, j) => {
        const w = 44 + l.length * 17;
        return `<g data-tag="${i}-${j}"><rect x="${-w / 2}" y="-27" width="${w}" height="54" rx="27" fill="#1a1036" fill-opacity=".92" stroke="${j % 3 ? '#b6a3ff' : '#f2c66d'}" stroke-opacity=".55" stroke-width="2"/><text text-anchor="middle" y="10" font-family="Archivo, sans-serif" font-weight="600" font-size="28" fill="#eee7d8">${l.replace('&', '&amp;')}</text></g>`;
      }).join('')).join('')}`),
    frame(el, t) {
      orbits.forEach((o, i) => {
        const tilt = o.tilt * Math.PI / 180, ct = Math.cos(tilt), st = Math.sin(tilt);
        o.labels.forEach((_, j) => {
          const a = j / o.labels.length * TAU + t * o.speed + i;
          const ex = Math.cos(a) * o.rx, ey = Math.sin(a) * o.ry, depth = (Math.sin(a) + 1) / 2;
          const g = el.querySelector(`[data-tag="${i}-${j}"]`);
          g.setAttribute('transform', `translate(${(o.cx + ex * ct - ey * st).toFixed(1)} ${(o.cy + ex * st + ey * ct).toFixed(1)}) scale(${(.78 + .22 * depth).toFixed(3)})`);
          g.setAttribute('opacity', (.5 + .5 * depth).toFixed(3));
        });
      });
    },
  };

  /* ── 8. Code ── */
  const K = '#b6a3ff', T = '#f2c66d', N = '#eee7d8', P = '#a49bc2';
  const code = [
    [['namespace ', K], ['Shop.Domain.Orders', N], [';', P]],
    [],
    [['public sealed class ', K], ['Order', T], [' : ', P], ['AggregateRoot', T], ['<', P], ['OrderId', T], ['>', P]],
    [['{', P]],
    [['    private readonly ', K], ['List', T], ['<', P], ['OrderLine', T], ['> _lines = [];', P]],
    [],
    [['    public ', K], ['Result', T], [' Place(', N], ['Customer', T], [' buyer)', N]],
    [['    {', P]],
    [['        if ', K], ['(_lines.Count == 0) ', N], ['return ', K], ['OrderErrors', T], ['.Empty;', N]],
    [['        Raise(', N], ['new ', K], ['OrderPlaced', T], ['(Id, buyer.Id));', N]],
    [['        return ', K], ['Result', T], ['.Success();', N]],
    [['    }', P]],
    [['}', P]],
  ];
  const codeLen = code.reduce((n, line) => n + line.reduce((m, [s]) => m + s.length, 0) + 1, 0);
  // non-breaking spaces keep the indentation (SVG text collapses ordinary ones)
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '\u00a0');
  const codeView = {
    key: 'code', label: 'Code',
    note: '<strong>8 · Code.</strong> An editor window behind the head with a Domain-Driven Design aggregate in C# <em>typing itself out</em>, in the site\'s colours; the start and end of each line show around the head and the rest hides behind the shoulders.',
    html: svg(`
      <rect x="40" y="70" width="1020" height="620" rx="28" fill="#1a1036" fill-opacity=".94" stroke="#b6a3ff" stroke-opacity=".3" stroke-width="2"/>
      <path d="M40 150 H1060" stroke="#b6a3ff" stroke-opacity=".18" stroke-width="2"/>
      <circle cx="88" cy="110" r="11" fill="#ff5f57"/><circle cx="124" cy="110" r="11" fill="#febc2e"/><circle cx="160" cy="110" r="11" fill="#28c840"/>
      <text x="210" y="120" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="26" fill="#a49bc2">Order.cs</text>
      <g data-code font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="27"></g>`),
    frame(el, t) {
      // type for 7 s, hold for 3 s, start again; reduced motion shows the whole file
      const shown = t === null ? codeLen : Math.floor(Math.min(1, (t % 10) / 7) * codeLen);
      const g = el.querySelector('[data-code]');
      if (g.dataset.shown === String(shown)) return;
      g.dataset.shown = shown;
      let left = shown, out = '';
      code.forEach((line, i) => {
        if (left < 0) return;
        const spans = [];
        for (const [s, c] of line) {
          if (left <= 0) break;
          spans.push(`<tspan fill="${c}">${esc(s.slice(0, left))}</tspan>`);
          left -= s.length;
        }
        left -= 1;
        out += `<text x="80" y="${200 + i * 40}">${spans.join('')}${left < 0 && t !== null ? '<tspan fill="#f2c66d">▍</tspan>' : ''}</text>`;
      });
      g.innerHTML = out;
    },
  };

  /* ── 9. Rays ── */
  const wedges = Array.from({ length: 28 }, (_, i) => {
    const a = i / 28 * TAU, w = Math.PI / 36, R = 900, cx = 590, cy = 300;
    const p = [[cx, cy], [cx + Math.cos(a - w) * R, cy + Math.sin(a - w) * R], [cx + Math.cos(a + w) * R, cy + Math.sin(a + w) * R]];
    return `<polygon points="${pts(p)}" fill="url(#${i % 4 ? 'h-rays' : 'h-rays-gold'})"/>`;
  }).join('');
  const rays = {
    key: 'rays', label: 'Rays',
    note: '<strong>9 · Rays.</strong> Light breaking out from behind the head: lilac rays with <em>every fourth one gold</em>, fading with distance and turning slowly, around a warm glow.',
    html: svg(`
      <defs>
        <radialGradient id="h-rays" gradientUnits="userSpaceOnUse" cx="590" cy="300" r="760">
          <stop offset="0" stop-color="#b6a3ff" stop-opacity=".5"/><stop offset=".55" stop-color="#6a46f0" stop-opacity=".16"/><stop offset="1" stop-color="#6a46f0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="h-rays-gold" gradientUnits="userSpaceOnUse" cx="590" cy="300" r="760">
          <stop offset="0" stop-color="#f2c66d" stop-opacity=".55"/><stop offset=".55" stop-color="#f2c66d" stop-opacity=".14"/><stop offset="1" stop-color="#f2c66d" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="h-rays-core" gradientUnits="userSpaceOnUse" cx="590" cy="300" r="330">
          <stop offset="0" stop-color="#f2c66d" stop-opacity=".4"/><stop offset=".5" stop-color="#7b5cff" stop-opacity=".3"/><stop offset="1" stop-color="#7b5cff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g data-spin>${wedges}</g>
      <circle cx="590" cy="300" r="330" fill="url(#h-rays-core)"/>`),
    frame: (el, t) => spin(el.querySelector('[data-spin]'), t * 2.5, 590, 300),
  };

  /* ── 10. Blob ── */
  const blobPath = (R, t, phase) => {
    let d = '';
    for (let i = 0; i <= 96; i++) {
      const a = i / 96 * TAU;
      const r = R * (1 + .07 * Math.sin(3 * a + .6 * t + phase) + .05 * Math.sin(5 * a - .9 * t + 1 + phase) + .03 * Math.sin(7 * a + .4 * t + 2));
      d += `${i ? 'L' : 'M'}${(585 + Math.cos(a) * r).toFixed(1)} ${(470 + Math.sin(a) * r).toFixed(1)}`;
    }
    return d + 'Z';
  };
  const blob = {
    key: 'blob', label: 'Blob',
    note: '<strong>10 · Blob.</strong> A soft organic shape in violet that <em>slowly changes its outline</em>, with a gold contour drifting just out of step around it. Friendly and modern.',
    html: svg(`
      <defs><radialGradient id="h-blob" cx="50%" cy="28%" r="72%">
        <stop offset="0" stop-color="#8b6dff"/><stop offset=".6" stop-color="#4b2cc6"/><stop offset="1" stop-color="#1a1036"/>
      </radialGradient></defs>
      <path data-blob fill="url(#h-blob)"/>
      <path data-edge fill="none" stroke="#f2c66d" stroke-opacity=".55" stroke-width="3"/>`),
    frame(el, t) {
      const s = t || 0;
      el.querySelector('[data-blob]').setAttribute('d', blobPath(450, s, 0));
      el.querySelector('[data-edge]').setAttribute('d', blobPath(492, s * .8, 1.7));
    },
  };

  const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  /* ── 11. Split (after Adham Dannaway's designer | coder hero) ── */
  const apiLines = [
    [['[HttpPost(', P], ['"/orders"', '#9fe0b0'], [')]', P]],
    [['public async ', K], ['Task', T], ['<', P], ['IResult', T], ['>', P]],
    [['  Place(', N], ['PlaceOrder', T], [' cmd,', N]],
    [['        ISender', T], [' bus) =>', N]],
    [['  Results', T], ['.Ok(', N]],
    [['    await ', K], ['bus.Send(cmd));', N]],
  ];
  const split = {
    key: 'split', label: 'Split',
    note: '<strong>11 · Split.</strong> After <em>Adham Dannaway</em>\'s famous designer | coder hero: one card split down the middle of the face, <em>back end</em> on the left (a C# endpoint) and <em>front end</em> on the right (a Blazor-style dashboard whose chart keeps moving), because he builds both.',
    html: svg(`
      <defs><linearGradient id="h-split-l" x1="0" x2="1"><stop offset="0" stop-color="#1a1036"/><stop offset="1" stop-color="#24145a"/></linearGradient>
        <linearGradient id="h-split-r" x1="0" x2="1"><stop offset="0" stop-color="#3b23a0"/><stop offset="1" stop-color="#2a1670"/></linearGradient></defs>
      <path d="M68 40 H590 V780 H68 a28 28 0 0 1 -28 -28 V68 a28 28 0 0 1 28 -28 Z" fill="url(#h-split-l)" fill-opacity=".95"/>
      <path d="M590 40 H1032 a28 28 0 0 1 28 28 V752 a28 28 0 0 1 -28 28 H590 Z" fill="url(#h-split-r)" fill-opacity=".95"/>
      <rect x="40" y="40" width="1020" height="740" rx="28" fill="none" stroke="#b6a3ff" stroke-opacity=".3" stroke-width="2"/>
      <path d="M590 -30 V1316" stroke="#f2c66d" stroke-opacity=".8" stroke-width="3"/>
      <polygon points="590,-48 604,-30 590,-12 576,-30" fill="#f2c66d"/>
      <text x="420" y="100" text-anchor="end" font-family="${mono}" font-size="24" letter-spacing="4" fill="#b6a3ff" fill-opacity=".8">&lt;/&gt; BACK END</text>
      <text x="770" y="100" font-family="Archivo, sans-serif" font-weight="700" font-size="24" letter-spacing="4" fill="#f2c66d" fill-opacity=".85">FRONT END ◆</text>
      <g font-family="${mono}" font-size="25">
        ${apiLines.map((line, i) => `<text x="72" y="${170 + i * 40}">${line.map(([s, c]) => `<tspan fill="${c}">${esc(s)}</tspan>`).join('')}</text>`).join('')}
        <rect data-caret x="72" y="400" width="13" height="26" fill="#f2c66d"/>
      </g>
      <rect x="770" y="140" width="260" height="250" rx="18" fill="#1a1036" fill-opacity=".55" stroke="#b6a3ff" stroke-opacity=".35" stroke-width="2"/>
      <circle cx="808" cy="182" r="20" fill="#8b6dff"/>
      <rect x="840" y="168" width="150" height="12" rx="6" fill="#eee7d8" fill-opacity=".6"/>
      <rect x="840" y="190" width="96" height="10" rx="5" fill="#b6a3ff" fill-opacity=".45"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect data-bar="${i}" x="${792 + i * 38}" width="24" rx="5" fill="${i === 3 ? '#f2c66d' : '#8b6dff'}"/>`).join('')}
      <rect x="792" y="346" width="118" height="30" rx="15" fill="#f2c66d"/>
      <rect x="922" y="346" width="86" height="30" rx="15" fill="none" stroke="#b6a3ff" stroke-opacity=".6" stroke-width="2"/>`),
    frame(el, t) {
      const s = t || 0;
      el.querySelectorAll('[data-bar]').forEach((b) => {
        const i = +b.dataset.bar, h = 34 + 50 * (.5 + .5 * Math.sin(s * 1.1 + i * 1.3));
        b.setAttribute('y', (326 - h).toFixed(1)); b.setAttribute('height', h.toFixed(1));
      });
      el.querySelector('[data-caret]')?.setAttribute('opacity', t === null || Math.floor(s * 2) % 2 ? 1 : 0);
    },
  };

  /* ── 12. Frame (the offset photo frame of many developer portfolios, e.g. Brittany Chiang's) ── */
  const offsetFrame = {
    key: 'frame', label: 'Frame',
    note: '<strong>12 · Frame.</strong> The offset photo frame that many developer portfolios use (Brittany Chiang\'s is the best known): a violet panel the head breaks out of, with a <em>gold outline offset behind it that slides in when you hover</em> the photo.',
    html: svg(`
      <defs><linearGradient id="h-frame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a3bd0"/><stop offset=".7" stop-color="#2a1670"/><stop offset="1" stop-color="#1a1036"/>
      </linearGradient></defs>
      <rect data-offset x="150" y="90" width="860" height="1300" rx="36" fill="none" stroke="#f2c66d" stroke-opacity=".85" stroke-width="4"/>
      <rect x="150" y="90" width="860" height="1300" rx="36" fill="url(#h-frame)"/>
      <rect x="150" y="90" width="860" height="1300" rx="36" fill="none" stroke="#b6a3ff" stroke-opacity=".35" stroke-width="2"/>`),
  };

  /* ── 13. Sparkles (after Josh W. Comeau's animated sparkles) ── */
  const sparkleShape = 'M0 -1 Q.14 -.14 1 0 Q.14 .14 0 1 Q-.14 .14 -1 0 Q-.14 -.14 0 -1Z';
  let sparks = [], lastT = 0;
  const sparkle = (seedA, seedR) => {
    const a = seedA * TAU, r = 290 + seedR * 260;
    return { x: 590 + Math.cos(a) * r, y: Math.min(700, 300 + Math.sin(a) * r * .9), size: 18 + Math.random() * 34, life: 1.2 + Math.random() * .8, age: 0, spin: (Math.random() - .5) * 120, gold: Math.random() < .7 };
  };
  const sparkles = {
    key: 'sparkles', label: 'Sparkles',
    note: '<strong>13 · Sparkles.</strong> After <em>Josh W. Comeau\'s animated sparkles</em>: four-point stars in gold and lilac that keep popping in, turning and fading out around the head, over a soft violet glow. Playful and warm.',
    html: svg(`
      <defs><radialGradient id="h-sparkles" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#6a46f0" stop-opacity=".8"/><stop offset="1" stop-color="#6a46f0" stop-opacity="0"/>
      </radialGradient></defs>
      <circle cx="590" cy="380" r="520" fill="url(#h-sparkles)"/>
      <g data-sparks></g>`),
    frame(el, t) {
      const g = el.querySelector('[data-sparks]');
      if (t === null) {
        sparks = Array.from({ length: 11 }, (_, i) => Object.assign(sparkle(i / 11, (i * 7 % 11) / 11), { age: .6 }));
      } else {
        const dt = Math.max(0, Math.min(.1, t - lastT));
        lastT = t;
        if (t < .05) sparks = [];
        sparks.forEach((s) => { s.age += dt; });
        sparks = sparks.filter((s) => s.age < s.life);
        if (sparks.length < 14 && Math.random() < dt * 9) sparks.push(sparkle(Math.random(), Math.random()));
      }
      g.innerHTML = sparks.map((s) => {
        const k = Math.sin(Math.PI * Math.min(1, s.age / s.life));
        return `<path d="${sparkleShape}" fill="${s.gold ? '#f2c66d' : '#cbbcff'}" transform="translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) rotate(${(s.spin * s.age).toFixed(1)}) scale(${(s.size * k).toFixed(2)})"/>`;
      }).join('');
    },
  };

  /* ── 14. Commits (every developer's GitHub contribution graph) ── */
  const cols = 22, rows = 14, pitch = 44, gx = 66, gy = 60;
  const levels = ['#22155a', '#3b238f', '#5a3bd0', '#8b6dff', '#f2c66d'];
  let cells = null, commitClock = 0;
  const commits = {
    key: 'commits', label: 'Commits',
    note: '<strong>14 · Commits.</strong> Every developer\'s badge of honour, <em>the GitHub contribution graph</em>, recoloured in violet with gold for the busiest days and laid behind the head and shoulders. New commits keep landing and flashing gold.',
    html: svg(`
      <g font-family="Archivo, sans-serif" font-size="22" fill="#a49bc2">
        ${['Nov', 'Jan', 'Mar', 'May', 'Jul', 'Sep'].map((m, i) => `<text x="${gx + i * 4 * pitch}" y="${gy - 18}">${m}</text>`).join('')}
        <text x="${gx - 10}" y="${gy + pitch + 24}" text-anchor="end">Mon</text><text x="${gx - 10}" y="${gy + 3 * pitch + 24}" text-anchor="end">Wed</text><text x="${gx - 10}" y="${gy + 5 * pitch + 24}" text-anchor="end">Fri</text>
      </g>
      <g data-cells></g>`),
    frame(el, t) {
      const g = el.querySelector('[data-cells]');
      if (!cells || t === 0 || !g.children.length) {
        let seed = 42;
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        cells = Array.from({ length: cols * rows }, () => ({ level: rnd() < .25 ? 0 : Math.min(4, Math.floor(rnd() * rnd() * 5.5)), flash: 0 }));
        g.innerHTML = cells.map((_, i) => `<rect x="${gx + Math.floor(i / rows) * pitch}" y="${gy + (i % rows) * pitch}" width="34" height="34" rx="7"/>`).join('');
        commitClock = 0;
      }
      if (t !== null) {
        const dt = Math.max(0, t - commitClock);
        commitClock = t;
        if (Math.random() < dt * 7) {
          const c = cells[Math.floor(Math.random() * cells.length)];
          c.level = Math.min(4, c.level + 1 + Math.floor(Math.random() * 2)); c.flash = 1;
        }
        if (Math.random() < dt * 5) { const c = cells[Math.floor(Math.random() * cells.length)]; c.level = Math.max(0, c.level - 1); }
        cells.forEach((c) => { c.flash = Math.max(0, c.flash - dt * 1.5); });
      }
      [...g.children].forEach((r, i) => {
        const c = cells[i];
        r.setAttribute('fill', c.flash > .5 ? '#f2c66d' : levels[c.level]);
        r.setAttribute('fill-opacity', c.level ? '.95' : '.7');
      });
    },
  };

  /* ── 15. Spec (an engineering drawing with callouts) ── */
  const callouts = [
    { n: '01', text: 'Domain-Driven Design', lx: 72, ly: 190, px: 470, py: 120, end: false },
    { n: '02', text: 'C# · .NET Core', lx: 72, ly: 290, px: 490, py: 300, end: false },
    { n: '03', text: 'Clean Architecture', lx: 72, ly: 390, px: 400, py: 470, end: false },
    { n: '04', text: 'Blazor UI', lx: 1028, ly: 190, px: 720, py: 150, end: true },
    { n: '05', text: 'Ships to prod', lx: 1028, ly: 290, px: 690, py: 330, end: true },
    { n: '06', text: 'Aleppo, Syria', lx: 1028, ly: 390, px: 800, py: 460, end: true },
  ];
  const spec = {
    key: 'spec', label: 'Spec',
    note: '<strong>15 · Spec.</strong> A technical drawing of the engineer himself: grid paper, a title block and <em>numbered callouts drawn out to him</em> (Domain-Driven Design, C# · .NET Core, Clean Architecture, Blazor UI, Ships to prod, Aleppo).',
    html: svg(`
      <defs>
        <pattern id="h-spec-fine" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#b6a3ff" stroke-opacity=".1" stroke-width="1.5"/></pattern>
        <pattern id="h-spec" width="200" height="200" patternUnits="userSpaceOnUse"><rect width="200" height="200" fill="url(#h-spec-fine)"/><path d="M200 0H0V200" fill="none" stroke="#b6a3ff" stroke-opacity=".2" stroke-width="2"/></pattern>
      </defs>
      <rect x="30" y="40" width="1040" height="760" rx="20" fill="#1a1036" fill-opacity=".9"/>
      <rect x="30" y="40" width="1040" height="760" rx="20" fill="url(#h-spec)" stroke="#b6a3ff" stroke-opacity=".35" stroke-width="2"/>
      <text x="72" y="100" font-family="${mono}" font-size="22" letter-spacing="3" fill="#f2c66d" fill-opacity=".85">FIG. 1 — M. SHARABATI</text>
      <text x="1028" y="100" text-anchor="end" font-family="${mono}" font-size="22" letter-spacing="3" fill="#a49bc2">REV 2026</text>
      ${callouts.map((c, i) => {
        const tx = c.end ? c.lx - 52 : c.lx + 52, kx = c.end ? c.lx - 300 : c.lx + 300;
        return `<g>
          <circle cx="${c.lx + (c.end ? -18 : 18)}" cy="${c.ly - 8}" r="18" fill="none" stroke="#f2c66d" stroke-opacity=".9" stroke-width="2"/>
          <text x="${c.lx + (c.end ? -18 : 18)}" y="${c.ly - 1}" text-anchor="middle" font-family="${mono}" font-size="17" fill="#f2c66d">${c.n}</text>
          <text x="${tx}" y="${c.ly}" ${c.end ? 'text-anchor="end"' : ''} font-family="${mono}" font-size="25" fill="#eee7d8" fill-opacity=".85">${esc(c.text)}</text>
          <path data-lead="${i}" d="M${kx} ${c.ly + 14} L${c.px} ${c.py}" fill="none" stroke="#b6a3ff" stroke-opacity=".75" stroke-width="2"/>
          <path d="M${c.end ? c.lx : c.lx} ${c.ly + 14} H${kx}" fill="none" stroke="#b6a3ff" stroke-opacity=".45" stroke-width="1.5"/>
        </g>`;
      }).join('')}`),
    frame(el, t) {
      // the leader lines draw themselves out to him, one after another
      el.querySelectorAll('[data-lead]').forEach((p) => {
        const len = p.getTotalLength(), k = t === null ? 1 : Math.max(0, Math.min(1, (t - +p.dataset.lead * .18) / .7));
        p.setAttribute('stroke-dasharray', `${len} ${len}`);
        p.setAttribute('stroke-dashoffset', (len * (1 - k)).toFixed(1));
      });
    },
  };

  const none = { key: 'none', label: 'None', note: '<strong>No backdrop.</strong> The portrait alone on its soft glow, as the live page is now.', html: '' };
  const options = [none, circle, hexagon, arch, starOption, name, ring, orbit, codeView, rays, blob, split, offsetFrame, sparkles, commits, spec];

  /* ── panel row and loop ── */
  const row = document.createElement('div');
  row.className = 'lab-row';
  row.innerHTML = '<span class="lab-label">Photo</span><div class="lab-bar"></div>';
  lab.querySelector('.lab-row').after(row);
  const bar = row.querySelector('.lab-bar'), note = lab.querySelector('.lab-note');
  options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = i ? `${i} ${opt.label}` : opt.label; b.dataset.photo = opt.key;
    b.addEventListener('click', () => choose(opt.key, true));
    bar.append(b);
  });

  let current = none, raf = 0, t0 = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    current.frame(holder.firstElementChild, (now - t0) / 1000);
  }
  function start() {
    cancelAnimationFrame(raf);
    if (!current.frame || !holder.firstElementChild) return;
    if (reduce.matches || document.hidden) return current.frame(holder.firstElementChild, null);
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function choose(key, announce) {
    current = options.find((o) => o.key === key) || circle;
    holder.innerHTML = current.html;
    holder.dataset.photo = current.key;
    if (current.frame && holder.firstElementChild) current.frame(holder.firstElementChild, reduce.matches ? null : 0);
    bar.querySelectorAll('[data-photo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.photo === current.key)));
    if (announce) note.innerHTML = current.note;
    const url = new URL(location.href);
    url.searchParams.set('photo', current.key);
    history.replaceState(null, '', url);
    start();
  }
  document.addEventListener('visibilitychange', start);
  reduce.addEventListener('change', start);
  choose(new URLSearchParams(location.search).get('photo') || 'circle', false);
})();
