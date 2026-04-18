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

const reviewsTrack = document.getElementById("reviewsTrack");
const reviewsPrev = document.getElementById("reviewsPrev");
const reviewsNext = document.getElementById("reviewsNext");

if (reviewsTrack && reviewsPrev && reviewsNext) {
  const getScrollStep = () => {
    const firstCard = reviewsTrack.querySelector("blockquote");
    if (!firstCard) {
      return 320;
    }

    const gap = parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  reviewsPrev.addEventListener("click", () => {
    reviewsTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  reviewsNext.addEventListener("click", () => {
    reviewsTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });
}
