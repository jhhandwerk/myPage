function setup() {
  createCanvas(1400, 480);
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  wave = sin(radians(frameCount));
  ellipse(width/2 + wave * 300,height/2,100,100);
<<<<<<< HEAD
}
=======
}
>>>>>>> b7aed97521d789b043c427058f89aebb73db402a
