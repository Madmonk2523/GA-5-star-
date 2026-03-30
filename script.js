const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = siteNav ? siteNav.querySelectorAll("a") : [];

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => observer.observe(element));

window.addEventListener("load", () => {
  document.body.classList.add("page-ready");
  document.body.classList.remove("is-loading");
});

const galleryTrack = document.getElementById("galleryTrack");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryDotsWrap = document.getElementById("galleryDots");
const galleryCarousel = document.getElementById("galleryCarousel");

if (galleryTrack && galleryPrev && galleryNext && galleryDotsWrap && galleryCarousel) {
  const slides = Array.from(galleryTrack.querySelectorAll(".carousel-slide"));
  let currentIndex = 0;
  let autoTimer;
  let touchStartX = null;

  const updateCarousel = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    galleryTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    const dots = galleryDotsWrap.querySelectorAll(".carousel-dot");
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
      dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
    });
  };

  const startAuto = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 4200);
  };

  const stopAuto = () => {
    clearInterval(autoTimer);
  };

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to image ${index + 1}`);
    dot.addEventListener("click", () => {
      updateCarousel(index);
      startAuto();
    });
    galleryDotsWrap.appendChild(dot);
  });

  galleryPrev.addEventListener("click", () => {
    updateCarousel(currentIndex - 1);
    startAuto();
  });

  galleryNext.addEventListener("click", () => {
    updateCarousel(currentIndex + 1);
    startAuto();
  });

  galleryCarousel.addEventListener("mouseenter", stopAuto);
  galleryCarousel.addEventListener("mouseleave", startAuto);

  galleryCarousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  galleryCarousel.addEventListener("touchend", (event) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 45) {
      updateCarousel(delta > 0 ? currentIndex - 1 : currentIndex + 1);
      startAuto();
    }
    touchStartX = null;
  }, { passive: true });

  galleryCarousel.setAttribute("tabindex", "0");
  galleryCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      updateCarousel(currentIndex - 1);
      startAuto();
    }
    if (event.key === "ArrowRight") {
      updateCarousel(currentIndex + 1);
      startAuto();
    }
  });

  updateCarousel(0);
  startAuto();
}
