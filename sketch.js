var fishes = [];
var parks = [];
var colors = [];
var fishNumber = 20;

function Park(x,y) {
  this.x = x;
  this.y = y;
  this.display = function() {
    noFill();
    stroke(255);
    rectMode(CENTER);
    rect(this.x, this.y, 25, 50);
  }
}

function Fish(x,y,color) {
  this.x = x;
  this.y = y;
  this.r=20;
  this.direction=random(360);
  this.originalDirection=this.direction;
  this.local=[];
  this.local[0] = [this.r*1.5,0];
  this.local[1] = [-this.r,this.r*0.5];
  this.local[2] = [-this.r,-this.r*0.5];
  this.local[3] = [0,4];
  this.local[4] = [0,-4];
  this.color = color;
  this.speed = 0.5;
  this.target;

  this.display = function() {
    fill(this.color,10,50);
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(this.direction*PI/180);
    triangle(this.local[0][0], this.local[0][1], this.local[1][0], this.local[1][1], this.local[2][0], this.local[2][1]);
    stroke(255);
    ellipse(this.local[3][0],this.local[3][1],5);
    ellipse(this.local[4][0],this.local[4][1],5);
    stroke(this.color,10,50);
    line(this.local[0][0]-10,this.local[0][1],this.local[0][0]-65,this.local[0][1]);
    pop();
  }

  this.bounce = function() {
    if (this.x >= width || this.x <=0.0) {
      this.direction = -this.direction+180;
    } 
    
    if (this.y >= height || this.y <= 0.0) {
      this.direction = -this.direction;
    }
  }

  this.move = function() {
    this.x += this.speed*Math.cos(this.direction*PI/180);
    this.y += this.speed*Math.sin(this.direction*PI/180);
    if (this.x >= width) {
      this.x = width;
    }
    if (this.x <=0.0) {
      this.x = 0.0;
    }
    if (this.y >= height) {
      this.y = height;
    }
    if (this.y <=0.0) {
      this.y = 0.0;
    }
  }

  this.update = function() {
    // this.direction = 270-Math.atan((this.x - this.target.x)/(this.y-this.target.y))*180/PI;
    this.speed += random(-0.5,0.5);
    if (this.speed<0.0 || this.speed>5.0) {
      this.speed = 3.0;
    }
    this.direction += random(-1,1);
    this.move();
    this.bounce();
  }
}


function setup() {
  // createCanvas(660, 420);
  createCanvas(1000, 500);
  rectMode(CENTER);
  colors = linspace(0,255,fishNumber);
  xlocations = linspace(width/2-width/3,width/2+width/3,fishNumber);
  for (var i = fishNumber - 1; i >= 0; i--) {
    fishes[i] = new Fish(xlocations[i],height/2,colors[i]);
  }
  for (var i = fishNumber - 1; i >= 0; i--) {
    parks[i] = new Park(i*25+20,20);
    fishes[i].target = parks[i];
  }
  for (var j = 100; j>=0; j--) {
    for (var i = fishes.length - 1; i >= 0; i--) {
      fishes[i].update();
    }
  }
}

function draw() {
  background(92, 219, 255);
  for (var i = fishes.length - 1; i >= 0; i--) {
    fishes[i].update();
    fishes[i].display();
    // parks[i].display();
  }
}

function linspace(a,b,n) {
  var ret = [];
  for (var i = n; i >= 0; i--) {
    ret[i] = (i*b+(n-i)*a)/n;
  }
  return ret
}