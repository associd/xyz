export function CreatePartical(x, y) {
   var p = {
      x: y,
      y: y,
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

   }
   return p;
}
