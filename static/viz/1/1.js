const timers = []

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
  background('orange')

  getTimers().then((timers) => {
    timers.forEach((item, index) => {
      ellipse(
        windowWidth / 50 * index,
        windowHeight / 2,
        item.hours * 50,
        item.hours * 50
      )
    })
  })

}
