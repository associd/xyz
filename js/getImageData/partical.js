class Partical{
   constructor(path){
      super(path)
      this.setup()
   }

   setup(){
      this.age = 1
      this.old = 60 * 20
      this.exist = true
      this.w = e('.ptc-w').value
      this.h = e('.ptc-h').value
      this.r = 10

      this.rotateSpeed = 10
   }

   init(x, y, vx, vy, angle) {
      this.x = x
      this.y = y
      this.vx = vx
      this.vy = vy
      this.angle = angle
   }

   update() {
      this.vy += Number(e('.ptc-a').value) * 0.1
      this.x += this.vx
      this.y += this.vy

      //标记死亡
      if(
         this.x >= this.canvas.width ||
         this.x + this.w <= 0 ||
         this.y >= this.canvas.height ||
         this.y + this.h <= 0 ||
         this.age >= this.old
      ){
         this.exist = false
      }

      //慢慢变老
      if(this.age < this.old) {
         var _this = this
         this.age++
      }

      //自我陶醉
      this.angle = (this.angle + this.rotateSpeed) % 360
   }

   draw() {
      var w = this.w * (1 - this.age / this.old)
      var h = this.h * (1 - this.age / this.old)
      ctx.beginPath()
      ctx.save()

      ctx.globalAlpha = 0.3
      ctx.fillStyle = 'skyblue'
      ctx.arc(this.x, this.y, this.w * (1 - this.age / this.old), 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      ctx.closePath()
   }

}

class ParticalSystem {
   constructor(canvas){
      this.canvas = canvas
      this.setup()
   }

   setup(){
      this.x = this.canvas.width / 2
      this.y = this.canvas.height / 2

      this.createProgress = 10
      this.createIndex = 0

      this.numberOfPartical = 2
      this.particals = []

      this.time = fps * 2
      this.actime = 0
   }

   update() {
      //更新粒子
      var _this = this
      this.particals.forEach(function(item, index) {
         if(item.exist) {
            item.update()
         }else {
            _this.particals.splice(index, 1)
         }
      })

      //随机生成粒子
      if(++this.actime >= this.time) {
         this.actime = 0
         this.addPartical(rand(0, this.canvas.width), rand(0, this.canvas.height))
      }
   }

   draw() {
      for (var i of this.particals) {
         i.draw()
      }
   }

   addPartical(x, y) {
      if(this.createIndex < this.createProgress) {
         this.createIndex ++
      }else {
         this.createIndex = 0
         this.x = x
         this.y = y
         var num = 1
         while(num <= this.numberOfPartical) {
            var p = new Partical("")
            // var color = [rand(10, 255), rand(10, 255), rand(10, 255)]
            var angle = rand(0, 360)
            var vx = 0.1 * rand(-10, 10)
            var vy = 0.1 * rand(-10, 10)
            var offX = rand(-20, 20)
            var offY = rand(-20, 20)
            p.init(this.x + offX, this.y + offY, vx, vy, angle)
            this.particals.push(p)
            num++
         }
      }
   }
}
