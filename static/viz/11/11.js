dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 5

let data, x, y, r
let timers = []

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/500/883666')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  timers.push(new Timer(cream, random(width), random(height), data[0].hours * scale))

  let i = 1
  let p = 10000

  while (i < Object.keys(data).length) {
    let x = random(width)
    let y = random(height)
    let r = data[i].hours * scale
    let t = new Timer(cream, x, y, r)

    let o = false

    for (let j = 0; j < timers.length; j++) {
      let d = dist(timers[j].x, timers[j].y, x, y)

      if (d < timers[j].r + r) {
        o = true
        break
      }
    }

    if (!o) {
      timers.push(t)
      i++
    }

    p--

    if (p == 0) {
      break
    }
  }

  document.querySelector('.t').innerText = timers.length
}

function draw() {
  background(black)

  for (let i = 0; i < timers.length; i++) {
    timers[i].show()

    let x = timers[i].x + random(-5, 5)
    let y = timers[i].y + random(-5, 5)
    let overlap = false

    for (let j = 0; j < timers.length; j++) {
      if (i == j) continue

      let d = dist(x, y, timers[j].x, timers[j].y)

      if (d < timers[i].r + timers[j].r) {
        overlap = true
        break
      }
    }

    if (!overlap) {
      timers[i].update(x, y)
    }
  }



}
