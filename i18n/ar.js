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
    'hero.intro': `أحوّل مجالات العمل المعقّدة إلى خوادم ${NET} تبقى سهلة الصيانة بعد التسليم بوقت طويل، مبنية وفق Clean Architecture و Domain-Driven Design، وواجهاتها باستخدام Blazor. خلال أكثر من أربع سنوات قدت تصميم معمارية منصة متعددة المستأجرين لإدارة المستودعات والطلبات، وبنيت أنظمة توصيل منها نظام يعمل في السعودية، وطوّرت الواجهات البرمجية التي تشغّل تطبيقات منشورة على Google Play و App Store. أطوّر اليوم الأنظمة الإدارية في HASH Information Technology، وأعمل على توسيع الخادم الخلفي لتطبيق «وسيطك»، وهو سوق إلكتروني تجاوزت تنزيلاته عشرة آلاف.`,
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
    'app.mrcourse.what': 'تطبيق دراسي لطلاب الطب: دورات فيديو تُفتح برموز تُشترى من نقاط البيع، واختبارات تدريبية، ومفضّلة تحفظ الدروس المهمة.',
    'app.mrcourse.play': 'Mr Course على Google Play',
    'app.flyorder.name': 'Fly Order',
    'app.flyorder.what': 'توصيل الطعام والبقالة في السعودية على غرار «طلبات»: اطلب من المطاعم والمتاجر والصيدليات، ثم تابع السائق لحظة بلحظة.',
    'app.flyorder.play': 'Fly Order على Google Play',
    'app.adsnet.name': 'إعلان نت <span class="showcase-alt" lang="en">Ads Net</span>',
    'app.adsnet.what': 'يكسب المستخدمون نقاطًا بمشاهدة الإعلانات، ثم ينفقونها أو يهدونها لغيرهم.',
    'app.adsnet.play': 'إعلان نت على Google Play',
    'app.jenacom.name': 'Jenacom',
    'app.jenacom.what': 'توصيل الأثاث بين المدن وعبر مناطق زمنية مختلفة: يقبل السائقون الطلبات، ويتّبعون مسار اليوم، ويشاركون مواقعهم.',
    'app.jenacom.store': 'Jenacom على App Store',
    'app.bronz.name': 'برونز <span class="showcase-alt" lang="en">Bronz</span>',
    'app.bronz.role': 'أشرفت على التطوير',
    'app.bronz.what': 'متجر إلكتروني لملابس الأطفال من عمر سنة إلى 16 سنة، بمقاسات وألوان متعددة، وسلة ودفع، وإدارة للمخزون.',
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
    'exp.evolvo.2': '<strong>لوحات التحكّم.</strong> أبني لوحات تحكّم لحظية باستخدام Blazor تجعل بيانات العمل جاهزة للاستخدام الفوري لدى العملاء.',
    'exp.evolvo.3': '<strong>مسؤولية بيئة الإنتاج.</strong> أتولّى جاهزية بيئة الإنتاج: فحوص صحة الخوادم، وتحديد الأسباب الجذرية من سجلات الإنتاج، وإصلاحات عاجلة تحافظ على جاهزية بنسبة <bdi dir="ltr">99.9%</bdi>.',
    'exp.elkood.dates': '<time datetime="2022-05">أيار 2022</time> – <time datetime="2024-04">نيسان 2024</time>',
    'exp.elkood.type': 'دوام كامل',
    'exp.elkood.title': `مطوّر خوادم ${NET} <span class="role-org">في Elkood</span>`,
    'exp.elkood.1': '<strong>قيادة معمارية منصة Matp.</strong> صمّمت منصة متعددة المستأجرين لإدارة المستودعات والطلبات (WMS + OMS) يعمل فيها كل صاحب مستودع ضمن مستأجر معزول: المخزون والمناطق، والتكامل مع المتاجر الإلكترونية، وتتبّع الطلبات والسائقين، والأدوار لكل مستأجر، والفوترة والاشتراكات. ووجّهت القرارات التقنية للفريق وأرشدت مطوّريه (انظر <a href="#systems">المنصات</a>).',
    'exp.elkood.2': '<strong>تطبيقات في بيئة الإنتاج.</strong> بنيت الخوادم الخلفية والواجهات البرمجية لتطبيقات Fly Order و Mr Course وإعلان نت و Jenacom و QrGermany، وأشرفت على تطوير برونز (انظر <a href="#projects">المشاريع</a>).',
    'exp.elkood.3': '<strong>خوادم مبنية على النطاق.</strong> حوّلت مسارات العمل المعقّدة إلى خوادم <bdi dir="ltr">.NET 6+</bdi> وفق Clean Architecture و DDD، من دورة حياة الطلبات والتوصيل إلى الاشتراكات والمدفوعات.',
    'exp.elkood.4': '<strong>المدفوعات والتكاملات.</strong> دمجت مدفوعات Stripe و Google APIs وبوتات Telegram لتعمل المدفوعات والإشعارات دون تدخّل يدوي.',
    'exp.elkood.5': '<strong>مكتبات مشتركة.</strong> بنيت مكتبات داخلية أزالت الشيفرة المكرّرة بين المشاريع، فصار كل مشروع جديد ينطلق أسرع.',
    'exp.elkood.6': '<strong>جودة الشيفرة.</strong> أعدت هيكلة شيفرات قديمة بأنماط تصميم حديثة، فقلّت أخطاء الإنتاج وقصرت مدة التسليم.',
    'exp.elkood.7': '<strong>الإرشاد.</strong> أرشدت متدرّبين في الهندسة عبر مراجعات الشيفرة وورش عمل تقنية تطبيقية.',

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

    'edu.title': 'التعليم',
    'edu.degree': 'إجازة في الهندسة المعلوماتية',
    'edu.meta': 'جامعة حلب، <time datetime="2020-09">أيلول 2020</time> – <time datetime="2026-11">تشرين الثاني 2026</time>',
    'vol.title': 'التطوّع والقيادة',

    'contact.title': 'لنتواصل',
    'footer.copy': '© <span data-year>2026</span> محمود شراباتي',

    'cert.title': 'شهادة ICPC، 2022',
    'cert.download': 'تنزيل PDF',
    'cert.close': 'إغلاق',
    'cert.alt': 'شهادة إنجاز: المركز الحادي عشر في مسابقة ICPC لجامعة حلب 2022، يومي 18 و19 حزيران 2022، جامعة حلب.',
    'facts.label': 'أبرز الأرقام',
    'facts.years': `سنوات من إطلاق أنظمة ${NET} في بيئة الإنتاج`,
    'facts.products': 'منتجات بنيتها، من التطبيقات إلى المنصات',
    'facts.downloads': 'تنزيل لتطبيق وسيطك',
    'facts.cf': 'مسألة محلولة على Codeforces',
    'app.mrcourse.chips': '<li>نظام رموز نقاط البيع</li><li>رفع الفيديو وتخزينه</li><li>صلاحيات حسب الدور</li><li>واجهات الإدارة</li>',
    'app.flyorder.chips': '<li>تتبّع الطلبات لحظيًا</li><li>إدارة المتاجر</li><li>إدارة السائقين</li><li>رموز الخصم والعروض</li>',
    'app.jenacom.chips': '<li>جدولة عبر المناطق الزمنية</li><li>تتبّع الشاحنات مباشرة</li><li>دورة حياة الطلب</li><li>إشعارات فورية</li>',
    'app.bronz.chips': '<li>خيارات المنتج</li><li>السلة والدفع</li><li>المخزون</li>',
    'sys.title': 'منصات بنيتها',
    'sys.lead': 'لا يصل كل شيء إلى متاجر التطبيقات. هذه تعمل خلف الكواليس: منصة SaaS متعددة المستأجرين، وسوقان إلكترونيان، والقالب الذي أبدأ منه كل حلّ.',
    'sys.matp.tag': 'Elkood · قدت المعمارية',
    'sys.matp.sub': 'إدارة المستودعات والطلبات (WMS + OMS)',
    'sys.matp.what': 'منصة متعددة المستأجرين يعمل فيها كل صاحب مستودع ضمن مستأجر معزول، ويتصل بالمتاجر الإلكترونية، ويتابع كل طلب من الرفّ إلى باب الزبون. قدت معماريتها وتوجيهها التقني، وأرشدت المطوّرين الذين بنوها معي.',
    'sys.matp.chips': '<li>تعدّد المستأجرين</li><li>المخزون والمواقع والمناطق</li><li>التكامل مع المتاجر</li><li>تتبّع الطلبات والسائقين</li><li>مصادقة وأدوار لكل مستأجر</li><li>الفوترة والاشتراكات</li><li>إشعارات فورية وبريدية</li>',
    'sys.d.label': 'Matp: ثلاثة مستودعات معزولة تتصل بنواة مشتركة، ومعها المتاجر الإلكترونية والسائقون',
    'sys.d.wa': 'مستودع A',
    'sys.d.wb': 'مستودع B',
    'sys.d.wc': 'مستودع C',
    'sys.d.own': 'بياناته ومستخدموه',
    'sys.d.core': 'المخزون · الطلبات · الفوترة',
    'sys.d.merchants': 'المتاجر الإلكترونية',
    'sys.d.drivers': 'السائقون والتوصيل',
    'sys.30s.tag': 'عمل حر · الخادم الخلفي كاملًا',
    'sys.30s.sub': 'سوق منتجات بمقاطع مدتها 30 ثانية',
    'sys.30s.what': 'سوق على غرار «السوق المفتوح»: يعرض البائعون منتجاتهم بخصائص ديناميكية ويروّجون لها بمقاطع مدتها 30 ثانية في صفحة استكشاف. بنيت الخادم الخلفي من البداية إلى النهاية.',
    'sys.30s.chips': '<li>خصائص ديناميكية</li><li>بحث وتصفية</li><li>محادثة فورية</li><li>صفحة المقاطع</li><li>إشعارات فورية</li>',
    'sys.qr.tag': 'Elkood · الخادم الخلفي',
    'sys.qr.sub': 'منصة وسوق لرموز QR',
    'sys.qr.what': 'منصة لإنشاء رموز QR قابلة للتخصيص وإدارتها وبيعها، بخصائص ديناميكية لكل رمز وتحليلات لكل عملية مسح.',
    'sys.qr.chips': '<li>رموز QR ديناميكية</li><li>سوق إلكتروني</li><li>تحليلات المسح</li><li>أدوار وواجهات إدارة</li>',
    'sys.tpl.tag': 'مفتوح المصدر',
    'sys.tpl.name': 'قالب Clean Architecture',
    'sys.tpl.sub': `قالب حلّ ${NET}`,
    'sys.tpl.what': 'نقطة البداية لحلولي: طبقات النطاق والتطبيق والبنية التحتية والواجهة مفصولة مسبقًا وفق مبادئ DDD، فيبدأ كل مشروع جديد بالحدود الصحيحة.',
    'sys.tpl.chips': '<li>Clean Architecture</li><li>DDD</li><li>فصل المسؤوليات</li>',
    'sys.tpl.link': 'عرض على GitLab',
    'sys.tpl.aria': 'قالب Clean Architecture على GitLab',
    'app.wasiitak.store': 'وسيطك على App Store',
    'app.mrcourse.stat': '<strong>أكثر من 5 آلاف</strong> تنزيل على Google Play',
    'app.bronz.stat': '<strong>أكثر من ألف</strong> تنزيل على Google Play',
    'exp.evolvo.s1': 'تنزيل لتطبيق وسيطك الذي أعمل على توسيعه',
    'exp.evolvo.s2': 'جاهزية محافَظ عليها في بيئة الإنتاج',
    'exp.elkood.s1': 'منتجات أُطلقت في بيئة الإنتاج',
    'exp.elkood.s2': 'منصة متعددة المستأجرين قدت معماريتها',
    'exp.elkood.s3': 'تنزيل لتطبيق Mr Course',
    'exp.built': 'ما بنيته هنا',
    'exp.stack': 'التقنيات',
    'exp.hash.stack': '<li>ASP.NET Core</li><li>Clean Architecture</li><li>قواعد البيانات العلائقية</li>',
    'pill.wasiitak': 'وسيطك',
    'pill.adsnet': 'إعلان نت',
    'pill.bronz': 'برونز',
    'type.prefix': 'أبني',
    'type.phrases': 'منصات SaaS متعددة المستأجرين|خوادم وفق Clean Architecture|لوحات تحكّم لحظية باستخدام Blazor|واجهات برمجية لتطبيقات الجوال|أنظمة طلبات وتوصيل|أنظمة إدارية في HASH',
    'type.static': 'أبني منصات SaaS متعددة المستأجرين، وخوادم وفق Clean Architecture، ولوحات تحكّم لحظية باستخدام Blazor، وواجهات برمجية لتطبيقات الجوال، وأنظمة طلبات وتوصيل، وأنظمة إدارية في HASH.',
    'hero.cv': 'تنزيل السيرة الذاتية',
    'contact.cv': 'تنزيل السيرة الذاتية (PDF، بالإنجليزية)',
    'vol.lead': 'أعلّم ما أستخدمه كل يوم، وأجعل المواد الدراسية أقرب إلى الطلاب.',
    'vol.type': 'تطوّع',
    'vol.sanad.dates': '<time datetime="2025-03">آذار 2025</time> – <time datetime="2025-05">أيار 2025</time>',
    'vol.sanad.title': 'مدرّب متطوّع <span class="role-org">في سند</span>',
    'vol.sanad.where': 'جامعة الشهباء الخاصة، حلب',
    'vol.sanad.1': '<strong>تصميم الدورة.</strong> صمّمت دورة منظّمة في <bdi dir="ltr">ASP.NET Core MVC</bdi> تتبع الطلب في دورة حياته كاملة، من التوجيه إلى قاعدة البيانات.',
    'vol.sanad.2': '<strong>التدريس.</strong> درّست التوجيه التقليدي وبالسمات، والمتحكّمات والإجراءات، وواجهات Razor وقوالبها، وربط النماذج، وعمليات CRUD باستخدام Entity Framework Core.',
    'vol.sanad.3': '<strong>مشاريع تطبيقية.</strong> رافقت الطلاب في مشاريع حقيقية، فانتهى كل مفهوم بتطبيق ويب يعمل.',
    'vol.bluebits.dates': '<time datetime="2020-11">تشرين الثاني 2020</time> – <time datetime="2022-11">تشرين الثاني 2022</time>',
    'vol.bluebits.title': 'محوّل محتوى رقمي <span class="role-org">في BlueBitsTeam</span>',
    'vol.bluebits.1': '<strong>محاضرات رقمية.</strong> حوّلت محاضرات الأساتذة المكتوبة بخط اليد والمسموعة إلى مواد رقمية منظّمة (DOCX و PDF).',
    'vol.bluebits.2': '<strong>ضمان الجودة.</strong> راجعت كل ملف بحثًا عن الأخطاء التقنية والمفاهيمية قبل وصوله إلى الطلاب.',
    'vol.bluebits.3': '<strong>وصول الطلاب.</strong> قدّمت مواد واضحة ومنظّمة وقابلة للبحث سهّلت الدراسة على الطلاب جميعًا.',
    'vol.bluebits.chips': '<li>الكتابة التقنية</li><li>ضمان الجودة</li><li>التوثيق</li>',
    'contact.lead': 'اختر الطريقة التي تناسبك، فكل وسيلة هنا تصل إليّ مباشرة.',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.whatsapp': 'واتساب',
    'contact.linkedin': 'LinkedIn',
    'contact.gitlab': 'GitLab',
    'contact.codeforces': 'Codeforces',
    'contact.vcf': 'حفظ جهة الاتصال',
    'contact.time': 'التوقيت المحلي في حلب',
    'footer.top': 'العودة إلى الأعلى ↑',
    'compose.title': 'اكتب لي رسالة',
    'compose.name': 'اسمك',
    'compose.message': 'الرسالة',
    'compose.hint': 'تُفتح في بريدك أو في واتساب لديك، جاهزة للإرسال.',
    'compose.email': 'أرسل بالبريد',
    'compose.whatsapp': 'أرسل عبر واتساب',
    'compose.subject': 'مرحبًا من موقعك',
  };

  const meta = {
    title: 'محمود شراباتي — مطوّر .NET Core أول | Clean Architecture و Blazor',
    description: 'محمود شراباتي مطوّر .NET Core أول في حلب، سوريا، يبني خوادم وفق Clean Architecture و DDD وواجهات Blazor: منصة مستودعات متعددة المستأجرين، وتطبيقات توصيل، وواجهات برمجية لتطبيقات منشورة على Google Play و App Store.',
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

  // Apply once the HTML is parsed ("interactive"), without waiting for DOMContentLoaded: that also
  // waits for the deferred Three.js module from the CDN, which on a slow link would show English first.
  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', function ready() {
      if (document.readyState === 'loading') return;
      document.removeEventListener('readystatechange', ready);
      apply();
    });
  } else apply();
})();
