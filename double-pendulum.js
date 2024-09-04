let r1 = 100;
let r2 = 100;
let m1 = 20;
let m2 = 20;
let a1 = Math.PI / 2;
let a2 = Math.PI / 2;
let a1_vel = 0;
let a2_vel = 0;
const g = 1;

const CANVAS_SIZE = 450;

let px2 = -1;
let py2 = -1;

let canvas;
let speedSlider;
// let lenthSlider;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  canvas = createGraphics(CANVAS_SIZE, CANVAS_SIZE);
  speedSlider = createSlider(0, 1, 1, 0.01);
  // Disable for Rod
  // lenthSlider = createSlider(40, 100, 100, 1);

  // lenthSlider.input(() => {
    // r1 = lenthSlider.value();
    // r2 = lenthSlider.value();
  // });
}

function draw() {
  background(0);
  frameRate(60);

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_vel * a2_vel * r2 + a1_vel * a1_vel * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  const a1_acc = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_vel ** 2 * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_vel ** 2 * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  const a2_acc = (num1 * (num2 + num3 + num4)) / den;

  image(canvas, 0, 0);
  stroke(255);
  strokeWeight(2);

  translate(CANVAS_SIZE / 2, 100);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a1 + a2);
  let y2 = y1 + r2 * cos(a1 + a2);

  line(0, 0, x1, y1);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2, m2);

  a1_vel += a1_acc;
  a2_vel += a2_acc;
  a1 += a1_vel;
  a2 += a2_vel;

  a1_vel *= speedSlider.value();
  a2_vel *= speedSlider.value();

  canvas.translate(CANVAS_SIZE / 2, 100);
  canvas.strokeWeight(2);
  canvas.stroke(255);
  if (frameCount > 1) {
    canvas.line(px2, py2, x2, y2);
  }
  canvas.resetMatrix();

  px2 = x2;
  py2 = y2;
}
