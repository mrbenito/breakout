/* From the TX/RX Class. Class notes found http://chriscauley.github.io/intro-to-js */

/*--------------------- */
/* SET VARIABLES        */
/*--------------------- */
var interval;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var current_frame;
var rightDown = false;
var leftDown = false;
var fps = 100;
var last_time, elapsed_time, now;

/*--------------------- */
/* COLLIDE SIDE DEFINED */
/*--------------------- */
// This tests which side the ball has touched the "thing"
// example output = {x: true, y: false}

function collide(ball,thing) {
  var out = { x: false, y: false }; //initialize object "out"
  var d_left = ball.x - thing.x + ball.r; //  left x of thing
  var d_right = thing.x + thing.w - ball.x + ball.r; // right x corner of thing
  var d_top = ball.y - thing.y + ball.r; //top y of thing
  var d_bot = thing.y + thing.h - ball.y + ball.r; // bottom y of thing
  if (d_left > 0 && d_right > 0 && d_top > 0 && d_bot > 0) {
    if (Math.min(d_left,d_right) > Math.min(d_top,d_bot)) {
      out.y = true;
    }
    else {
      out.x = true;
    }
  }
  return out;
}

/*---------------------*/
/* DETECT COLLISIONS   */
/*---------------------*/
function detect_collisions () {
	for (var i=0;i<bricks.length;i++) {
		var _b = bricks[i];
		if (!_b.broken) {
		  var _c = collide(ball,_b);
		  if (_c.x || _c.y) { //if broken on either x or y side...
			
			_b.hits--
			  beep.play();
       console.log(_b.hits);
			  // HIT 
			  if (_b.hits < 1) {
			  _b.broken = true; // set broken to true...
			  } else if (_b.hits == 1) {
				_b.color = "white";
			  }
	  
      /*---------------------*/
      /* SPEED UP THE BALL   */
      /*---------------------*/
       if (Math.abs(ball.dx) < 500 || Math.abs(ball.dy) < 500 ) { //max speed of 500

          // FOR X
          if (ball.dx > 0) { ball.dx += 5; } else { ball.dx -= 5; }

          //FOR Y
          if (ball.dy > 0 ) { ball.dy += 5; } else { ball.dy -= 5; }
            
          console.log("DX:" + ball.dx + ", DY:" + ball.dy );
      } 

      /*-----------------------------------*/
      /* SPEED BASED ON PADDLE DIRECTION   */
      /*-----------------------------------*/
      if (ball.dx > 0 && rightDown) { 
        ball.dx += 5; 
        ball.dy += 5;
        console.log ("rightHit");
      } else if (ball.dx > 0 && leftDown) { 
        ball.dx -= 5;
        ball.dy -= 5;
        console.log ("LeftHit");
      }
      
 		 // REVERSE DIRECTION OF DX/DY (The Bounce)
			if (_c.x) { ball.dx = -ball.dx }
			if (_c.y) { ball.dy = -ball.dy }
			continue;
		  }
		}
	  }
   
/*---------------------*/
/* PADDLE COLLISIONS   */
/*---------------------*/
  _c = collide(ball,paddle); //returns {x = true/false, y = true/false}
  var hitZone1 = paddle.x + (paddle.w / 3); //x=20
  var hitZone2 = paddle.x + (paddle.w / 3)*2; //x=40

  // Direction of ball based on WHERE paddle is hit.
  if (_c.y) { 
      if (ball.x < hitZone1) {
        ball.dx = -Math.abs(ball.dx);
      } 
      if (ball.x > hitZone2) {
        ball.dx = Math.abs(ball.dx);
      }
    ball.dy = - ball.dy;
  } 
  if (_c.x) {
    ball.dx = - ball.dx;
  }
}

/*---------------------*/
/* DEATH LOGIC         */
/*---------------------*/
function reset_ball () {

}

/*---------------------*/
/* RUN GAME            */
/*---------------------*/
function tick() {
	now = new Date().valueOf();
	elapsed_time = (now - last_time) / 1000;
	last_time = now;
	
	detect_collisions();
	move()
	draw();
	current_frame = requestAnimationFrame(tick);
}

/*---------------------*/
/* BUTTONS             */
/*---------------------*/

function start() {
  cancelAnimationFrame(current_frame);
  now = new Date().valueOf();
  last_time = new Date().valueOf();
  clearInterval(interval);
  var current_frame = requestAnimationFrame(tick);
}

function stop() {
  cancelAnimationFrame(current_frame);
  
  //clearInterval(interval);
}

