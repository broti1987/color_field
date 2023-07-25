let canvas;
let ctx;
let field;
let w, h;
let size;
let columns;
let rows;
let noiseZ;



function setup() {
  size = 20;
  noiseZ = 0;
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);  
}

function initField() {
  field = new Array(columns);
  for(let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for(let y = 0; y < rows; y++) {
      field[x][y] = [0, 0];
    }
  }
}

function calculateField() {
  for(let x = 0; x < columns; x++) {
    for(let y = 0; y < rows; y++) {
      let angle = noise.simplex3(x/50, y/50, noiseZ) * Math.PI * 2;
      let length = noise.simplex3(x/100 + 40000, y/100 + 40000, noiseZ);
      field[x][y][0] = angle;
      field[x][y][1] = length;
    }
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  noise.seed(Math.random());
  columns = Math.floor(w / size) + 1;
  rows = Math.floor(h / size) + 1;
  initField();
}

function draw(now) {
  requestAnimationFrame(draw);
  calculateField();
  noiseZ = now * 0.0001;
  clear();
  drawField();
}

function clear() {
  ctx.fillStyle = "#F5F5EC";
  ctx.fillRect(0, 0, w, h);
}

function drawField() {
  for(let x = 0; x < columns; x++) {
    for(let y = 0; y < rows; y++) {
      let angle = field[x][y][0];
      let length = field[x][y][1];
      ctx.save();
      ctx.translate(x*size, y*size);
      ctx.rotate(angle);
      
    const grd = ctx.createLinearGradient(0, 0, 5, 5);
      
      var colors = ['red', 'green', 'blue', 'orange', 'yellow'];

this.color = Math.random() < 1 ? "hsla(100,90%,50%,1)" : "hsla(200,50%,50%,1)";
      
      /*ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];*/
      ctx.strokeStyle = `hsl(${x * 4 + y * 7}deg, 70%, 40%)`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size * length);
      ctx.stroke();
      ctx.restore();
    }
  }
}

setup();
draw(performance.now());