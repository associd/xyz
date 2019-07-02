class Circle {
   constructor(des) {
      this.exist = true
      Object.keys(des).forEach(key => {
         this[key] = des[key]
      })
   }
   update() {
      this.isOutOf(this.scene.viewBox)
   }
   draw() {
      this.arc(this.x, this.y, this.r, this.color)
   }
   arc(x, y, r, color) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, Math.PI * 2)
      this.ctx.fillStyle = color
      this.ctx.fill()
   }
   move(key) {
      switch (key) {
         case "W":
            this.y -= this.speed.level2.x
            break;
         case "w":
            this.y -= this.speed.level1.y
            break;
         case "A":
            this.x -= this.speed.level2.x
            break;
         case "a":
            this.x -= this.speed.level1.x
            break;
         case "S":
            this.y += this.speed.level2.y
            break;
         case "s":
            this.y += this.speed.level1.y
            break;
         case "D":
            this.x += this.speed.level2.x
            break;
         case "d":
            this.x += this.speed.level1.x
            break;
         default:
      }
   }
   isOutOf(box, action = "over"){
      if(this.x < 0 + this.r) {
         if(action == "over") {
            this.x = box.w
         }
         if(action == "impede") {
            this.x = 0 + this.r
         }
      }
      if(this.x > box.w) {
         if(action == "over") {
            this.x = 0
         }
         if(action == "impede") {
            this.x = box.w
         }
      }
      if(this.y < 0 + this.r) {
         if(action == "over") {
            this.y = box.h
         }
         if(action == "impede") {
            this.y = 0 + this.r
         }
      }
      if(this.y > box.h) {
         if(action == "over") {
            this.y = 0
         }
         if(action == "impede") {
            this.y = box.h
         }
      }
   }
}
