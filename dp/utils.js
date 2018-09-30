function webInit() {
   window.log = console.log.bind()
   window.e = sel => document.querySelector(sel)
   window.es = sel => document.querySelectorAll(sel)
   HTMLElement.prototype.attr = function(name, value = null) {
      if(value) {
         this.setAttribute(name, value)
      }else{
         return this.getAttribute(name)
      }
   }
   HTMLElement.prototype.nextElement = function() {
      return this.nextElementSibling
   }
   HTMLElement.prototype.lastElement = function() {
      return this.previousElementSibling
   }
}

/**
 * 为指定的canvas 生成动画
 */
function Animation(canvas) {
   var a = {
      cvs: canvas,
      ctx: canvas.getContext("2d"),
      fps: 60, //fps 只能是整十数
      time: 0,
      element: [],
   }
   a.constructor = Animation
   a.__proto__ = Animation.prototype
   Animation.prototype.addElement = function(ele) {
      this.element.push(ele)
   }
   Animation.prototype.timer = function() {
      //取余对小数也成立 惊了 不会有bug 吧
      if(this.time++ % (60 / this.fps) == 0) {
         this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height)
         //每秒按照一定间隔 在canvas上画出 自个element里带有draw()方法的对象 并且更新他们的数据
         for(var i = this.element.length - 1; i >= 0; i--) {
            var item = this.element[i]
            var index = i
            if(item.exist) {
               item.draw(this.cvs, this.ctx)
               item.update(this.cvs, this.ctx)
            }else {
               this.element.splice(index, 1)
            }
         }
      }
      window.requestAnimationFrame(() => {
         this.timer()
      })
   }
   a.timer()
   return a
}

/**
 * 判定所指定的矩形是否在window里
 */
function isOutsideOfWindow(x, y, w, h) {
    return !( x >= 0
       && (x + w) <= window.innerWidth
       && y >= 0
       && (y + h) <= window.innerHeight
    )
}

/**
 * 使一个dom充满window
 */
function fullWindow(dom) {
   if(dom.nodeName == "CANVAS") {
      dom.width = window.innerWidth
      dom.height = window.innerHeight
   }else {
      dom.width = window.innerWidth + "px"
      dom.height = window.innerHeight + "px"
   }
}

/**
 * 生成随机数
 */
function rand(min, max) {
   return Math.floor(min + Math.random() * (max - min + 1))
}

/**
 * element
 */
function setElement(place, element) {
   place.append(element)
   return element
}
function getParentWidth(element) {
   return element.parentElement.offsetWidth
}
function getParentHeight(element) {
   return element.parentElement.offsetHeight
}
function setElementHeight(element, height) {
   element.style.height = height + "px"
   element.height = height
   return element
}
function setElementWidth(element, width) {
   element.style.width = width + "px"
   element.width = width
   return element
}
function elementFull(element) {
   setElementWidth(element, getParentWidth(element))
   setElementHeight(element, getParentHeight(element))
   return element
}

/**
 * canvs 用类? 重构?
 */
// function createCanvas() {
//    return document.createElement("canvas")
// }
// function getContext(canvas) {
//    return canvas.getContext("2d")
// }
// function fill(canvas, style) {
//    var ctx = getContext(canvas)
//    ctx.fillStyle = style
//    ctx.fill()
// }
// function stroke(canvas, style) {
//    var ctx = getContext(canvas)
//    ctx.strokeStyle = style
//    ctx.stroke()
// }
// function drawPoint(canvas, x, y, r = 2, color = "black") {
//    var ctx = getContext(canvas)
//    ctx.beginPath()
//    ctx.arc(x, y, r, 0, Math.PI * 2)
//    ctx.fillStyle = color
//    ctx.fill()
//    return canvas
// }
// function drawPoints(canvas, points) {
//    points.forEach(function(item) {
//       drawPoint(canvas, item.x, item.y, item.r, item.color)
//    })
//    return canvas
// }
// function curveOfPath(canvas, dots = []) {
//    if(dots.length != 3) {
//       log("the length of dots aren't three in " + (curveOfPath.caller ? curveOfPath.caller : curveOfPath.name))
//    }else {
//       var ctx = getContext(canvas)
//       ctx.bezierCurveTo(dots[0].x, dots[0].y, dots[1].x, dots[1].y, dots[2].x, dots[2].y)
//    }
//    return canvas
// }
// function ctxTrans(canvas, x, y) {
//    getContext(canvas).translate(x,y)
// }
// function ctxRotate(canvas, angle) {
//    getContext(canvas).rotate(angle)
// }
// function ctxSave(canvas) {
//    getContext(canvas).save()
// }
// function ctxRestore(canvas) {
//    getContext(canvas).restore()
// }
// function ctxClosePath(canvas) {
//    getContext(canvas).closePath()
// }
