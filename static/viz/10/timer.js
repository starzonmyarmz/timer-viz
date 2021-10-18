class Timer {
  constructor(c, x, y, r) {
    this.c = c
    this.x = x
    this.y = y
    this.r = r
    this.pr = r
    this.s = false
  }

  show() {
    // noFill()
    fill(`${this.c}${this.s ? '33' : '00'}`)
    stroke(this.c)
    ellipse(this.x, this.y, this.r * 2)
  }

  shake() {
    if (this.s) {
      this.x = this.x + random(-2, 2)
      this.y = this.y + random(-2, 2)
    }
  }

  hover(x, y) {
    if (dist(x, y, this.x, this.y) < this.r) {
      this.s = true
    } else {
      this.s = false
    }
  }
}
