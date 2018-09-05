class FrequencySpt {
   constructor(canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")
      this.style = {
         rect: {
            property: () => {
               var grd = this.ctx.createLinearGradient(this.canvas.width / 2, this.canvas.height * 0.1, this.canvas.width / 2, this.canvas.height);
               grd.addColorStop(0,"rgba(255,198,61,0.7)")
               grd.addColorStop(0.30,"rgba(168,255,0,0.7)")
               grd.addColorStop(0.45, "rgba(56,255,227,0.7)")
               grd.addColorStop(0.46, "rgba(56,255,227,0.7)")
               grd.addColorStop(0.6, "rgba(255,198,61,0.7)")
               grd.addColorStop(1,"rgba(255,0,0,1)")

               var count = 100
               var o = {
                  bar_height: this.canvas.height * 0.45,
                  bar_num: count,
                  frqcy_min: 64,
                  frqcy_max: 1024,
                  w: this.canvas.width / count,
                  grd: grd,
               }
               window.addEventListener("resize", () => {
                  o.w = this.canvas.width / o.bar_num
               })
               return o
            },
            draw: (o) => {
               this.ctx.beginPath()
               var cw = o.w / 2
               var canvas_ch = this.canvas.height / 2
               var t1 = o.bar_height / 250
               var min = o.frqcy_min
               var max = o.frqcy_max
               for (var i = 0; i < o.bar_num; i += 1) {
                  var index = min + (i % (max - min))
                  var l = this.Farr[index] * t1
                  var w = cw * this.Farr[index] / 100
                  if(l){
                     this.ctx.save()
                     this.ctx.translate(o.w * i + cw, canvas_ch)
                     this.ctx.moveTo(-w, 0)
                     this.ctx.lineTo(0, -l)
                     this.ctx.lineTo(w, 0)
                     this.ctx.lineTo(0, l)
                     this.ctx.lineTo(-w, 0)
                     this.ctx.closePath()
                     this.ctx.restore()
                  }
               }
               this.ctx.fillStyle = o.grd
               this.ctx.globalAlpha = 0.5
               this.ctx.fill()
            }
         },
      }
      this.setup()
   }
   setup() {
      this.active = this.style["rect"]
      this.bar = this.active["property"]()
   }
   mobile_setup() {
      this.start = false
      this.m = 2
      this.w = 1
      this.c = 4
      this.xw = this.canvas.width / 256
      this.num  = 0
      this.maxh = {}
      this.Farr = []
      this.rotateArr = []
      this.active = []

      //bar
      this.index = 0
      this.bar_size = 100
      this.bar_num = 1024
      this.frqcy_num = 1024
      this.r_speed = 0
   }
   update() {
      this.num += this.r_speed
   }
   draw() {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
      this.active["draw"](this.bar)
   }
   circle() {
      var sum = 0

      //旋转速度
      this.num += this.r_speed

      //圆饼大小
      for (var i = 1; i < 128; i++) {
         sum += this.Farr[i]
      }

      var avg = sum / 128
      var inner_r = avg
      // if(avg <= 100) {
      //    avg = 100
      // }

      //设置粉色大圆饼的半径

      if(inner_r > 10) {
         inner_r -= 10
      }

      //绘制圆形边框
      this.ctx.beginPath()
      this.ctx.fillStyle = 'rgba(0,0,0,0.8)'
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 300, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()

      //频域

      // var c = this.bar_num * this.w / this.c
      // var angle = 360 * (this.w / c) //利用 bar数量 定义 偏转角度
      //化简得
      var angle = 360 * (this.c / this.bar_num)

      this.ctx.beginPath()
      for (var i = 0; i < this.bar_num; i += 1) {

         var step = this.Farr.length / this.frqcy_num
         var index = step * ((i % this.frqcy_num) + 1)
         var l = (this.Farr[index] / 250) * this.bar_size
         if(l){
            // var l = (this.Farr[(i % this.frqcy_num)] / 100) * this.bar_size
            // var l = (this.Farr[i] / 100) * 50

            this.ctx.save()
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
            var slope = angle * this.num
            this.ctx.rotate(slope * Math.PI / 180)

            var prcent = this.Farr[index] / 200
            var op = parseInt( prcent * 200)
            var tier = Math.floor(slope / 360)
            var tiercolor = 135 * tier / this.c
            var tier_origin = 300 * (1 - (tier / this.c))
            var w = this.w * (1 - (tier / this.c))
            this.ctx.fillStyle = `rgba(${ 135 - tiercolor}, ${ 235 - tiercolor}, ${ 171 - tiercolor}, ${0.8})`
            this.ctx.fillRect(-this.w / 2, -l - tier_origin, w, l)

            this.ctx.restore()
         }
         this.num = (this.num + 1) % this.bar_num
      }

      this.ctx.closePath()
   }
}
