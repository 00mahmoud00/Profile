// Footer options: five designs for the contact footer, switchable live.
// Loaded with the other options (?lab links only) and adds a "Footer" row to their drawer. Each design is
// CSS under :root[data-footer="<key>"] (lab/footer.css) plus, for some, a few injected parts that are
// removed again when another design is picked. Every design keeps all channels equal: the visitor picks.
(() => {
  const lab = document.querySelector('.lab'), footer = document.querySelector('footer.contact');
  if (!lab || !footer) return;
  const root = document.documentElement, wrap = footer.querySelector('.wrap'), lead = wrap.querySelector('.contact-lead');
  const channels = wrap.querySelector('.channels');
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'lab/footer.css';
  document.head.append(css);
  const ar = root.lang === 'ar';
  const t = (en, arText) => (ar ? arText : en);
  // the vCard link as a QR code (version 5, 37 modules, error correction M), checked to decode
  const QR = '<svg class="ft-qr" viewBox="-2 -2 41 41" role="img" aria-label="QR code that saves Mahmoud\'s contact card">'
    + '<rect x="-2" y="-2" width="41" height="41" fill="#fffdf8"/><path fill="#120a26" d="M0 0h7v1h-7zM10 0h2v1h-2zM13 0h2v1h-2zM16 0h3v1h-3zM21 0h1v1h-1zM24 0h1v1h-1zM26 0h2v1h-2zM30 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM10 1h1v1h-1zM12 1h1v1h-1zM14 1h1v1h-1zM17 1h3v1h-3zM23 1h3v1h-3zM27 1h2v1h-2zM30 1h1v1h-1zM36 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM10 2h1v1h-1zM12 2h1v1h-1zM17 2h4v1h-4zM22 2h3v1h-3zM26 2h3v1h-3zM30 2h1v1h-1zM32 2h3v1h-3zM36 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM9 3h1v1h-1zM13 3h3v1h-3zM18 3h1v1h-1zM22 3h2v1h-2zM26 3h3v1h-3zM30 3h1v1h-1zM32 3h3v1h-3zM36 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM9 4h1v1h-1zM13 4h4v1h-4zM18 4h1v1h-1zM21 4h1v1h-1zM23 4h6v1h-6zM30 4h1v1h-1zM32 4h3v1h-3zM36 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h2v1h-2zM12 5h1v1h-1zM15 5h1v1h-1zM19 5h1v1h-1zM22 5h1v1h-1zM24 5h4v1h-4zM30 5h1v1h-1zM36 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM28 6h1v1h-1zM30 6h7v1h-7zM9 7h1v1h-1zM11 7h2v1h-2zM14 7h5v1h-5zM22 7h2v1h-2zM26 7h2v1h-2zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h2v1h-2zM8 8h2v1h-2zM11 8h1v1h-1zM13 8h2v1h-2zM16 8h5v1h-5zM24 8h3v1h-3zM28 8h2v1h-2zM31 8h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1zM8 9h2v1h-2zM15 9h5v1h-5zM23 9h2v1h-2zM26 9h1v1h-1zM28 9h1v1h-1zM34 9h1v1h-1zM36 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM10 10h2v1h-2zM13 10h1v1h-1zM15 10h1v1h-1zM19 10h1v1h-1zM22 10h5v1h-5zM28 10h2v1h-2zM31 10h3v1h-3zM35 10h2v1h-2zM0 11h2v1h-2zM5 11h1v1h-1zM8 11h2v1h-2zM12 11h1v1h-1zM16 11h1v1h-1zM18 11h10v1h-10zM29 11h1v1h-1zM32 11h1v1h-1zM1 12h1v1h-1zM3 12h1v1h-1zM5 12h2v1h-2zM10 12h1v1h-1zM12 12h1v1h-1zM15 12h4v1h-4zM20 12h2v1h-2zM23 12h3v1h-3zM28 12h3v1h-3zM35 12h2v1h-2zM0 13h6v1h-6zM7 13h2v1h-2zM11 13h2v1h-2zM19 13h4v1h-4zM24 13h1v1h-1zM29 13h3v1h-3zM34 13h2v1h-2zM1 14h2v1h-2zM6 14h1v1h-1zM8 14h2v1h-2zM12 14h2v1h-2zM22 14h3v1h-3zM26 14h1v1h-1zM31 14h2v1h-2zM34 14h1v1h-1zM36 14h1v1h-1zM0 15h1v1h-1zM3 15h2v1h-2zM9 15h1v1h-1zM12 15h4v1h-4zM20 15h6v1h-6zM27 15h2v1h-2zM30 15h1v1h-1zM32 15h1v1h-1zM36 15h1v1h-1zM1 16h7v1h-7zM10 16h2v1h-2zM13 16h2v1h-2zM16 16h1v1h-1zM19 16h2v1h-2zM24 16h1v1h-1zM29 16h3v1h-3zM33 16h3v1h-3zM0 17h1v1h-1zM7 17h2v1h-2zM10 17h1v1h-1zM12 17h1v1h-1zM14 17h2v1h-2zM17 17h1v1h-1zM19 17h1v1h-1zM21 17h2v1h-2zM25 17h2v1h-2zM28 17h2v1h-2zM32 17h2v1h-2zM35 17h2v1h-2zM0 18h1v1h-1zM5 18h5v1h-5zM11 18h3v1h-3zM17 18h1v1h-1zM19 18h2v1h-2zM24 18h1v1h-1zM26 18h1v1h-1zM28 18h1v1h-1zM30 18h7v1h-7zM0 19h1v1h-1zM5 19h1v1h-1zM9 19h1v1h-1zM12 19h1v1h-1zM15 19h7v1h-7zM24 19h1v1h-1zM26 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM34 19h2v1h-2zM1 20h1v1h-1zM6 20h2v1h-2zM9 20h1v1h-1zM11 20h2v1h-2zM14 20h1v1h-1zM16 20h1v1h-1zM19 20h1v1h-1zM21 20h3v1h-3zM25 20h2v1h-2zM30 20h1v1h-1zM32 20h1v1h-1zM35 20h1v1h-1zM1 21h1v1h-1zM5 21h1v1h-1zM7 21h2v1h-2zM10 21h3v1h-3zM16 21h2v1h-2zM20 21h1v1h-1zM24 21h1v1h-1zM26 21h1v1h-1zM28 21h4v1h-4zM33 21h1v1h-1zM35 21h2v1h-2zM3 22h1v1h-1zM5 22h5v1h-5zM11 22h1v1h-1zM14 22h1v1h-1zM18 22h2v1h-2zM21 22h2v1h-2zM25 22h2v1h-2zM28 22h1v1h-1zM30 22h1v1h-1zM36 22h1v1h-1zM1 23h1v1h-1zM4 23h2v1h-2zM8 23h1v1h-1zM11 23h2v1h-2zM15 23h2v1h-2zM18 23h1v1h-1zM25 23h1v1h-1zM28 23h3v1h-3zM0 24h2v1h-2zM6 24h2v1h-2zM9 24h2v1h-2zM12 24h1v1h-1zM14 24h1v1h-1zM16 24h1v1h-1zM18 24h2v1h-2zM24 24h4v1h-4zM29 24h3v1h-3zM33 24h1v1h-1zM35 24h2v1h-2zM1 25h1v1h-1zM4 25h2v1h-2zM7 25h2v1h-2zM10 25h2v1h-2zM13 25h1v1h-1zM15 25h1v1h-1zM17 25h2v1h-2zM22 25h1v1h-1zM24 25h1v1h-1zM29 25h3v1h-3zM33 25h1v1h-1zM35 25h2v1h-2zM0 26h1v1h-1zM4 26h4v1h-4zM10 26h4v1h-4zM15 26h2v1h-2zM18 26h1v1h-1zM20 26h2v1h-2zM23 26h1v1h-1zM25 26h1v1h-1zM29 26h1v1h-1zM31 26h2v1h-2zM34 26h1v1h-1zM36 26h1v1h-1zM1 27h1v1h-1zM3 27h1v1h-1zM7 27h6v1h-6zM14 27h1v1h-1zM16 27h4v1h-4zM21 27h2v1h-2zM25 27h1v1h-1zM27 27h1v1h-1zM29 27h1v1h-1zM32 27h1v1h-1zM0 28h2v1h-2zM4 28h3v1h-3zM8 28h1v1h-1zM11 28h1v1h-1zM15 28h3v1h-3zM19 28h2v1h-2zM22 28h1v1h-1zM24 28h1v1h-1zM28 28h5v1h-5zM34 28h1v1h-1zM36 28h1v1h-1zM8 29h2v1h-2zM11 29h2v1h-2zM16 29h2v1h-2zM21 29h4v1h-4zM26 29h3v1h-3zM32 29h2v1h-2zM35 29h2v1h-2zM0 30h7v1h-7zM10 30h1v1h-1zM12 30h3v1h-3zM16 30h2v1h-2zM20 30h1v1h-1zM22 30h1v1h-1zM24 30h2v1h-2zM27 30h2v1h-2zM30 30h1v1h-1zM32 30h2v1h-2zM35 30h2v1h-2zM0 31h1v1h-1zM6 31h1v1h-1zM8 31h3v1h-3zM12 31h1v1h-1zM19 31h1v1h-1zM21 31h1v1h-1zM28 31h1v1h-1zM32 31h3v1h-3zM36 31h1v1h-1zM0 32h1v1h-1zM2 32h3v1h-3zM6 32h1v1h-1zM13 32h3v1h-3zM17 32h1v1h-1zM22 32h5v1h-5zM28 32h6v1h-6zM35 32h2v1h-2zM0 33h1v1h-1zM2 33h3v1h-3zM6 33h1v1h-1zM8 33h2v1h-2zM11 33h1v1h-1zM13 33h1v1h-1zM15 33h1v1h-1zM19 33h4v1h-4zM24 33h3v1h-3zM31 33h2v1h-2zM34 33h2v1h-2zM0 34h1v1h-1zM2 34h3v1h-3zM6 34h1v1h-1zM9 34h3v1h-3zM14 34h1v1h-1zM16 34h2v1h-2zM20 34h1v1h-1zM24 34h5v1h-5zM31 34h3v1h-3zM35 34h2v1h-2zM0 35h1v1h-1zM6 35h1v1h-1zM10 35h1v1h-1zM12 35h2v1h-2zM15 35h1v1h-1zM18 35h1v1h-1zM21 35h1v1h-1zM23 35h3v1h-3zM27 35h2v1h-2zM30 35h2v1h-2zM0 36h7v1h-7zM8 36h4v1h-4zM13 36h1v1h-1zM16 36h2v1h-2zM19 36h1v1h-1zM21 36h1v1h-1zM24 36h2v1h-2zM27 36h2v1h-2zM30 36h1v1h-1zM35 36h2v1h-2z"/></svg>';
  const EMAIL = 'mahmoud.sharabati.dev@gmail.com', WA = 'https://wa.me/963985839618';
  const list = () => [...channels.querySelectorAll('.channel')].map((li) => ({
    key: li.querySelector('.channel-label').dataset.i18n.split('.')[1],
    value: li.querySelector('.channel-value').textContent.replace(/ /g, ' '),
    href: li.querySelector('.channel-value').getAttribute('href'),
  }));
  const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '');

  const options = [
    { key: 'now', label: 'Now', note: '<strong>Now.</strong> Six equal contact cards with their own actions, then Download CV, Save contact card and the local time in Aleppo.' },

    { key: 'marquee', label: 'Marquee',
      note: '<strong>1 · Marquee.</strong> A giant band of type <em>scrolling endlessly</em> across the footer, "Let\'s build something together" in English and Arabic, solid and outlined in turn. The channels sit below as one row of pills.',
      setup({ undo }) {
        const phrase = '<span>Let\'s build something together</span><i>✦</i><span class="is-outline" lang="ar">لنبنِ شيئًا معًا</span><i>✦</i>';
        const band = document.createElement('div');
        band.className = 'ft-marquee';
        band.setAttribute('aria-hidden', 'true');
        band.innerHTML = `<div class="ft-track">${phrase.repeat(4)}</div>`;
        footer.prepend(band);
        undo(() => band.remove());
      } },

    { key: 'composer', label: 'Composer',
      note: '<strong>2 · Composer.</strong> Write the message right on the page, then <em>choose how to send it</em>: email or WhatsApp opens with the message already filled in. No server and nothing stored, only the visitor\'s own apps. The channels list sits beside it.',
      setup({ undo, signal }) {
        const split = document.createElement('div');
        split.className = 'ft-split';
        const form = document.createElement('form');
        form.className = 'ft-form';
        form.noValidate = true;
        form.innerHTML = `
          <p class="ft-form-title">${t('Write me a message', 'اكتب لي رسالة')}</p>
          <label>${t('Your name', 'اسمك')}<input name="name" autocomplete="name"></label>
          <label>${t('Message', 'الرسالة')}<textarea name="message" rows="5"></textarea></label>
          <p class="ft-form-hint">${t('It opens in your own email or WhatsApp, ready to send.', 'تُفتح في بريدك أو في واتساب لديك، جاهزة للإرسال.')}</p>
          <div class="ft-form-actions">
            <button class="btn btn-primary" type="submit" value="email">${t('Send by email', 'أرسل بالبريد')}</button>
            <button class="btn" type="submit" value="whatsapp">${t('Send on WhatsApp', 'أرسل عبر واتساب')}</button>
          </div>`;
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = form.elements.name.value.trim(), message = form.elements.message.value.trim();
          if (!message) { form.elements.message.focus(); form.classList.add('is-empty'); return; }
          form.classList.remove('is-empty');
          const body = message + (name ? '\n\n— ' + name : '');
          if (e.submitter && e.submitter.value === 'whatsapp') window.open(WA + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
          else location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(t('Hello from your portfolio', 'مرحبًا من موقعك') + (name ? ' — ' + name : '')) + '&body=' + encodeURIComponent(body);
        }, { signal });
        lead.after(split);
        split.append(channels, form);
        undo(() => { lead.after(channels); split.remove(); });
      } },

    { key: 'terminal', label: 'Terminal',
      note: '<strong>3 · Terminal.</strong> The contact details as the output of <em>contact --all</em> in a terminal window, after a <em>whoami</em>. Every line is a live link, and the CV is one more command.',
      setup({ undo }) {
        const rows = list().map((c) => `<p><span class="t-key">${c.key.padEnd(11, ' ')}</span><a href="${c.href}"${ext(c.href)}>${c.value}</a></p>`).join('');
        const term = document.createElement('div');
        term.className = 'ft-term';
        term.innerHTML = `<div class="ft-term-bar" aria-hidden="true"><i></i><i></i><i></i><span>~/contact — zsh</span></div>
          <div class="ft-term-body">
            <p class="t-cmd"><b>$</b> whoami</p>
            <p class="t-out">Mahmoud Sharabati · Senior .NET Core developer · Aleppo, Syria (UTC+3)</p>
            <p class="t-cmd"><b>$</b> contact --all</p>${rows}
            <p class="t-cmd"><b>$</b> open <a href="cv/Mahmoud_Sharabati_CV.pdf" download>Mahmoud_Sharabati_CV.pdf</a></p>
            <p class="t-cmd"><b>$</b> <span class="t-caret"></span></p>
          </div>`;
        lead.after(term);
        undo(() => term.remove());
      } },

    { key: 'card', label: 'Business card',
      note: '<strong>4 · Business card.</strong> A <em>flat business card</em> with the logo, both names, title and details, beside a <em>QR code</em>: scanning it with a phone saves the contact in one tap. The channels follow as a row of pills.',
      setup({ undo }) {
        const row = document.createElement('div');
        row.className = 'ft-cardrow';
        row.innerHTML = `
          <div class="ft-card">
            <img class="ft-card-mark" src="brand/mark.svg" alt="" width="54" height="54">
            <p class="ft-card-name">Mahmoud Sharabati <span lang="ar">محمود شراباتي</span></p>
            <p class="ft-card-title">${t('Senior .NET Core Developer', 'مطوّر <bdi dir="ltr">.NET Core</bdi> أول')}</p>
            <div class="ft-card-lines" dir="ltr">
              <a href="tel:+963985839618">+963 985 839 618</a>
              <a href="mailto:${EMAIL}">${EMAIL}</a>
              <a href="https://mahmoudsharabati.me/Profile/">mahmoudsharabati.me/Profile</a>
            </div>
          </div>
          <div class="ft-qrbox">${QR}
            <p>${t('Scan to save my contact', 'امسح الرمز لحفظ جهة الاتصال')}</p>
          </div>`;
        lead.after(row);
        undo(() => row.remove());
      } },

    { key: 'list', label: 'Big list',
      note: '<strong>5 · Big list.</strong> Editorial and bold: every channel is <em>one large row</em> with its value in big type and an arrow. Hovering fills the row with that channel\'s colour from the side.' },
  ];

  /* ── drawer row and switching ── */
  const row = document.createElement('div');
  row.className = 'lab-row';
  row.innerHTML = '<span class="lab-label">Footer</span><div class="lab-bar"></div>';
  [...lab.querySelectorAll('.lab-row')].pop().after(row);
  const bar = row.querySelector('.lab-bar'), note = lab.querySelector('.lab-note');
  options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = i ? `${i} ${opt.label}` : opt.label; b.dataset.footer = opt.key;
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
    root.dataset.footer = opt.key;
    if (opt.setup) opt.setup({ undo: (fn) => undos.push(fn), signal: controller.signal });
    bar.querySelectorAll('[data-footer]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.footer === opt.key)));
    const url = new URL(location.href);
    url.searchParams.set('footer', opt.key);
    history.replaceState(null, '', url);
    if (announce) {
      note.innerHTML = opt.note;
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  choose(new URLSearchParams(location.search).get('footer') || 'now', false);
})();
