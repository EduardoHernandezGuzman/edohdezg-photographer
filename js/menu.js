export function initMenu() {
  const overlay = document.querySelector(".overlay");
  const toggles = Array.from(document.querySelectorAll(".menu-toggle"));
  let activeToggle = null;

  function openMenu(trigger) {
    activeToggle = trigger;
    overlay.classList.add("visible");
    document.body.classList.add("no-scroll");
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "true"));
    const firstFocusable = overlay.querySelector(
      "a[href], button:not([disabled])"
    );
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  function closeMenu() {
    overlay.classList.remove("visible");
    document.body.classList.remove("no-scroll");
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
    if (activeToggle) {
      activeToggle.focus();
    }
  }

  function toggleMenu(event) {
    if (overlay.classList.contains("visible")) {
      closeMenu();
    } else {
      openMenu(event.currentTarget);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("visible")) {
      return;
    }
    if (event.key === "Escape") {
      closeMenu();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }
    const focusable = Array.from(
      overlay.querySelectorAll("a[href], button:not([disabled])")
    );
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  toggles.forEach((toggle) => toggle.addEventListener("click", toggleMenu));

  overlay.querySelectorAll(".close-btn, .menu a").forEach((element) => {
    element.addEventListener("click", closeMenu);
  });
}
