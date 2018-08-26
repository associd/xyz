var animate = function(obj) {
   ctx.drawImage(img, 0, 0, imgW, imgH, 0, 0, canvas.width, canvas.height)
   obj.update()
   obj.draw()
   setTimeout(function() {
         animate(obj)
   }, 1000 / fps)
}
