class DrawImage {
  constructor(src) {
    var _this = this
    var img = new Image()
    img.src = src
    img.onload = function() {
      _this.imgW = this.width
      _this.imgH = this.height
    }
    this.img = img
  }

  draw() {
     ctx.drawImage(this.img, this.x, this.y)
  }
}
