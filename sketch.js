
let fools = [];
let font,
  fontsize = 40;
function preload(){
    font = loadFont('assets/orange.ttf');
}

function setup() {
    createCanvas(800, 400);
    frameRate(12);
    textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

//global stuff
let gamestate = 0;

//menu stuff
let start_color = 255;

//game stuff
let x = 10;
let max_speed = 4;
const speed_cap = 25;
let spawn_interval = 30;
let spawn_ammount = 1;
let bgColor = [178, 178, 178];
let colider_timeout = 1;

function draw() {
    if(gamestate == 0)
    {
        menu();
    }
    else if (gamestate == 1){
        drawGame();
    }
    
}

function menu(){
    background("#272727");
    fill(255);
    text("Some Lame Defence Game", width * 0.5, 100);

    fill(115);
    rect((width*0.5) - 48, (height * 0.5)-18,98,38);
    fill(start_color);
    text("Start",width * 0.5, height * 0.5);
}

function drawGame(type){
    background(bgColor);
    rotate(0);
    rectMode(CORNER);
    angleMode(DEGREES);
    rect(width - 50, 0, 10, height);
    //display the red bar of death.
    if (colider_timeout > 0) {
        colider_timeout--;
        noStroke();
        fill([240, 68, 0]);
        rect(width - 20, 0, 20, height);
        fill(255);
        stroke(0);
    }
    //change the background color if it's not grey.
    if (bgColor[0] == 240) {
        bgColor = [178, 178, 178];
    }

    //spawn new blocks
    if (x % spawn_interval == 0 || spawn_interval == 0) 
        for (let index = 0; index < spawn_ammount; index++) 
            fools.push(new foo()); 

    //increase the dificulty, by increasing the spawnrate and max speed.
    if (x % 80 == 0) {
        max_speed += (max_speed < speed_cap ? 1 : 0);
        if(x % 160){
            if (spawn_interval > 0 && random() > 0.05)
                spawn_interval -= 1;
            else
                spawn_ammount ++;
        }
    }

    for (let index = 0; index < fools.length; index++) {
        const fool = fools[index];
        if (fool.step == 1) {
            if (fool.right >= width - 50) {
                fools[index].step = 2;
            }
            fools[index].move();
        }

        else if (fool.step == 2) {
            fools[index].spin();
        }
        fool.display();


        if (fool.x > width) {
            fools.splice(index, 1);
            colider_timeout = 4;
        }
    }

    //console.log(fools.length);
    x++;
}


function mouseMoved(){
    let mx = mouseX;
    let my = mouseY;
    //check for hover on the start button
    let left = (width * 0.5) - 48;
    let right = left + 98;
    let top = (height * 0.5)-18;
    let bottom = top + 38;
    if(mx >= left && mx <= right && my >= top && my <= bottom){
        
    }

}

function mouseClicked() {
    for (let index = 0; index < fools.length; index++) {
        const fool = fools[index];
        if (Colider(fool, mouseX, mouseY)) {
            fools.splice(index, 1);
            return false;
        }
    }
}
function Colider(fool, mx, my) {
    if (mx >= fool.left && mx <= fool.right && my >= fool.top && my <= fool.bottom) {
        return true;
    }
}

class foo {
    constructor() {
        this.step = 1;
        this.r = 0;
        this.x = 10;
        this.y = random(10, height - 20);
        this.s = random(1, max_speed);
        this.w = 40 - (20 - this.s);
        this.h = 40 - (20 - this.s);
        if (this.w > 50) {
            this.w = 50;
            this.h = 50;
        }
        this.top = this.y - (this.h / 2);
        this.bottom = this.y + (this.h / 2);
        this.left = this.x - (this.w / 2);
        this.right = this.x + (this.w / 2);
    }

    move(){
        this.x = this.x + this.s;
        this.left = this.x - (this.w / 2);
        this.right = this.x + (this.w / 2);
    }

    spin(){
        this.r  = (this.r + this.s) %360;
    }

    display(){
        push();
        rectMode(CENTER);
        translate(this.x, this.y);
        rotate(this.r);
        rect(0,0,this.w,this.h);
        pop();
    }
}
