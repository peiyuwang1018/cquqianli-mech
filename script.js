const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const links = Array.from(document.querySelectorAll(".nav-links a"));
const currentPage = document.body.dataset.page;
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = savedTheme || preferredTheme;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.setAttribute("title", theme === "dark" ? "切换到白天模式" : "切换到暗夜模式");
  }
}

setTheme(initialTheme);

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

links.forEach((link) => {
  link.classList.toggle("is-active", link.dataset.nav === currentPage);
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});
