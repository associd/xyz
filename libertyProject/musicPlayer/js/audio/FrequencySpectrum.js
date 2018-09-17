class FrequencySpt {
   constructor(canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")
      this.Farr = []
      this.Tarr = []
      this.style = {
         rect: {
            property: () => {
               var grd = this.ctx.createLinearGradient(this.canvas.width / 2, this.canvas.height * 0.1, this.canvas.width / 2, this.canvas.height);
               grd.addColorStop(0,"rgba(255,198,61,1)")
               grd.addColorStop(0.30,"rgba(168,255,0,0.9)")
               grd.addColorStop(0.45, "rgba(56,255,227,0.8)")
               grd.addColorStop(0.6, "rgba(56,255,227,0.4)")
               grd.addColorStop(1,"rgba(56,255,227,0.2)")

               var count = 120
               var o = {
                  bar_height: 120 * 0.8,
                  bar_num: count,
                  frqcy_min: 0,
                  frqcy_max: 128,
                  w: this.canvas.width / count,
                  grd: grd,
               }
               window.addEventListener("resize", () => {
                  o.w = this.canvas.width / o.bar_num
                  this.refresh
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
                     this.ctx.translate(o.w * i + cw, this.canvas.height)
                     this.ctx.moveTo(-w, 0)
                     this.ctx.lineTo(0, -l)
                     this.ctx.lineTo(w, 0)
                     this.ctx.lineTo(0, l)
                     this.ctx.lineTo(-w, 0)
                     this.ctx.closePath()
                     this.ctx.restore()
                  }
               }
               this.ctx.strokeStyle = o.grd
               this.ctx.globalAlpha = 0.5
               this.ctx.stroke()
            }
         },
         circle: {
            property: () => {
               var o = {
                  ctx: this.ctx,
                  start : false,
                  m : 2,
                  w : 2,
                  c : 3,
                  xw : this.canvas.width / 256,
                  num  : 0,
                  maxh : {},
                  Farr : this.Farr,
                  Tarr : this.Tarr,
                  rotateArr : [],
                  active : [],

                  //bar
                  index : 0,
                  bar_size : 100,
                  bar_num : 1024,
                  frqcy_num : 1024,
                  r_speed : 0,
               }
               return o
            },
            draw: (o) => {
               var sum = 0
               //旋转速度
               o.num += o.r_speed

               //圆饼大小
               for (var i = 1; i < 128; i++) {
                  sum += o.Farr[i]
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
               o.ctx.beginPath()
               o.ctx.fillStyle = 'rgba(0,0,0,0.8)'
               o.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 300, 0, Math.PI * 2)
               o.ctx.fill()
               o.ctx.closePath()

               //频域

               // var c = o.bar_num * o.w / o.c
               // var angle = 360 * (o.w / c) //利用 bar数量 定义 偏转角度
               //化简得
               var angle = 360 * (o.c / o.bar_num)

               o.ctx.beginPath()
               for (var i = 0; i < o.bar_num; i += 1) {

                  var step = o.Farr.length / o.frqcy_num
                  var index = step * ((i % o.frqcy_num) + 1)
                  var l = (o.Farr[index] / 250) * o.bar_size
                  if(l){
                     // var l = (o.Farr[(i % o.frqcy_num)] / 100) * o.bar_size
                     // var l = (o.Farr[i] / 100) * 50

                     o.ctx.save()
                     o.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
                     var slope = angle * o.num
                     o.ctx.rotate(slope * Math.PI / 180)

                     var prcent = o.Farr[index] / 200
                     var op = parseInt( prcent * 200)
                     var tier = Math.floor(slope / 360)
                     var tiercolor = 135 * tier / o.c
                     var tier_origin = 300 * (1 - (tier / o.c))
                     var w = o.w * (1 - (tier / o.c))
                     o.ctx.fillStyle = `rgba(${ 135 - tiercolor}, ${ 235 - tiercolor}, ${ 171 - tiercolor}, ${0.8})`
                     o.ctx.fillRect(-o.w / 2, -l - tier_origin, w, l)
                     o.ctx.restore()
                  }
                  o.num = (o.num + 1) % o.bar_num
               }

               o.ctx.closePath()
            },
         },
      }
      this.setup_style()
   }
   refresh() {
      //重设style 暂时不想封装 就晾在这儿吧
      var grd = this.ctx.createLinearGradient(this.canvas.width / 2, this.canvas.height * 0.1, this.canvas.width / 2, this.canvas.height);
      grd.addColorStop(0,"rgba(255,198,61,1)")
      grd.addColorStop(0.30,"rgba(168,255,0,0.9)")
      grd.addColorStop(0.45, "rgba(56,255,227,0.8)")
      grd.addColorStop(0.6, "rgba(56,255,227,0.4)")
      grd.addColorStop(1,"rgba(56,255,227,0.2)")
      this.bar.grd = grd
   }
   setup_style(style = "rect") {
      this.active = this.style[style]
      this.bar = this.active["property"]()
   }
   update() {
      this.num += this.r_speed
   }
   draw() {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
      this.active["draw"](this.bar)
   }
}
