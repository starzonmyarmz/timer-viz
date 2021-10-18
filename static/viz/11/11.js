dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 50

let data, l, i, x, y, r
let timers = []

let t = 100
let nextt = t

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/883666/250')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  i = 0
  l = Object.keys(data).length

  for (item in data) {
    let x = width / l * i
    let y = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)
    let r = data[i].hours * scale

    timers.push(new Timer(orange, x, y, r))
    i++
  }
}

let h = -1
let j = 0
let k = 1

function draw() {
  background(cream)

  timers.forEach((t, ii) => {
    t.show()

    if (ii == h) t.shake()
    if (ii == j) t.shake()
    if (ii == k) t.shake()
  })

  if (millis() > nextt) {
    nextt = millis() + t

    if (j < l) {
      h++
      j++
      k++
    } else {
      h = -1
      j = 0
      k = 1
    }

  }
}
