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
