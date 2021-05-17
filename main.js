let canvas = document.getElementById('canvas'),
	ctx    = canvas.getContext('2d');

let isDraw = true;
let gravity = 0.8;
let score = 0;


let pipes = [];
pipes.push({
	x: canvas.width,
	y: 0
});

let i;
let distanceBetweenPipes = 150;
let stepsFromLastPipe = 0;
let verticalDistance = 100;

let bird = {
	flip: 30,
	x: 20,
	y: canvas.height - 320,
	img: new Image() 
};
bird.img.src = 'bird.png';

let bg = new Image(),
	fg = new Image(),
	pipeUp = new Image(),
	pipeDown = new Image();

fg.src = 'fg.png';
pipeUp.src = 'pipeUp.png';
pipeDown.src = 'pipeDown.png';
bg.src = 'bg.jpg';

bg.addEventListener('load', render, false);

window.addEventListener('keydown', function(e) {
	if(e.key === ' ') {
		flip(bird, bird.flip);
	}
}, false);


function render() {
	ctx.drawImage(bg, 0, 0);

	bird.y += gravity;
	ctx.drawImage(bird.img, bird.x, bird.y);

	i = pipes.length;
	while(i-- > 0) {
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
		ctx.drawImage(pipeDown,
			pipes[i].x,
			pipes[i].y + pipeUp.height + verticalDistance);

		if(pipes[i].x === bird.x) {
			score++;
		}

		if(bird.x + bird.img.width >= pipes[i].x && bird.x <= pipes[i].x + pipeUp.width
			&& (bird.y <= pipes[i].y + pipeUp.height || bird.y + bird.img.height >= pipes[i].y + pipeUp.height + verticalDistance)
			|| bird.y + bird.img.height >= canvas.height - fg.height) {
			let res = confirm('Finish. Reset game ?');
			if(res) location.reload();
			else isDraw = false;
		}
		if(pipes[i].x < -pipeUp.width) {
			pipes.splice(i, 1);
			continue;
		}

		pipes[i].x--;
	}

	stepsFromLastPipe++;

	if(stepsFromLastPipe > distanceBetweenPipes) {
		stepsFromLastPipe = 0;

		pipes.push(
			{
				x: canvas.width + 10,
				y: rnd(20 - pipeUp.height, 0)
			}
		);
	}

	ctx.drawImage(fg, 0, canvas.height - fg.height);

	ctx.fillStyle = '#333';

	ctx.font = '20px Arial';
	
	ctx.fillText("Счёт: " + score, 20, canvas.height - 50);

	if(isDraw) requestAnimationFrame(render);
}

function flip(bird, k) {
	bird.y -= k;
}

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
