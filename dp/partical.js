function CreatePartical(x, y, cvs) {
   var p = {
      x: x,
      y: y,
      color: "skyblue",
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      w: 30,
      h: 100,
      time: 0,
      exist: true,
      shape: "arc",
      canvas: cvs,
      context: cvs.getContext("2d"),
   }
   p.init = function(size = 30, vx = 0, vy = 0, ax = 0, ay = 0) {
      p.vx = vx
      p.vy = vy
      p.ax = ax
      p.ay = ay
      p.w = size
      p.h = size
   }

   p.constructor = CreatePartical
   p.__proto__ = CreatePartical.prototype

   if(p.__proto__.__DEFINE__ == undefined) {
      p.__proto__.__DEFINE__ = true
      p.__proto__.draw = function() {
         this.context.beginPath();
         this.context.fillStyle = this.color;
         this[this.shape](this.context);
      }

      p.__proto__.arc = function() {
         this.context.arc(this.x, this.y, this.w, 0, Math.PI * 2);
         this.context.fill();
      }

      p.__proto__.rect = function() {
         this.context.fillRect(this.x, this.y, this.w, this.h)
      }

      p.__proto__.text = function(text) {
         this.
         this.context.fillText(this.x, this.y, this.w, this.h)
      }

      p.__proto__.update = function() {
         if(this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
            this.outWindow = true;
         }
         if(this.time++ >= 60 * 2) {
            this.exist = false
         }
         this.vx += this.ax
         this.vy += this.ay
         this.x += this.vx
         this.y += this.vy
      }
   }
   p.draw()
   return p;
}
