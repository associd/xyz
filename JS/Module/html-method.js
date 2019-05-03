export function htmlMethod () {
   HTMLElement.prototype.full = function (
      element = function(){
         return {
            width: window.innerWidth,
            height: window.innerHeight
         }
      }
   ) {
      var el = element();
      if( this.nodeName == "CANVAS" ) {
         this.width = el.width;
         this.height = el.height;
         console.log(this.nodeNmae)
      }else{
         this.style.width = el.width + "px";
         this.style.height = el.height + "px";
      }
      return this;
   }
   HTMLElement.prototype.fullWithEvent = function (
      element = function(){
         return {
            width: window.innerWidth,
            height: window.innerHeight
         }
      }
   ) {
      this.full(element)
      window.addEventListener( "resize", ( ) => {
         this.full(element)
      } )
   }
}
