export function initNavigation() {
  const topbar = document.querySelector(".topbar");
  const backToTop = document.querySelector(".back-to-top");
  const hero = document.querySelector("#home");
  const links = Array.from(document.querySelectorAll(".topbar-nav a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (hero) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        const pastHero = !entry.isIntersecting;
        if (topbar) {
          topbar.classList.toggle("is-visible", pastHero);
        }
        if (backToTop) {
          backToTop.classList.toggle("is-visible", pastHero);
        }
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  }

  if (sections.length > 0) {
    const visibility = new Map();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting);
        });
        const active = sections.find((section) => visibility.get(section));
        links.forEach((link) => {
          const isActive =
            active && link.getAttribute("href") === `#${active.id}`;
          link.classList.toggle("is-active", Boolean(isActive));
          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
}
