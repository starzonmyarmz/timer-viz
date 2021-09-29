// Plots Harvest timers evenly across the x axis, the timer start time on the y
// axis, and the radius of the circle corresponds to the duration of the timer

dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 50

let data
let timers = []

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

class Timer {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.current_r = 0
  }

  show() {
    fill(cream)
    stroke(black)
    ellipse(this.x, this.y, this.current_r)
  }

  scale() {
    if (this.current_r > this.r) return
    this.current_r = this.current_r + 2
  }
}

function preload() {
  data = loadJSON('/api/timers')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  let i = 0

  for (item in data) {
    let x = width / Object.keys(data).length * i
    let y = map(timeAsInt(data[item].started_time), 0, 2400, 0, height)
    let r = data[item].hours * scale

    timers.push(new Timer(x, y, r))

    i = i + 1
  }

  console.log(timers)
}

function draw() {
  background(orange)

  timers.forEach((timer) => {
    timer.show()
    timer.scale()
  })
}
