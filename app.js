document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     HEADER ON SCROLL
  ========================================= */

  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

  const revealElements = document.querySelectorAll(
    ".section-heading, .project-row, .about-big-text, .about-copy, .service-card"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal-item");
  });


  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealElements.forEach((element, index) => {

    /*
      Delay بسيط للمربعات
    */

    if (element.classList.contains("service-card")) {
      element.style.transitionDelay =
        `${(index % 4) * 80}ms`;
    }

    revealObserver.observe(element);

  });


  /* =========================================
     HERO ENTRANCE
  ========================================= */

  const heroEyebrow =
    document.querySelector(".hero-top");

  const heroTitle =
    document.querySelector(".hero h1");

  const heroBottom =
    document.querySelector(".hero-bottom");


  const heroElements = [
    heroEyebrow,
    heroTitle,
    heroBottom
  ];


  heroElements.forEach(element => {

    if (!element) return;

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";

  });


  setTimeout(() => {

    if (heroEyebrow) {
      heroEyebrow.style.transition =
        "opacity .8s ease, transform .8s ease";

      heroEyebrow.style.opacity = "1";
      heroEyebrow.style.transform = "translateY(0)";
    }

  }, 150);


  setTimeout(() => {

    if (heroTitle) {
      heroTitle.style.transition =
        "opacity 1s ease, transform 1s ease";

      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }

  }, 300);


  setTimeout(() => {

    if (heroBottom) {
      heroBottom.style.transition =
        "opacity 1s ease, transform 1s ease";

      heroBottom.style.opacity = "1";
      heroBottom.style.transform = "translateY(0)";
    }

  }, 500);


  /* =========================================
     PROJECT HOVER NUMBER
  ========================================= */

  const projectRows =
    document.querySelectorAll(".project-row");


  projectRows.forEach(project => {

    project.addEventListener("mouseenter", () => {

      const number =
        project.querySelector(".project-number");

      if (number) {
        number.style.transform = "translateX(5px)";
        number.style.transition = "transform .3s ease";
      }

    });


    project.addEventListener("mouseleave", () => {

      const number =
        project.querySelector(".project-number");

      if (number) {
        number.style.transform = "translateX(0)";
      }

    });

  });


  /* =========================================
     PARALLAX HERO TEXT
     DESKTOP ONLY
  ========================================= */

  const heroTitleParallax =
    document.querySelector(".hero h1");


  window.addEventListener(
    "scroll",
    () => {

      if (
        !heroTitleParallax ||
        window.innerWidth <= 700
      ) {
        return;
      }

      const scroll =
        Math.min(window.scrollY, 500);

      heroTitleParallax.style.transform =
        `translateY(${scroll * 0.07}px)`;

    },
    {
      passive: true
    }
  );


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const footerYear =
    document.querySelector(
      ".site-footer span:last-child"
    );

  if (footerYear) {
    footerYear.textContent =
      `© ${new Date().getFullYear()}`;
  }

});