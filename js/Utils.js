function utils() {
   window.log = console.log.bind(console);
   window.e = sel => document.querySelector(sel);
   window.es = sel => document.querySelectorAll(sel)
   window.rand = function(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1))
   }
   window.min = function(a, b) {
      return a-b>0 ? a = b : a
   }

   /**
    *    [{},{},{}......]
    *    {obj: xxx, attr: xxxx, value: xxxxx}
    */
   window.give = function(...agr) {
      agr.forEach(function(item, index) {
         item.obj[item.attr] = item.value;
      })
   }
   window.full = function(dom, w = "width", h = "height") {
      let change_1 = {
         obj:dom,
         attr:w,
         value:window.innerWidth,
      }
      let change_2 = {
         obj:dom,
         attr:h,
         value:window.innerHeight,
      }
      domSetup();
      window.addEventListener("resize", event => {
         change_1.value = window.innerWidth
         change_2.value = window.innerHeight
         domSetup();
      })
      function domSetup(){
         give(change_1, change_2);
         dom.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
         }
      }
   }

   HTMLElement.prototype.attr = function(name, value = null) {
      if(value) {
         this.setAttribute(name, value)
      }else{
         return this.getAttribute(name)
      }
   }
   HTMLElement.prototype.next = function() {
      return this.nextElementSibling
   }
   HTMLElement.prototype.last = function() {
      return this.previousElementSibling
   }
}
