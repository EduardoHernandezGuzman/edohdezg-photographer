new WOW().init();

const overlay = document.querySelector(".overlay");
const menuToggle = document.querySelector(".menu-toggle");

function openMenu() {
  overlay.classList.add("visible");
  document.body.classList.add("no-scroll");
  menuToggle.setAttribute("aria-expanded", "true");
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
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.focus();
}

function toggleMenu() {
  if (overlay.classList.contains("visible")) {
    closeMenu();
  } else {
    openMenu();
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

document.querySelector(".close-btn").addEventListener("click", closeMenu);

const emailLink = document.querySelector(".contact-email");

if (emailLink) {
  const email = atob(emailLink.dataset.email);
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
}
