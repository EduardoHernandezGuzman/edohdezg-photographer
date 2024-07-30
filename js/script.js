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
