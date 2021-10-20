class Timer {
  constructor(c, x, y, r) {
    this.c = c
    this.x = x
    this.y = y
    this.r = r
  }

  show() {
    noFill()
    stroke(this.c)
    ellipse(this.x, this.y, this.r)
  }
}
