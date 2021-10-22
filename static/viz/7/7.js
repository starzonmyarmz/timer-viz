dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const deets = document.querySelector('.deets')
const scl = 150

let data, timers, i = 0
let curX, nextX, incX
let curY, nextY, incY
let curR, nextR, incR
let speed = 5

// Motion Timing
let t = 25
let delay = t

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

// Returns project/task/hours
const projectDeets = (timer) => {
  return `${timer.project.name} // ${timer.task.name} // ${timer.hours} hours`
}

function preload() {
  data = loadJSON('/api/timers/25/883666')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  timers = Object.keys(data).length

  curX = (width / timers) * i
  nextX = (width / timers) * (i + 1)
  diffX = abs(floor(curX - nextX))

  curY = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)
  nextY = map(timeAsInt(data[i + 1].started_time), 0, 2400, 0, height)
  diffY = abs(floor(curY - nextY))

  curR = data[i].hours * scl
  nextR = data[i + 1].hours * scl
  diffR = abs(floor(curR - nextR))

  deets.innerHTML = projectDeets(data[i])
}

function draw() {
  if (millis() > delay) {
    delay = millis() + t

    diffX = abs(floor(curX - nextX))
    diffY = abs(floor(curY - nextY))
    diffR = abs(floor(curR - nextR))

    if (diffX > speed) {
      if (curX - nextX < speed) incX = speed
      if (curX - nextX > speed) incX = -speed
      curX = curX + incX
    }

    if (diffY > speed) {
      if (curY - nextY < speed) incY = speed
      if (curY - nextY > speed) incY = -speed
      curY = curY + incY
    }

    if (diffR > speed) {
      if (curR - nextR < speed) incR = speed
      if (curR - nextR > speed) incR = -speed
      curR = curR + incR
    }

    if (diffX <= speed && diffY <= speed && diffR <= speed) {
      if (i < timers - 1) {
        i = i + 1
      } else {
        i = 0
      }

      // console.log(`diffX: ${diffX}, diffY: ${diffY}, diffR: ${diffR}`)

      curX = nextX
      nextX = (width / timers) * (i + 1)

      curY = nextY
      nextY = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)

      curR = nextR
      nextR = data[i].hours * scl

      deets.innerHTML = projectDeets(data[i])
    }
  }

  background(cream)
  fill(orange)
  noStroke()
  ellipse(curX, curY, curR)
}
