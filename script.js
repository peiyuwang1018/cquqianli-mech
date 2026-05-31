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
