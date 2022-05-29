function setup() {
  createCanvas(1400, 480);
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  wave = sin(frameCount);
  ellipse(width/2 + wave * 300,height/2,100,100);
}
