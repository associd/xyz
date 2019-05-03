window.onload = function() {
   main();
}
function main () {
   const ball = e(".ball").fullWithEvent();
   const container = e(".ball .container");

   /**
    * 插入卡片
    */
   var numberOfCard = 72
   var angle = 360 / numberOfCard;
   for( var i = 0; i < numberOfCard; i++ ) {
      var div = document.createElement("div")
      div.className = "card"
      div.style.transform = `rotateY(${angle * i}deg) translateZ(400px)`;
      container.append(div)
   }

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
