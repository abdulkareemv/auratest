/* SHOW DATE */
setTimeout(() => {
  document.querySelector('.launch-date').classList.remove('hidden');
}, 3500);

/* SHOW LOGOS */
setTimeout(() => {
  document.querySelector('.logos').classList.remove('hidden');
}, 5000);

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.45;
  const color = `hsl(${Math.random()*360},100%,60%)`;

  for (let i = 0; i < 110; i++) {
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

setInterval(createFirework, 750);
animateFireworks();

/* REDIRECT */
setTimeout(() => {
  window.location.href = "main.html";
}, 9500);
