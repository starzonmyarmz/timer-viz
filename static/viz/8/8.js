dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 50

let data, i, x, y, r
let timers = []

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/250/883666')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  i = 0

  for (item in data) {
    let x = width / Object.keys(data).length * i
    let y = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)
    let r = data[i].hours * scale

    timers.push(new Timer(orange, x, y, r))
    i++
  }
}

function draw() {
  background(cream)

  timers.forEach((t) => {
    t.show()
    t.shake()
    t.hover(mouseX, mouseY)
  })
}
