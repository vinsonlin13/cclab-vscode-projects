function setup() {
    let canvas = createCanvas(500, 400);
    canvas.parent("canvasContainer");
    background(220);
  }
  
  function draw() {
    background(255);
    
    //desk top half
    noStroke();
    fill(240)
    beginShape();
      vertex(0,0);
      vertex(500,0);
      vertex(460,260)
      //vertex(460,200);
      vertex(40,260)
      //vertex(40, 200);
    endShape();
    
    //desk top border
    fill(150, 111, 51);
    rect(0,0,500,10)
    
    //desk bottom half
    fill(150, 111, 51);
    beginShape(); //list vertex clockwise!
      vertex(40, 200);
      vertex(460, 200);
      vertex(500, 400)
      vertex(0, 400);
    endShape();
    //rect(0, 200, 500, 200); //position + size
    //rect(0, 200, width, height/2);
    
    //keyboard
    fill(255, 255, 255);
    rect(150, 320, 200, 50);
    
    //mousepad
    fill(50, 50, 50);
    rect(380, 310, 90, 70);
    
    //book
    fill(0,0,0)
    rect(50, 310, 40, 70);
    fill(153, 51, 255);
    rect(60, 310, 40, 70);
    
    //cup
    fill(153, 51, 255)
    rectMode(CENTER);
    rect(420, 245, 40, 40);
    ellipse(420, 260, 40, 30);
    fill(255);
    ellipse(420, 230, 40, 30);
    
    //mac + interactivity
    fill(10);
    let x = map(mouseX, 0, width, 0, 255);
    fill(x)
    rectMode(CORNER);
    rect(150, 50, 200, 100, 10, 10, 10, 10); //last 4 digits gives curve
    fill(50);
    beginShape();
      vertex(150, 150);
      vertex(350, 150);
      vertex(365, 230);
      vertex(135, 230);
    endShape();
  }