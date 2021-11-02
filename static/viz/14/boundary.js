class Boundary {
  constructor(x, y, w, h) {
    this.w = w
    this.h = h
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true })
    Composite.add(engine.world, this.body)
  }

  draw() {
    noFill()
    noStroke()
    const position = this.body.position

    push()
    rectMode(CENTER)
    rect(position.x, position.y, this.w, this.h)
    pop()
  }
}
