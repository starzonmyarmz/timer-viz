dayjs.extend(window.dayjs_plugin_customParseFormat)

const Engine = Matter.Engine
const Bodies = Matter.Bodies
const Composite = Matter.Composite

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')
const scale = 25

let engine
let data, x, y, r
let timers = []
let boundaries = []

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}

function preload() {
  data = loadJSON('/api/timers/300')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  engine = Engine.create()

  let i = 0
  let l = Object.keys(data).length

  for (item in data) {
    let x = width / l * i
    let y = map(timeAsInt(data[i].started_time), 0, 2400, 0, height)
    let r = data[i].hours * scale

    timers.push(new Timer(random(width), -random(height) * 3, r))
    i++
  }

  boundaries.push(new Boundary(-50 , height / 2, 100, height))
  boundaries.push(new Boundary(width + 50, height / 2, 100, height))
  boundaries.push(new Boundary(width / 2, height + 50, width, 100))
}

function draw() {
  background(black)
  Engine.update(engine)
  boundaries.forEach(b => b.draw())
  timers.forEach(t => t.draw())
}
