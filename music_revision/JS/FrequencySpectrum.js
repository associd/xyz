class FrequencySpectrum {
   constructor(canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")
      this.Farr = []
      this.Tarr = []
      this.style = {
         rect: {
            property: (Farr) => {
               var grd = this.refresh()
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
                  o.grd = this.refresh()
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
            },
            control: null,
         },
         circle: {
            property: () => {
               var o = {
                  ctx: this.ctx,
                  colors: [
                     "rgba(52,237,237,0.3)",
                     "rgba(123,210,248,0.3)",
                     "rgba(135,225,255,0.3)",
                     "rgba(110,255,200,0.3)",
                     "rgba(128,255,144,0.3)",
                  ],
                  start : false,
                  bm : 200,
                  w : 12,
                  c : 5,
                  h : 250,

                  pieW: 0,

                  slice: 1,
                  center_margin : 376,
                  xw : this.canvas.width / 256,
                  num  : 0,
                  // maxh : {},
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

               for(var i = 0; i < o.c; i++) {
                  var r = o.center_margin * (1 - i / o.c) - (o.pieW / 2)
                  if(r > 0) {
                     o.ctx.beginPath()
                     o.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, r, 0, 2 * Math.PI)
                     o.ctx.lineWidth = o.pieW
                     o.ctx.strokeStyle = o.colors[i]
                     o.ctx.stroke()
                  }
               }


               //频域

               // var c = o.bar_num * o.w / o.c
               // var angle = 360 * (o.w / c) //利用 bar数量 定义 偏转角度
               //化简得
               var angle = 360 * (o.c / o.bar_num)

               o.ctx.beginPath()
               for (var i = 0; i < o.bar_num; i += 1) {

                  var step = o.Farr.length / o.frqcy_num
                  var index = step * ((i % o.frqcy_num) + 1)
                  var l = (o.Farr[index] / o.h) * o.bar_size
                  if(l){
                     // var l = (o.Farr[(i % o.frqcy_num)] / 100) * o.bar_size
                     // var l = (o.Farr[i] / 100) * 50

                     o.ctx.save()
                     o.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
                     var slope = angle * o.num
                     o.ctx.rotate(slope * Math.PI / 180)

                     var tier_origin;
                     var prcent = o.Farr[index] / o.bm
                     var op = parseInt( prcent * o.bm)
                     var tier = Math.floor(slope / 360)
                     var tiercolor = 135 * tier / o.c
                     if(o.slice) {
                        tier_origin = o.center_margin * (1 - (tier / o.c))
                     }else{
                        tier_origin = o.center_margin
                     }
                     var w = o.w * (1 - (tier / o.c))
                     o.ctx.fillStyle = o.colors[tier]
                     o.ctx.fillRect(-o.w / 2, -l - tier_origin, w, l)
                     o.ctx.restore()
                  }
                  o.num = (o.num + 1) % o.bar_num
               }

               o.ctx.closePath()
            },
            control: (o) => {
               return [
                  {
                     des: "柱子宽度",
                     dom: {propertyName: 'w', type: 'number', value: o.w,},
                  },
                  {
                     des: "层数",
                     dom: {propertyName: 'c', type: 'number', value: o.c,},
                  },
                  {
                     des: "柱子高度",
                     dom: {propertyName: 'bar_size', type: 'number', value: o.bar_size,},
                  },
                  {
                     des: "旋转速度",
                     dom: {propertyName: 'r_speed', type: 'number', value: o.r_speed,},
                  },
                  {
                     des: "中心间距间距",
                     dom: {propertyName: 'center_margin', type: 'number', value: o.center_margin,},
                  },
                  {
                     des: "是否分层",
                     dom: {propertyName: 'slice', type:'number', value: o.slice,},
                  },
                  {
                     des: "饼大小",
                     dom: {propertyName: "pieW", type: "number", value: o.pieW,},
                  },
               ]
            }
         },
         peak:{
            property: (Farr, canvas) => {
               var o = {}
               o.color = "rgba(0,255,255,0.2)";
               o.Farr = this.Farr;
               o.startF = 0;
               o.endF = 32;
               o.fat = 10;
               o.cvs = canvas;
               o.ctx = canvas.getContext("2d");
               o.centerDistance = 50;
               o.frequencyHeight = 100;
               o.maxFrequency = 255;
               return o
            },
            draw: (o) => {
               o.center = {
                  x: o.cvs.width / 2,
                  y: o.cvs.height / 2,
               }
               // var piece = o.Farr.slice(o.startF, o.endF);
               // console.log(o.Farr)

               /**      |
                *  -----+------->x
                *       |
                *       |
                *       v y
                */
               o.ctx.fillStyle = o.color;
               o.ctx.save();
               o.ctx.beginPath();
               o.ctx.translate(o.center.x, o.center.y);
               o.ctx.rotate(Math.PI / 2)

               o.ctx.beginPath();
               pathOfCake(o.Farr.slice(300, 601), 300)
               o.ctx.fill()
               o.ctx.closePath()

               o.ctx.beginPath();
               pathOfCake(getPiece(o.Farr.slice(80, 141)), 180)
               o.ctx.fill()
               o.ctx.closePath()

               o.ctx.beginPath();
               pathOfCake(getPiece(o.Farr.slice(40, 81)), 100)
               o.ctx.fillStyle = "white"
               o.ctx.fill()
               o.ctx.fillStyle = o.color
               o.ctx.closePath()

               o.ctx.restore();

               function getPiece(tarr) {
                  var piece = []
                  tarr.forEach(function(item, index) {
                     piece.push(item)
                     piece.unshift(item)
                  })
                  return piece
               }

               function pathOfCake(piece, centerDistance = o.centerDistance, fat = o.fat, freH = o.frequencyHeight) {
                  var offsetRadian = 360 / piece.length / 180 * Math.PI;
                  var origin = {
                     x: 0,
                     y: 0,
                  }
                  var node = {
                     x: 0,
                     y: 0,
                  }
                  for(let i = 0, j = piece.length - 1; i < piece.length; i++,j = (j+1)%piece.length) {
                     var lastFqc = piece[j] / o.maxFrequency * freH;
                     var fqc = piece[i] / o.maxFrequency * freH;
                     var lastPH = centerDistance + lastFqc;
                     var curPH = centerDistance + fqc;
                     var rotateRadian_1 = i * offsetRadian;
                     var rotateRadian_2 = j * offsetRadian;
                     var halfOfThePI = Math.PI / 2
                     var end,start,cp2,cp1;
                     if(i == 0) {
                        start = {
                           x : lastPH * Math.cos(rotateRadian_2),
                           y : lastPH * Math.sin(rotateRadian_2),
                        }
                        origin = start
                        node = start
                        o.ctx.moveTo(node.x, node.y)
                     }
                     if(i == piece.length - 1){
                        end = origin
                     }else {
                        end = {
                           x : curPH * Math.cos(rotateRadian_1),
                           y : curPH * Math.sin(rotateRadian_1),
                        }
                     }
                     cp2 = {
                        x: node.x - fat * Math.sin(rotateRadian_2),
                        y: node.y + fat * Math.cos(rotateRadian_2),
                     }
                     cp1 = {
                        x: end.x + fat * Math.sin(rotateRadian_1),
                        y: end.y - fat * Math.cos(rotateRadian_1),
                     }
                     o.ctx.bezierCurveTo(cp2.x, cp2.y, cp1.x, cp1.y, end.x, end.y);
                     node = end
                  }
               }
            },
            // control: (o) => {
            //    return [
            //       {
            //          des: "最小音高",
            //          dom: {propertyName: "startF", type: "number", value: o.startF},
            //       },
            //       {
            //          des: "最大音高",
            //          dom: {propertyName: "endF", type: "number", value: o.endF},
            //       },
            //       {
            //          des: "山峰的扁平化",
            //          dom: {propertyName: "fat", type: "number", value: o.fat},
            //       },
            //       {
            //          des: "面积",
            //          dom: {propertyName: "frequencyHeight", type: "number", value: o.frequencyHeight},
            //       },
            //    ]
            // }
         }
      }
      this.setup_style()
   }
   /**
    *  input data [{des: des, dom: {attributeName: value,}}, {}, {}]
    *
    */
   fromPropertyBindMenu(obj, data) {
      var menu = e("#frequency-setting>.f-menu")
      if(!menu){
         return 0;
      }
      menu.innerHTML = "";

      //output "<li>des<input attributeName: value><li>"
      data.forEach((item, index) => {

         var des = item.des;
         var str = `<li>${des}<input `;
         //期望的input "<input attributeName='value'>"
         str += Object.keys(item.dom).reduce((total, cur, index, arr) => {
            if(index > 1) {
               return `${total} ${cur}="${item.dom[cur]}"`
            }else{
               return `${total}="${item.dom[total]}" ${cur}="${item.dom[cur]}"`
            }
         }) + "></li>";
         menu.innerHTML += str;
      })
      // console.log(menu.innerHTML)

      menu.addEventListener("input", (event) => {
         var name = event.target.getAttribute("propertyName");
         obj[name] = Number(event.target.value)
      })
   }
   refresh() {
      //重设style 暂时不想封装 就晾在这儿吧
      var grd = this.ctx.createLinearGradient(this.canvas.width / 2, this.canvas.height * 0.1, this.canvas.width / 2, this.canvas.height);
      grd.addColorStop(0,"rgba(255,198,61,1)")
      grd.addColorStop(0.30,"rgba(168,255,0,0.9)")
      grd.addColorStop(0.45, "rgba(56,255,227,0.8)")
      grd.addColorStop(0.6, "rgba(56,255,227,0.4)")
      grd.addColorStop(1,"rgba(56,255,227,0.2)")
      return grd;
   }
   setup_style(style = "peak") {
      this.activeStyle = this.style[style]
      this.activeStyleObject = this.activeStyle["property"](this.Farr, this.canvas)
      if(this.activeStyle.control) {
         this.fromPropertyBindMenu(this.activeStyleObject, this.activeStyle.control(this.activeStyleObject))
      }
   }
   update() {
      this.num += this.r_speed
   }
   draw() {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
      this.activeStyle["draw"](this.activeStyleObject)
   }
}
