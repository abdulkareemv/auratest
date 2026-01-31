
  const links = document.querySelectorAll(".nav-links a");
  const page = location.pathname.split("/").pop() || "#";

  links.forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });


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
// ================= COUNTDOWN TIMER =================

// Target date: Feb 16, 2026, 9:00 AM IST
const targetDate = new Date("2026-02-16T09:00:00+05:30").getTime();

const countdownElements = document.querySelectorAll(".countdown span");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdownElements[0].textContent = "00";
    countdownElements[1].textContent = "00";
    countdownElements[2].textContent = "00";
    countdownElements[3].textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60) );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000);

  countdownElements[0].textContent = String(days).padStart(2, "0");
  countdownElements[1].textContent = String(hours).padStart(2, "0");
  countdownElements[2].textContent = String(minutes).padStart(2, "0");
  countdownElements[3].textContent = String(seconds).padStart(2, "0");
}

// Run immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);

