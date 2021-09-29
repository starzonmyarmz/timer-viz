dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 25

let timers, x, y, speedX, speedY, size

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  timers = loadJSON('/api/timers')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  x = 0
  y = height / 2
  speedX = 4
  speedY = 4

  console.log(timers)
}

function draw() {
  background(orange)
  fill(cream)
  stroke(black)
  ellipse(x, y, 50, 50)
  x = x + speedX
  y = y + speedY

  if (x > width) speedX = -4
  if (x < 0) speedX = 4

  if (y > height) speedY = -4
  if (y < 0) speedY = 4
}
