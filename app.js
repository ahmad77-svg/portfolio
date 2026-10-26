document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 40);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.getElementById(id.slice(1));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Reveal animations
  const revealElements = document.querySelectorAll(
    ".section-heading, .project-row, .about-big-text, .about-copy, .service-card"
  );

  revealElements.forEach(el => el.classList.add("reveal-item"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el, i) => {
      if (el.classList.contains("service-card")) {
        el.style.transitionDelay = `${(i % 4) * 80}ms`;
      }
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  // Hero intro animation
  const heroParts = [
    document.querySelector(".hero-top"),
    document.querySelector(".hero h1"),
    document.querySelector(".hero-bottom")
  ];

  heroParts.forEach((el, i) => {
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(35px)";

    setTimeout(() => {
      el.style.transition = "opacity .8s ease, transform .8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 150 + i * 150);
  });

  // Project hover animations
  document.querySelectorAll(".project-row").forEach(row => {
    const number = row.querySelector(".project-number");
    if (!number) return;

    row.addEventListener("mouseenter", () => {
      number.style.transition = "transform .3s ease";
      number.style.transform = "translateX(5px)";
    });

    row.addEventListener("mouseleave", () => {
      number.style.transform = "translateX(0)";
    });
  });

  // Hero parallax
  const heroTitle = document.querySelector(".hero h1");

  window.addEventListener(
    "scroll",
    () => {
      if (!heroTitle || window.innerWidth <= 700) return;

      heroTitle.style.transform =
        `translateY(${Math.min(window.scrollY, 500) * 0.07}px)`;
    },
    { passive: true }
  );

  // Current year
  const year = document.querySelector(".site-footer span:last-child");

  if (year) {
    year.textContent = `© ${new Date().getFullYear()}`;
  }

  // Arabic translations
  const translations = {
    "Projects": "المشاريع",
    "About": "عني",
    "Services": "الخدمات",
    "Contact": "تواصل معي",
    "Start a Project": "ابدأ مشروعك",
    "WEB DESIGNER & DEVELOPER": "مصمم ومطوّر مواقع",
    "Available for selected projects": "متاح لمشاريع جديدة",
    "View Projects": "شاهد المشاريع",
    "Contact Me": "تواصل معي",
    "Selected Projects": "أبرز المشاريع",
    "View Live": "عرض الموقع",

    "CORPORATE WEBSITE": "موقع شركة",
    "LUXURY E-COMMERCE": "متجر إلكتروني فاخر",
    "RESTAURANT / ORDERING": "مطعم وطلبات",
    "E-COMMERCE": "تجارة إلكترونية",
    "AUTOMOTIVE": "معرض سيارات",
    "LUXURY RETAIL": "متجر فاخر",
    "RETAIL / E-COMMERCE": "تجارة ومتاجر",
    "BRAND CONCEPT": "تصوّر لهوية علامة",
    "RESTAURANT CONCEPT": "تصوّر لموقع مطعم",

    // New projects
    "INTERACTIVE 3D / SCROLL": "تجربة ثلاثية الأبعاد تفاعلية",
    "LUXURY PERFUMERY": "عطور فاخرة",
    "FASHION & ACCESSORIES": "أزياء وإكسسوارات",

    "Web Design": "تصميم المواقع",
    "Front-end Development": "تطوير واجهات المواقع",
    "E-commerce Concepts": "حلول المتاجر الإلكترونية",
    "Business Websites": "مواقع الشركات",
    "Web Designer & Developer": "مصمم ومطوّر مواقع",

    "HAVE A PROJECT IN MIND?": "عندك مشروع ببالك؟",

    "A selection of websites and digital concepts created for different industries and audiences.":
      "مجموعة مختارة من المواقع والتجارب الرقمية المصممة لمجالات وجماهير مختلفة.",

    "Modern websites for brands, businesses and online stores — focused on clean design, responsive experiences and real business value.":
      "مواقع عصرية للعلامات التجارية والشركات والمتاجر، بتصميم واضح وتجربة سلسة وقيمة حقيقية للمشروع.",

    // Al Bayan
    "A bilingual corporate website for a construction company with structured services, projects, company presentation and responsive design.":
      "موقع شركة إنشاءات باللغتين، يعرض الخدمات والمشاريع والتعريف بالشركة بتصميم متجاوب.",

    // OSH
    "A luxury bilingual perfume store concept with immersive brand presentation, fragrance discovery, shopping cart and direct ordering experience.":
      "تصوّر لمتجر عطور فاخر باللغتين، مع عرض للهوية والعطور وسلة مشتريات وتجربة طلب مباشرة.",

    // ProWhey
    "A bilingual supplements store concept featuring product categories, product browsing, shopping cart and responsive mobile interaction.":
      "تصوّر لمتجر مكملات غذائية باللغتين، مع أقسام المنتجات وسلة مشتريات وتصميم متجاوب.",

    // Prestige Motors
    "A modern automotive showroom concept focused on premium visual presentation, vehicle discovery and direct customer contact.":
      "تصوّر لمعرض سيارات عصري يركز على عرض السيارات بشكل مميز وسهولة التواصل مع العملاء.",

    // Velor
    "A luxury watch store concept with distinct product categories and a clean editorial-inspired shopping experience.":
      "تصوّر لمتجر ساعات فاخر، بأقسام واضحة وتجربة تسوق أنيقة وبسيطة.",

    // V-Five
    "A modern retail website concept for travel bags with product presentation, responsive sections and direct purchase-oriented navigation.":
      "تصوّر لمتجر حقائب سفر يعرض المنتجات بوضوح ويقدم تصفحًا مريحًا على مختلف الأجهزة.",

    // Grill Station
    "A restaurant website concept focused on quick product discovery, visual menu presentation and responsive mobile browsing.":
      "تصوّر لموقع مطعم يسهل استكشاف الأصناف ويعرض المنيو بصريًا مع تجربة مريحة على الهاتف.",

    // NOIRE
    "An immersive 3D perfume experience where visuals respond to scrolling, creating an interactive product story.":
      "تجربة عطور ثلاثية الأبعاد، بتتفاعل فيها المشاهد مع التمرير لتقدّم قصة بصرية مميزة للمنتج.",

    // Velvet
    "A refined perfume website concept focused on fragrance presentation, atmosphere and elegant browsing.":
      "موقع عطور أنيق يركز على عرض العطور والهوية البصرية وتجربة تصفح راقية.",

    // CYVA
    "An accessories storefront showcasing watches, eyewear and wallets with a modern shopping experience.":
      "متجر إكسسوارات يعرض الساعات والنظارات والمحافظ بتجربة تسوق عصرية.",

    // About
    "I’m Ahmad Al Kassab, a web designer and developer focused on creating modern digital experiences for companies, brands, restaurants and online stores.":
      "أنا أحمد القصاب، مصمم ومطوّر مواقع، بشتغل على بناء تجارب رقمية حديثة للشركات والعلامات التجارية والمطاعم والمتاجر الإلكترونية.",

    "My work combines responsive front-end development, visual identity adaptation and practical user flows designed around the actual needs of each business.":
      "بجمع بشغلي بين تطوير واجهات متجاوبة، وتوظيف الهوية البصرية، وتصميم تجربة استخدام تناسب احتياجات كل مشروع.",

    // Services
    "Modern interfaces tailored to each brand, audience and business goal.":
      "واجهات حديثة تناسب هوية كل علامة تجارية وجمهورها وأهدافها.",

    "Responsive websites built with clean, structured HTML, CSS and JavaScript.":
      "مواقع متجاوبة مبنية باستخدام HTML وCSS وJavaScript بشكل منظم.",

    "Product presentation, shopping carts, ordering experiences and conversion-focused flows.":
      "عرض منتجات وسلال مشتريات وتجارب طلب سهلة ومصممة لدعم المبيعات.",

    "Professional corporate websites for companies, services and growing businesses.":
      "مواقع احترافية للشركات والخدمات والمشاريع الطموحة."
  };

  // Rich translations
  const rich = {
    hero: {
      en: 'I design digital<br>experiences that <span>feel different.</span>',
      ar: 'بصمّم تجارب رقمية<br><span>بتترك أثر.</span>'
    },

    about: {
      en: 'I build websites that balance <span>design, clarity</span> and business purpose.',
      ar: 'بصمّم مواقع بتجمع بين <span>الجمال والوضوح</span> وهدف المشروع.'
    },

    contact: {
      en: 'Let’s build<br><span>something great.</span>',
      ar: 'خلّينا نبني<br><span>شي مميز.</span>'
    }
  };

  // Store original English content
  const original = new Map();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    original.set(el, el.textContent);
  });

  // Language switch
  const applyLanguage = lang => {
    const ar = lang === "ar";

    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;

      el.textContent = ar
        ? (translations[key] || original.get(el))
        : original.get(el);
    });

    document.querySelectorAll("[data-rich-i18n]").forEach(el => {
      const content = rich[el.dataset.richI18n];

      if (content) {
        el.innerHTML = content[lang];
      }
    });

    document.querySelectorAll(".language-switch button").forEach(btn => {
      btn.setAttribute(
        "aria-pressed",
        String(btn.dataset.lang === lang)
      );
    });

    try {
      localStorage.setItem("portfolio-language", lang);
    } catch (e) {}
  };

  // Language buttons
  document.querySelectorAll(".language-switch button").forEach(btn => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // Default language: English
  let saved = "en";

  try {
    saved =
      localStorage.getItem("portfolio-language") === "ar"
        ? "ar"
        : "en";
  } catch (e) {}

  applyLanguage(saved);
});