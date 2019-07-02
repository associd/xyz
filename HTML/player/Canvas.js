class Canvas {
   constructor(canvas) {
      this.cvs = canvas
      this.ctx = canvas.getContext("2d")
      this.w = this.getW()
      this.h = this.getH()
   }
   getW() {
      return this.cvs.width
   }
   getH() {
      return this.cvs.height
   }
   setW(w) {
      this.cvs.width = w
   }
   setH(h) {
      this.cvs.height = h
   }
   clear() {
      this.ctx.clearRect(0, 0, this.getW(), this.getH())
   }
   fillClear(color) {
      this.ctx.fillStyle = color || "black"
      this.ctx.fillRect(0, 0, this.getW(), this.getH())
   }
}
