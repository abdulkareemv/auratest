/* SHOW DATE & LOGOS */
setTimeout(() => {
  document.querySelector('.launch-date').classList.remove('hidden');
}, 3000);

setTimeout(() => {
  document.querySelector('.logos').classList.remove('hidden');
}, 4300);

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;
    particles.push({
      x,
      y,
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
    p.vy += 0.05;
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

setInterval(createFirework, 800);
animateFireworks();

/* REDIRECT TO MAIN SITE */
setTimeout(() => {
  window.location.href = "index.html";
}, 9000);
