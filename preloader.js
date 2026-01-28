// SHOW DATE
setTimeout(() => {
  document.getElementById("date").classList.add("show");
}, 2800); // slightly after letters drop

// SHOW LOGOS
setTimeout(() => {
  document.getElementById("logos").classList.add("show");
}, 4200); // after date appears

// FIREWORKS
setTimeout(startFireworks, 5800);

// CANVAS
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function startFireworks() {
  setInterval(createFirework, 800);
  animateFireworks();
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.45;
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

  for (let i = 0; i < 120; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;

    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.alpha -= 0.015;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();

    if (p.alpha <= 0) particles.splice(i, 1);
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

// OPTIONAL: redirect after preloader
setTimeout(() => {
  window.location.href = "index.html";
 }, 12000);
