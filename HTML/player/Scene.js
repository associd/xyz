class Scene extends Canvas {
   constructor(canvas) {
      super(canvas)
      this.setup()
      this.update()
      this.w = 8000
      this.h = 8000
      this.viewBox = {
         x: 0,
         y: 0,
         w: window.innerWidth,
         h: window.innerHeight,
         move: key => {
            switch (key) {
               case "W":
                  this.viewBox.y -= 10
               case "w":
                  this.viewBox.y -= 10
                  if(this.viewBox.y <= 0) {
                     this.viewBox.y = 0
                  }
                  break;
               case "S":
                  this.viewBox.y += 10
               case "s":
                  this.viewBox.y += 10
                  if(this.viewBox.y > this.h - this.viewBox.h) {
                     this.viewBox.y = this.h - this.viewBox.h
                  }
                  break;
               case "D":
                  this.viewBox.x += 10
               case "d":
                  this.viewBox.x += 10
                  if(this.viewBox.x > this.w - this.viewBox.w) {
                     this.viewBox.x = this.w - this.viewBox.w
                  }
                  break;
               case "A":
                  this.viewBox.x -= 10
               case "a":
                  this.viewBox.x -= 10
                  if(this.viewBox.x < 0) {
                     this.viewBox.x = 0
                  }
                  break;
               default:

            }
         }
      }
      window.addEventListener("resize", event => {
         this.setSize(window.innerWidth, window.innerHeight)
         this.viewBox.w = window.innerWidth
         this.viewBox.h = window.innerHeight
         this.updateCenter()
      })
   }
   setup() {
      this.ele = []
      this.setSize(window.innerWidth, window.innerHeight)
      this.center = {}
      this.updateCenter()
   }
   add(ele) {
      ele.cvs = this.cvs
      ele.ctx = this.ctx
      ele.scene = this
      this.ele.push(ele)
   }
   remove(i) {
      this.ele.splice(i,1)
   }
   update() {
      this.fillClear()
      this.ele.forEach((item,index) => {
         item.update()
         item.draw()
         if(!item.exist) {
            this.remove(index)
         }
      })
      requestAnimationFrame(() => {
         this.update()
      })
   }
   setSize(width, height) {
      this.setW(width)
      this.setH(height)
   }
   updateCenter() {
      this.center.x = this.getW() / 2
      this.center.y = this.getH() / 2
   }
}
