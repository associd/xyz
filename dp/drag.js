/**
 * drag允许你在 目标的一部分超出屏幕外时 做一些事情 通过他的一个函数参数
 */
function drag(outsideCallBack) {
   var drags = es(".drag")
   var downToElement = {
      ele: null,
   }
   var mouse = {
      x: 0,
      y: 0,
      down: false,
      downPoint: {
         x: 0,
         y: 0,
      },
   }
   document.addEventListener("mousedown", function(event) {
      if(event.target.classList.contains("drag")) {
         var ele = event.target
         downToElement.ele = ele
         //downPoint 是鼠标移动之前 在ele里按住鼠标左键之后 鼠标的位置
         //在按住鼠标左键移动时鼠标的位置 相对downPoint 的偏移量 会作为 ele的css 的 left 和 top 赋值
         //为什么不用event.offsetX,event.offsetY ? 因为mouse的坐标系和ele的坐标系不同
         mouse.downPoint.x = mouse.x - (ele.offsetLeft ? ele.offsetLeft : 0)
         mouse.downPoint.y = mouse.y - (ele.offsetTop ? ele.offsetTop : 0)
      }
      mouse.down = true
   })
   document.addEventListener("mouseup", function(event) {
      if(downToElement.ele) {
         downToElement.ele = null
      }
      mouse.down = false
   })
   document.addEventListener("mousemove", function(event) {
      mouse.x = event.clientX
      mouse.y = event.clientY
      if(downToElement.ele && mouse.down) {
         var ele = downToElement.ele
         ele.style.left = mouse.x - mouse.downPoint.x + "px"
         ele.style.top = mouse.y - mouse.downPoint.y + "px"
         var eleX = mouse.x - event.offsetX
         var eleY = mouse.y - event.offsetY
         if(isOutsideOfWindow(eleX, eleY, ele.offsetWidth, ele.offsetHeight)) {
            outsideCallBack(ele, eleX, eleY)
         }
      }
   })
}
