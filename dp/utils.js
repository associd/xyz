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
