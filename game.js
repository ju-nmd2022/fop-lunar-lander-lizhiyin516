
WIDTH = 400;
HEIGHT = 400;
let plane;//飞行器
let size =30 //飞行器大小
let button, buttonTip; //开始和停止按钮
let play = false; //开始游戏
let speed = 25; //速度
let g=0.1 //自由落体加速度
let backgroundImage, planeImg;
let bg1_y = 0;
let bg2_y = 0;
let timer_bg = 0;
let bg_scroll_speed = 1;



let new_enemy_timer = 0;

let dead_enemy_num = 0;

function preload() {
	// 加载图片
	backgroundImage = loadImage('assets/bg.jpg');
	planeImg = loadImage('assets/airplane.png');
}

function setup() {
	createCanvas(WIDTH, HEIGHT);
	fill(255, 0, 0);

	plane = new Plane(WIDTH / 2, 50); //初始位置
	button = createButton("Play");
	button.style("font-size", "30px");
	button.style("color", "green");
	button.position(WIDTH / 2 - 20, HEIGHT / 2);
	button.mousePressed(start);
}

function draw() {
	background(220);
	scroll_bg();
	plane.show();

	// 游戏开始
	if (play) {

		if (plane.isFalling) {
			plane.update();
		}
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		plane.jump(speed);
	}
	if (keyCode === DOWN_ARROW) {
		plane.jump(-speed);
	}
	if (keyCode === ENTER) {
		changeBall()
	}
}

function start() {

	play = true
	button.hide()
	changeBall()

}

function draw_bg() {

	image(backgroundImage, 0, bg1_y, WIDTH, HEIGHT);
	image(backgroundImage, 0, bg2_y, WIDTH, HEIGHT);
	if (play) {
		bg1_y += bg_scroll_speed;
		bg2_y = bg1_y - HEIGHT;
		if (bg1_y == HEIGHT) {
			bg1_y = 0;
		}
	}
}

function scroll_bg() {

	timer_bg += deltaTime / 1000;
	if (timer_bg > 0.01) {
		draw_bg();
		timer_bg = 0;
	}


}


function changeBall() {
	plane.isFalling = !plane.isFalling;
}

function replay() {
	plane = new Plane(WIDTH / 2, 50); //初始位置
	play = true
	button.hide()
	buttonTip.hide()
	changeBall()
}

function showReplay() {
	play = false
	buttonTip = createButton("You landed the spacecraft successfully!");
	buttonTip.style("font-size", "20px");
	buttonTip.style("color", "orange");
	buttonTip.position(20, HEIGHT / 2 - 100)
	button = createButton("RePlay");
	button.style("font-size", "30px");
	button.style("color", "red");
	button.position(WIDTH / 2 - 50, HEIGHT / 2);
	button.mousePressed(replay);

}


class Plane {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, g); 
		this.size = 30;
		this.isFalling = false;
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		if (this.pos.y > height - this.size / 2) {
			this.vel.y *= -0.1; 
			this.pos.y = height - this.size / 2;
			if (this.vel.y > -2) {
				showReplay()
			}

		}
	}

	show() {
		image(planeImg, this.pos.x, this.pos.y, this.size, this.size);
	}

	//键盘控制
	jump(height) {
		if (play) {
			this.pos.y -= height * (1 + Math.random());
		}


	}
}
