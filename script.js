let tickSound = document.querySelector("audio");

let secondsRadius, minutesRadius, hoursRadius;
let prevSecond;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	stroke(255);

	radius = min(width, height) / 3;
	secondsRadius = radius * 0.73;
	minutesRadius = radius * 0.7;
	hoursRadius = radius * 0.5;
	ticksRadius = radius * 0.72;
	numsRadius = radius * 0.65;
	clockDiameter = radius * 1.6;

	handTail = 20;
	secondCircle = 5;

	cx = width / 2;
	cy = height / 2;
}

function draw() {
	// Play tick sound
	if (prevSecond != second()) {
		tickSound.play();
		prevSecond = second();
	}

	background(230);

	// Draw digital time
	let hr = hour() % 12;
	let digiTime = `${hr == 0 ? 12 : hr}:${('0' + minute()).slice(-2)} ${hour() > 12 ? 'PM' : 'AM'} `;
	textSize(32);
	fill(20);
	stroke(230);
	textFont('Orbitron');
	textAlign(CENTER, CENTER);
	text(digiTime, width / 2, 100);

	// Draw the clock background
	noStroke();
	fill(0);
	ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
	fill(240);
	ellipse(cx, cy, clockDiameter, clockDiameter);

	stroke(0);
	// Draw the minute ticks
	drawTicks(1, 60);
	// Draw the 5 minute ticks
	drawTicks(4, 12);

	// Draw numbers
	textSize(20);
	fill(0);
	strokeWeight(1);
	for (let n = 1; n < 13; n++) {
		let angle = radians((n * 30) - 90);
		let x = cx + cos(angle) * numsRadius;
		let y = cy + sin(angle) * numsRadius;
		text(n, x, y);
	}

	// Angles for sin() and cos() start at 3 o'clock;
	// subtract HALF_PI to make them start at the top
	let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
	let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
	let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

	// Draw the hands of the clock
	strokeWeight(4);
	line(cx - cos(h) * handTail, cy - sin(h) * handTail, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
	strokeWeight(4);
	line(cx - cos(m) * handTail, cy - sin(m) * handTail, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
	stroke(255, 0, 0);
	strokeWeight(2);
	line(cx - cos(s) * (handTail + 5), cy - sin(s) * (handTail + 5), cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);

	// Draw that middle circle thingy idk
	fill(255, 0, 0);
	ellipse(cx, cy, secondCircle, secondCircle);

};

function drawTicks(weight, number) {
	strokeWeight(weight);
	beginShape(LINES);
	for (let a = 0; a < 360; a += 360 / number) {
		let angle = radians(a);
		let x = cx + cos(angle) * ticksRadius;
		let y = cy + sin(angle) * ticksRadius;
		vertex(x, y);
		x = cx + cos(angle) * (ticksRadius + 5);
		y = cy + sin(angle) * (ticksRadius + 5);
		vertex(x, y);
	}
	endShape();
}
