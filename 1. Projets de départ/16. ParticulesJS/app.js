const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if(this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    } else if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x =+ this.directionX;
    this.y =+ this.directionY;
    this.draw();
  }
}

const particle1 = new Particle(10, 10, 50, 50, 2, '#f1f1f1');
console.log(particle1);
