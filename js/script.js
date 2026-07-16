/* ============================================================
   NIKOLA VUJIČIĆ — PORTFOLIO
   Shared script: theme, i18n, navigation, motion, contact form
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- THEME ---------------- */
  var root = document.documentElement;
  var savedTheme = localStorage.getItem('nv-theme');
  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  var initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initialTheme);

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem('nv-theme', t);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-checked', t === 'light');
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    var current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------------- I18N ---------------- */
  var DICT = {
    'nav.home': { sr: 'Početna', en: 'Home' },
    'nav.about': { sr: 'O meni', en: 'About' },
    'nav.services': { sr: 'Usluge', en: 'Services' },
    'nav.portfolio': { sr: 'Portfolio', en: 'Portfolio' },
    'nav.contact': { sr: 'Kontakt', en: 'Contact' },
    'nav.cta': { sr: 'Zakaži poziv', en: 'Book a call' },

    'footer.tagline': { sr: 'Softversko inženjerstvo, digitalni marketing i AI automatizacija — spojeni u jedno.', en: 'Software engineering, digital marketing and AI automation — brought together.' },
    'footer.rights': { sr: 'Sva prava zadržana.', en: 'All rights reserved.' },
    'footer.built': { sr: 'Dizajnirano i razvijeno ručno.', en: 'Designed and built by hand.' },

    /* HOME */
    'home.eyebrow': { sr: 'SOFTWARE ENGINEER × DIGITAL ENTREPRENEUR', en: 'SOFTWARE ENGINEER × DIGITAL ENTREPRENEUR' },
    'home.subtitle': { sr: 'Gradim digitalna rešenja koja pretvaraju ideje u merljive poslovne rezultate.', en: 'I build digital solutions that turn ideas into measurable business results.' },
    'home.desc': { sr: 'Full-stack razvoj, WordPress i custom rešenja, SEO, Google Ads kampanje i AI automatizacija — sve na jednom mestu, od prve linije koda do prve konverzije.', en: 'Full-stack development, WordPress & custom builds, SEO, Google Ads campaigns and AI automation — all in one place, from the first line of code to the first conversion.' },
    'home.cta.primary': { sr: 'Pogledaj portfolio', en: 'View portfolio' },
    'home.cta.secondary': { sr: 'Zatraži ponudu', en: 'Request a quote' },
    'home.services.eyebrow': { sr: 'ČIME SE BAVIM', en: 'WHAT I DO' },
    'home.services.title': { sr: 'Usluge koje pokrivaju ceo digitalni tok', en: 'Services covering the whole digital journey' },
    'home.services.all': { sr: 'Pogledaj sve usluge →', en: 'See all services →' },
    's.web.title': { sr: 'Izrada sajtova & web shopova', en: 'Websites & webshops' },
    's.web.desc': { sr: 'Od landing stranice do Shopify prodavnice — brzo, responzivno, spremno za konverzije.', en: 'From a landing page to a Shopify store — fast, responsive, built to convert.' },
    's.seo.title': { sr: 'SEO optimizacija', en: 'SEO optimization' },
    's.seo.desc': { sr: 'Tehnički i on-page SEO koji dovodi prave posetioce iz pretrage.', en: 'Technical and on-page SEO that brings the right visitors from search.' },
    's.ads.title': { sr: 'Google Ads & marketing', en: 'Google Ads & marketing' },
    's.ads.desc': { sr: 'Kampanje fokusirane na konverzije, ne na proseran klik.', en: 'Campaigns focused on conversions, not vanity clicks.' },
    's.ai.title': { sr: 'AI automatizacija', en: 'AI automation' },
    's.ai.desc': { sr: 'Radni procesi i alati koji rade dok ti spavaš.', en: 'Workflows and tools that keep working while you sleep.' },
    's.fix.title': { sr: 'Brza pomoć — bagovi & hitni problemi', en: 'Quick help — bugs & urgent issues' },
    's.fix.desc': { sr: 'Sajt pukao? Kampanja stala? Rešavam brzo, bez panike.', en: 'Site broken? Campaign stalled? Fixed fast, no drama.' },
    's.gfx.title': { sr: 'Grafika & branding', en: 'Graphics & branding' },
    's.gfx.desc': { sr: 'Vizuali i materijali koji izgledaju profesionalno od prvog dana.', en: 'Visuals and materials that look professional from day one.' },
    'home.work.eyebrow': { sr: 'ODABRANI RAD', en: 'SELECTED WORK' },
    'home.work.title': { sr: 'Industrije i projekti sa kojima sam radio', en: 'Industries and projects I have worked with' },
    'home.work.all': { sr: 'Ceo portfolio →', en: 'Full portfolio →' },
    'home.cta2.title': { sr: 'Imaš ideju ili problem koji treba rešiti?', en: 'Got an idea or a problem to solve?' },
    'home.cta2.desc': { sr: 'Bilo da ti treba sajt od nule, hitna popravka ili neko ko razume i kod i marketing — tu sam.', en: 'Whether you need a site from scratch, an urgent fix, or someone who understands both code and marketing — I\'m here.' },
    'home.cta2.btn': { sr: 'Pošalji poruku', en: 'Send a message' },

    /* ABOUT */
    'about.eyebrow': { sr: 'O MENI', en: 'ABOUT' },
    'about.title': { sr: 'Programer koji razmišlja kao preduzetnik.', en: 'An engineer who thinks like an entrepreneur.' },
    'about.bio': { sr: 'Software Engineer i digitalni preduzetnik iz Srbije, sa iskustvom u razvoju web aplikacija, WordPress rešenja, SEO optimizaciji, Google Ads oglašavanju i vođenju sopstvenih biznisa. Fokusiran sam na spajanje programiranja, automatizacije, AI alata i digitalnog marketinga kako bih kreirao proizvode koji donose konkretne poslovne rezultate. Radio sam sa klijentima od kompletne izrade sajta, preko SEO optimizacije i Google Ads kampanja, do dugoročnog održavanja sistema.', en: 'Software engineer and digital entrepreneur from Serbia, with experience building web applications, WordPress solutions, SEO optimization, Google Ads campaigns, and running my own businesses. I focus on combining programming, automation, AI tools and digital marketing to create products that deliver real business outcomes. I\'ve worked with clients across the full journey — from building a website, through SEO and Google Ads, to long-term system maintenance.' },
    'about.strengths.title': { sr: 'Snage', en: 'Strengths' },
    'str.1': { sr: 'Brzo učim', en: 'Fast learner' },
    'str.2': { sr: 'Samouk u više disciplina', en: 'Self-taught across disciplines' },
    'str.3': { sr: 'Preduzetnički mindset', en: 'Entrepreneurial mindset' },
    'str.4': { sr: 'Pažnja na detalje', en: 'Detail-oriented' },
    'str.5': { sr: 'Analitičko razmišljanje', en: 'Analytical thinking' },
    'str.6': { sr: 'Fokus na rešenja', en: 'Solution-focused' },
    'str.7': { sr: 'Razvoj usmeren ka biznisu', en: 'Business-oriented development' },
    'str.8': { sr: 'Kontinuirano usavršavanje', en: 'Continuous improvement' },
    'about.focus.eyebrow': { sr: 'TRENUTNI FOKUS', en: 'CURRENT FOCUS' },
    'about.focus.text': { sr: 'Gradim skalabilne digitalne biznise kroz softversko inženjerstvo, AI automatizaciju, web development, SEO i digitalni marketing — uz proizvode koji rešavaju realne poslovne probleme.', en: 'Building scalable digital businesses through software engineering, AI automation, web development, SEO and digital marketing — creating products that solve real business problems.' },
    'about.skills.eyebrow': { sr: 'ALATI ZANATA', en: 'TOOLS OF THE TRADE' },
    'about.skills.title': { sr: 'Veštine i tehnologije', en: 'Skills & technologies' },
    'cat.frontend': { sr: 'Frontend razvoj', en: 'Frontend Development' },
    'cat.backend': { sr: 'Backend', en: 'Backend' },
    'cat.cms': { sr: 'CMS razvoj (WordPress)', en: 'CMS Development' },
    'cat.seo': { sr: 'SEO optimizacija', en: 'Search Engine Optimization' },
    'cat.marketing': { sr: 'Digitalni marketing', en: 'Digital Marketing' },
    'cat.ai': { sr: 'Veštačka inteligencija', en: 'Artificial Intelligence' },
    'cat.design': { sr: 'Web dizajn', en: 'Web Design' },
    'cat.graphic': { sr: 'Grafika i kreativa', en: 'Graphic & Creative' },
    'cat.technical': { sr: 'Tehničko znanje', en: 'Technical Knowledge' },

    /* SERVICES */
    'services.eyebrow': { sr: 'USLUGE', en: 'SERVICES' },
    'services.title': { sr: 'Rešenja koja pokrivaju ceo digitalni tok.', en: 'Solutions covering the entire digital journey.' },
    'services.desc': { sr: 'Od prve linije koda do prve porudžbine — biraš šta ti treba, ja se pobrinem za tehnički deo.', en: 'From the first line of code to the first order — you choose what you need, I handle the technical side.' },
    'svc.web.title': { sr: 'Izrada sajtova', en: 'Website development' },
    'svc.web.desc': { sr: 'Sajtovi koji izgledaju moderno i rade brzo, na svim uređajima.', en: 'Websites that look modern and run fast, on every device.' },
    'svc.seo.title': { sr: 'SEO optimizacija', en: 'SEO optimization' },
    'svc.seo.desc': { sr: 'Vidljivost u pretrazi koja donosi promet koji se pretvara u klijente.', en: 'Search visibility that brings traffic that turns into clients.' },
    'svc.ads.title': { sr: 'Google Ads & digitalni marketing', en: 'Google Ads & digital marketing' },
    'svc.ads.desc': { sr: 'Kampanje podešene i optimizovane za konverzije, ne za budžet koji nestaje.', en: 'Campaigns set up and optimized for conversions, not a budget that just disappears.' },
    'svc.ai.title': { sr: 'AI automatizacija', en: 'AI automation' },
    'svc.ai.desc': { sr: 'AI alati i tokovi rada koji štede vreme i skaliraju biznis.', en: 'AI tools and workflows that save time and help your business scale.' },
    'svc.fix.title': { sr: 'Brza pomoć & hitne intervencije', en: 'Quick help & urgent fixes' },
    'svc.fix.desc': { sr: 'Sajt pao, bag se pojavio, nešto ne radi? Rešavamo to brzo.', en: 'Site down, a bug appeared, something stopped working? Fixed fast.' },
    'svc.gfx.title': { sr: 'Grafika & branding', en: 'Graphics & branding' },
    'svc.gfx.desc': { sr: 'Vizuali koji podižu utisak o brendu na svakom kanalu.', en: 'Visuals that lift the brand impression across every channel.' },
    'svc.cta': { sr: 'Zatraži ponudu', en: 'Request a quote' },
    'services.note.eyebrow': { sr: 'NAPOMENA', en: 'NOTE' },
    'services.note.title': { sr: 'Nisi siguran šta ti tačno treba?', en: 'Not sure exactly what you need?' },
    'services.note.text': { sr: 'Bez brige — ne moraš tačno da znaš terminologiju. Opiši problem svojim rečima (sajt, prodavnica, oglasi, bag, bilo šta) i zajedno ćemo skontati rešenje.', en: 'No worries — you don\'t need the exact terminology. Describe the problem in your own words (a website, a store, ads, a bug, anything) and we\'ll figure out the solution together.' },
    'services.note.btn': { sr: 'Pišimo', en: 'Let\'s talk' },

    /* PORTFOLIO */
    'portfolio.eyebrow': { sr: 'PORTFOLIO', en: 'PORTFOLIO' },
    'portfolio.title': { sr: 'Projekti, industrije i biznisi kroz koje sam prošao.', en: 'Projects, industries and businesses I\'ve worked across.' },
    'portfolio.desc': { sr: 'Pregled vrsta projekata i industrija sa kojima sam radio — okvir spreman za dodavanje pravih case study-ja i screenshotova.', en: 'An overview of the kinds of projects and industries I\'ve worked with — a framework ready for real case studies and screenshots.' },
    'portfolio.industries.eyebrow': { sr: 'INDUSTRIJE', en: 'INDUSTRIES' },
    'portfolio.industries.title': { sr: 'Sa kim sam radio', en: 'Who I\'ve worked with' },
    'ind.catering': { sr: 'Ketering', en: 'Catering' },
    'ind.catering.desc': { sr: 'Sajt, meni prezentacija, SEO i Google Ads za lokalne keteringe.', en: 'Website, menu presentation, SEO and Google Ads for local catering businesses.' },
    'ind.events': { sr: 'Dekoracija događaja', en: 'Event decorations' },
    'ind.events.desc': { sr: 'Prezentacija usluga, galerija radova i sistem za upite klijenata.', en: 'Service presentation, work galleries and a client inquiry system.' },
    'ind.local': { sr: 'Lokalni biznisi', en: 'Local businesses' },
    'ind.local.desc': { sr: 'Google Business optimizacija i lokalni SEO za vidljivost u komšiluku.', en: 'Google Business optimization and local SEO for neighborhood visibility.' },
    'ind.service': { sr: 'Uslužne kompanije', en: 'Service companies' },
    'ind.service.desc': { sr: 'Landing stranice i lead-generation kampanje za brz kontakt klijenata.', en: 'Landing pages and lead-generation campaigns for fast client contact.' },
    'ind.home': { sr: 'Kućne usluge', en: 'Home services' },
    'ind.home.desc': { sr: 'Sajtovi i oglasi fokusirani na pozive i zakazivanje termina.', en: 'Websites and ads focused on calls and booked appointments.' },
    'ind.personal': { sr: 'Lični brendovi', en: 'Personal brands' },
    'ind.personal.desc': { sr: 'Portfolio sajtovi i sadržaj koji grade poverenje i prepoznatljivost.', en: 'Portfolio sites and content that build trust and recognition.' },
    'portfolio.experience.eyebrow': { sr: 'ISKUSTVO', en: 'EXPERIENCE' },
    'portfolio.experience.title': { sr: 'Poslovno iskustvo', en: 'Business experience' },
    'exp.agency.title': { sr: 'Digitalna agencijska saradnja', en: 'Digital agency work' },
    'exp.agency.desc': { sr: 'Kompletna digitalna rešenja za klijente: izrada sajta, SEO optimizacija, Google Ads kampanje, održavanje sajta, konsalting i tehnička podrška.', en: 'End-to-end digital solutions for clients: website development, SEO optimization, Google Ads campaigns, website maintenance, consulting and technical support.' },
    'exp.decor.title': { sr: 'Sopstveni brend — dekoracija za rođendane i događaje', en: 'Own brand — birthday & event decoration' },
    'exp.decor.desc': { sr: 'Osnivač brenda za dekoraciju rođendana i događaja: event branding, planiranje balon-dekoracije, dizajn foto-pozadina, izrada custom bekdropa, razvoj proizvoda, komunikacija sa klijentima, cenovna strategija i organizacija biznisa.', en: 'Founder of a birthday and event decoration brand: event branding, balloon decoration planning, photo backdrop design, custom backdrop construction, product development, client communication, pricing strategy and business organization.' },
    'portfolio.tech.eyebrow': { sr: 'TEHNOLOGIJE', en: 'TECHNOLOGIES' },
    'portfolio.tech.title': { sr: 'Alati koje koristim', en: 'Tools I use' },

    /* CONTACT */
    'contact.eyebrow': { sr: 'KONTAKT', en: 'CONTACT' },
    'contact.title': { sr: 'Pišimo — bez obzira na to šta ti treba.', en: 'Let\'s talk — whatever you need.' },
    'contact.desc': { sr: 'Trebaš potpuno nov sajt, web shop, hitnu popravku buga, Google Ads kampanju ili samo brz savet? Popuni formu i javljam se u najkraćem roku.', en: 'Need a brand-new website, a webshop, an urgent bug fix, a Google Ads campaign, or just quick advice? Fill out the form and I\'ll get back to you shortly.' },
    'contact.field.name': { sr: 'Ime i prezime', en: 'Full name' },
    'contact.field.email': { sr: 'Email adresa', en: 'Email address' },
    'contact.field.service': { sr: 'Tip usluge', en: 'Type of service' },
    'contact.field.message': { sr: 'Poruka', en: 'Message' },
    'contact.submit': { sr: 'Pošalji poruku', en: 'Send message' },
    'contact.submit.sending': { sr: 'Šalje se…', en: 'Sending…' },
    'contact.success': { sr: 'Hvala! Poruka je poslata — javljam se uskoro.', en: 'Thanks! Your message has been sent — I\'ll be in touch soon.' },
    'contact.error': { sr: 'Nešto nije u redu. Pokušaj ponovo ili piši direktno na email.', en: 'Something went wrong. Try again or email me directly.' },
    'contact.info.title': { sr: 'Direktan kontakt', en: 'Direct contact' },
    'contact.info.email.label': { sr: 'Email', en: 'Email' },
    'contact.info.location.label': { sr: 'Lokacija', en: 'Location' },
    'contact.info.location.value': { sr: 'Srbija · Rad na daljinu, klijenti svuda', en: 'Serbia · Remote work, clients worldwide' },
    'contact.info.response.label': { sr: 'Vreme odgovora', en: 'Response time' },
    'contact.info.response.value': { sr: 'Obično u roku od 24h', en: 'Usually within 24h' },
    'opt.web': { sr: 'Izrada sajta', en: 'Website development' },
    'opt.shop': { sr: 'Web shop / Shopify', en: 'Webshop / Shopify' },
    'opt.seo': { sr: 'SEO optimizacija', en: 'SEO optimization' },
    'opt.ads': { sr: 'Google Ads kampanja', en: 'Google Ads campaign' },
    'opt.ai': { sr: 'AI automatizacija', en: 'AI automation' },
    'opt.fix': { sr: 'Hitna pomoć — bag/greška', en: 'Urgent help — bug/error' },
    'opt.maint': { sr: 'Održavanje sajta', en: 'Website maintenance' },
    'opt.other': { sr: 'Nešto drugo', en: 'Something else' }
  };

  var currentLang = localStorage.getItem('nv-lang') || 'sr';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('nv-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = DICT[key];
      if (entry) el.textContent = entry[lang];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var entry = DICT[key];
      if (entry) el.setAttribute('placeholder', entry[lang]);
    });

    document.querySelectorAll('.lang-toggle').forEach(function (t) {
      t.setAttribute('data-lang', lang);
      t.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
      });
    });

    restartTypewriter();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]');
    if (!b) return;
    applyLang(b.getAttribute('data-lang-btn'));
  });

  /* ---------------- MOBILE DRAWER (slides in from the left) ---------------- */
  var menuBtn = document.querySelector('.menu-btn');
  var drawer = document.querySelector('.mobile-drawer');
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (menuBtn) menuBtn.classList.remove('open');
  }
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      var willOpen = !drawer.classList.contains('open');
      drawer.classList.toggle('open', willOpen);
      menuBtn.classList.toggle('open', willOpen);
    });
    drawer.querySelector('.backdrop').addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- TYPEWRITER TERMINAL ---------------- */
  var TYPE_LINES = {
    sr: [
      'izradi_sajt --responsive --brz',
      'optimizuj_seo --lokalno --tehnicki',
      'pokreni_google_ads --pametno',
      'automatizuj_procese --sa=AI',
      'popravi_bug --hitno ✓ reseno'
    ],
    en: [
      'build_website --responsive --fast',
      'optimize_seo --local --technical',
      'launch_google_ads --smart',
      'automate_workflow --with=AI',
      'fix_bug --urgent ✓ resolved'
    ]
  };

  var typeTimer = null;
  function restartTypewriter() {
    var el = document.querySelector('[data-typewriter]');
    if (!el) return;
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
    var lines = TYPE_LINES[currentLang] || TYPE_LINES.sr;
    var lineIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      var full = lines[lineIdx];
      var display = deleting ? full.substring(0, charIdx--) : full.substring(0, charIdx++);
      el.innerHTML = '<span class="prompt type-line">' + escapeHtml(display) + '<span class="caret"></span></span>';

      var delay = deleting ? 26 : 46;
      if (!deleting && charIdx > full.length) { delay = 1400; deleting = true; charIdx = full.length; }
      else if (deleting && charIdx < 0) { deleting = false; charIdx = 0; lineIdx = (lineIdx + 1) % lines.length; delay = 300; }
      typeTimer = setTimeout(tick, delay);
    }
    tick();
  }
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------- CONTACT FORM ---------------- */
  var form = document.querySelector('.contact-form form');
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var pre = params.get('usluga');
    if (pre) {
      var select = form.querySelector('select[name="service"]');
      if (select) {
        var opt = select.querySelector('option[value="' + pre + '"]');
        if (opt) select.value = pre;
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      var endpoint = form.getAttribute('data-endpoint');
      var originalLabel = btn.textContent;
      btn.disabled = true;
      btn.textContent = DICT['contact.submit.sending'][currentLang];

      function showStatus(ok) {
        status.classList.remove('success', 'error');
        status.classList.add(ok ? 'success' : 'error', 'show');
        status.textContent = DICT[ok ? 'contact.success' : 'contact.error'][currentLang];
        btn.disabled = false;
        btn.textContent = originalLabel;
        if (ok) form.reset();
      }

      if (endpoint && endpoint.indexOf('REPLACE') === -1) {
        fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (res) { showStatus(res.ok); })
          .catch(function () { showStatus(false); });
      } else {
        /* No form backend connected yet.
           Connect a service like Formspree, Web3Forms or EmailJS and
           set data-endpoint="https://..." on the <form> in kontakt.html. */
        setTimeout(function () { showStatus(true); }, 700);
      }
    });
  }

  /* ---------------- ACTIVE NAV LINK ---------------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .mobile-drawer a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  /* ---------------- INIT ---------------- */
  document.body.classList.add('page-enter');
  applyLang(currentLang);
})();
