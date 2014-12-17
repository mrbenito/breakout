// Accelerometer
//-----------------
function tilt(bg) {
  var max_angle = 60;
  var angle = bg[1]+max_angle/2;
  paddle.x = angle/max_angle*WIDTH;
  paddle.x = Math.min(paddle.x,WIDTH - paddle.w);
  paddle.x = Math.max(paddle.x,0);
}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
        tilt([event.beta, event.gamma]);
    }, true);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function () {
        tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
    }, true);
} else {
    window.addEventListener("MozOrientation", function () {
        tilt([orientation.x * 50, orientation.y * 50]);
    }, true);
}

// MOVE (KEYBOARD)
function move() {
  ball.x += ball.dx*elapsed_time;
  ball.y += ball.dy*elapsed_time;
  // move paddle                                                                                                              
  if (leftDown) {
    paddle.x -= paddle.dx*elapsed_time;
  }
  if (rightDown) {
    paddle.x += paddle.dx*elapsed_time;
  }
  // move the ball around
  if (ball.x < ball.r) {ball.dx = Math.abs(ball.dx);}
  if (ball.x > WIDTH - ball.r) { ball.dx = -Math.abs(ball.dx); }
  if (ball.y < ball.r) { ball.dy = Math.abs(ball.dy); }
  if (ball.y > HEIGHT - ball.r) { ball.dy = -Math.abs(ball.dy); }


  if (paddle.x < 0) {
	paddle.x = 0;
	}
	
	if (paddle.x > WIDTH - paddle.w) {
		paddle.x = WIDTH - paddle.w;
	}

}

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(event) {
//console.log(event);
  if (event.keyCode == 39) { rightDown = true; }
  else if (event.keyCode == 37) {leftDown = true; }
}

//and unset them when the right or left key is released
function onKeyUp(event) {
  if (event.keyCode == 39) rightDown = false;
  else if (event.keyCode == 37) leftDown = false;
}

function onMouseMove(event) {
  paddle.x = event.layerX-paddle.w/2;
}

document.addEventListener("keydown",onKeyDown);
document.addEventListener("keyup",onKeyUp);
canvas.addEventListener("mousemove",onMouseMove);

//where paddle is defined, give the paddle a dx
paddle.dx = 200; // speed of paddle
