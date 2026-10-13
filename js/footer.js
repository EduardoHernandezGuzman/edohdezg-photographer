export function initFooter() {
  const year = document.querySelector(".site-footer-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}
