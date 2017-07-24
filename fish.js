function Block(x, y) {
  this.x = x;
  this.y = y;
  this.width = 72;
  this.corner = 12;
  this.col = color(255);
  this.isLabeled = false;
  this.isFixed = false;
  this.isDead = false;
  this.xAim = x;
  this.yAim = y;

  this.changeColor = function() {
    // this.col = color(random(255), random(25,125), random(25,125));
    // this.col = color(map(this.x,0,660,10,225),map(this.y,0,420,10,225),map(this.x,0,660,10,225)+map(this.y,0,420,10,225));
    this.col = color(map(this.x,0,660,10,225),map(this.y,0,420,150,225),0);
  }
  this.display = function() {
    if (this.isDead) {
      print(this.isDead);
    } else {
      noStroke();
      // stroke(255);
      fill(this.col);
      rect(this.x, this.y, this.width, this.width, this.corner);
      if (this.isFixed) {
        stroke(0);
        strokeWeight(2);
        line(this.x+0.1*this.width, this.y+0.3*this.width, this.x+0.2*this.width, this.y+0.4*this.width);
        line(this.x+0.2*this.width, this.y+0.4*this.width, this.x+0.4*this.width, this.y+0.15*this.width);
        noStroke();
        strokeWeight(1);
      }
      if (this.isLabeled) {
        rect(this.x, this.y, this.width+4, this.width+4, this.corner);
      }
      if (this.isLabeled) {
        fill(200);
        ellipse(this.x, this.y, this.width/4, this.width/4);
      }
    } 
  }

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.width + other.width) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

  this.clicked = function() {
    if ((!this.isDead)&&(!this.isFixed)&&(mouseX<this.x+0.5*this.width)&&(mouseY<this.y+0.5*this.width)&&(mouseX>this.x-0.5*this.width)&&(mouseY>this.y-0.5*this.width)) {
      this.isLabeled = true;
      return true
      }
    return false
  }

  this.switch = function(other) {
    // var temp = this.col;
    // this.col = other.col;
    // other.col = temp;

    temp = this.x;
    this.x = other.x;
    other.x = temp;

    temp = this.y;
    this.y = other.y;
    other.y = temp;
  }

  this.setLabel = function(lab=false) {
    this.isLabeled = lab;
  }
}