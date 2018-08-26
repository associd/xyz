class FrequencySpt {
   constructor() {
      this.setup()
   }
   setup() {
      this.start = false
      this.m = 2
      this.w = 10
      this.c = 4
      this.xw = canvas.width / 256
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
      if(this.start) {
         this.main_spe()//绘制主要频谱
         // this.bot_spe()//绘制下方频谱
         // this.top_spe()//绘制上方频谱
      }
   }

   main_spe() {
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

      //绘制白色圆形边框
      ctx.beginPath()
      ctx.fillStyle = 'rgba(0,0,0,0.8)'
      ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()

      //绘制粉色大圆饼
      // ctx.beginPath()
      // // ctx.fillStyle = '#ff93db'
      // ctx.fillStyle = 'rgba(256, 11, 11, 0.8)'
      // ctx.arc(canvas.width / 2, canvas.height / 2, inner_r, 0, Math.PI * 2)
      // ctx.fill()
      // ctx.closePath()

      //频域
      // this.num = 0 总长c = this.bar_num * this.w c层级 = 4
      // var bc = this.bar_num * this.w
      var c = this.bar_num * this.w / this.c

      // var angle = 360 / (this.bar_num / 1) //利用 bar数量 定义 偏转角度
      var angle = 360 * (this.w / c) //利用 bar数量 定义 偏转角度
      this.main_style_2(angle, avg)
   }

   bot_spe() {
      for (var i = 128; i < 512; i++) {
         ctx.beginPath()
         ctx.save()

         ctx.fillStyle = 'skyblue'
         ctx.strokeStyle = 'black'
         ctx.globalAlpha = 0.5
         ctx.fillRect(this.xw * this.num, canvas.height -this.Farr[i], this.xw, this.Farr[i])
         // ctx.strokeRect(xw * num, canvas.height -FdataArray[i], xw, FdataArray[i])

         ctx.restore()
         ctx.closePath()
         this.num = (this.num + 1) % 384
      }
   }

   top_spe() {
      for (var i = 512; i < 768; i++) {
            ctx.beginPath()
            ctx.save()

            ctx.fillStyle = 'skyblue'
            ctx.strokeStyle = 'black'
            ctx.globalAlpha = 0.5
            ctx.fillRect(this.xw * this.num, 0, this.xw, this.Farr[i])
            // ctx.strokeRect(xw * num, 0, xw, FdataArray[i])

            ctx.restore()
            ctx.closePath()
            this.num = (this.num + 1) % 256
      }
   }

   main_style_1(angle, avg) {
      for (var i = 0; i < this.bar_num; i += 1) {
         ctx.beginPath()

         ctx.save()
         ctx.translate(canvas.width / 2, canvas.height / 2)
         ctx.rotate(angle * this.num * Math.PI / 180)
         // ctx.globalAlpha = (this.Farr[i] / 200)

         ctx.fillStyle = `rgb(${ 35 + parseInt((this.Farr[i] / fmax) * 100)}, 235, 171)`
         // ctx.fillStyle = '#ffc1e1'
         ctx.fillRect(-this.w / 2, -avg -this.Farr[i], this.w, this.Farr[i])
         ctx.fillStyle = 'skyblue'

         //圆形状态下的 蓝色方块
         // if(i % 8 == 0) {
            if(this.maxh[i] == undefined) {
               this.maxh[i] = -avg -this.Farr[i]
            }
            if(this.maxh[i] < -avg -this.Farr[i]) {
               ctx.fillRect(-this.w / 2, this.maxh[i] += 0.5, this.w, 2)
            }else{
               this.maxh[i] = -avg -this.Farr[i]
            }
         // }

         // //普通状态下的 蓝色方块
         //    if(maxh[i] == undefined) {
         //       maxh[i] = (canvas.height / 2) -FdataArray[i]
         //    }
         //    if(maxh[i] < (canvas.height / 2) -FdataArray[i]) {
         //       ctx.fillRect(xw * num, maxh[i] += 0.5, xw, 2)
         //    }else{
         //       maxh[i] = (canvas.height / 2) -FdataArray[i]
         //    }

         ctx.restore()

         ctx.closePath()
         this.num = (this.num + 1) % this.bar_num
      }
   }
   main_style_2(angle, avg) {

      ctx.beginPath()
      for (var i = 0; i < this.bar_num; i += 1) {

         var step = this.Farr.length / this.frqcy_num
         var index = step * ((i % this.frqcy_num) + 1)
         var l = (this.Farr[index] / 250) * this.bar_size
         if(l){
         // var l = (this.Farr[(i % this.frqcy_num)] / 100) * this.bar_size
         // var l = (this.Farr[i] / 100) * 50

         ctx.save()
         ctx.translate(canvas.width / 2, canvas.height / 2)
         var slope = angle * this.num
         ctx.rotate(slope * Math.PI / 180)

         var prcent = this.Farr[index] / 200
         var op = parseInt( prcent * 200)
         var tier = Math.floor(slope / 360)
         var tiercolor = 135 * tier / this.c
         var tier_origin = 300 * (1 - (tier / this.c))
         var w = this.w * (1 - (tier / this.c))
         ctx.fillStyle = `rgba(${ 135 - tiercolor}, ${ 235 - tiercolor}, ${ 171 - tiercolor}, ${0.8})`
         // ctx.fillRect(-this.w / 2, -avg, this.w, l)
         // ctx.fillRect(-this.w / 2, -300, this.w, l)
         ctx.fillRect(-this.w / 2, -l - tier_origin, w, l)

         ctx.restore()
         }
         this.num = (this.num + 1) % this.bar_num
      }

      ctx.closePath()
   }
}
