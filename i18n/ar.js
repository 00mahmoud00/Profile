// Arabic translations, loaded only for ?lang=ar (see the first script in index.html).
// Each key matches a data-i18n (inner HTML) or data-i18n-attr ("attr=key") in index.html. A key
// missing here simply leaves the English in place. Latin terms that start or end with punctuation
// (.NET, C#, .NET Core/6+) sit in <bdi dir="ltr"> so the right-to-left text doesn't move their dots
// and signs. The conjunction و gets a space before a Latin word; joined, it reads like a Latin "g".
// Months use the names used in Syria (كانون الثاني … كانون الأول).
(() => {
  const NET = '<bdi dir="ltr">.NET</bdi>';
  const T = {
    skip: 'انتقل إلى المحتوى',
    brand: 'محمود شراباتي، العودة إلى الأعلى',
    nav: 'الأقسام',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرة',
    'nav.skills': 'المهارات',
    'nav.contact': 'تواصل',
    'theme.light': 'التبديل إلى الوضع الفاتح',
    'theme.dark': 'التبديل إلى الوضع الداكن',

    'hero.role': `مطوّر <bdi dir="ltr">.NET Core</bdi> أول في حلب، سوريا`,
    'hero.intro': `أصمّم أنظمة الخوادم وفق Clean Architecture و Domain-Driven Design، وأبني واجهاتها باستخدام Blazor. أعمل على ${NET} منذ أكثر من أربع سنوات، ومن أعمالي الواجهات البرمجية التي تشغّل تطبيقات منشورة على Google Play و App Store. أطوّر اليوم الأنظمة الإدارية وأصونها في HASH Information Technology، وأعمل على توسيع الخادم الخلفي لتطبيق «وسيطك»، وهو سوق إلكتروني تجاوزت تنزيلاته عشرة آلاف.`,
    'hero.email': 'راسلني',
    'hero.photo': 'محمود شراباتي بسترة بلون الحجر ونظارة شمسية',

    'projects.title': 'تطبيقات عملت عليها',
    'projects.lead': 'تطبيقات منشورة من Evolvo حيث أعمل الآن، ومن Elkood. تعرض كل بطاقة ما يقدّمه التطبيق والدور الذي أدّيته فيه.',
    'projects.current': 'Evolvo <span class="visually-hidden">(عملي الحالي)</span>',
    'app.apis': 'صمّمت الواجهات البرمجية (APIs)',
    'app.wasiitak.name': 'وسيطك <span class="showcase-alt" lang="en">Wasiitak</span>',
    'app.wasiitak.role': 'الخادم الخلفي والتوسّع و DevOps والبيانات',
    'app.wasiitak.what': 'سوق يصل بين البائعين والمشترين: إعلانات مجانية، وتصفّح حسب الفئة والموقع، ومحادثة داخل التطبيق، وتقييمات تبني الثقة.',
    'app.wasiitak.stat': '<strong>أكثر من 10 آلاف</strong> تنزيل على Google Play',
    'app.wasiitak.play': 'وسيطك على Google Play',
    'app.mrcourse.name': 'Mr Course',
    'app.mrcourse.what': 'تطبيق دراسي لطلاب الطب: دروس فيديو، واختبارات تدريبية، ومفضّلة تحفظ الدروس المهمة.',
    'app.mrcourse.play': 'Mr Course على Google Play',
    'app.flyorder.name': 'Fly Order',
    'app.flyorder.what': 'توصيل من المطاعم والمتاجر والصيدليات.',
    'app.flyorder.play': 'Fly Order على Google Play',
    'app.adsnet.name': 'إعلان نت <span class="showcase-alt" lang="en">Ads Net</span>',
    'app.adsnet.what': 'يكسب المستخدمون نقاطًا بمشاهدة الإعلانات، ثم ينفقونها أو يهدونها لغيرهم.',
    'app.adsnet.play': 'إعلان نت على Google Play',
    'app.jenacom.name': 'Jenacom',
    'app.jenacom.what': 'نقل البضائع بين المدن: يقبل السائقون الطلبات، ويتّبعون مسار اليوم، ويشاركون مواقعهم.',
    'app.jenacom.store': 'Jenacom على App Store',
    'app.bronz.name': 'برونز <span class="showcase-alt" lang="en">Bronz</span>',
    'app.bronz.role': 'أشرفت على التطوير',
    'app.bronz.what': 'متجر إلكتروني لملابس الأطفال من عمر سنة إلى 16 سنة.',
    'app.bronz.play': 'برونز على Google Play',
    'app.bronz.store': 'برونز على App Store',

    'exp.title': 'الخبرة',
    aleppo: 'حلب، سوريا',
    'exp.remote': 'عن بُعد',
    'exp.hash.dates': '<time datetime="2026-04">نيسان 2026</time> – حتى الآن',
    'exp.hash.title': `مطوّر ${NET} <span class="role-org">في HASH Information Technology</span>`,
    'exp.hash.1': '<strong>الأنظمة الإدارية.</strong> تطوير الأنظمة الإدارية التي تبنيها <a href="https://hashsd.com" target="_blank" rel="noopener noreferrer">HASH</a> للشركات والمؤسسات وصيانتها، من الوحدات الجديدة إلى الإصلاحات في بيئة الإنتاج.',
    'exp.hash.2': '<strong>تصميم قواعد البيانات.</strong> تصميم مخططات علائقية تمثّل إجراءات عمل كل عميل، مع التركيز على سلامة البيانات وسرعة الاستعلامات مع نموّها.',
    'exp.hash.3': '<strong>تطوير الواجهات البرمجية.</strong> بناء واجهات ASP.NET Core البرمجية التي تحمل سير العمل وتخدم واجهات الأنظمة.',
    'exp.hash.4': '<strong>متطلبات العمل.</strong> تحويل احتياجات العمل إلى ميزات تعمل، وتنظيمها وفق Clean Architecture لتبقى الأنظمة سهلة التوسعة.',
    'exp.hash.5': '<strong>الصيانة والأداء.</strong> الحفاظ على سلامة الأنظمة في بيئة الإنتاج: تتبّع الأخطاء، وتحسين الاستعلامات ونقاط الوصول البطيئة، وتكييف الميزات مع تغيّر احتياجات العملاء.',
    'exp.evolvo.dates': '<time datetime="2025-11">تشرين الثاني 2025</time> – حتى الآن',
    'exp.evolvo.type': 'دوام جزئي، ثم بعقد منذ <time datetime="2026-05">أيار 2026</time>',
    'exp.evolvo.title': `مطوّر ${NET} <span class="role-org">في Evolvo</span>`,
    'exp.evolvo.1': '<strong>وسيطك.</strong> تحسين الخادم الخلفي لهذا السوق الإلكتروني للبيع والشراء (أكثر من 10 آلاف تنزيل) وتوسيعه، وإدارة عمليات DevOps والبيانات فيه (انظر <a href="#projects">المشاريع</a>).',
    'exp.evolvo.2': `<strong>تطوير الميزات.</strong> صمّمت لوحات تحكّم إدارية متجاوبة ونفّذتها باستخدام Blazor و <bdi dir="ltr">.NET Core</bdi>، مع التركيز على عرض البيانات لحظيًا وأدوات إدارة فعّالة.`,
    'exp.evolvo.3': '<strong>دعم بيئة الإنتاج.</strong> أدرت التطبيق في بيئة إنتاج حيّة، مع فحوص دورية لصحة الخوادم وحلّ المشكلات التقنية لضمان جاهزية بنسبة <bdi dir="ltr">99.9%</bdi>.',
    'exp.evolvo.4': '<strong>الدعم التقني والتحسين.</strong> كنت نقطة الاتصال الأولى في المشكلات التقنية: أحدّد أسبابها الجذرية من سجلات الإنتاج وأنشر الإصلاحات العاجلة لتحسين استقرار النظام.',
    'exp.elkood.dates': '<time datetime="2022-05">أيار 2022</time> – <time datetime="2024-04">نيسان 2024</time>',
    'exp.elkood.type': 'دوام كامل',
    'exp.elkood.title': `مطوّر خوادم ${NET} <span class="role-org">في Elkood</span>`,
    'exp.elkood.1': '<strong>تطبيقات في بيئة الإنتاج.</strong> صمّمت الواجهات البرمجية لتطبيقات Fly Order و Mr Course وإعلان نت و Jenacom، وأشرفت على تطوير برونز (انظر <a href="#projects">المشاريع</a>).',
    'exp.elkood.2': '<strong>معمارية الأنظمة.</strong> صمّمت حلولًا خلفية قابلة للتوسّع ونشرتها باستخدام <bdi dir="ltr">.NET Core/6+</bdi>، محوّلًا متطلبات العمل المعقّدة إلى تطبيقات ويب عالية الأداء.',
    'exp.elkood.3': '<strong>تكامل الواجهات البرمجية وأنظمة الدفع.</strong> بسّطت عمليات العمل بدمج خدمات خارجية منها Stripe و Google APIs و Telegram في أنظمة إشعارات مؤتمتة.',
    'exp.elkood.4': '<strong>البنية التحتية والأدوات.</strong> طوّرت مكتبات داخلية مشتركة وصنتها، فقلّلت الشيفرة المكرّرة في مشاريع عدّة وسرّعت دورة التطوير.',
    'exp.elkood.5': '<strong>جودة الشيفرة والتحسين.</strong> أعدت هيكلة شيفرات قديمة بأنماط تصميم حديثة، فانخفضت أخطاء الإنتاج انخفاضًا ملموسًا وتسارع تسليم المشاريع.',
    'exp.elkood.6': '<strong>الإرشاد والقيادة.</strong> أرشدت متدرّبين في الهندسة عبر مراجعات الشيفرة وورش العمل التقنية لبناء فريق تطوير عالي الأداء.',
    'exp.elkood.7': '<strong>حلّ المشكلات التقنية.</strong> صمّمت حلولًا مخصّصة لقطاعات أعمال متنوّعة، مع ضمان التوافرية العالية والالتزام بأفضل ممارسات الصناعة.',

    'skills.title': `كيف أبني حلّ ${NET}`,
    'skills.lead': 'الاعتماديات تتّجه إلى الداخل. طبقة النطاق شيفرة <bdi dir="ltr">C#</bdi> خالصة لا قاعدة بيانات فيها ولا إطار عمل، فتُختبر قواعد العمل وحدها. وهذه الأدوات التي أستخدمها في كل طبقة.',
    'layer.domain': 'النطاق <span lang="en">(Domain)</span>',
    'layer.domain.text': 'الكيانات وكائنات القيمة والتجمّعات، مصمّمة وفق Domain-Driven Design.',
    'layer.application': 'التطبيق <span lang="en">(Application)</span>',
    'layer.application.text': 'حالات الاستخدام التي تنسّق النطاق وتعرّف الواجهات التي تنفّذها الطبقات الخارجية.',
    'layer.presentation': 'العرض <span lang="en">(Presentation)</span>',
    'layer.presentation.text': 'لوحات التحكّم، والواجهات التفاعلية، وواجهات HTTP البرمجية.',
    'layer.infrastructure': 'البنية التحتية <span lang="en">(Infrastructure)</span>',
    'layer.infrastructure.text': 'حفظ البيانات والخدمات الخارجية التي تعتمد عليها حالات الاستخدام.',
    'layer.hosting': 'الاستضافة <span lang="en">(Hosting)</span>',
    'layer.hosting.text': 'حيث يعمل كل شيء في بيئة الإنتاج.',
    'skills.also': 'ومع ذلك كله: <strong>تتبّع الأخطاء</strong> و<strong>حلّ المشكلات</strong> و<strong>الإرشاد</strong>.',

    'cp.title': 'البرمجة التنافسية',
    'cp.lead': 'أكثر من 500 مسألة محلولة على Codeforces.',
    'cp.handle': 'أشارك باسم <a href="https://codeforces.com/profile/00Mahmoud00" target="_blank" rel="noopener noreferrer">00Mahmoud00</a>، وأغلب ما أحلّه مسائل البرمجة الديناميكية، ونظرية البيان، والرياضيات، وبنى المعطيات، والخوارزميات الجشعة، والتنفيذ.',
    'cp.icpc': 'حلّ فريقي في المركز الحادي عشر في مسابقة ICPC لجامعة حلب عام 2022 وتأهّل إلى المرحلة التالية.',
    'cp.cert': 'عرض الشهادة',
    'cp.comb': '500 شكل سداسي صغير، واحد لكل مسألة محلولة',
    'cp.caption': 'خلية لكل مسألة محلولة.',

    'edu.section': 'التعليم والتطوّع',
    'edu.title': 'التعليم',
    'edu.degree': 'إجازة في الهندسة المعلوماتية',
    'edu.meta': 'جامعة حلب، <time datetime="2020-09">أيلول 2020</time> – <time datetime="2026-11">تشرين الثاني 2026</time>',
    'vol.title': 'التطوّع',
    'vol.sanad.meta': '<time datetime="2025-03">آذار</time> – <time datetime="2025-05">أيار 2025</time>، حلب',
    'vol.sanad.text': 'قدّمت دورة تدريبية عملية في <strong><bdi dir="ltr">.NET Core MVC</bdi></strong> في جامعة الشهباء الخاصة.',
    'vol.bluebits.meta': '<time datetime="2020-11">تشرين الثاني 2020</time> – <time datetime="2022-11">تشرين الثاني 2022</time>، حلب',
    'vol.bluebits.text': 'حوّلت ملاحظات الأساتذة إلى مواد رقمية منظّمة، فصارت محاضرات الجامعة متاحة للطلاب بسهولة أكبر.',

    'contact.title': 'لنتواصل',
    'contact.note': 'البريد الإلكتروني أسرع طريقة للوصول إليّ.',
    'footer.copy': '© <span data-year>2026</span> محمود شراباتي',

    'cert.title': 'شهادة ICPC، 2022',
    'cert.download': 'تنزيل PDF',
    'cert.close': 'إغلاق',
    'cert.alt': 'شهادة إنجاز: المركز الحادي عشر في مسابقة ICPC لجامعة حلب 2022، يومي 18 و19 حزيران 2022، جامعة حلب.',
  };

  const meta = {
    title: 'محمود شراباتي — مطوّر .NET Core أول | Clean Architecture و Blazor',
    description: 'محمود شراباتي مطوّر .NET Core أول بخبرة تزيد على أربع سنوات في Clean Architecture و Domain-Driven Design و Blazor، مقيم في حلب، سوريا.',
  };

  function apply() {
    const root = document.documentElement;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = T[el.dataset.i18n];
      if (text !== undefined) el.innerHTML = text;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split('=');
        if (T[key] !== undefined) el.setAttribute(attr, T[key]);
      });
    });
    // the hero swaps its two names: محمود شراباتي becomes the headline, the Latin name the small line
    const latin = document.querySelector('.hero-ar');
    if (latin) { latin.textContent = 'Mahmoud Sharabati'; latin.lang = 'en'; latin.dir = 'ltr'; }
    const name = document.querySelector('.hero-name');
    if (name) name.innerHTML = '<span>محمود</span> <span>شراباتي</span>';
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

    document.title = meta.title;
    const set = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', 'content', meta.description);
    set('meta[property="og:title"]', 'content', meta.title);
    set('meta[property="og:description"]', 'content', meta.description);
    set('meta[property="og:locale"]', 'content', 'ar_SY');
    set('meta[property="og:locale:alternate"]', 'content', 'en_US');
    set('meta[name="language"]', 'content', 'Arabic');
    set('link[rel="canonical"]', 'href', 'https://mahmoudsharabati.me/Profile/?lang=ar');
    root.classList.remove('i18n-pending');
    document.dispatchEvent(new Event('i18n:applied'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
