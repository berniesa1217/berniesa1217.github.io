const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lights = [];

// ❄️ 雪花
let snow = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2,
  s: Math.random() * 1 + 0.5
}));

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  lights.push({ x, y, c: randomColor() });
  updateCount();
});

function randomColor() {
  const colors = ["#ff6b6b", "#ffd93d", "#6bcfff", "#c77dff", "#95f2d9"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateCount() {
  document.getElementById("count").innerText =
    `LIGHTS: ${lights.length}`;
}

function clearLights() {
  lights = [];
  updateCount();
}

// 🎄 圣诞树
function drawTree() {
  ctx.fillStyle = "#1f7a4d";

  drawTriangle(300, 120, 200);
  drawTriangle(300, 200, 260);
  drawTriangle(300, 300, 320);

  ctx.fillStyle = "#8d5524";
  ctx.fillRect(285, 420, 30, 60);
}

function drawTriangle(x, y, w) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - w / 2, y + w);
  ctx.lineTo(x + w / 2, y + w);
  ctx.closePath();
  ctx.fill();
}

// 💡 灯
function drawLights() {
  lights.forEach(l => {
    ctx.beginPath();
    ctx.arc(l.x, l.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = l.c;
    ctx.fill();
  });
}

// ❄️ 雪
function drawSnow() {
  snow.forEach(f => {
    ctx.fillStyle = `rgba(255,255,255,${f.a})`;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    f.y += f.s;
    f.x += Math.sin(time * 0.3 + f.y * 0.01) * 0.15;

    if (f.y > canvas.height) {
      f.y = -5;
      f.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSnow();     // ❄️ 最底层
  drawTree();     // 🌲 树
  drawLights();   // ✨ 灯

  time += 0.03;
  requestAnimationFrame(animate);
}

animate();

}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const countEl = document.getElementById("count");

let lights = [];

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  lights.push({
    x,
    y,
    color: randomColor()
  });

  countEl.textContent = lights.length;
  draw();
});

function randomColor() {
  const colors = ["#ff6b6b", "#ffd93d", "#6bcfff", "#b28dff", "#6bff95"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1f8f55";
  drawTriangle(320, 120, 220);
  drawTriangle(320, 220, 260);
  drawTriangle(320, 340, 300);

  ctx.fillStyle = "#7a4a1f";
  ctx.fillRect(305, 420, 30, 60);
}

function drawTriangle(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - size / 2, y + size);
  ctx.lineTo(x + size / 2, y + size);
  ctx.closePath();
  ctx.fill();
}

function drawLights() {
  lights.forEach(l => {
    ctx.beginPath();
    ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = l.color;
    ctx.fill();
  });
}

function draw() {
  drawTree();
  drawLights();
}

function clearLights() {
  lights = [];
  countEl.textContent = "0";
  draw();
}

draw();

/* ====== ❄️ 雪花系統 ====== */
const snowCanvas = document.getElementById("snow");
const sctx = snowCanvas.getContext("2d");

function resizeSnow() {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * snowCanvas.width,
  y: Math.random() * snowCanvas.height,
  r: Math.random() * 2 + 1,
  v: Math.random() * 1 + 0.5
}));

function snowLoop() {
  sctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  sctx.fillStyle = "rgba(255,255,255,0.8)";
  sctx.beginPath();

  flakes.forEach(f => {
    sctx.moveTo(f.x, f.y);
    sctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    f.y += f.v;

    if (f.y > snowCanvas.height) {
      f.y = -5;
      f.x = Math.random() * snowCanvas.width;
    }
  });

  sctx.fill();
  requestAnimationFrame(snowLoop);
}

snowLoop();
