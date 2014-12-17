/*--------------------- */
/* DRAWING PARAMS       */
/*--------------------- */

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var paddle = {
  w: 60,
  h: 15,
  y: HEIGHT - 30,
  color: "white"
}
var ball = {
  r: 10,
  y: HEIGHT - 45,
  color: "white",
  dx: 150, // speed is in pixels per second
  dy: -150 // up is negative!
}
var brick_options = {
  w: 40, 
  h: 15, 
  separation: 5, 
  canvas: canvas, 
  rows: 4
};

/*--------------------- */
/* CLEAR SCREEN         */
/*--------------------- */
function clear() { context.clearRect(0,0,WIDTH,HEIGHT); }

/*-------------------------- */
/* PADDLE & BALL START LOCATION  */
/*-------------------------- */
paddle.x = WIDTH/2 - paddle.w/2;

ball.x = WIDTH/2; // arc is already centered!

/*--------------------- */
/* DRAW BRICKS          */
/*--------------------- */
var bricks = createBricks(brick_options);
var brick_sprites = document.createElement("img");
	brick_sprites.src = "brick_sprites.png";

//Create Sprites
function draw_brick(b) {
  context.drawImage(brick_sprites,b.sx,b.sy,b.sw,b.sh,b.x,b.y,b.w,b.h);
}
function createBricks(o) {
  var out = [], x, y, col_max, color;
  var sw = 16;
  var sh = 8;
  var sprite_rows = [0,1,2,3,4,5,6,7];
  for (var row=0; row<o.rows; row++) {
    col_max = Math.floor(o.canvas.width / (o.w+o.separation));
    if (row%2 == 0) { col_max -=1; }
    y = (row+3)*(o.h + o.separation) + o.separation;
    for (var col=0; col<col_max; col++) {
      x = col*(o.separation + o.w) + o.separation;
      if (row%2 == 0) { x += o.w/2; }
      var sprite_row = sprite_rows[Math.floor((row+col)%sprite_rows.length)];
      sprite_col = Math.floor(Math.random()*5);
      var brick = {
        sx: sprite_col*sw,
        sy: sprite_row*sh,
        sw: sw,
        sh: sh,
        x: x, 
		y: y, 
		w: o.w, 
		h: o.h, 
		broken: false, 
		hits:2 //old options
      };
      out.push(brick);
    }
  }
  return out;
}
/*------------------------- */
/* HOW TO DRAW BASIC SHAPES */
/*------------------------- */
function rect(shape) {
  context.fillStyle = shape.color;
  context.beginPath();
  context.rect(shape.x, shape.y, shape.w, shape.h);
  context.fill();
  context.closePath();
}

function circle(c) {
  context.fillStyle = c.color;
  context.beginPath();
  context.arc(c.x, c.y, c.r, 0, Math.PI*2, true);
  context.fill();
  context.closePath();
}
/*--------------------- */
/* DRAW GAME BOARD      */
/*--------------------- */
function draw() {
  clear();

  // draw ball
  circle(ball);

  // draw paddle
  rect(paddle);
  
  
   for (var i=0;i<bricks.length;i++) { //count of # bricks on board
    b = bricks[i]; // current brick is now "b"
    if (!b.broken) { // if current brick.broken = false
      draw_brick(b); // draw that brick

    }
  }
}
