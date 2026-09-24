// Paste your live Google Form URL here (e.g. https://forms.gle/xxxx)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf9UWiLgBjgC3uWSxrkoyy8-ZO-zXpy62bzrvQ45KbBEkfKUg/viewform?pli=1&pli=1";

const modalFormLink = document.getElementById("modal-form-link");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const orderModal = document.getElementById("order-modal");
const modalTitle = document.getElementById("modal-title");
const carousel = document.querySelector("[data-carousel]");

function applyFormUrl() {
  const ready = Boolean(GOOGLE_FORM_URL);
  [modalFormLink].forEach((el) => {
    if (!el) return;
    if (ready) {
      el.href = GOOGLE_FORM_URL;
    } else {
      el.href = "#order";
      el.removeAttribute("target");
    }
  });
}

if (modalFormLink) {
  applyFormUrl();
}

if (carousel) {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll(".carousel-dot")];
  let currentSlide = 0;
  let autoplayTimer;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle("is-active", active);
      dot.toggleAttribute("aria-current", active);
    });
  }

  carousel.querySelector(".carousel-prev")?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  carousel.querySelector(".carousel-next")?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  carousel.addEventListener("focusin", () => clearInterval(autoplayTimer));
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });

  startAutoplay();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

if (orderModal && modalTitle) {
  document.querySelectorAll("[data-open-order]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-open-order");
      modalTitle.textContent = `Reserve your ${product}`;
      orderModal.showModal();
    });
  });
}

