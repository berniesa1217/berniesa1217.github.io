<canvas id="canvas"></canvas>
<canvas id="snow"></canvas>
<div>
  燈數: <span id="count">0</span>
  <button onclick="clearLights()">清除燈</button>
</div>

<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const countEl = document.getElementById("count");

canvas.width = 640;
canvas.height = 760;

const cx = canvas.width / 2;
const treeBaseY = 120;
let lights = [];

/* ===== 點擊放燈 ===== */
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 限制在樹區域
  if (y < treeBaseY || y > treeBaseY + 340) return;

  lights.push({ x, y, color: randomColor() });
  countEl.textContent = lights.length;
  draw();
});

/* ===== 顏色 ===== */
function randomColor() {
  const colors = ["#ff6b6b", "#ffd93d", "#6bcfff", "#b28dff", "#6bff95"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* 🌲 樹層 */
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
  drawTreeLayer(treeBaseY, 160, "#1c5e40", "#144c33");
  drawTreeLayer(treeBaseY + 70, 220, "#1f6f4a", "#165a3c");
  drawTreeLayer(treeBaseY + 150, 280, "#238a5a", "#1a6e4b");
  drawTreeLayer(treeBaseY + 230, 340, "#2ea36a", "#238a5a");

  // 树干
  ctx.fillStyle = "#7a4a24";
  ctx.fillRect(cx - 14, treeBaseY + 340, 28, 70);
}

/* ===== 燈 ===== */
function drawLights() {
  lights.forEach(l => {
    ctx.beginPath();
    ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = l.color;
    ctx.shadowColor = l.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

/* ===== 主繪製 ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTree();
  drawLights();
}

function clearLights() {
  lights = [];
  countEl.textContent = "0";
  draw();
}

/* 初始化 */
draw();

/* =====================
   ❄️ 雪花
===================== */
const snowCanvas = document.getElementById("snow");
const sctx = snowCanvas.getContext("2d");

function resizeSnow() {
  snowCanvas.width = canvas.width;
  snowCanvas.height = canvas.height;
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
</script>
