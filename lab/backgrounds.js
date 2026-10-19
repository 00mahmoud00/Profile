// Background options: five candidate backdrops for the portfolio, switchable live.
// Loaded only for ?lab links (see the loader at the end of index.html) so others can compare them.
// Each one draws on a single fixed canvas behind the page and reacts to the
// same three inputs: time (idle motion), scroll (position and speed) and the pointer.
(() => {
  const TAU = Math.PI * 2;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');

  const C = {
    sun: [242, 198, 109], lilac: [182, 163, 255], violet: [81, 43, 212],
    app: [139, 109, 255], pres: [106, 70, 240], infra: [75, 44, 198], ink: [18, 10, 38],
  };
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
  const ease = (k, dt) => 1 - Math.exp(-k * dt);
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

  // seeded random, so a layout is designed once and looks the same on every visit
  function seeded(a) {
    return () => {
      a |= 0; a = a + 0x6d2b79f5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function glow(c) {
    const g = document.createElement('canvas');
    g.width = g.height = 64;
    const x = g.getContext('2d');
    const r = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    r.addColorStop(0, rgba(c, 1)); r.addColorStop(.2, rgba(c, .85));
    r.addColorStop(.5, rgba(c, .2)); r.addColorStop(1, rgba(c, 0));
    x.fillStyle = r; x.fillRect(0, 0, 64, 64);
    return g;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const grain = document.createElement('div');
  grain.className = 'bg-grain';
  grain.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas, grain);
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, dpr = 1;

  // shared inputs, all smoothed so nothing jumps
  const S = { t: 0, scroll: scrollY, vel: 0, energy: 0, mx: 0, my: 0, px: 0, py: 0, on: 0, onTarget: 0 };
  function tick(dt) {
    const prev = S.scroll;
    S.scroll += (scrollY - S.scroll) * ease(9, dt);
    if (Math.abs(scrollY - S.scroll) < .05) S.scroll = scrollY;
    S.vel += ((dt ? (S.scroll - prev) / dt : 0) - S.vel) * ease(12, dt);
    const e = Math.min(1, Math.abs(S.vel) / 1400);
    S.energy += (e - S.energy) * ease(e > S.energy ? 10 : 2.5, dt);
    S.t += dt * (1 + S.energy * 2);
    S.on += (S.onTarget - S.on) * ease(S.onTarget ? 6 : 3, dt);
    S.px += (S.mx - S.px) * ease(10, dt);
    S.py += (S.my - S.py) * ease(10, dt);
  }
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    S.mx = e.clientX; S.my = e.clientY;
    if (!S.onTarget) { S.px = S.mx; S.py = S.my; }
    S.onTarget = 1;
  }, { passive: true });
  root.addEventListener('pointerleave', () => { S.onTarget = 0; });
  addEventListener('blur', () => { S.onTarget = 0; });

  // a light that wanders on its own when there is no mouse (phones), and follows the mouse when there is
  function lamp() {
    const wx = W * (.62 + .26 * Math.sin(S.t * .11)), wy = H * (.38 + .22 * Math.sin(S.t * .17 + 1));
    return [wx + (S.px - wx) * S.on, wy + (S.py - wy) * S.on];
  }

  /* ── 1. Layers: the system as a living network ───────────────────────────
     Nodes sit on hexagonal rings around the Domain core (the hero's layer rings,
     carried out across the whole page). Gold requests travel inward ring by ring;
     lilac responses travel back out. Scrolling twists the rings, the cursor sends requests. */
  const layers = (() => {
    let nodes = [], ringStart = [], rings = 0, s = 96, packets = [], spawn = 0, cursorSpawn = 0, pulse = 0;
    const gold = glow(C.sun), lil = glow(C.lilac);
    const ringColor = (k) => k === 0 ? C.sun : k === 1 ? mix(C.sun, C.app, .35) : k === 2 ? C.app : k === 3 ? C.pres : C.lilac;
    const centre = () => {
      const wide = W > 960;
      return [wide ? W * .745 : W * .5, (wide ? H * .4 : H * .3) - Math.min(S.scroll * .22, H * .3)];
    };
    function build() {
      s = clamp(Math.max(W, H) / 13, 70, 104);
      rings = Math.ceil(Math.hypot(W, H) * 1.05 / s);
      const rnd = seeded(20261019);
      nodes = []; ringStart = [];
      for (let k = 0; k <= rings; k++) {
        ringStart.push(nodes.length);
        const corners = [];
        for (let i = 0; i < 6; i++) corners.push([Math.cos(i * TAU / 6 + TAU / 12) * k * s, Math.sin(i * TAU / 6 + TAU / 12) * k * s]);
        const count = k ? 6 * k : 1;
        for (let n = 0; n < count; n++) {
          let bx = 0, by = 0;
          if (k) {
            const side = Math.floor(n / k), f = (n % k) / k, a = corners[side], b = corners[(side + 1) % 6];
            bx = a[0] + (b[0] - a[0]) * f; by = a[1] + (b[1] - a[1]) * f;
          }
          nodes.push({
            k, r: Math.hypot(bx, by), a: Math.atan2(by, bx), x: 0, y: 0, vis: false,
            ax: k ? 4 + rnd() * 10 : 0, ay: k ? 4 + rnd() * 10 : 0,
            fx: .03 + rnd() * .06, fy: .03 + rnd() * .06, p: rnd() * TAU, q: rnd() * TAU,
          });
        }
      }
      ringStart.push(nodes.length);
      packets = [];
    }
    const ringNodes = (k) => { const out = []; for (let i = ringStart[k]; i < ringStart[k + 1]; i++) out.push(i); return out; };
    function nearestIn(k, from, pickAmong = 1) {
      const a = nodes[from], cand = ringNodes(k).map((i) => [i, (nodes[i].x - a.x) ** 2 + (nodes[i].y - a.y) ** 2]);
      cand.sort((m, n) => m[1] - n[1]);
      return cand[Math.floor(Math.random() * Math.min(pickAmong, cand.length))][0];
    }
    function request(start) {
      const path = [start];
      for (let k = nodes[start].k; k > 0; k--) path.push(nearestIn(k - 1, path[path.length - 1]));
      packets.push({ path, seg: 0, t: 0, kind: 'req', back: nodes[start].k });
    }
    function respond(depth) {
      const path = [0];
      for (let k = 1; k <= depth; k++) path.push(nearestIn(k, path[path.length - 1], k === 1 ? 6 : 2));
      packets.push({ path, seg: 0, t: 0, kind: 'res' });
    }
    function draw(dt) {
      const [cx, cy] = centre();
      const twist = S.scroll * .00022 + .06 * Math.sin(S.t * .05);
      const spin = S.t * .006 + S.scroll * .00008;
      const D = Math.max(W, H), m = 60, visible = [];
      for (const n of nodes) {
        const a = n.a + spin + twist * n.k / 6;
        n.x = cx + Math.cos(a) * n.r + n.ax * Math.sin(S.t * n.fx * TAU + n.p);
        n.y = cy + Math.sin(a) * n.r + n.ay * Math.cos(S.t * n.fy * TAU + n.q);
        n.vis = n.x > -m && n.x < W + m && n.y > -m && n.y < H + m;
        n.fade = .05 + .95 * (1 - smooth(D * .1, D * .62, Math.hypot(n.x - cx, n.y - cy)));
        if (n.vis) visible.push(n);
      }
      const reach = s * (1.2 + .12 * S.energy), reach2 = reach * reach;
      const [lx, ly] = [S.px, S.py], R = 170;
      const buckets = [[], []].map(() => Array.from({ length: 8 }, () => []));
      for (let i = 0; i < visible.length; i++) {
        const p = visible[i];
        for (let j = i + 1; j < visible.length; j++) {
          const q = visible[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
          if (d2 > reach2) continue;
          let a = (1 - smooth(s * .95, reach, Math.sqrt(d2))) * Math.min(p.fade, q.fade);
          if (S.on > .01) {
            const near = 1 - Math.min(1, Math.hypot((p.x + q.x) / 2 - lx, (p.y + q.y) / 2 - ly) / (R * 1.4));
            a = Math.min(1, a * (1 + 1.6 * near * S.on));
          }
          if (a < .03) continue;
          buckets[Math.min(p.k, q.k) <= 2 ? 0 : 1][Math.min(7, Math.floor(a * 8))].push(p.x, p.y, q.x, q.y);
        }
      }
      ctx.lineWidth = 1;
      buckets.forEach((set, c) => set.forEach((segs, b) => {
        if (!segs.length) return;
        ctx.strokeStyle = rgba(c ? C.lilac : mix(C.sun, C.lilac, .45), ((b + .5) / 8) * (c ? .2 : .26) * (1 + .4 * S.energy));
        ctx.beginPath();
        for (let i = 0; i < segs.length; i += 4) { ctx.moveTo(segs[i], segs[i + 1]); ctx.lineTo(segs[i + 2], segs[i + 3]); }
        ctx.stroke();
      }));
      for (const n of visible) {
        if (!n.k) continue;
        ctx.fillStyle = rgba(ringColor(n.k), (n.k <= 3 ? .8 : .5) * n.fade);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.k <= 3 ? 1.9 : 1.4, 0, TAU); ctx.fill();
      }
      // the cursor is a client: it links to the nodes around it and sends requests in
      if (S.on > .01) {
        ctx.lineWidth = 1;
        for (const n of visible) {
          const d = Math.hypot(n.x - lx, n.y - ly);
          if (d > R) continue;
          ctx.strokeStyle = rgba(C.sun, (1 - d / R) * .45 * S.on * n.fade);
          ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(n.x, n.y); ctx.stroke();
        }
        cursorSpawn += dt;
        if (cursorSpawn > .7 && packets.length < 9) {
          cursorSpawn = 0;
          let best = -1, bd = 140;
          nodes.forEach((n, i) => { const d = Math.hypot(n.x - lx, n.y - ly); if (n.k && d < bd) { bd = d; best = i; } });
          if (best > 0) request(best);
        }
      }
      // background traffic, busier while scrolling
      spawn += dt * (1 + S.energy * 5);
      if (spawn > 1.1 && packets.length < 7) {
        spawn = 0;
        const outer = visible.filter((n) => n.k >= 3 && n.k <= 7);
        if (outer.length) request(nodes.indexOf(outer[Math.floor(Math.random() * outer.length)]));
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.t += dt / .32;
        while (pk.t >= 1 && pk.seg < pk.path.length - 1) { pk.t -= 1; pk.seg++; }
        if (pk.seg >= pk.path.length - 1) {
          packets.splice(i, 1);
          if (pk.kind === 'req') { pulse = 1; respond(Math.max(2, pk.back)); }
          continue;
        }
        const a = nodes[pk.path[pk.seg]], b = nodes[pk.path[pk.seg + 1]], sprite = pk.kind === 'req' ? gold : lil;
        const vis = .85 * Math.min(a.fade, b.fade) + .15;
        // the packet and a short tail behind it, so it reads as something travelling
        for (let g = 3; g >= 0; g--) {
          const t = Math.max(0, pk.t - g * .07), e = t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2, size = g ? 18 - g * 3 : 30;
          ctx.globalAlpha = vis * (g ? .35 / g : 1);
          ctx.drawImage(sprite, a.x + (b.x - a.x) * e - size / 2, a.y + (b.y - a.y) * e - size / 2, size, size);
        }
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = rgba(pk.kind === 'req' ? C.sun : C.lilac, .5 * vis);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // the Domain core, which pulses each time a request reaches it
      pulse = Math.max(0, pulse - dt * 1.6);
      const core = nodes[0];
      ctx.globalAlpha = .55 + .45 * pulse;
      const size = 26 + 22 * pulse;
      ctx.drawImage(gold, core.x - size / 2, core.y - size / 2, size, size);
      ctx.globalAlpha = 1;
    }
    return {
      key: 'layers', label: 'Layers',
      note: '<strong>1 · Layers.</strong> The page as a running system: nodes sit on hexagonal rings around the Domain core, and <em>gold requests</em> travel inward while <em>lilac responses</em> travel back out. Scrolling twists the rings; the cursor is a client that links in and sends requests.',
      init: build, resize: build, draw,
    };
  })();

  /* ── 2. Blueprint: an engineering grid that wakes up under your hand ─────
     A faint honeycomb (the hex of the logo and the layer rings) covers the page.
     A lamp follows the cursor and lights the grid around it; cells light up and
     pass the signal to a neighbour, like a trace on a circuit board. */
  const blueprint = (() => {
    const R = 28, h = Math.sqrt(3) * R;
    let path = null, pulses = [], spawn = 0;
    const cellPath = (cx, cy) => {
      const p = new Path2D();
      for (let i = 0; i < 6; i++) { const a = i * TAU / 6; p[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * R, cy + Math.sin(a) * R); }
      p.closePath();
      return p;
    };
    const centreOf = (c, r) => [c * 1.5 * R, r * h + (c & 1) * h / 2];
    function build() {
      path = new Path2D();
      const cols = Math.ceil(W / (1.5 * R)) + 2, rows = Math.ceil(H / h) + 3;
      for (let c = -1; c < cols; c++) for (let r = -2; r < rows; r++) {
        const [x, y] = centreOf(c, r);
        // each cell owns its three upper edges; its neighbours draw the rest
        path.moveTo(x - R, y);
        path.lineTo(x - R / 2, y - h / 2); path.lineTo(x + R / 2, y - h / 2); path.lineTo(x + R, y);
      }
      pulses = [];
    }
    const parallax = () => S.scroll * .35;
    function neighbours(c, r) {
      const odd = c & 1;
      return [[c, r - 1], [c, r + 1], [c - 1, r - 1 + odd], [c - 1, r + odd], [c + 1, r - 1 + odd], [c + 1, r + odd]];
    }
    function light(c, r, chain, dir) {
      pulses.push({ c, r, t: 0, chain, dir, passed: false });
    }
    function draw(dt) {
      const off = parallax() % h;
      const [lx, ly] = lamp();
      ctx.save();
      ctx.translate(0, -off);
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(C.lilac, .075);
      ctx.stroke(path);
      const g = ctx.createRadialGradient(lx, ly + off, 0, lx, ly + off, 320);
      g.addColorStop(0, rgba(C.lilac, .55 * (.6 + .4 * S.on)));
      g.addColorStop(.45, rgba(C.lilac, .16 * (.6 + .4 * S.on)));
      g.addColorStop(1, rgba(C.lilac, 0));
      ctx.strokeStyle = g;
      ctx.stroke(path);
      ctx.restore();

      // pulses live in page space, so they scroll with the grid
      spawn += dt * (1 + S.energy * 6);
      if (spawn > .45 && pulses.length < 60) {
        spawn = 0;
        const nearLamp = Math.random() < .6;
        const x = nearLamp ? lx + (Math.random() - .5) * 420 : Math.random() * W;
        const y = (nearLamp ? ly + (Math.random() - .5) * 320 : Math.random() * H) + parallax();
        const c = Math.round(x / (1.5 * R)), r = Math.round((y - (c & 1) * h / 2) / h);
        light(c, r, 3 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 6));
      }
      const top = parallax();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt;
        if (!p.passed && p.t > .14 && p.chain > 0) {
          p.passed = true;
          const turn = Math.random() < .7 ? p.dir : Math.floor(Math.random() * 6);
          const [nc, nr] = neighbours(p.c, p.r)[turn];
          light(nc, nr, p.chain - 1, turn);
        }
        const life = 2.4;
        if (p.t > life) { pulses.splice(i, 1); continue; }
        const a = p.t < .18 ? p.t / .18 : (1 - (p.t - .18) / (life - .18)) ** 1.6;
        const [x, y] = centreOf(p.c, p.r);
        const cell = cellPath(x, y - top);
        ctx.fillStyle = rgba(C.sun, .16 * a);
        ctx.fill(cell);
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = rgba(C.sun, .85 * a);
        ctx.stroke(cell);
      }
    }
    return {
      key: 'blueprint', label: 'Blueprint',
      note: '<strong>2 · Blueprint.</strong> A precise engineering grid, built from the same hexagon as the logo and the layer rings. A <em>lamp follows the cursor</em> and lights the grid around it, and cells pass a gold signal to their neighbours like a trace on a circuit board. It drifts slower than the page, so it feels deeper.',
      init: build, resize: build, draw,
    };
  })();

  /* ── 3. Aurora: light that takes the mood of what you're reading ─────────
     Large soft colour fields drift slowly under a film grain. Their colours follow
     the section in view: violet and gold on the hero, each app's own brand colour
     on its card, the layer colours on Skills. */
  const aurora = (() => {
    const off = document.createElement('canvas'), o = off.getContext('2d');
    const blobs = [
      { bx: .8, by: .32, ax: .1, ay: .12, f: .05, p: 0, r: .5 },
      { bx: .12, by: .08, ax: .14, ay: .1, f: .037, p: 2, r: .4 },
      { bx: .6, by: .95, ax: .2, ay: .08, f: .043, p: 4, r: .45 },
      { bx: .95, by: .75, ax: .08, ay: .12, f: .031, p: 1, r: .32 },
    ];
    const palettes = {
      hero: [C.violet, C.infra, C.sun, C.pres],
      projects: [C.violet, C.infra, C.pres, C.app],
      experience: [C.infra, C.violet, C.pres, [60, 30, 140]],
      skills: [C.app, C.infra, C.sun, C.pres],
      codeforces: [C.violet, [200, 120, 60], C.infra, C.pres],
      contact: [C.sun, C.violet, C.infra, [200, 140, 70]],
    };
    let cur = palettes.hero.map((c) => c.slice());
    function target() {
      const mid = H * .5;
      for (const card of document.querySelectorAll('.showcase')) {
        const b = card.getBoundingClientRect();
        if (b.top < mid && b.bottom > mid) {
          const app = hex(getComputedStyle(card).getPropertyValue('--app').trim());
          return [app, C.violet, mix(app, C.ink, .3), C.infra];
        }
      }
      let key = 'hero';
      document.querySelectorAll('main > section, footer.contact').forEach((sec) => {
        if (sec.getBoundingClientRect().top < mid) key = sec.id || (sec.classList.contains('hero') ? 'hero' : key);
      });
      return palettes[key] || palettes.experience;
    }
    function resize() { off.width = Math.max(1, Math.round(W / 8)); off.height = Math.max(1, Math.round(H / 8)); }
    function draw(dt) {
      const want = target();
      const k = dt ? ease(1.6, dt) : 1;
      cur = cur.map((c, i) => mix(c, want[i], k));
      const w = off.width, hh = off.height, D = Math.max(w, hh);
      o.globalCompositeOperation = 'source-over';
      o.clearRect(0, 0, w, hh);
      o.globalCompositeOperation = 'lighter';
      blobs.forEach((b, i) => {
        const t = S.t * b.f * TAU + b.p;
        const x = w * (b.bx + b.ax * Math.sin(t)), y = hh * (b.by + b.ay * Math.cos(t * 1.3) + .1 * Math.sin(S.scroll * .0005 * (i + 1)));
        const r = D * b.r * (1 + .08 * Math.sin(t * .7));
        const g = o.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, rgba(cur[i], .55));
        g.addColorStop(.45, rgba(cur[i], .15));
        g.addColorStop(1, rgba(cur[i], 0));
        o.fillStyle = g; o.fillRect(0, 0, w, hh);
      });
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.globalAlpha = .52 + .18 * S.energy;
      ctx.drawImage(off, 0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    return {
      key: 'aurora', label: 'Aurora',
      note: '<strong>3 · Aurora.</strong> Big, soft fields of light under a film grain, the way product sites like Stripe and Linear do it. The colours <em>follow what you are reading</em>: violet and gold on the hero, each app\'s brand colour while its card is in view, the layer colours on Skills.',
      init: resize, resize, draw,
    };
  })();

  /* ── 4. Aleppo: the geometry of the city's carved stone and woodwork ─────
     An eight-point star pattern (built with Hankin's method on an octagon-and-square
     tiling, the way the historic patterns were drawn) in hairlines. A band of warm
     light sweeps slowly across it like sun over stone; the cursor carries a lantern. */
  const aleppo = (() => {
    const L = 26, P = L * (1 + Math.SQRT2), alpha = 67.5 * Math.PI / 180;
    let path = null;
    function hankin(p, verts) {
      const n = verts.length, cx = verts.reduce((s, v) => s + v[0], 0) / n, cy = verts.reduce((s, v) => s + v[1], 0) / n;
      const half = Math.PI * (n - 2) / n / 2;
      for (let i = 0; i < n; i++) {
        const v = verts[i], prev = verts[(i + n - 1) % n], next = verts[(i + 1) % n];
        const ma = [(prev[0] + v[0]) / 2, (prev[1] + v[1]) / 2], mb = [(v[0] + next[0]) / 2, (v[1] + next[1]) / 2];
        const side = Math.hypot(v[0] - prev[0], v[1] - prev[1]);
        const dist = (side / 2) * Math.sin(alpha) / Math.sin(half + alpha);
        const dl = Math.hypot(cx - v[0], cy - v[1]);
        const px = v[0] + (cx - v[0]) / dl * dist, py = v[1] + (cy - v[1]) / dl * dist;
        p.moveTo(ma[0], ma[1]); p.lineTo(px, py); p.lineTo(mb[0], mb[1]);
      }
    }
    function build() {
      path = new Path2D();
      const R8 = L / (2 * Math.sin(Math.PI / 8)), R4 = L / Math.SQRT2;
      const cols = Math.ceil(W / P) + 2, rows = Math.ceil(H / P) + 3;
      for (let i = -1; i < cols; i++) for (let j = -2; j < rows; j++) {
        const x = i * P, y = j * P, oct = [], sq = [];
        for (let k = 0; k < 8; k++) oct.push([x + R8 * Math.cos(Math.PI / 8 + k * Math.PI / 4), y + R8 * Math.sin(Math.PI / 8 + k * Math.PI / 4)]);
        for (let k = 0; k < 4; k++) sq.push([x + P / 2 + R4 * Math.cos(k * Math.PI / 2), y + P / 2 + R4 * Math.sin(k * Math.PI / 2)]);
        hankin(path, oct);
        hankin(path, sq);
      }
    }
    function sweep(off) {
      // a diagonal band of sunlight, crossing the screen every 14 seconds
      const u = ((S.t / 14) % 1) * 1.6 - .3, wdt = .16;
      const g = ctx.createLinearGradient(0, off, W, H + off);
      const at = (x) => .4 * Math.max(0, 1 - Math.abs(x - u) / wdt) * (1 + .6 * S.energy);
      [0, u - wdt, u, u + wdt, 1].map((x) => clamp(x)).sort((a, b) => a - b).forEach((x) => g.addColorStop(x, rgba(C.sun, at(x))));
      return g;
    }
    function draw() {
      const off = (S.scroll * .3) % P;
      const [lx, ly] = lamp();
      ctx.save();
      ctx.translate(0, -off);
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(C.lilac, .09);
      ctx.stroke(path);
      ctx.strokeStyle = sweep(off);
      ctx.stroke(path);
      const g = ctx.createRadialGradient(lx, ly + off, 0, lx, ly + off, 260);
      g.addColorStop(0, rgba(C.lilac, .5 * (.4 + .6 * S.on)));
      g.addColorStop(1, rgba(C.lilac, 0));
      ctx.strokeStyle = g;
      ctx.stroke(path);
      ctx.restore();
    }
    return {
      key: 'aleppo', label: 'Aleppo',
      note: '<strong>4 · Aleppo.</strong> The eight-point star pattern of Aleppo\'s carved stone and wooden ceilings, drawn in hairlines the traditional way. <em>A band of warm light sweeps across it</em> like sun moving over stone, and the cursor carries a lantern. It pairs with the Arabic name and the ش in the logo.',
      init: build, resize: build, draw,
    };
  })();

  /* ── 5. Contours: a map of the domain ──────────────────────────────────
     Topographic lines over a slowly changing landscape (3D simplex noise).
     Scrolling travels across the map; the cursor raises a hill that the lines bend around.
     Every fifth line is an index contour, brighter, as on a real survey map. */
  const contours = (() => {
    const noise = simplex3(7);
    let cell = 12, cols = 0, rows = 0, field = null;
    const step = .085;
    function resize() {
      cell = W < 700 ? 16 : 12;
      cols = Math.ceil(W / cell) + 1; rows = Math.ceil(H / cell) + 1;
      field = new Float32Array(cols * rows);
    }
    function draw() {
      const f = 1 / 430, z = S.t * .035, sy = S.scroll * .45;
      const [lx, ly] = [S.px, S.py], bump = .5 * S.on, sig2 = 2 * 120 * 120;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = i * cell, y = j * cell, wy = (y + sy) * f, wx = x * f;
        let v = .72 * noise(wx, wy, z) + .28 * noise(wx * 2.3 + 5, wy * 2.3, z * 1.6 + 9);
        if (bump > .001) v += bump * Math.exp(-((x - lx) ** 2 + (y - ly) ** 2) / sig2);
        field[j * cols + i] = v;
      }
      const minor = [], major = [];
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = field[j * cols + i], b = field[j * cols + i + 1], c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
        const lo = Math.min(a, b, c, d), hi = Math.max(a, b, c, d);
        const x0 = i * cell, y0 = j * cell;
        for (let n = Math.ceil(lo / step); n * step <= hi; n++) {
          const L = n * step;
          const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
          if (!idx || idx === 15) continue;
          const T = [x0 + cell * (L - a) / (b - a), y0], Rr = [x0 + cell, y0 + cell * (L - b) / (c - b)];
          const B = [x0 + cell * (L - d) / (c - d), y0 + cell], Lf = [x0, y0 + cell * (L - a) / (d - a)];
          const out = n % 5 === 0 ? major : minor;
          const seg = (p, q) => out.push(p[0], p[1], q[0], q[1]);
          switch (idx) {
            case 1: case 14: seg(Lf, B); break;
            case 2: case 13: seg(B, Rr); break;
            case 3: case 12: seg(Lf, Rr); break;
            case 4: case 11: seg(T, Rr); break;
            case 6: case 9: seg(T, B); break;
            case 7: case 8: seg(Lf, T); break;
            case 5: seg(Lf, T); seg(B, Rr); break;
            case 10: seg(T, Rr); seg(Lf, B); break;
          }
        }
      }
      const stroke = (segs, style, width) => {
        ctx.strokeStyle = style; ctx.lineWidth = width;
        ctx.beginPath();
        for (let i = 0; i < segs.length; i += 4) { ctx.moveTo(segs[i], segs[i + 1]); ctx.lineTo(segs[i + 2], segs[i + 3]); }
        ctx.stroke();
      };
      stroke(minor, rgba(C.lilac, .1 + .06 * S.energy), 1);
      stroke(major, rgba(mix(C.lilac, C.sun, .55), .22 + .08 * S.energy), 1.2);
    }
    return {
      key: 'contours', label: 'Contours',
      note: '<strong>5 · Contours.</strong> A topographic map of a slowly changing landscape: Domain-Driven Design is about mapping the terrain of a business. Scrolling <em>travels across the map</em>, the landscape breathes over time, and the cursor raises a hill that the lines flow around.',
      init: resize, resize, draw,
    };
  })();

  function simplex3(seed) {
    const rnd = seeded(seed), p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    const perm = new Uint8Array(512), pm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) { perm[i] = p[i & 255]; pm[i] = perm[i] % 12; }
    const g = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1];
    const F3 = 1 / 3, G3 = 1 / 6;
    return (x, y, z) => {
      const s = (x + y + z) * F3, i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
      const t = (i + j + k) * G3, x0 = x - i + t, y0 = y - j + t, z0 = z - k + t;
      let i1, j1, k1, i2, j2, k2;
      if (x0 >= y0) {
        if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
        else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
        else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
      } else {
        if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
        else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
        else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      }
      const ii = i & 255, jj = j & 255, kk = k & 255;
      const corner = (dx, dy, dz, gi) => {
        let tt = .6 - dx * dx - dy * dy - dz * dz;
        if (tt < 0) return 0;
        tt *= tt; gi *= 3;
        return tt * tt * (g[gi] * dx + g[gi + 1] * dy + g[gi + 2] * dz);
      };
      return 32 * (
        corner(x0, y0, z0, pm[ii + perm[jj + perm[kk]]]) +
        corner(x0 - i1 + G3, y0 - j1 + G3, z0 - k1 + G3, pm[ii + i1 + perm[jj + j1 + perm[kk + k1]]]) +
        corner(x0 - i2 + 2 * G3, y0 - j2 + 2 * G3, z0 - k2 + 2 * G3, pm[ii + i2 + perm[jj + j2 + perm[kk + k2]]]) +
        corner(x0 - 1 + 3 * G3, y0 - 1 + 3 * G3, z0 - 1 + 3 * G3, pm[ii + 1 + perm[jj + 1 + perm[kk + 1]]]));
    };
  }

  /* ── 6. Ripples: every interaction is an event that spreads through the system ──
     A field of dots, like LEDs on a board. Moving the mouse publishes small events,
     a click publishes a big one, and each spreads out as a ripple. On its own the
     field still catches the odd raindrop. */
  const ripples = (() => {
    const gap = 22, speed = 380;
    let waves = [], idle = 0, lastX = -1e4, lastY = -1e4;
    const parallax = () => S.scroll * .5;
    const emit = (x, y, power) => { waves.push({ x, y: y + parallax(), age: 0, power }); if (waves.length > 14) waves.shift(); };
    addEventListener('pointerdown', (e) => { if (current === ripples) emit(e.clientX, e.clientY, 1.5); }, { passive: true });
    const tones = Array.from({ length: 6 }, (_, b) => rgba(mix(C.lilac, C.sun, b / 5), .2 + b * .15));
    function draw(dt) {
      if (S.on > .5 && Math.hypot(S.mx - lastX, S.my - lastY) > 90) { emit(S.mx, S.my, .6); lastX = S.mx; lastY = S.my; }
      idle += dt * (1 + S.energy * 4);
      if (idle > 1.3) { idle = 0; emit(Math.random() * W, Math.random() * H, .85); }
      for (let i = waves.length - 1; i >= 0; i--) { waves[i].age += dt; if (waves[i].age > 3.2) waves.splice(i, 1); }
      const top = parallax(), off = top % gap, buckets = tones.map(() => []);
      for (let y = -off; y < H + gap; y += gap) for (let x = gap / 2; x < W; x += gap) {
        let v = 0;
        for (const w of waves) {
          const k = (Math.hypot(x - w.x, y + top - w.y) - w.age * speed) / 34;
          if (k > -3 && k < 3) v += w.power * Math.exp(-k * k) * Math.exp(-w.age * 1.1);
        }
        if (S.on > .01) v += .4 * S.on * Math.max(0, 1 - Math.hypot(x - S.px, y - S.py) / 160);
        buckets[Math.min(5, Math.floor(v * 8))].push(x, y);
      }
      buckets.forEach((pts, b) => {
        if (!pts.length) return;
        const r = 1.3 + b * .55;
        ctx.fillStyle = tones[b];
        ctx.beginPath();
        for (let i = 0; i < pts.length; i += 2) { ctx.moveTo(pts[i] + r, pts[i + 1]); ctx.arc(pts[i], pts[i + 1], r, 0, TAU); }
        ctx.fill();
      });
    }
    return {
      key: 'ripples', label: 'Ripples',
      note: '<strong>6 · Ripples.</strong> Event-driven, made visible: a field of dots like LEDs on a board. Moving the mouse <em>publishes small events</em> and a click publishes a big one; each spreads through the field as a ripple. On its own it still catches the odd raindrop.',
      init() { waves = []; }, resize() {}, draw,
    };
  })();

  /* ── 7. Logs: production, live ───────────────────────────────────────────
     Faint columns of structured server logs, one per service, typing in and
     gliding up. Scrolling is traffic: the faster you scroll, the busier the logs.
     The cursor works as a reading light. */
  const logs = (() => {
    const lineH = 19, font = '12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    const pick = (a) => a[Math.floor(Math.random() * a.length)], num = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo));
    const services = ['Ads.Api', 'Orders.Worker', 'Identity', 'Gateway'];
    const messages = [
      () => [['GET ', 'txt'], [`/api/ads?city=${pick(['aleppo', 'damascus', 'homs', 'latakia'])}&page=${num(1, 9)}`, 'txt'], [' 200', 'ok'], [` ${num(4, 40)}ms`, 'dim']],
      () => [['POST ', 'txt'], ['/api/orders', 'txt'], [' 201', 'ok'], [` ${num(18, 60)}ms`, 'dim']],
      () => [['Executed DbCommand ', 'txt'], [`(${num(1, 9)}ms) `, 'dim'], ['SELECT a."Id", a."Title" FROM "Ads" AS a WHERE a."CityId" = @p0', 'dim']],
      () => [['Published ', 'txt'], ['OrderPlacedEvent', 'key'], [` { OrderId = ${num(4000, 9000)} }`, 'dim']],
      () => [['Handled ', 'txt'], [pick(['PlaceOrderCommand', 'PublishAdCommand', 'RateSellerCommand']), 'key'], [` in ${num(3, 30)}ms`, 'dim']],
      () => [['Cache hit ', 'txt'], [`ads:category:${num(1, 24)}`, 'dim']],
      () => [['Health check ', 'txt'], ['/health', 'txt'], [' Healthy', 'ok'], [' uptime 99.9%', 'dim']],
      () => [['User ', 'txt'], [`${num(1000, 9999)}`, 'dim'], [' signed in with a JWT', 'txt']],
      () => [['Job ', 'txt'], ['SyncListings', 'key'], [` finished: ${num(20, 300)} updated`, 'txt']],
    ];
    const styles = { time: [C.lilac, .11], INF: [C.lilac, .22], WRN: [C.sun, .38], svc: [C.app, .24], txt: [[238, 231, 216], .14], dim: [C.lilac, .11], ok: [[125, 223, 154], .3], key: [C.sun, .26] };
    let cols = [], cw = 7.2, clock = 9 * 3600 + 41 * 60;
    function line(svc) {
      clock += num(0, 2);
      const t = [clock / 3600 | 0, (clock / 60 | 0) % 60, clock % 60].map((v) => String(v).padStart(2, '0')).join(':');
      const warn = Math.random() < .06;
      const body = warn ? [['Retry ', 'txt'], [`${num(1, 3)}/3`, 'key'], [' for PaymentGateway', 'txt']] : pick(messages)();
      const segs = [[t + ' ', 'time'], [warn ? 'WRN ' : 'INF ', warn ? 'WRN' : 'INF'], [svc.padEnd(14), 'svc'], ...body];
      return { segs, len: segs.reduce((n, s) => n + s[0].length, 0), typed: 0 };
    }
    function init() {
      ctx.font = font;
      cw = ctx.measureText('M').width;
      const n = W > 1100 ? 3 : W > 700 ? 2 : 1, rows = Math.ceil(H / lineH) + 2;
      cols = Array.from({ length: n }, (_, i) => {
        const svc = services[i % services.length], lines = [];
        for (let r = 0; r < rows; r++) { const l = line(svc); l.typed = l.len; lines.push(l); }
        return { svc, lines, x: 24 + i * (W / n), w: W / n - 40, next: Math.random(), shift: 0 };
      });
    }
    function draw(dt) {
      ctx.font = font;
      ctx.textBaseline = 'alphabetic';
      for (const col of cols) {
        col.next -= dt * (1 + S.energy * 7);
        if (col.next < 0) {
          col.next = .45 + Math.random() * 1.1;
          col.lines.push(line(col.svc));
          col.shift += lineH;
          if (col.lines.length > Math.ceil(H / lineH) + 3) col.lines.shift();
        }
        col.shift *= 1 - ease(10, dt);
        const newest = col.lines[col.lines.length - 1];
        newest.typed = dt ? Math.min(newest.len, newest.typed + dt * 110 * (1 + S.energy * 3)) : newest.len;
        ctx.save();
        ctx.beginPath(); ctx.rect(col.x, 0, col.w, H); ctx.clip();
        for (let i = col.lines.length - 1, y = H - 40 + col.shift; i >= 0 && y > -lineH; i--, y -= lineH) {
          const l = col.lines[i];
          let a = smooth(-20, H * .7, y);
          if (S.on > .01 && S.px > col.x && S.px < col.x + col.w) a *= 1 + 2.4 * S.on * Math.max(0, 1 - Math.abs(y - S.py) / 140);
          let x = col.x, left = l.typed;
          for (const [text, style] of l.segs) {
            if (left <= 0) break;
            const shown = text.slice(0, Math.ceil(left)), [c, al] = styles[style];
            ctx.fillStyle = rgba(c, Math.min(.9, al * a));
            ctx.fillText(shown, x, y);
            x += text.length * cw; left -= text.length;
          }
          if (i === col.lines.length - 1 && l.typed < l.len) {
            ctx.fillStyle = rgba(C.lilac, .5 * a);
            ctx.fillRect(col.x + l.typed * cw, y - 10, cw * .6, 12);
          }
        }
        ctx.restore();
      }
    }
    return {
      key: 'logs', label: 'Logs',
      note: '<strong>7 · Logs.</strong> Production, live: faint columns of structured server logs, one per service (requests, SQL, domain events, health checks), typing in and gliding up. <em>Scrolling is traffic</em>: the faster you scroll, the busier the logs. The cursor works as a reading light.',
      init, resize: init, draw,
    };
  })();

  /* ── 8. Silk: data flowing through pipelines ────────────────────────────
     Hundreds of particles follow an invisible current (a noise flow field) and leave
     fading trails, like threads of silk. A few gold ones stand out. The cursor stirs a
     vortex into the current; scrolling speeds it up. */
  const silk = (() => {
    const noise = simplex3(11);
    let parts = [], prevScroll = 0;
    const place = (p) => { p.x = Math.random() * W; p.y = Math.random() * H; p.life = 2 + Math.random() * 6; p.gold = Math.random() < .07; return p; };
    function init() {
      ctx.clearRect(0, 0, W, H);
      parts = Array.from({ length: Math.round(clamp(W * H / 1500, 260, 950)) }, () => place({}));
      prevScroll = S.scroll;
    }
    function step(dt) {
      // fade what is already there, so every particle leaves a trail that dies away
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${Math.min(1, dt * 1.5)})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      const shift = (S.scroll - prevScroll) * .35, f = 1 / 520, z = S.t * .05, speed = 46 * (1 + S.energy * 2.5);
      prevScroll = S.scroll;
      const segs = [[], []];
      for (const p of parts) {
        const a = noise(p.x * f, (p.y + S.scroll * .35) * f, z) * TAU * 1.4;
        let vx = Math.cos(a) * speed, vy = Math.sin(a) * speed;
        if (S.on > .01) {
          const ex = p.x - S.px, ey = p.y - S.py, d = Math.hypot(ex, ey);
          if (d < 220 && d > 1) { const k = (1 - d / 220) * 170 * S.on; vx -= ey / d * k; vy += ex / d * k; }
        }
        const ox = p.x, oy = p.y - shift;
        p.x = ox + vx * dt; p.y = oy + vy * dt; p.life -= dt;
        segs[p.gold ? 1 : 0].push(ox, oy, p.x, p.y);
        if (p.life < 0 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) place(p);
      }
      ctx.lineWidth = 1;
      [[C.lilac, .34], [C.sun, .6]].forEach(([c, al], i) => {
        ctx.strokeStyle = rgba(c, al);
        ctx.beginPath();
        const s = segs[i];
        for (let j = 0; j < s.length; j += 4) { ctx.moveTo(s[j], s[j + 1]); ctx.lineTo(s[j + 2], s[j + 3]); }
        ctx.stroke();
      });
    }
    function draw(dt) {
      if (dt) return step(dt);
      // a still frame (reduced motion): let the trails build up once
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < 90; i++) step(1 / 60);
    }
    return {
      key: 'silk', label: 'Silk', persist: true,
      note: '<strong>8 · Silk.</strong> Data flowing through pipelines: hundreds of particles follow an invisible current and leave fading trails, like threads of silk, with a few gold ones standing out. <em>The cursor stirs a vortex</em> into the current, and scrolling speeds the flow.',
      init, resize: init, draw,
    };
  })();

  /* ── 9. Pulse: production monitoring ──────────────────────────────────────
     Stacked lines like live metrics, in the style of a ridge plot: nearer lines hide
     the ones behind them. A heartbeat runs along one line at a time; the cursor
     raises a spike wherever it hovers. */
  const pulse = (() => {
    const noise = simplex3(23);
    let beat = 0, beatRow = null;
    const ecg = (u) => 54 * Math.exp(-u * u * 2) - 16 * Math.exp(-((u - 1.3) ** 2) * 3) + 9 * Math.exp(-((u + 3.2) ** 2) * .6) + 12 * Math.exp(-((u - 5) ** 2) * .3);
    function draw(dt) {
      const gap = W < 700 ? 22 : 28, step = W < 700 ? 8 : 10, rows = Math.ceil(H / gap) + 3;
      const scrolled = S.scroll * .25, first = Math.floor(scrolled / gap), off = scrolled - first * gap;
      const f = 1 / 260, z = S.t * .12;
      beat += dt / 2.8 * (1 + S.energy);
      if (beatRow === null || beat > 1) { beat = 0; beatRow = first + 4 + Math.floor(Math.random() * Math.max(1, rows - 8)); }
      const bx = beat * (W + 300) - 150;
      for (let r = 0; r < rows; r++) {
        const id = first + r, y0 = r * gap - off, pts = [];
        for (let x = -step; x <= W + step; x += step) {
          const env = Math.exp(-(((x / W - .66) / .3) ** 2));
          let h = env * (70 * Math.max(0, noise(x * f, id * .37, z)) + 8 * noise(x * f * 3, id * .9, z * 2));
          if (S.on > .01) h += 64 * S.on * Math.exp(-(((x - S.px) / 55) ** 2)) * Math.exp(-(((y0 - S.py) / 80) ** 2));
          if (id === beatRow) h += ecg((x - bx) / 14);
          pts.push(x, y0 - h);
        }
        // fill under the line with the page colour, so this line hides the ones behind it
        ctx.beginPath();
        ctx.moveTo(pts[0], pts[1]);
        for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
        ctx.lineTo(W + step, y0 + 2); ctx.lineTo(-step, y0 + 2); ctx.closePath();
        ctx.fillStyle = rgba(C.ink, 1);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pts[0], pts[1]);
        for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = rgba(C.lilac, .2 + .1 * S.energy);
        ctx.stroke();
        if (id === beatRow) {
          // the heartbeat glows gold where it is, fading along the line behind it
          const g = ctx.createLinearGradient(bx - 320, 0, bx + 60, 0);
          g.addColorStop(0, rgba(C.sun, 0)); g.addColorStop(.85, rgba(C.sun, .85)); g.addColorStop(1, rgba(C.sun, 0));
          ctx.lineWidth = 1.6;
          ctx.strokeStyle = g;
          ctx.stroke();
        }
      }
    }
    return {
      key: 'pulse', label: 'Pulse',
      note: '<strong>9 · Pulse.</strong> Production monitoring: stacked lines like live server metrics, drawn as a ridge plot where the nearer lines hide the ones behind. <em>A heartbeat runs along one line</em> at a time, and the cursor raises a spike wherever it hovers.',
      init() { beatRow = null; }, resize() {}, draw,
    };
  })();

  /* ── 10. Beams: CI/CD pipelines ─────────────────────────────────────────
     Faint columns with a stage marker at each crossing. Light travels down the columns
     like commits through a pipeline, sometimes stepping across to the next one, and each
     stage flashes as it passes. The cursor pushes commits into the column under it. */
  const beams = (() => {
    let gapX = 96, gapY = 120, x0 = 0, list = [], flashes = [], spawn = 0, cursorSpawn = 0;
    const gold = glow(C.sun), lil = glow(C.lilac);
    const parallax = () => S.scroll * .4;
    function init() {
      gapX = W < 700 ? 64 : 96; gapY = W < 700 ? 96 : 120;
      x0 = (W % gapX) / 2 + gapX / 2;
      list = []; flashes = [];
    }
    function launch(col) {
      const cols = Math.floor((W - x0) / gapX) + 1;
      col = clamp(col, 0, cols - 1);
      const y = parallax() - 30;
      list.push({ col, x: x0 + col * gapX, y, row: Math.floor(y / gapY), to: null, speed: 230 + Math.random() * 260, gold: Math.random() < .4, trail: [] });
    }
    function draw(dt) {
      const top = parallax(), cols = Math.floor((W - x0) / gapX) + 1;
      // the pipelines: columns, and a stage marker at every crossing
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(C.lilac, .07);
      ctx.beginPath();
      for (let c = 0; c < cols; c++) { const x = x0 + c * gapX; ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      ctx.stroke();
      ctx.fillStyle = rgba(C.lilac, .22);
      ctx.beginPath();
      for (let y = gapY - (top % gapY); y < H; y += gapY) for (let c = 0; c < cols; c++) ctx.rect(x0 + c * gapX - 1.5, y - 1.5, 3, 3);
      ctx.fill();

      spawn += dt * (1 + S.energy * 5);
      if (spawn > .55 && list.length < 16) { spawn = 0; launch(Math.floor(Math.random() * cols)); }
      if (S.on > .5) {
        cursorSpawn += dt;
        if (cursorSpawn > .8) { cursorSpawn = 0; launch(Math.round((S.px - x0) / gapX)); }
      }
      for (let i = list.length - 1; i >= 0; i--) {
        const b = list[i], v = b.speed * (1 + S.energy);
        if (b.to !== null) {
          // stepping across to the neighbouring pipeline
          const tx = x0 + b.to * gapX, d = tx - b.x, s = Math.sign(d) * Math.min(Math.abs(d), v * dt);
          b.x += s;
          if (Math.abs(tx - b.x) < .5) { b.x = tx; b.col = b.to; b.to = null; }
        } else {
          b.y += v * dt;
          const row = Math.floor(b.y / gapY);
          if (row > b.row) {
            b.row = row;
            flashes.push({ x: b.x, y: row * gapY, t: 0, gold: b.gold });
            if (Math.random() < .28) {
              const to = b.col + (Math.random() < .5 ? -1 : 1);
              if (to >= 0 && to < cols) { b.y = row * gapY; b.to = to; }
            }
          }
        }
        b.trail.push(b.x, b.y);
        let len = 0;
        for (let j = b.trail.length - 4; j >= 0; j -= 2) {
          len += Math.hypot(b.trail[j + 2] - b.trail[j], b.trail[j + 3] - b.trail[j + 1]);
          if (len > 170) { b.trail.splice(0, j); break; }
        }
        if (b.y - top > H + 200) { list.splice(i, 1); continue; }
        const c = b.gold ? C.sun : C.lilac, n = b.trail.length / 2;
        ctx.lineWidth = 1.5;
        for (let j = 0; j < b.trail.length - 2; j += 2) {
          ctx.strokeStyle = rgba(c, .75 * (j / 2 + 1) / n);
          ctx.beginPath();
          ctx.moveTo(b.trail[j], b.trail[j + 1] - top); ctx.lineTo(b.trail[j + 2], b.trail[j + 3] - top);
          ctx.stroke();
        }
        ctx.drawImage(b.gold ? gold : lil, b.x - 10, b.y - top - 10, 20, 20);
      }
      for (let i = flashes.length - 1; i >= 0; i--) {
        const fl = flashes[i];
        fl.t += dt / .9;
        if (fl.t > 1) { flashes.splice(i, 1); continue; }
        ctx.strokeStyle = rgba(fl.gold ? C.sun : C.lilac, .7 * (1 - fl.t));
        ctx.lineWidth = 1.2;
        ctx.strokeRect(fl.x - 3 - fl.t * 7, fl.y - top - 3 - fl.t * 7, 6 + fl.t * 14, 6 + fl.t * 14);
      }
    }
    return {
      key: 'beams', label: 'Beams',
      note: '<strong>10 · Beams.</strong> CI/CD pipelines: light travels down the columns like commits through a pipeline, sometimes stepping across to the next one, and <em>each stage flashes</em> as it passes. The cursor pushes commits into the column under it; scrolling speeds up the traffic.',
      init, resize: init, draw,
    };
  })();

  const none = { key: 'none', label: 'Now', note: '<strong>Now.</strong> The current flat background, for comparison.', init() {}, resize() {}, draw() {} };
  const options = [none, layers, blueprint, aurora, aleppo, contours, ripples, logs, silk, pulse, beams];

  /* ── loop ── */
  let current = null, raf = 0, last = 0;
  function resize() {
    // browsers fire resize without a real change (phones, on every address-bar show/hide); keep the scene then
    const w = canvas.clientWidth, h = canvas.clientHeight, d = Math.min(devicePixelRatio || 1, fine.matches ? 2 : 1.5);
    if (w === W && h === H && d === dpr && canvas.width) return;
    W = w; H = h; dpr = d;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    current && current.resize();
    if (reduce.matches && current) still();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, Math.max(0, (now - last) / 1000));
    last = now;
    tick(dt);
    // a background that leaves trails (Silk) fades the old frame itself instead of clearing it
    if (!current.persist) ctx.clearRect(0, 0, W, H);
    current.draw(dt);
  }
  function still() { ctx.clearRect(0, 0, W, H); S.scroll = scrollY; current.draw(0); }
  function start() {
    cancelAnimationFrame(raf);
    if (reduce.matches || document.hidden) return still();
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  /* ── switcher ── */
  const lab = document.createElement('div');
  lab.className = 'lab';
  lab.setAttribute('role', 'region');
  lab.setAttribute('aria-label', 'Background options');
  lab.innerHTML = '<div class="lab-bar"></div><p class="lab-note" aria-live="polite"></p><p class="lab-hint">Scroll, move the mouse and click to see each one react. Keys 1 to 9 and 0 switch.</p>';
  const bar = lab.querySelector('.lab-bar'), note = lab.querySelector('.lab-note');
  options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = i ? `${i} ${opt.label}` : opt.label; b.dataset.key = opt.key;
    b.addEventListener('click', () => choose(opt.key));
    bar.append(b);
  });
  const hide = document.createElement('button');
  hide.type = 'button'; hide.className = 'lab-hide'; hide.textContent = 'Hide';
  hide.addEventListener('click', () => {
    const hidden = lab.classList.toggle('is-hidden');
    hide.textContent = hidden ? 'Show' : 'Hide';
  });
  bar.append(hide);
  document.body.append(lab);

  function choose(key) {
    current = options.find((o) => o.key === key) || layers;
    root.dataset.bg = current.key;
    ctx.clearRect(0, 0, W, H);
    current.init();
    note.innerHTML = current.note;
    bar.querySelectorAll('[data-key]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.key === current.key)));
    const url = new URL(location.href);
    url.searchParams.set('bg', current.key);
    history.replaceState(null, '', url);
    start();
  }
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    // 1 to 9 pick those options, 0 picks the tenth
    const n = e.key === '0' ? 10 : Number(e.key);
    if (e.key.length === 1 && n >= 1 && n < options.length) choose(options[n].key);
  });

  addEventListener('resize', () => requestAnimationFrame(resize), { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? cancelAnimationFrame(raf) : start());
  reduce.addEventListener('change', start);
  if (reduce.matches) addEventListener('scroll', () => requestAnimationFrame(still), { passive: true });

  resize();
  choose(new URLSearchParams(location.search).get('bg') || 'layers');
})();
