class Timer {
  constructor(x, y, r) {
    this.r = r
    this.options = {
      restitution: 0.5
    }
    this.body = Bodies.circle(x, y, r, this.options)
    Composite.add(engine.world, this.body)
  }

  draw() {
    fill(orange)
    stroke(black)
    const position = this.body.position

    push()
    ellipseMode(CENTER)
    ellipse(position.x, position.y, this.r * 2)
    pop()
  }
}
