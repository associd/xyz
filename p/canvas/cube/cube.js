class Cube {
   constructor() {
      this.setup()
   }

   setup() {
      var cube = this
      this.dot = {
         A1: new Dot(-100, 100, 100),
         B1: new Dot(100, 100, 100),
         C1: new Dot(100, -100, 100),
         D1: new Dot(-100, -100, 100),

         A2: new Dot(-100, 100, -100),
         B2: new Dot(100, 100, -100),
         C2: new Dot(100, -100, -100),
         D2: new Dot(-100, -100, -100),

      }

      this.face = {
         A1_B1_C1_D1: (x = cube.dot.A1.x,
         y = cube.dot.A1.y,
         w = Math.abs(cube.dot.A1.x - cube.dot.D1.x),
         h = Math.abs(cube.dot.A1.y - cube.dot.D1.y)) => ctx.fillRect(x, y, w, h)
      }

      this.color = {
         A1_B1_C1_D1: 'red'
      }
   }

   update() {

   }

   draw() {
      var face = this.face
      var _this = this
      for(var key in face) {
         ctx.fillStyle = _this.color[key]
         log(face[key]())
      }
   }
}
