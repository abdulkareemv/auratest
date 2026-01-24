/* ================= SCROLL REVEAL ================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ================= BUTTON RIPPLE ================= */
document.querySelectorAll("button, .btn-primary, .btn-outline").forEach(btn => {
  btn.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    btn.appendChild(ripple);

    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    setTimeout(() => ripple.remove(), 600);
  });
});

/* ================= PARALLAX HERO ================= */
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
});

/* ================= NAVBAR SCROLL EFFECT ================= */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});
