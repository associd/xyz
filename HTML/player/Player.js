class Player {
   constructor() {
      this.connectionElements = []
      this.exist = true
      this.mouse = {
         x: window.innerWidth / 2,
         y: window.innerWidth / 2,
      }
      this.keydown = {}
      this.keydownAction = {}
      this.keyupAction = {}
      this.shiftChar = {
         up: {
            w: "W",
            a: "A",
            s: "S",
            d: "D",
         },
         down: {
            W: "w",
            A: "a",
            S: "s",
            D: "d",
         },
      }
      this.addKeydownAction(["w", "W", "a", "A", "s", "S", "d", "D"], event => {
         event.target.move(event.key)
      })
      window.addEventListener("keydown", event => {
         this.keydown[event.key] = true
         if(event.key == "Shift") {
            Object.keys(this.shiftChar.up).forEach((key) => {
               if(this.keydown[key]) {
                  this.keydown[this.shiftChar.up[key]] = true
                  this.keydown[key] = false
               }
            })
         }
      })
      window.addEventListener("keyup", event => {
         this.keydown[event.key] = false
         if(event.key == "Shift") {
            for (var key in this.shiftChar.down) {
               if(this.keydown[key]) {
                  this.keydown[this.shiftChar.down[key]] = true
                  this.keydown[key] = false
               }
            }
         }
      })
      window.addEventListener("mousemove", event => {
         this.mouse.x = event.clientX
         this.mouse.y = event.clientY
      })
   }
   connect(ele) {
      ele.player = this
      this.connectionElements.push(ele)
      return ele
   }
   disconnect(i) {
      this.connectionElements.splice(i,1)
   }
   update() {
      Object.keys(this.keydown).forEach( key => {
         if(this.keydown[key]) {
            this.connectionElements.forEach((item, index) => {
               if(item.exist) {
                  if(this.keydownAction[key]) {
                     this.keydownAction[key]({
                        key: key,
                        target: item,
                     })
                  }else if(this.keyupAction[key]){
                     this.keyupAction[key](item, key)
                  }
               }else {
                  this.disconnect(index)
               }
            })
            this.scene.viewBox.move(key)
         }
      })
   }
   draw() {
      this.connectionElements.forEach( item => {
         if(item.needLine) {
            this.line(
               {x: 0, y: item.y},
               {x: this.scene.getW(), y: item.y},
            )
            this.line(
               {x: item.x, y: 0},
               {x: item.x, y: this.scene.getH()},
            )
         }
      })

      var mapSize = {
         w: 200,
         h: 200,
      }
      this.rect(0, 0, mapSize.w, mapSize.h, "white")
      this.rect(
         this.scene.viewBox.x / this.scene.w * mapSize.w,
         this.scene.viewBox.y / this.scene.h * mapSize.h,
         this.scene.viewBox.w / this.scene.w * mapSize.w,
         this.scene.viewBox.h / this.scene.h * mapSize.h,
         "white"
      )

      // this.line(
      //    {x:0, y:this.mouse.y},
      //    {x:this.scene.getW(), y:this.mouse.y},
      //    "blue"
      // )
      // this.line(
      //    {x:this.mouse.x, y:0},
      //    {x:this.mouse.x, y:this.scene.getH()},
      //    "blue"
      // )
   }
   line(dot1, dot2, color) {
      this.ctx.beginPath()
      this.ctx.moveTo(dot1.x, dot1.y)
      this.ctx.lineTo(dot2.x, dot2.y)
      this.ctx.strokeStyle = color
      this.ctx.stroke()
      this.ctx.closePath()
   }
   rect(x, y, w, h, color) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
      this.ctx.strokeStyle = color
      this.ctx.strokeRect(x, y, w, h)
      this.ctx.closePath()
   }
   addKeydownAction(keys, callback) {
      if(keys.forEach) {
         keys.forEach(key => {
            this.keydownAction[key] = callback
         })
      }else{
         this.keydownAction[keys] = callback
      }
   }
   addKeyupAction(keys, callback) {
      if(keys.forEach) {
         keys.forEach(key => {
            this.keyupAction[key] = callack
         })
      }else{
         this.keyupAction[keys] = callback
      }
   }
}
