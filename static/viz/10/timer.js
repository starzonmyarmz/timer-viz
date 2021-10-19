class Timer {
  constructor(c, x, y, r) {
    this.c = c
    this.x = x
    this.y = y
    this.r = r
    this.pr = r
  }

  show() {
    stroke(this.c)
    ellipse(this.x, this.y, this.r)
  }

  shake() {
    fill(`${this.c}33`)
    this.x = this.x + random(-2, 2)
    this.y = this.y + random(-2, 2)
  }
}
