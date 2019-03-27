var e = sel => document.querySelector(sel);
var es = sel => document.querySelectorAll(sel);
var log = console.log.bind(console);
HTMLElement.prototype.attr = function() {
   log(this)
}
HTMLElement.prototype.parent = function() {
   return this.parentElement;
}
HTMLElement.prototype.last = function() {
   return this.previousElementSibling;
}
HTMLElement.prototype.next = function() {
   return this.nextElementSibling;
}
HTMLElement.prototype.nextElements = function(elements = []) {
   if(this.next()) {
      this.next().nextElements(elements).push(this.next())
      return elements;
   }else{
      return elements;
   }
}
HTMLElement.prototype.lastElements = function(elements = []) {
   if(this.last()) {
      this.last().lastElements(elements).push(this.last())
      return elements;
   }else{
      return elements;
   }
}
HTMLElement.prototype.siblings = function() {
   return this.lastElements().concat(this.nextElements())
}
HTMLElement.prototype.setBGColor = function(color) {
   this.style.backgroundColor = color
   return this
}
HTMLElement.prototype.fullParent = function() {
   this.width = this.parent().offsetWidth
   this.height = this.parent().offsetHeight
   return this
}


!function __main() {
   window.onload = function() {
      init();
      // debug();
   }
}()

function init() {
   window.sound = new Sound();
   window.frequency = new FrequencySpectrum(e("#spectrum"));
   window.sound.connect(window.frequency)
   window.frequency.setup_style()
   setDom();
   bindEvent();
   getMusic(e(".music-list"));
}

function setDom() {
   e("#app").setTransform = function(event) {
      var rx = (event.clientX / window.innerWidth * 2 - 1) * 8 + 1
      var ry = (event.clientY / window.innerHeight * 2 - 1) * 8 + 1
      this.style.transform = `perspective(1920px) rotateX(${-ry}deg) rotateY(${rx}deg)`
   }
   e("#spectrum").fullParent()
}

function bindEvent() {
   es(".active-music, .music-list .arrow").forEach(function(item) {
      item.addEventListener("click", function(event) {
         if(event.target.classList.contains("active")) {
            fgNormal(event.target)
         }else{
            fgFull(event.target)
         }
         if(event.target.classList.contains("left")) {
            event.target.classList.add("right")
            event.target.classList.remove("left")
         }else{
            event.target.classList.add("left")
            event.target.classList.remove("right")
         }
      })
      e("#spectrum").fullParent()
   })
   window.addEventListener("mousemove", function(event) {
      e("#app").setTransform(event)
   })
   window.addEventListener("resize", function(event) {
      e("#spectrum").fullParent()
   })
   window.addEventListener("click", function(event) {
      var dom = event.target
      if(dom.classList.contains("music")) {
         var src = dom.dataset.url
         window.sound.play(src)
      }
   })
}

function getMusic(list) {

}

function fgNormal(dom) {
   if(dom.parent() && !dom.parent().classList.contains("f-box")) {
      fgNormal(dom.parent())
   }
   dom.siblings().forEach(item => {
      fgRemove(item, "hide")
   })
   fgRemove(dom, "active")
}
function fgFull(dom) {
   if(dom.parent() && !dom.parent().classList.contains("f-box")) {
      fgFull(dom.parent())
   }
   dom.siblings().forEach(item => {
      fgAdd(item, "hide")
   })
   fgAdd(dom, "active");
}
function fgAdd(dom, className) {
   dom.classList.add(className)
}
function fgRemove(dom, className) {
   dom.classList.remove(className)
}


/**
 *  debug
 */
function debug() {
   es("body *").forEach(function(item) {
      item.setBGColor(`rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.2)`)
   })
}

/**
 *  math
 */
function rand(min, max){
   return min + Math.floor(Math.random() * (max - min + 1))
}
