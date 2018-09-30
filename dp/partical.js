function CreatePartical(x, y) {
   var p = {
      x: x,
      y: y,
      color: "black",
      vx: 0,
      vy: 0,
      w: 1,
      h: 1,
      exist: true,
   }
   //要什么new 弃了
   p.constructor = CreatePartical
   p.__proto__ = CreatePartical.prototype
   p.__proto__.init = function(vx, vy, size) {
      this.vx = vx
      this.vy = vy
      this.w = size
      this.h = size
   }
   p.__proto__.draw = function(canvas, context) {
      context.beginPath()
      context.fillStyle = this.color
      context.fillRect(this.x, this.y, this.w, this.h)
   }
   p.__proto__.update = function(canvas, context) {
      if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
         this.exist = false
         // log("in")
      }
      this.x += this.vx
      this.y += this.vy
   }

   return p;
}
