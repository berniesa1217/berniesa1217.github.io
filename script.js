const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cx = canvas.width / 2;
const treeBaseY = 430;

let time = 0;
let lights = [];

/* 🌌 星空（远近层次） */
const stars = Array.from({ length: 160 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.2,
  a: Math.random()
}));

/* ❄️ 雪 */
const snow = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  s: Math.random() * 0.6 + 0.3
}));

canvas.addEventListener("click", e => {
  const r = canvas.getBoundingClientRect();
  lights.push({
    x: e.clientX - r.left,
    y: e.clientY - r.top,
    c: randomColor(),
    t: Math.random() * Math.PI * 2
  });
  document.getElementById("count").innerText = lights.length;
});

function clearLights() {
  lights = [];
  document.getElementById("count").innerText = 0;
}

function randomColor() {
  return ["#ffd166", "#ff6b6b", "#6bcfff", "#c77dff", "#95f2d9"]
    [Math.floor(Math.random() * 5)];
}

/* 🌲 柔和树层 */
function drawTreeLayer(y, w, top, bottom) {
  const g = ctx.createLinearGradient(0, y, 0, y + w);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;

  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(cx - w / 2, y + w);
  ctx.lineTo(cx + w / 2, y + w);
  ctx.closePath();
  ctx.fill();
}

function drawTree() {
  drawTreeLayer(120, 160, "#1c5e40", "#144c33");
  drawTreeLayer(190, 220, "#1f6f4a", "#165a3c");
  drawTreeLayer(270, 280, "#238a5a", "#1a6e4b");
  drawTreeLayer(350, 340, "#2ea36a", "#238a5a");

  // 树干
  ctx.fillStyle = "#7a4a24";
  ctx.fillRect(cx - 14, treeBaseY + 260, 28, 70);
}

/* ✨ 呼吸灯 */
function drawLights() {
  lights.forEach(l => {
    const glow = 6 + Math.sin(time + l.t) * 4;
    ctx.beginPath();
    ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = l.c;
    ctx.shadowColor = l.c;
    ctx.shadowBlur = glow;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

/* 🌌 背景 */
function drawBackground() {
  stars.forEach(s => {
    ctx.fillStyle = `rgba(255,255,255,${0.2 + s.a * 0.5})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  snow.forEach(f => {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(f.x, f.y, 1.4, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.s;
    if (f.y > canvas.height) f.y = 0;
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawTree();
  drawLights();
  time += 0.03;
  requestAnimationFrame(animate);
}

animate();
