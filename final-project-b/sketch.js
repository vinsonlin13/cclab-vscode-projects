// HOW TO: 
// Press 1-4;

let slime;
let rectangles = [];
let balls = [];
let lasers = [];
let shape;
let mode = 0; 

let blamSound;
let ow1Sound;
let ow2Sound;
let thudSound;
let whooshSound;
let windSound;
let wooshpunchSound;

function preload() {
  blamSound = loadSound("sound/blam.mp3");
  ow1Sound = loadSound("sound/ow_malcolm.wav");
  ow2Sound = loadSound("sound/ow_two.mp3");
  thudSound = loadSound("sound/thud.wav");
  whooshSound = loadSound("sound/whoosh.flac");
  windSound = loadSound("sound/wind.ogg");
  wooshpunchSound = loadSound("sound/woosh_punch.wav");
}

// function mousePressed() {
  // blamSound.play(); // done
  // ow1Sound.play(); // done
  // ow2Sound.play(); // done
  // thudSound.play();
  // whooshSound.play(); // done
  // windSound.play(); // done
  // wooshpunchSound.play(); // done
// }

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  // createCanvas(400, 400);
  angleMode(DEGREES);
  textAlign(CENTER);
  noStroke();
  slime = new Slime();
  // rectangle = new Rectangle();
  // ball = new Ball();
  // laser = new Laser();
}

function keyReleased() {
  slime.setDirX(0);
  slime.setDirY(0);
  slime.unrage();
  slime.uncry();
  slime.rotation = 0;
  balls.dir = -1;
  if (key === '1') {
    slime.wide = slime.wide / 2;
    slime.tall = slime.tall * 2;
    slime.face = slime.face * 2;
  }
}

function keyPressed() {
  // move
  if (keyCode === ENTER) {
    if (mode == 0) {
      mode = 1; 
    } else {
      mode = 0;
    }
  }
  
  if (keyCode === LEFT_ARROW) {
    slime.setDirX(-1);
  } else if (keyCode === RIGHT_ARROW) {
    slime.setDirX(1);
  } else if (keyCode === UP_ARROW) {
    slime.setDirY(-1);
  } else if (keyCode === DOWN_ARROW) {
    slime.setDirY(1);
  }
  
  r = random(100);
  hitDir = 1
  if (0 < r && r < 25) {
    hitDir = 1;
  } else if (25 < r && r < 50) {
    hitDir = 2;
  } else if (50 < r && r < 75) {
    hitDir = 3;
  } else if (75 < r && r < 100) {
    hitDir = 4;
  }
  console.log(hitDir);
  
  if (key === '1') {
    if (hitDir == 1 || hitDir == 2) {
      let rectangle = new Rectangle(0.2, 1); 
      rectangles.push(rectangle);
    } else {
      let rectangle = new Rectangle(0.8, -1);
      rectangles.push(rectangle);
    }
    blamSound.play(); // sound
    slime.wide = slime.wide * 2;
    slime.tall = slime.tall / 2;
    slime.face = slime.face / 2;
    // shape = new Ellipse(shape.x, shape.y, shape.size, color(255, 0, 0));
  } else if (key === '2') {
    if (hitDir == 1) {
      let ball = new Ball(width/2, height*0.2, 0, 10); 
      balls.push(ball);
    } else if (hitDir == 2) {
      let ball = new Ball(width/2, height*0.8, 0, -10);
      balls.push(ball);
    } else if (hitDir == 3) {
      let ball = new Ball(width*0.2, height/2, 10, 0);
      balls.push(ball);
    } else {
      let ball = new Ball(width*0.8, height/2, -10, 0);
      balls.push(ball);
    }
    // let ball = new Ball();
    // balls.push(ball);
    wooshpunchSound.play(); // sound
  } else if (key === '3') {
    let laser = new Laser();
    lasers.push(laser);
    whooshSound.play(); // sound
  } else if (key === '4') {
    // slime.x = slime.x / 1.5;
    // slime.y = slime.y / 1.5;
    slime.rotation = 3;
    windSound.play(); // sound
  } 
}

function draw() {
  if (mode == 0) {
    menu();
  }
  if (mode == 1) {
    game(); 
  }
  // if (keyPressed == true && keyCode === ENTER) {
  // if (mouseIsPressed == true) {
  //   mode = 1;
  //   // if (mode == 0) {
  //   //   mode = 1; 
  //   // } else {
  //   //   mode = 0;
  //   // }
  // }
}

function menu() {
  background(135, 206, 235);
  textFont('Georgia');
  // title
  textSize(50);
  text('WINTER BLOOM', width/2, 80);
  textSize(30);
  text('BY VINSON LIN', width/2, 120);
  
  // instructions
  text('HOW TO PLAY:', width/2, 180);
  textSize(20);
  text('LONG PRESS KEYS 1-4 FOR A SURPRISE', width/2, 210);
  // text('PRESS ARROW KEYS TO MOVE', width/2, 300);
  text('PRESS ENTER/RETURN TO START', width/2, 240);
  // text('CLICK THE SCREEN TO START', width/2, 240);
  
  // description
  textSize(15);
  textWrap(WORD);
  text('Description: In life, one is bombarded with internal and external stresses that makes one feel smaller. However, once you overcome them, they will be the catalyze that makes you stronger. Watch as our main character get pummeled into dust and revives from ashes.', 0, 280, width);
}

function game() {
  background(135, 206, 235);
  slime.show();
  slime.move();
  // shape.draw();
  
  // ball mechanics
  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
    balls[i].move();
    if (balls[i].hits(slime)) {
      console.log("HIT");
      ow1Sound.play();
      slime.shrink();
      slime.rage();
      slime.cry();
      balls[i].collapse();
    }
    if (balls[i].toDelete) {
      // balls.splice(i, 1);
      balls[i].dir = -10;
      // balls.splice(i, 1);
    }
  }
  
  // brick mechanics
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].show();
    rectangles[i].move();
    if (rectangles[i].hits(slime)) {
      console.log("HIT");
      ow2Sound.play();
      slime.shrink();
      slime.rage();
      slime.cry();
      rectangles[i].collapse();
    }
    if (rectangles[i].toDelete) {
      rectangles.splice(i, 1);
    }
  }
  
  // laser mechanics
  for (let i = 0; i < lasers.length; i++) {
    lasers[i].show();
    lasers[i].move();
    if (lasers[i].hits(slime)) {
      console.log("HIT");
      ow1Sound.play();
      slime.shrink();
      // slime = new Slime(); // attempt to split face into 2 
      slime.rage();
      slime.cry();
      lasers[i].collapse();
    }
    if (lasers[i].toDelete) {
      lasers.splice(i, 1);
    }
  }
}

// THE SLIME
class Slime {
  constructor() {
    this.x = width / 4;
    this.y = height / 4;
    this.wide = 100;
    this.tall = 100;
    this.xdir = 0;
    this.ydir = 0;
    
    this.r = 201;
    this.g = 235;
    this.b = 242;
    
    this.face = 30;
    this.eyes = 5; // 5 for circular eyes
    this.eyeBlack = 10;
    this.mouth = 180; // PI for normal smile 
    
    this.rotation = 0
  }

    // regular face
  show() {
    push();
    translate(this.x, this.y);
    rotate(frameCount * this.rotation);
    
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.wide, this.tall);
    // facial features
    fill(255);
    // eye whites
    ellipse(this.x - this.face, this.y, this.wide/5, this.tall/this.eyes);
    ellipse(this.x + this.face, this.y, this.wide/5, this.tall/this.eyes);
    // eye blacks
    fill(30);
    stroke(0);
    strokeWeight(5);
    // line(this.x-this.face-10, this.y-15, this.x-this.face+10, this.y-15);
    // line(this.x-this.face+50, this.y-15, this.x-this.face+70, this.y-15);
    noStroke();
    ellipse(this.x - this.face, this.y, this.wide/this.eyeBlack, this.tall/this.eyeBlack);
    ellipse(this.x + this.face, this.y, this.wide/this.eyeBlack, this.tall/this.eyeBlack);
    arc(this.x, this.y, this.face, this.face, 0, this.mouth);
    noFill();
    
    pop();
  }
  
    // show () {
    //   push();
    //   translate(this.x, this.y);
    //   rotate(frameCount*5);
    //   fill(255);
    //   circle(0, 0, 100);
    //   fill(0);
    //   circle(-30, 0, 5);
    //   circle(30, 0, 5);
    //   arc(0, 0, 30, 30, 0, 180);
    //   pop();
    // }

    // spinning face
//     show() {
//       push();
//       translate(this.x, this.y);
//       rotate(frameCount*3);

//       fill(this.r, this.g, this.b);
//       ellipse(this.x/2, this.y/2, this.wide, this.tall);
//       // facial features
//       fill(0);
//       ellipse((this.x - this.face)/10, this.y, this.wide/5, this.tall/this.eyes);
//       ellipse((this.x + this.face)/5, this.y, this.wide/5, this.tall/this.eyes);
//       arc(this.x/2, this.y/2, this.face, this.face, 0, this.mouth);
//       noFill();

//       pop();
//   }

  // move the slime
  setDirX(dir) {
    this.xdir = dir
  }
  setDirY(dir) {
    this.ydir = dir
  }
  move(dir) {
    this.x += this.xdir*5;
    this.y += this.ydir*5;
  }
  
  // magical effects
  cry() {
    this.mouth = 360;
  }
  uncry() {
    this.mouth = 180;
  }
  rage() { // turn red
    this.r = 246
    this.g = 77
    this.b = 82
  }
  unrage() { // turn light blue
    this.r = 201;
    this.g = 235;
    this.b = 242;
  }
  shrink() { // shrink whole face
    this.wide -= 8;
    this.tall -= 8;
    this.face -= 2;
    // console.log(this.wide);
  }
}

// THE BOWLING BOWL
class Ball {
  constructor(x, y, sx, sy) {
    this.x = x // width / 2;
    this.y = y // height * y;
    this.wide = 100;
    this.tall = 100;
    this.speedX = sx;
    this.speedY = sy; //10
    this.dir = 1;
    this.r = 0; 
    this.g = 0;
    this.b = 0;
    this.toRemove = false;
  }
  
  show() {
    fill(this.r, this.g, this.b);
    // ellipse(this.x, this.y, this.wide, this.tall);
    circle(this.x, this.y, this.wide);
  }

  move() {
    this.x = this.x + this.speedX * this.dir;
    this.y = this.y + this.speedY * this.dir;
  }
  
  hits(slime) {
    let d = dist(this.x/2, this.y/2, slime.x, slime.y);
    if (d < 20) {
      return true;
    } else {
      return false;
    }
  }
  
  collapse() {
    this.toDelete = true;
  }
}

// THE BRICK
class Rectangle {
  constructor(y, s) {
    this.x = width / 2;
    this.y = height * y
    this.wide = width * 0.8;
    this.tall = height / 10;
    this.speed = 10 * s;
    this.r = 246
    this.g = 77
    this.b = 82
    this.toRemove = false;
  }
  
  show() {
    fill(this.r, this.g, this.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.wide, this.tall);
  }

  move() {
    this.y = this.y + this.speed;
  }
  
  hits(slime) {
    let d = dist(this.x/2, this.y/2, slime.x, slime.y);
    if (d < 5) {
      return true;
    } else {
      return false;
    }
  }
  
  collapse() {
    this.toDelete = true;
  }
}

// THE WORD LASER
class Laser {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.wide = width * 0.4;
    this.tall = height / 20;
    this.speed = 2;
    this.r = 255;
    this.g = 251;
    this.b = 5;
    this.toRemove = false;
  }
  
  show() {
    fill(this.r, this.g, this.b);
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    // rect(this.x, this.y, this.wide, this.tall);
    textAlign(CENTER, CENTER);
    textSize(32);
    // rotate(45);
    text('insults & insecurities', this.x, this.y) //, this.wide, this.tall);
    pop();
  }

  move() {
    this.x = this.x + this.speed;
    this.y = this.y + this.speed;
  }
  
  hits(slime) {
    let d = dist(this.x, this.y, slime.x, slime.y);
    if (d < 20) {
      return true;
    } else {
      return false;
    }
  }
  
  collapse() {
    this.toDelete = true;
  }
}

// class Shape {
//   constructor(x, y, size, color) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.color = color;
//   }
//   draw() {
//     // draw shape here
//   }
// }

// class Ellipse extends Shape {
//   constructor(x, y, size, color) {
//     super(x, y, size, color);
//   }
//   draw() {
//     fill(this.color);
//     ellipse(this.x, this.y, this.size * 1.5, this.size / 3);
//   }
// }