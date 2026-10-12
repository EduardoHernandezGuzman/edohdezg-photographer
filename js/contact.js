export function initContact() {
  const emailLink = document.querySelector(".contact-email");

  if (!emailLink) {
    return;
  }

  const email = atob(emailLink.dataset.email);
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
}
