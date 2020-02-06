function setup() { 
    createCanvas(400, 400);
    
    for (let index = 0; index < 20  ; index++) {
        bugs.push(new spinner());
    }
  } 
let bugs = [];
let temp = 20;
function draw(){
    if(temp != 0)
    for (let index = 0; index < 2  ; index++) {
        bugs.push(new spinner());
    }
    temp = 0;
    background(225);
    rectMode(CENTER);

    bugs.forEach(bug => {
        bug.move();
        bug.display();
    });
    
    
}

class spinner{
    constructor(){
        this.x = random(50,400);
        this.y = random(50,400);
        this.r = 0;
    }

    move(){
        this.r += 1;
    }

    display(){
        push();
        translate(this.x, this.y);
        rotate(this.r);
        rect(0,0,40,40);
        pop();
    }
}