dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 15

let data, x, y, r
let timers = []

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
      console.log("protected!")
      break
    }
  }

  document.querySelector('.t').innerText = timers.length
}

function draw() {
  background(black)

  timers.forEach((t) => {
    t.show()
  })
}
