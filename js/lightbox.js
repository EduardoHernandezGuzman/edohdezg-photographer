export function initLightbox() {
  const dialog = document.querySelector(".lightbox");
  const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));

  if (!dialog || triggers.length === 0) {
    return;
  }

  const image = dialog.querySelector(".lightbox-img");
  const avifSource = dialog.querySelector(".lightbox-source-avif");
  const webpSource = dialog.querySelector(".lightbox-source-webp");
  const caption = dialog.querySelector(".lightbox-caption");
  let index = 0;
  let lastTrigger = null;

  function imageInfo(trigger) {
    const img = trigger.querySelector("img");
    const [, name] = img.getAttribute("src").match(/opt\/([a-z0-9]+)-\d+\./);
    return { name, width: img.getAttribute("width"), alt: img.alt };
  }

  function prefetch(position) {
    const info = imageInfo(
      triggers[(position + triggers.length) % triggers.length]
    );
    new Image().src = `./img/opt/${info.name}-${info.width}.avif`;
  }

  function render() {
    const info = imageInfo(triggers[index]);
    avifSource.srcset = `./img/opt/${info.name}-${info.width}.avif`;
    webpSource.srcset = `./img/opt/${info.name}-${info.width}.webp`;
    image.src = `./img/opt/${info.name}-${info.width}.jpg`;
    image.alt = info.alt;
    caption.textContent = `${index + 1} / ${triggers.length} · ${info.alt}`;
    prefetch(index + 1);
    prefetch(index - 1);
  }

  function step(delta) {
    index = (index + delta + triggers.length) % triggers.length;
    render();
  }

  function open(position) {
    index = position;
    lastTrigger = triggers[position];
    render();
    dialog.showModal();
    document.body.classList.add("no-scroll");
  }

  triggers.forEach((trigger, position) => {
    trigger.addEventListener("click", () => open(position));
  });

  dialog
    .querySelector(".lightbox-close")
    .addEventListener("click", () => dialog.close());
  dialog
    .querySelector(".lightbox-prev")
    .addEventListener("click", () => step(-1));
  dialog
    .querySelector(".lightbox-next")
    .addEventListener("click", () => step(1));

  function cleanup() {
    document.body.classList.remove("no-scroll");
    image.removeAttribute("src");
    avifSource.removeAttribute("srcset");
    webpSource.removeAttribute("srcset");
    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  dialog.addEventListener("close", cleanup);
  dialog.addEventListener("cancel", () => {
    setTimeout(cleanup, 0);
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      step(-1);
    }
    if (event.key === "ArrowRight") {
      step(1);
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  let touchStartX = null;
  dialog.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );
  dialog.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) {
        return;
      }
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        step(delta < 0 ? 1 : -1);
      }
      touchStartX = null;
    },
    { passive: true }
  );
}
