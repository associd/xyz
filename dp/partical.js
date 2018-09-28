function createPartical(x, y) {
   var p = {
      x: y,
      y: y,
   }
   //要什么new 弃了
   p.constructor = createPartical
   p.__proto__ = createPartical.prototype
   p.__proto__.init = function(vx, vy, size) {
      this.vx = vx
      this.vy = vy
      this.w = size
      this.h = size
   }
   return p;
}
