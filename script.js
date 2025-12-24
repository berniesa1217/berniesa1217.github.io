/***********************
 * 聖誕樹 + 燈
 ***********************/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const countEl = document.getElementById("count");

let lights = [];

/* 點擊放燈 */
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 簡單限制：只在樹的範圍內放燈
  if (y < 100 || y > 430) return;

  lights.push({
    x,
    y,
    color: randomColor()
  });

  countEl.textContent = lights.length;
  draw();
});

/* 隨機燈色 */
function randomColor() {
  const colors = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcfff",
    "#b28dff",
    "#6bff95"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* 畫樹 */
function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1f8f55";
  drawTriangle(320, 120, 220);
  drawTriangle(320, 220, 260);
  drawTriangle(320, 340, 300);

  ctx.fillStyle = "#7a4a1f";
  ctx.fillRect(305, 420, 30, 60);
}

/* 三角形 */
function drawTriangle(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - size / 2, y + size);
  ctx.lineTo(x + size / 2, y + size);
  ctx.closePath();
  ctx.fill();
}

/* 畫燈 */
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

/* 主繪圖 */
function draw() {
  drawTree();
  drawLights();
}

/* 清空 */
function clearLights() {
  lights = [];
  countEl.textContent = "0";
  draw();
}

draw();

/***********************
 * ❄️ 雪花動畫
 ***********************/
const snowCanvas = document.getElementById("snow");
const sctx = snowCanvas.getContext("2d");

function resizeSnow() {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 140 }, () => ({
  x: Math.random() * snowCanvas.width,
  y: Math.random() * snowCanvas.height,
  r: Math.random() * 2 + 1,
  speed: Math.random() * 1 + 0.5,
  drift: Math.random() * 0.6 - 0.3
}));

function snowLoop() {
  sctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  sctx.fillStyle = "rgba(255,255,255,0.8)";
  sctx.beginPath();

  flakes.forEach(f => {
    sctx.moveTo(f.x, f.y);
    sctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);

    f.y += f.speed;
    f.x += f.drift;

    if (f.y > snowCanvas.height) {
      f.y = -5;
      f.x = Math.random() * snowCanvas.width;
    }
  });

  sctx.fill();
  requestAnimationFrame(snowLoop);
}

snowLoop();
