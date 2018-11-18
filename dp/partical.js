function CreatePartical(x, y) {
   var p = {
      x: x,
      y: y,
      color: "black",
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      w: 100,
      h: 100,
      time: 0,
      exist: true,
   }

   p.constructor = CreatePartical
   p.__proto__ = CreatePartical.prototype

   if(p.__proto__.__DEFINE__ == undefined) {
      p.__proto__.__DEFINE__ = true
      p.__proto__.init = function(vx, vy, ax, ay, size) {
         this.vx = vx
         this.vy = vy
         this.ax = ax
         this.ay = ay
         this.w = size
         this.h = size
      }
      p.__proto__.draw = function(canvas, context) {
         context.beginPath()
         context.fillStyle = this.color
         context.fillRect(this.x, this.y, this.w, this.h)
      }
      p.__proto__.update = function(canvas, context) {
         // if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
         //    this.exist = false
         //    // log("in")
         // }
         if(this.time++ >= 60 * 2) {
            this.exist = false
         }
         this.vx += this.ax
         this.vy += this.ay
         this.x += this.vx
         this.y += this.vy
      }
   }

   return p;
}
