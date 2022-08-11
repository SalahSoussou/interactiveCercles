var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");


var colr = ["#2C3E50", "#E74C3C", "#ECF0F1", "3498D8", "#4411aa", "#298089"];

var mouse = {
  x: undefined,
  y: undefined,
};
var maxRadius = 40;
var minRadius = 2;

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colr[Math.round(Math.random() * colr.length)];

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
  };

  this.update = function () {
    if (this.x > innerWidth - this.radius || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y > innerHeight - this.radius || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    //  intractivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

console.log(carray);
var carray = [];

function init() {
  carray = [];
  for (var i = 0; i < 600; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    carray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animmate() {
  requestAnimationFrame(animmate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < carray.length; i++) {
    carray[i].update();
  }
}
init();
animmate();
