// Experience options: fifteen layouts for the Experience and Volunteering & leadership sections, switchable live.
// Loaded with the other options (?lab links only) and adds an "Exp." row to their drawer. Every layout is a
// set of CSS rules under :root[data-exp="<key>"] (lab/experience.css). A few also add small helpers to the
// page (tabs, career bars, commit lines, toggles); everything a layout adds is undone when another is picked.
(() => {
  const lab = document.querySelector('.lab');
  const lists = [...document.querySelectorAll('#experience .timeline, #volunteering .timeline')];
  if (!lab || !lists.length) return;
  const root = document.documentElement;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'lab/experience.css';
  document.head.append(css);

  const roles = (list) => [...list.querySelectorAll(':scope > .role')];
  const all = lists.flatMap(roles);
  const toMonth = (t) => { const [y, m] = t.getAttribute('datetime').split('-').map(Number); return y * 12 + m - 1; };
  const now = new Date(), NOW = now.getFullYear() * 12 + now.getMonth();
  function span(role) {
    const t = role.querySelectorAll('.role-dates time');
    return [toMonth(t[0]), t[1] ? toMonth(t[1]) + 1 : NOW + 1];
  }

  // the company name, shown large by the Sticky and Chapters layouts (hidden otherwise)
  all.forEach((li) => {
    const org = document.createElement('span');
    org.className = 'exp-org';
    org.setAttribute('aria-hidden', 'true');
    org.textContent = li.dataset.org;
    li.querySelector('.role-when').prepend(org);
  });

  const options = [
    { key: 'now', label: 'Now', note: '<strong>Now.</strong> The current timeline: a vertical line with a hexagon per role, dates on one side and the role on the other.' },

    { key: 'cards', label: 'Cards',
      note: '<strong>1 · Cards.</strong> Each role on its own raised card. The current jobs carry a <em>gold edge</em> along the top, and a card lifts slightly under the pointer.' },

    { key: 'tabs', label: 'Tabs',
      note: '<strong>2 · Tabs.</strong> The well-known <em>"Where I\'ve worked"</em> pattern from Brittany Chiang\'s portfolio: company names in a column, one role shown at a time, with a gold marker sliding to the selected tab. Arrow keys move between tabs.',
      setup({ undo, signal }) {
        lists.forEach((list) => {
          const items = roles(list);
          const box = document.createElement('div');
          box.className = 'exp-tabbed';
          const tabs = document.createElement('div');
          tabs.className = 'exp-tabs';
          tabs.setAttribute('role', 'tablist');
          tabs.setAttribute('aria-label', list.closest('section').querySelector('h2').textContent);
          const buttons = items.map((li, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'exp-tab';
            b.setAttribute('role', 'tab');
            b.textContent = li.dataset.org;
            b.addEventListener('click', () => pick(i, true), { signal });
            tabs.append(b);
            return b;
          });
          function pick(i, focus) {
            items.forEach((li, j) => li.classList.toggle('is-active', i === j));
            buttons.forEach((b, j) => { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
            tabs.style.setProperty('--i', i);
            if (focus) buttons[i].focus();
          }
          tabs.addEventListener('keydown', (e) => {
            const i = buttons.indexOf(document.activeElement);
            const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
            if (i < 0 || !step) return;
            e.preventDefault();
            pick((i + step + items.length) % items.length, true);
          }, { signal });
          list.before(box);
          box.append(tabs, list);
          pick(0, false);
          undo(() => { box.before(list); box.remove(); items.forEach((li) => li.classList.remove('is-active')); });
        });
      } },

    { key: 'accordion', label: 'Accordion',
      note: '<strong>3 · Accordion.</strong> Every role folds to a one-line header (dates, title, place) and opens on click, so the whole career fits on one screen. The newest role starts open.',
      setup({ undo, signal }) {
        lists.forEach((list) => roles(list).forEach((li, i) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'exp-toggle';
          b.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>';
          const set = (open) => {
            li.classList.toggle('is-open', open);
            b.setAttribute('aria-expanded', String(open));
            b.setAttribute('aria-label', (open ? 'Hide details: ' : 'Show details: ') + li.dataset.org);
          };
          b.addEventListener('click', (e) => { e.stopPropagation(); set(!li.classList.contains('is-open')); }, { signal });
          li.addEventListener('click', (e) => {
            if (e.target.closest('a, .role-points, .role-stats, .role-foot')) return;
            set(!li.classList.contains('is-open'));
          }, { signal });
          li.querySelector('.role-title').after(b);
          set(i === 0);
          undo(() => { b.remove(); li.classList.remove('is-open'); });
        }));
      } },

    { key: 'bars', label: 'Career bars',
      note: '<strong>4 · Career bars.</strong> A chart of the whole career above the list: one bar per role on a year axis, so overlaps (HASH and Evolvo today) and the path from volunteering to senior roles show at a glance. <em>Hover a bar</em> to highlight its role; click to jump to it.',
      setup({ undo, signal }) {
        lists.forEach((list) => {
          const items = roles(list), spans = items.map(span);
          const from = Math.floor(Math.min(...spans.map((s) => s[0])) / 12) * 12;
          const to = (Math.floor(Math.max(...spans.map((s) => s[1])) / 12) + 1) * 12;
          const pct = (m) => ((m - from) / (to - from) * 100).toFixed(2) + '%';
          const chart = document.createElement('div');
          chart.className = 'exp-bars';
          chart.setAttribute('aria-hidden', 'true');
          let html = '<div class="exp-axis">';
          for (let y = from / 12; y <= to / 12; y++) html += `<span style="inset-inline-start: ${pct(y * 12)}">${y}</span>`;
          html += '</div>';
          items.forEach((li, i) => {
            const [s, e] = spans[i];
            html += `<div class="exp-row" data-i="${i}"><span class="exp-row-label">${li.dataset.org}</span>`
              + `<span class="exp-track"><span class="exp-bar${li.classList.contains('is-current') ? ' is-current' : ''}"`
              + ` style="inset-inline-start: ${pct(s)}; width: calc(${pct(e)} - ${pct(s)})"></span></span></div>`;
          });
          chart.innerHTML = html;
          chart.addEventListener('pointerover', (e) => {
            const row = e.target.closest('.exp-row');
            items.forEach((li, i) => li.classList.toggle('is-hot', !!row && +row.dataset.i === i));
          }, { signal });
          chart.addEventListener('pointerleave', () => items.forEach((li) => li.classList.remove('is-hot')), { signal });
          chart.addEventListener('click', (e) => {
            const row = e.target.closest('.exp-row');
            if (row) items[+row.dataset.i].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, { signal });
          list.before(chart);
          undo(() => { chart.remove(); items.forEach((li) => li.classList.remove('is-hot')); });
        });
      } },

    { key: 'git', label: 'Git log',
      note: '<strong>5 · Git log.</strong> The career as <em>git log --graph</em>: the timeline becomes a branch with a commit per role, each with a hash and refs (HEAD on the newest), the title as a <em>feat:</em> message and every bullet as an added line.',
      setup({ undo }) {
        lists.forEach((list, l) => roles(list).forEach((li, i) => {
          let h = 0x811c9dc5;
          for (const c of li.dataset.org) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
          const hash = (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
          const ref = l === 0 && i === 0 ? ' <span class="git-ref">(HEAD -&gt; main)</span>'
            : li.classList.contains('is-current') ? ' <span class="git-ref">(origin/main)</span>'
            : l === 1 && i === 0 ? ' <span class="git-ref">(volunteering)</span>' : '';
          const line = document.createElement('p');
          line.className = 'git-commit';
          line.setAttribute('aria-hidden', 'true');
          line.innerHTML = `commit <span class="git-hash">${hash}</span>${ref}`;
          li.prepend(line);
          undo(() => line.remove());
        }));
      } },

    { key: 'center', label: 'Center line',
      note: '<strong>6 · Center line.</strong> The timeline runs down the middle and the roles <em>alternate sides</em>, dates facing the role across the line. On phones it folds back to a single column.' },

    { key: 'sticky', label: 'Sticky',
      note: '<strong>7 · Sticky.</strong> The company name in large type with its dates, <em>pinned beside the role while you scroll</em> through its bullets, then handing over to the next company. Editorial and calm.' },

    { key: 'resume', label: 'Résumé',
      note: '<strong>8 · Résumé.</strong> Dense and typographic, like a printed CV: title on the left, <em>dates aligned on the right</em> of the same line, hairlines between roles and smaller type. Built for recruiters who skim.' },

    { key: 'bento', label: 'Bento',
      note: '<strong>9 · Bento.</strong> Each role laid out as a <em>bento grid</em> of tiles, Apple-keynote style: the bullets in a large tile, each number in a tile of its own beside it, and the stack in a strip below.' },

    { key: 'chapters', label: 'Chapters',
      note: '<strong>10 · Chapters.</strong> A magazine treatment: every role opens as a chapter with a <em>huge outlined number</em> (01, 02, 03…) and the company name set large above its dates.' },

    { key: 'terminal', label: 'Terminal',
      note: '<strong>11 · Terminal.</strong> Each section inside a <em>terminal window</em> with traffic-light buttons: every role is the output of <em>cat hash.md</em>, titles as Markdown headings, and a blinking prompt at the end. It stays dark even in light mode, like a real terminal.',
      setup({ undo }) {
        lists.forEach((list) => {
          const dir = list.closest('section').id, prompt = `<span class="term-user">mahmoud@aleppo</span>:<span class="term-path">~/${dir}</span>$ `;
          const win = document.createElement('div');
          win.className = 'exp-term';
          win.innerHTML = `<div class="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>~/${dir} — zsh</span></div>`;
          list.before(win);
          win.append(list);
          const lines = roles(list).map((li) => {
            const p = document.createElement('p');
            p.className = 'term-cmd';
            p.setAttribute('aria-hidden', 'true');
            p.innerHTML = `${prompt}cat ${li.dataset.org.toLowerCase()}.md`;
            li.prepend(p);
            return p;
          });
          const end = document.createElement('p');
          end.className = 'term-cmd term-end';
          end.setAttribute('aria-hidden', 'true');
          end.innerHTML = `${prompt}<span class="term-caret"></span>`;
          win.append(end);
          undo(() => { win.before(list); win.remove(); lines.forEach((p) => p.remove()); });
        });
      } },

    { key: 'stack', label: 'Card stack',
      note: '<strong>12 · Card stack.</strong> Roles on cards that <em>pin and pile up as you scroll</em>, each new card sliding over the last with a little of the one below still showing, like a deck being dealt.' },

    { key: 'metro', label: 'Metro',
      note: '<strong>13 · Metro.</strong> The career as a <em>metro line</em>: one station per company in date order, from the first job to today. Click a station and a gold train rides the line to it while that role opens below. Arrow keys work too.',
      setup({ undo, signal }) {
        lists.forEach((list) => {
          const items = roles(list);
          const order = items.map((_, i) => i).sort((a, b) => span(items[a])[0] - span(items[b])[0]);
          const metro = document.createElement('div');
          metro.className = 'exp-metro';
          metro.setAttribute('role', 'tablist');
          metro.setAttribute('aria-label', list.closest('section').querySelector('h2').textContent);
          metro.style.setProperty('--n', items.length);
          metro.innerHTML = '<span class="metro-line" aria-hidden="true"></span><span class="metro-train" aria-hidden="true"></span>';
          const stops = order.map((idx, pos) => {
            const li = items[idx], b = document.createElement('button');
            b.type = 'button';
            b.className = 'metro-stop';
            b.setAttribute('role', 'tab');
            b.innerHTML = `<span class="metro-dot"></span><span class="metro-name">${li.dataset.org}</span><span class="metro-year">${Math.floor(span(li)[0] / 12)}</span>`;
            b.addEventListener('click', () => pick(pos, true), { signal });
            metro.append(b);
            return b;
          });
          function pick(pos, focus) {
            items.forEach((li, j) => li.classList.toggle('is-active', j === order[pos]));
            stops.forEach((b, j) => { b.setAttribute('aria-selected', String(j === pos)); b.tabIndex = j === pos ? 0 : -1; });
            metro.style.setProperty('--i', pos);
            if (focus) stops[pos].focus();
          }
          metro.addEventListener('keydown', (e) => {
            const pos = stops.indexOf(document.activeElement);
            const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key] * (root.dir === 'rtl' ? -1 : 1);
            if (pos < 0 || !step) return;
            e.preventDefault();
            pick(Math.max(0, Math.min(stops.length - 1, pos + step)), true);
          }, { signal });
          list.before(metro);
          pick(stops.length - 1, false);
          undo(() => { metro.remove(); items.forEach((li) => li.classList.remove('is-active')); });
        });
      } },

    { key: 'kanban', label: 'Kanban',
      note: '<strong>14 · Kanban.</strong> The career as a <em>sprint board</em>: current roles in an "In progress" column, finished ones in "Done", each card with a status pill and a count on every column. Volunteering shows an honest empty "In progress" lane.',
      setup({ undo }) {
        const ar = root.lang === 'ar';
        const text = ar ? { doing: 'قيد العمل', done: 'منجز', empty: 'لا شيء قيد العمل الآن' } : { doing: 'In progress', done: 'Done', empty: 'Nothing in progress' };
        lists.forEach((list) => {
          const items = roles(list), board = document.createElement('div');
          board.className = 'exp-board';
          [[text.doing, items.filter((li) => li.classList.contains('is-current'))], [text.done, items.filter((li) => !li.classList.contains('is-current'))]].forEach(([name, group]) => {
            const col = document.createElement('div');
            col.className = 'exp-col';
            col.innerHTML = `<p class="exp-col-head"><span>${name}</span><span class="exp-count">${group.length}</span></p>`;
            const ol = document.createElement('ol');
            ol.className = 'timeline exp-col-list';
            group.forEach((li) => ol.append(li));
            if (!group.length) ol.innerHTML = `<li class="exp-empty">${text.empty}</li>`;
            col.append(ol);
            board.append(col);
          });
          const pills = items.map((li) => {
            const doing = li.classList.contains('is-current'), p = document.createElement('span');
            p.className = 'exp-status' + (doing ? ' is-doing' : '');
            p.textContent = doing ? text.doing : text.done;
            li.querySelector('.role-when').prepend(p);
            return p;
          });
          list.replaceWith(board);
          undo(() => { board.replaceWith(list); items.forEach((li) => list.append(li)); pills.forEach((p) => p.remove()); });
        });
      } },

    { key: 'focus', label: 'Scroll focus',
      note: '<strong>15 · Scroll focus.</strong> A spotlight that follows your reading: the role in the middle of the screen is sharp and its marker turns gold, the others <em>dim and soften</em>, and a gold line fills the timeline as you scroll down it.',
      setup({ undo, signal }) {
        const io = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('is-focus', e.isIntersecting)), { rootMargin: '-42% 0px -42% 0px' });
        all.forEach((li) => io.observe(li));
        const update = () => lists.forEach((list) => {
          const r = list.getBoundingClientRect();
          list.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * .5 - r.top) / r.height)).toFixed(4));
        });
        let raf = 0;
        addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true, signal });
        update();
        undo(() => { io.disconnect(); all.forEach((li) => li.classList.remove('is-focus')); lists.forEach((l) => l.style.removeProperty('--p')); });
      } },
  ];

  /* ── drawer row and switching ── */
  const row = document.createElement('div');
  row.className = 'lab-row';
  row.innerHTML = '<span class="lab-label">Exp.</span><div class="lab-bar"></div>';
  [...lab.querySelectorAll('.lab-row')].pop().after(row);
  const bar = row.querySelector('.lab-bar'), note = lab.querySelector('.lab-note');
  options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = i ? `${i} ${opt.label}` : opt.label; b.dataset.exp = opt.key;
    b.addEventListener('click', () => choose(opt.key, true));
    bar.append(b);
  });

  let undos = [], controller = null;
  function choose(key, announce) {
    const opt = options.find((o) => o.key === key) || options[0];
    undos.reverse().forEach((fn) => fn());
    undos = [];
    if (controller) controller.abort();
    controller = new AbortController();
    root.dataset.exp = opt.key;
    if (opt.setup) opt.setup({ undo: (fn) => undos.push(fn), signal: controller.signal });
    bar.querySelectorAll('[data-exp]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.exp === opt.key)));
    const url = new URL(location.href);
    url.searchParams.set('exp', opt.key);
    history.replaceState(null, '', url);
    if (announce) {
      note.innerHTML = opt.note;
      document.getElementById('experience').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  choose(new URLSearchParams(location.search).get('exp') || 'now', false);
})();
