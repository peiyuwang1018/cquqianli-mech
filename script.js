const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const links = Array.from(document.querySelectorAll(".nav-links a"));
const currentPage = document.body.dataset.page;
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = savedTheme || preferredTheme;

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.setAttribute("title", theme === "dark" ? "切换到白天模式" : "切换到暗夜模式");
  }
}

function setTheme(theme, options = {}) {
  const shouldAnimate =
    options.animated &&
    document.startViewTransition &&
    !reducedMotion.matches &&
    themeToggle;

  if (!shouldAnimate) {
    applyTheme(theme);
    return;
  }

  const rect = themeToggle.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(() => applyTheme(theme));

  transition.ready.then(() => {
    root.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 420,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

setTheme(initialTheme);

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark", { animated: true });
});

links.forEach((link) => {
  link.classList.toggle("is-active", link.dataset.nav === currentPage);
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".project-carousel-shell").forEach((shell) => {
  const carousel = shell.querySelector(".project-carousel");
  const prevButton = shell.querySelector(".project-carousel-prev");
  const nextButton = shell.querySelector(".project-carousel-next");
  const accordion = shell.closest(".project-accordion");

  if (!carousel || !prevButton || !nextButton) return;

  const getStep = () => Math.max(220, Math.floor(carousel.clientWidth * 0.82));

  const updateButtons = () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevButton.disabled = carousel.scrollLeft <= 2;
    nextButton.disabled = carousel.scrollLeft >= maxScroll - 2;
    shell.classList.add("is-ready");
  };

  prevButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  carousel.addEventListener("scroll", updateButtons, { passive: true });
  accordion?.addEventListener("toggle", () => {
    if (accordion.open) {
      shell.classList.remove("is-ready");
      requestAnimationFrame(updateButtons);
    }
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(updateButtons).observe(carousel);
  } else {
    window.addEventListener("resize", updateButtons);
  }

  requestAnimationFrame(updateButtons);
});

document.querySelectorAll(".project-accordion").forEach((accordion) => {
  accordion.addEventListener("toggle", () => {
    if (!accordion.open) return;

    document.querySelectorAll(".project-accordion").forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.open = false;
      }
    });
  });
});

document.querySelectorAll("[data-equipment-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".equipment-carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".equipment-slide"));
  const prevButton = carousel.querySelector(".equipment-carousel-prev");
  const nextButton = carousel.querySelector(".equipment-carousel-next");
  const dotsWrap = carousel.querySelector(".equipment-carousel-dots");
  let activeIndex = 0;

  if (!track || !slides.length || !prevButton || !nextButton || !dotsWrap) return;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "equipment-carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `查看第 ${index + 1} 张图片`);
    dot.addEventListener("click", () => updateEquipmentCarousel(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  const updateEquipmentCarousel = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  slides.forEach((slide) => {
    const image = slide.querySelector("img");
    if (!image) return;
    if (image.complete && image.naturalWidth > 0) {
      slide.classList.add("is-loaded");
    }
    if (image.complete && image.naturalWidth === 0) {
      image.classList.add("is-missing");
    }
    image.addEventListener("error", () => {
      image.classList.add("is-missing");
      slide.classList.remove("is-loaded");
    });
    image.addEventListener("load", () => {
      image.classList.remove("is-missing");
      slide.classList.add("is-loaded");
    });
  });

  prevButton.addEventListener("click", () => updateEquipmentCarousel(activeIndex - 1));
  nextButton.addEventListener("click", () => updateEquipmentCarousel(activeIndex + 1));

  updateEquipmentCarousel(0);
});

const quoteStage = document.querySelector("[data-quote-stage]");
const quoteText = document.querySelector("[data-quote-text]");
const quoteSource = document.querySelector("[data-quote-source]");
const quoteButton = document.querySelector(".quote-random-button");
const quotes = [
  { text: "运筹帷幄，决胜千里", source: "重庆大学 千里战队" },
  { text: "日拱一卒，功不唐捐", source: "上海交通大学 交龙战队" },
  { text: "理想臣服实践，勤恳铸就巅峰", source: "东北大学 TDT 战队" },
  { text: "初心高于胜负，成长大于输赢", source: "RoboMaster" },
  { text: "穷究原理，洞悉本质", source: "RoboMaster" },
  { text: "成为工程师，从踏入赛场的那一刻开始", source: "RoboMaster" },
  { text: "7 分钟的飞驰，源于 7000 次的尝试", source: "RoboMaster" },
  { text: "保持纯洁，保持优雅", source: "广东工业大学 DynamicX 战队" },
  { text: "不要妥协，不要背叛", source: "" },
];
let quoteIndex = 0;
let quoteTimer = null;

function updateQuote(nextIndex) {
  if (!quoteStage || !quoteText || !quoteSource) return;

  const quote = quotes[nextIndex];
  const applyQuote = () => {
    quoteText.textContent = quote.text;
    quoteSource.textContent = quote.source ? `—— ${quote.source}` : "";
    quoteStage.classList.remove("is-switching");
  };

  quoteIndex = nextIndex;

  if (reducedMotion.matches) {
    applyQuote();
    return;
  }

  quoteStage.classList.add("is-switching");
  window.setTimeout(applyQuote, 360);
}

function scheduleNextQuote() {
  if (!quoteStage) return;
  window.clearInterval(quoteTimer);
  quoteTimer = window.setInterval(() => {
    updateQuote((quoteIndex + 1) % quotes.length);
  }, 5000);
}

quoteButton?.addEventListener("click", () => {
  let nextIndex = Math.floor(Math.random() * quotes.length);
  if (quotes.length > 1 && nextIndex === quoteIndex) {
    nextIndex = (nextIndex + 1) % quotes.length;
  }
  updateQuote(nextIndex);
  scheduleNextQuote();
});

scheduleNextQuote();

document.querySelectorAll(".team-section").forEach((section) => {
  const introStrip = section.querySelector(".member-intro-strip");
  const memberRow = section.querySelector(".member-row");
  const cards = section.querySelectorAll(".member-card[data-intro]");
  const defaultIntro = introStrip?.dataset.defaultIntro || "";

  if (!introStrip || !cards.length) return;

  const showDefaultIntro = () => {
    introStrip.replaceChildren();
    introStrip.classList.add("is-default");
    introStrip.textContent = defaultIntro;
    introStrip.classList.toggle("is-visible", Boolean(defaultIntro));
  };

  const showIntro = (card) => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    memberRow?.classList.add("has-active");
    introStrip.replaceChildren();
    introStrip.classList.remove("is-default");
    introStrip.textContent = card.dataset.intro || "";
    introStrip.classList.toggle("is-visible", Boolean(card.dataset.intro));
  };

  const hideIntro = () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    memberRow?.classList.remove("has-active");
    if (defaultIntro) {
      showDefaultIntro();
      return;
    }
    introStrip.classList.remove("is-visible", "is-default");
    introStrip.replaceChildren();
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => showIntro(card));
    card.addEventListener("pointerenter", () => showIntro(card));
    card.addEventListener("pointerdown", () => showIntro(card));
    card.addEventListener("click", () => showIntro(card));
    card.addEventListener("focus", () => showIntro(card));
    card.addEventListener("mouseleave", hideIntro);
    card.addEventListener("pointerleave", hideIntro);
    card.addEventListener("blur", hideIntro);
  });
});
