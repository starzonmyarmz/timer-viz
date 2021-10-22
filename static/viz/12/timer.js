class Timer {
  constructor(color, x, y, r) {
    this.color = color
    this.x = x
    this.y = y
    this.r = r
    this.s = 1
    this.xdir = 1
    this.ydir = 1
  }

  show() {
    noFill()
    stroke(this.color)
    ellipse(this.x, this.y, this.r * 2)
  }

  update(xdir, ydir) {
    this.xdir = xdir
    this.ydir = ydir
    this.x += this.s * this.xdir
    this.y += this.s * this.ydir
  }
}
