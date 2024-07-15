const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// const particle1 = new Particle(10, 10, 1, 1, 2, '#f1f1f1');
// console.log(particle1);

let particlesArray;

const init = () => {
  particlesArray = [];

  const numberOfParticles = (canvas.height * canvas.width) / 7000;

  for (let i = 0; i < numberOfParticles; i++) {
    // size allant de 1 à 3 (3 n'étant pas inclu);
    const size = (Math.random() * 2) + 1;

    // Math.random() * (max - min + 1) + min;
    // 10 équivaudra à un padding de 10px;
    const x = Math.random() * ((canvas.width - 10) - 10 + 1) + 10;
    const y = Math.random() * ((canvas.height - 10) - 10 + 1) + 10;

    const directionX = cleanDirection();
    const directionY = cleanDirection();

    particlesArray.push(new Particle(x, y, directionX, directionY, size, '#f1f1f1'));
  }
};

const cleanDirection = () => {
  // 0 ou 1;
  const random = Math.floor(Math.random() * 2);
  if (random) {
    // de 0.5 à 1.5 non inclus;
    return (Math.random() * 1) + 0.5;
  } else {
    // de -0.5 à -1.5 non inclus;
    return (Math.random() * -1) - 0.5;
  }
};

init();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i ++) {
    particlesArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
};

const connect = () => {
  for (let i = 0; i < particlesArray.length; i++) {

    for (let j = i + 1; j < particlesArray.length; j++) {
      //Math.pow non utilisé car coûte en performance quand on fait plein de calculs;
      const squaredDistanceX = (particlesArray[i].x - particlesArray[j].x) *
      (particlesArray[i].x - particlesArray[j].x);
      const squaredDistanceY = (particlesArray[i].y - particlesArray[j].y) *
      (particlesArray[i].y - particlesArray[j].y);

      const hypothenuse = squaredDistanceX + squaredDistanceY;
      //Math.sqrt(squaredDistanceX + squaredDistanceY) non utilisé même raison que Math.pow;

      if (hypothenuse < 135 * 135) {
        ctx.strokeStyle = `rgba(240,240,240,${1 - hypothenuse / (135 * 135)})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
};

animate();

const handleResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
};

window.addEventListener('resize', handleResize);
