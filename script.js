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

// 🎄 聖誕樹
function drawTree() {
  ctx.fillStyle = "#1f7a4d";

  drawTriangle(300, 120, 200);
  drawTriangle(300, 200, 260);
  drawTriangle(300, 300, 320);

  // 树干
ctx.fillStyle = "#8d5524";
ctx.fillRect(
  canvas.width / 2 - 15, // 正中间
  300 + 320,             // 最后一层树的底部
  30,
  60
);
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
  ctx.fillStyle = "white";
  snow.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.s;
    if (f.y > canvas.height) f.y = 0;
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnow();
  drawTree();
  drawLights();
  requestAnimationFrame(animate);
}

animate();
