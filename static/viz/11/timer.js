class Timer {
  constructor(color, x, y, r) {
    this.color = color
    this.x = x
    this.y = y
    this.r = r
  }

  show() {
    noFill()
    stroke(this.color)
    ellipse(this.x, this.y, this.r)
  }

  update(x, y) {
    this.x = x
    this.y = y
  }
}
