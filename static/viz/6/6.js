// Cycles through Harvest timers one at a time evenly across the x axis, the
// timer start time on the y axis, and the radius of the circle corresponds to
// the duration of the timer

dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scl = 200

let data, inc, len, i, x, y, r

// Motion Timing
let t = 10
let nextT = t

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/1098242/25')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  len = Object.keys(data).length
  inc = width / len
  i = 0
}

function draw() {
  if (millis() > nextT) {
    nextT = millis() + t

    r = data[i].hours * scl

    if (i < len - 1) {
      i = i + 1
    } else {
      noLoop()
    }
  }

  noFill()
  stroke(orange)
  ellipse(width / 2, height / 2, r)
}
