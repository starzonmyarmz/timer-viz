dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scl = 200

let data, len, i, s = 5

// Motion Timing
let t = 1
let nextT = t

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  // Karla
  data = loadJSON('/api/timers/883666/25')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  len = Object.keys(data).length
  i = 0

  curR = floor(data[i].hours * scl)
  nextR = floor(data[i + 1].hours * scl)
  diffR = abs(curR - nextR)
}

let curR, nextR, inc

function draw() {
  if (millis() > nextT) {
    nextT = millis() + t

    diffR = abs(curR - nextR)

    if (diffR > s) {
      if (curR - nextR < 0) inc = s
      if (curR - nextR > 0) inc = -s
      curR = curR + inc
    } else {
      if (i < len - 1) {
        i = i + 1
        curR = floor(nextR)
        nextR = floor(data[i].hours * scl)
      } else {
        i = 0
        curR = floor(nextR)
        nextR = floor(data[i].hours * scl)
      }
    }
  }

  background(cream)
  // noFill()
  fill(orange)
  // strokeWeight(1)
  // stroke(black)
  noStroke()
  ellipse(width / 2, height / 2, curR)
}
