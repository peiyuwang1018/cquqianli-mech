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

const quoteStage = document.querySelector("[data-quote-stage]");
const quoteText = document.querySelector("[data-quote-text]");
const quoteSource = document.querySelector("[data-quote-source]");
const quoteButton = document.querySelector(".quote-random-button");
const quotes = [
  { text: "运筹帷幄，决胜千里", source: "重庆大学 千里战队" },
  { text: "日拱一卒，功不唐捐", source: "上海交通大学 交龙战队" },
  { text: "理想臣服实践，勤恳铸就巅峰", source: "东北大学 TDT 战队" },
  { text: "初心高于胜负，成长大于输赢", source: "RoboMaster" },
  { text: "保持纯洁，保持优雅", source: "" },
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

  if (!introStrip || !cards.length) return;

  const showIntro = (card) => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    memberRow?.classList.add("has-active");
    introStrip.textContent = card.dataset.intro || "";
    introStrip.classList.toggle("is-visible", Boolean(card.dataset.intro));
  };

  const hideIntro = () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    memberRow?.classList.remove("has-active");
    introStrip.classList.remove("is-visible");
    introStrip.textContent = "";
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
