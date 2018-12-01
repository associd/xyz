function CreatePartical(cvs, x = 0, y = 0, text) {
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

      text: text,
      font: {
         size: "30",
         family: "Consolas",
         color: "black",
      }
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

      p.__proto__.arc = function() {
         this.context.arc(this.x, this.y, this.w, 0, Math.PI * 2);
         this.context.fill();
         return this;
      }

      p.__proto__.rect = function() {
         this.context.fillRect(this.x, this.y, this.w, this.h)
         return this;
      }

      p.__proto__.line = function(ox = this.x, oy = this.y, dx = this.w, dy = this.h, color = "black") {
         this.context.beginPath();
         this.context.strokeStyle = color;
         this.context.lineWidth = 2;
         this.context.moveTo(ox, oy);
         this.context.lineTo(dx, dy);
         this.context.stroke();
         return this;
      }

      p.__proto__.drawText = function() {
         this.context.textBaseline = "middle";
         this.context.textAlign = "center";
         this.context.font = this.font.size + "px " + this.font.family;
         this.context.fillStyle = this.font.color;
         this.context.fillText(this.text, this.x, this.y);
         return this;
      }

      p.__proto__.setShape = function(shape) {
         this.shape = shape;
         return this;
      }

      p.__proto__.setPos = function(x, y) {
         this.x = x;
         this.y = y;
         return this;
      }

      p.__proto__.draw = function() {
         this.context.beginPath();
         this.context.fillStyle = this.color;
         this[this.shape](this.context);
         this.drawText();
         return this;
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
         return this;
      }
   }
   return p;
}
