<!DOCTYPE html>
<html lang="zh">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>互動聖誕樹</title>
<style>
  body { margin: 0; background: #001; overflow: hidden; display: flex; flex-direction: column; align-items: center; }
  canvas { display: block; touch-action: none; }
  #controls { color: white; margin: 5px; }
  button { font-size: 16px; margin-left: 10px; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<canvas id="snow"></canvas>
<div id="controls">
  燈數: <span id="count">0</span>
  <button onclick="clearLights()">清除燈</button>
</div>

<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const countEl = document.getElementById("count");

let cx, treeBaseY;
let lights = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8; // 高度佔螢幕80%
  cx = canvas.width / 2;
  treeBaseY = canvas.height * 0.15;
  draw();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ===== 點擊/觸控放燈 ===== */
function getPos(e) {
  if (e.touches) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
}

function addLight(e) {
  e.preventDefault();
  const pos = getPos(e);
  const x = pos.x;
  const y = pos.y;

  if (y < treeBaseY || y > treeBaseY + canvas.height * 0.45) return;
  lights.push({ x, y, color: randomColor() });
  countEl.textContent = lights.length;
  draw();
}

canvas.addEventListener('click', addLight);
canvas.addEventListener('touchstart', addLight, {passive:false});

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
  const h = canvas.height * 0.45;
  drawTreeLayer(treeBaseY, h*0.36, "#1c5e40", "#144c33");
  drawTreeLayer(treeBaseY + h*0.15, h*0.49, "#1f6f4a", "#165a3c");
  drawTreeLayer(treeBaseY + h*0.28, h*0.55, "#238a5a", "#1a6e4b");
  drawTreeLayer(treeBaseY + h*0.42, h*0.65, "#2ea36a", "#238a5a");

  // 樹干
  ctx.fillStyle = "#7a4a24";
  ctx.fillRect(cx - 14, treeBaseY + h, 28, h*0.2);
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
