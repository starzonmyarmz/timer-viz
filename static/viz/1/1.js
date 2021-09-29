dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 25

const timers = []

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

async function getTimers() {
  const response = await fetch('/api/timers')
  const me = await response.json()
  return me
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noLoop()
}

function draw() {
  background(orange)
  getTimers().then((timers) => {
    timers.forEach((item, index) => {
      fill(cream)
      stroke(black)
      ellipse(
        width / timers.length * index,
        map(timeAsInt(item.started_time), 0, 2400, 0, height),
        item.hours * scale,
        item.hours * scale
      )
    })
  })
}
