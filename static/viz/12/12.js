dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 50

let data, x, y, r
let timers = []

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/883666/15')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  timers.push(new Timer(cream, random(width), random(height), data[0].hours * scale))

  let i = 1
  let protection = 10000

  while (i < Object.keys(data).length) {
    let x = random(width)
    let y = random(height)
    let r = data[i].hours * scale
    let t = new Timer(cream, x, y, r)

    let overlap = false

    for (let j = 0; j < timers.length; j++) {
      let d = dist(timers[j].x, timers[j].y, x, y)

      if (d < timers[j].r + r) {
        overlap = true
        break
      }
    }

    if (!overlap) {
      timers.push(t)
      i++
    }

    protection--

    if (protection == 0) break
  }

  document.querySelector('.t').innerText = timers.length
}

function draw() {
  background(black)

  for (let i = 0; i < timers.length; i++) {
    let xdir = timers[i].xdir
    let ydir = timers[i].ydir

    // Edge collision
    if (timers[i].x < timers[i].r) xdir = 1
    if (timers[i].x > width - timers[i].r) xdir = -1
    if (timers[i].y < timers[i].r) ydir = 1
    if (timers[i].y > height - timers[i].r) ydir = -1

    // Bubble collision
    for (let j = 0; j < timers.length; j++) {
      if (i == j) continue

      let d = dist(timers[j].x, timers[j].y, timers[i].x, timers[i].y)

      if (d < timers[j].r + timers[i].r) {
        xdir = xdir * -1
        ydir = ydir * -1
      }
    }

    timers[i].update(xdir, ydir)
    timers[i].show()
  }
}
