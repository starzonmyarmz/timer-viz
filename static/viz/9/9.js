dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 60

let data, l, i, x, y, r
let timers = []

let t = 50
let nextt = t

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
  l = Object.keys(data).length

  for (item in data) {
    let x = width / l * i
    let y = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)
    let r = data[i].hours * scale

    timers.push(new Timer(orange, x, y, r))
    i++
  }
}

let g = -2
let h = -1
let j = 0
let k = 1
let m = 2

function draw() {
  background(cream)

  timers.forEach((t, ii) => {
    t.show()

    if (ii == g) t.shake(`${orange}00`)
    if (ii == h) t.shake(`${orange}22`)
    if (ii == j) t.shake(`${orange}44`)
    if (ii == k) t.shake(`${orange}22`)
    if (ii == m) t.shake(`${orange}00`)
  })

  if (millis() > nextt) {
    nextt = millis() + t

    if (j < l) {
      g++
      h++
      j++
      k++
      m++
    } else {
      g = -2
      h = -1
      j = 0
      k = 1
      m = 2
    }

  }
}
