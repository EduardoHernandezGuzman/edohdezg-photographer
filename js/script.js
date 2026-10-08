new WOW().init();

function toggleMenu() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("visible");
}

function closeMenu() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("visible");
}

document.querySelector(".close-btn").addEventListener("click", closeMenu);

const emailLink = document.querySelector(".contact-email");

if (emailLink) {
  const email = atob(emailLink.dataset.email);
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
}
