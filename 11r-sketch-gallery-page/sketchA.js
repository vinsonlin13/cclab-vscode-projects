let pressTime = 0;

let num_particles; // initial number of particles
let num_ripples; // initial number of ripples

let particles = [];
let ripples = [];

let rectX = [0  , 50 , 40 , 80 , ];
let rectY = [100, 100, 200, 200, ];
let rectWidth = [30, 60, 30, 30]; 
let rectHeight = 30;

// pastel colors
let colors = [
  "#FF6663",
  "#FEB144",
  "#FDFD97",
  "#9EE09E",
  "#9EC1CF",
  "indigo",
  "#CC99C9",
];

function setup() {
  let canvasA = createCanvas(600, 600);
  canvasA.parent("canvasContainerA");
  noStroke();
  frameRate(20); //speed
  
  // generate initial particles
  num_particles = random(5, 10);
  for (let i = 0; i < num_particles; i++) {
    particles[i] = new Particle(random(width), random(height / 2));
  }

  // generate initial ripples
  num_ripples = 5; //random(5, 10);
  for (let i = 0; i < num_ripples; i++) {
    ripples[i] = new Ripple(random(width), random(height), 5);
  }
}

function draw() {
  colorMode(HSB);
  // background("#03A9F4");
  background(206, 68, 88);
  // background(202, 24, 94);
  // background(206, 58, 80);
  colorMode(RGB);
  
  // find coordinates
  // text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  
  //possible feature: river flow
  // colorMode(HSB);
  // fill(202, 24, 94);
  // colorMode(RGB);
  // for (let i = 0; i < rectX.length; i++) {
  //   rect(rectX[i], rectY[i], rectWidth[i], rectHeight);
  //   rectX[i] = (rectX[i] + 1) % (width + rectHeight);
  // }

  // possible feature
  // update and display particles
  // for (let i = 0; i < particles.length; i++) {
  //   let p = particles[i];
  //   fill(colors[i%colors.length]); //rainbow
  //   p.move();
  //   p.display();
  // }

  // creates more ripples, random control chance of its creation
  ran = random(1, 100);
  if (ran < 10 && ran > 5) { //e.g. 3 to create way less
    ripples.push(new Ripple(random(width), random(height), 5));
  } else if (ran < 5) {
    ripples.push(new Ripple2(random(width), random(height), 5));
  }

  // update and display ripples
  for (let i = 0; i < ripples.length; i++) {
    let r = ripples[i];
    // fill(colors[i % colors.length]);
    r.update();
    r.display();
  }
  // kill overgrown ripples -> changed to base on time elsewhere
  // ripples = ripples.filter((ripple) => ripple.size < width/2);
}

/* --- --- --- */

class Ripple {
  constructor(x, y, layers) {
    this.x = x;
    this.y = y;
    this.layers = layers;
    this.size = 1; //initial size
    // this.growRate = 8
    this.growRate = random(3, 6); //change how large ripples get
    // this.opacity = 100; //change max possible size of ripples
    this.opacity = random(50, 150); //change max possible size of ripples
    this.opacityRate = 1.5;
  }

  update() {
    this.size += this.growRate;
    // this.opacityRate += 0.1;
    this.opacity -= this.opacityRate;
  }

  display() {
    for (let i = 0; i < this.layers; i++) {
      fill(255, 255, 255, this.opacity); //0 to 1
      // fill(255, 255, 100, this.opacity); //0 to 1
      noStroke();
      // ellipse(this.x, this.y, this.size - i);
      ellipse(this.x, this.y, this.size - i * 50); //ripple size
      // ellipse(this.x, this.y, this.size - i * 30, this.size - i * 50);
      // if (random(1, 10) < 8) {
      //   ellipse(this.x, this.y, this.size - i * 50); //ripple size
      // } else {
      //   ellipse(this.x, this.y, this.size - i * 30, this.size - i * 50);
      // }

      // stroke(255);
      // noFill();
    }
  }
}

// class Ripple2 extends Ripple {}

class Ripple2 {
  constructor(x, y, layers) {
    this.x = x;
    this.y = y;
    this.layers = layers;
    this.size = 1;
    this.growRate = random(3, 6); //change how large ripples get
    this.opacity = random(50, 150); //change max possible size of ripples
    this.opacityRate = 1.5;
  }

  update() {
    this.size += this.growRate;
    this.opacity -= this.opacityRate;
  }

  display() {
    for (let i = 0; i < this.layers; i++) {
      // fill(255, 255, 255, this.opacity); //0 to 1
      fill(182, 219, 255, this.opacity);
      noStroke();
      ellipse(this.x, this.y, this.size - i * 30, this.size - i * 50);
    }
  }
}

class RippleThrow {
  constructor(x, y, layers) {
    this.x = x;
    this.y = y;
    this.layers = layers;
    this.size = 1;
    this.growRate = 10; //change how large ripples based on presstime
    this.opacity = random(50, 150); //change max possible size of ripples
    this.opacityRate = 1.5;
  }

  update() {
    this.size += this.growRate;
    this.opacity -= this.opacityRate;
  }

  display() {
    for (let i = 0; i < this.layers; i++) {
      // fill(206, 68, 81, this.opacity);
      fill(0, 119, 190, this.opacity);
      noStroke();
      ellipse(this.x, this.y, this.size - i * 30, this.size - i * 50);
    }
  }
}

class RippleKeyPress {
  constructor(x, y, layers) {
    this.x = x;
    this.y = y;
    this.layers = layers;
    this.size = 1;
    this.growRate = 10; //change how large ripples based on presstime
    this.opacity = random(50, 150); //change max possible size of ripples
    this.opacityRate = 1.5;
  }

  update() {
    this.size += this.growRate;
    this.opacity -= this.opacityRate;
  }

  display() {
    for (let i = 0; i < this.layers; i++) {
      // fill(206, 68, 81, this.opacity);
      fill(0, 119, 190, this.opacity);
      noStroke();
      ellipse(this.x, this.y, this.size - i * 30, this.size - i * 50);
    }
  }
}

class Particle {
  // constructor function
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y;
    this.dia = 10; //size of particle
    this.xSpd = random(-1, 1);
    this.ySpd = random(3, 5); //speed of particle
  }

  display() {
    push();
    translate(this.x, this.y);
    circle(0, 0, this.dia);
    pop();
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
    if (this.x > width) {
      this.x = -this.x;
    }
    if (this.y > height) {
      this.y = -this.y;
      // this.y = random(0, 20); //respawn at top
      
    }
  }
}

/* --- --- --- */

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));

  // generate ripple
  rect(mouseX, mouseY, 10, 10);
  let rockThrow = 5 // maybe use for loop
  // if (mouseY > height/2) {
  //   let ripple = new RippleThrow(mouseX, mouseY, 5);
  //   let ripple1 = new RippleThrow(mouseX, mouseY/2, 5);
  //   let ripple2 = new RippleThrow(mouseX, mouseY/4, 5);
  //   ripples.push(ripple);
  //   ripples.push(ripple1);
  //   ripples.push(ripple2);
  // } 
  let ripple = new RippleThrow(mouseX, mouseY, 5);
  // let ripple1 = new RippleThrow(mouseX/2, mouseY/2, 5);
  // let ripple2 = new RippleThrow(mouseX/4, mouseY/4, 5);
  ripples.push(ripple);
  // // setTimeout(RippleThrow, 2000); // 2 second delay
  // ripples.push(ripple1);
  // ripples.push(ripple2);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    // draw shape on the left side of the canvas
    ripples.push(new RippleKeyPress(random(width / 2), random(height), 5));
  } else if (keyCode === RIGHT_ARROW) {
    // draw shape on the right side of the canvas
    let ripple = new RippleKeyPress(random(width / 2, width), random(height), 5);
    ripples.push(ripple);
  } else if (keyCode === UP_ARROW) {
    // draw shape on the top of the canvas
    let ripple = new RippleKeyPress(random(width), random(height/2), 5);
    ripples.push(ripple);
  } else if (keyCode === DOWN_ARROW) {
    // draw shape on the bottom of the canvas
    let ripple = new RippleKeyPress(random(width), random(height/2, height), 5);
    ripples.push(ripple);
  }
}