window.onload = function() {
   main();
}
function main () {
   const ball = e(".ball").fullWithEvent();
   const container = e(".ball .container");

   /**
    * 插入卡片
    */
   var numberOfcardPerWeft = [
      0,
      5,
      8,
      10,
      10,
      10,
      10,
      10,
      8,
      5,
      0,
   ]
   var numberOfWeft = 5
   var angleX = 0;
   var angleY = 90 / numberOfWeft
   var cards = []
   var direction = -1;
   for( var j = 0; j <= numberOfWeft * 2 + 1; j++ ) {
      direction *= -1;
      angleX = 360 / numberOfcardPerWeft[j];
      for( var i = 0; i < numberOfcardPerWeft[j]; i++ ) {
         var div = document.createElement("div")
         div.className = "card"
         div.style.transform = `rotateY(${angleX * i}deg) rotateX(${(j - 5) * angleY}deg) translateZ(400px)`;
         container.append(div)
         cards.push({
            element: div,
            transform: {
               rotateY: angleX * i,
               rotateX: (j - 5) * angleY,
               translateZ: "400px",
            },
            direction: direction,
            update: function() {
               this.transform.rotateY += this.direction
               this.element.style.transform = `rotateY(${this.transform.rotateY}deg) rotateX(${this.transform.rotateX}deg) translateZ(400px)`;
            },
         })
      }
   }
   setInterval(function() {
      cards.forEach(function(item) {
         item.update();
      })
   }, 1000 / 60)
}
function bindEvent() {
   /**
   * 绑定鼠标移动事件
   */
   window.addEventListener("mousemove", event => {
      var halfWindowWidth = window.innerWidth / 2;
      var halfWindowHeight= window.innerHeight / 2;
      var angle = 180
      var centerPointerOffsetX = (event.clientX - halfWindowWidth) / halfWindowWidth * angle
      var centerPointerOffsetY = (halfWindowHeight - event.clientY) / halfWindowHeight * angle
      container.style.transform = `rotateY(${centerPointerOffsetX}deg) rotateX(${centerPointerOffsetY}deg)`
   })
}
