alert('Hello!');
function set(){
    let canvas = createCanvas(500, 500);
    canvas.parent("canvasContainer");
    background(100);
}

function draw(){
    noStroke();
    fill(random(255), random(255), random(255));
    ellipse(random(width), random(height), 50, 50);
}