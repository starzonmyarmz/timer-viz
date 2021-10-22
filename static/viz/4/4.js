// Cycles through Harvest timers one at a time by date across the x axis, the
// timer start time on the y axis, and the radius of the circle corresponds to
// the duration of the timer

dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 50

let data, len, beg, end, span, i, x, y, r

// Motion Timing
let t = 10
let nextT = t

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/500/1098242')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  len = Object.keys(data).length
  i = 0

  beg = dayjs(data[0].created_at)
  end = dayjs(data[len - 1].created_at)
  span = beg.diff(end, 'day')
}

function draw() {
  if (millis() > nextT) {
    nextT = millis() + t

    x = map(beg.diff(data[i].created_at, 'day'), 0, span, 0, width)
    y = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)
    r = data[i].hours * scale

    if (i < len - 1) {
      i = i + 1
    } else {
      noLoop()
    }
  }

  noFill()
  stroke(orange)
  ellipse(x, y, r)
}
