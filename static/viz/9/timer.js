class Timer {
  constructor(c, x, y, r) {
    this.c = c
    this.x = x
    this.y = y
    this.r = r
    this.f = `${this.c}00`
  }

  show() {
    fill(this.f)
    stroke(this.c)
    ellipse(this.x, this.y, this.r)
  }

  shake(c) {
    this.f = c
    this.x = this.x + random(-5, 5)
    this.y = this.y + random(-5, 5)
  }
}
