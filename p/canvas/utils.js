var e = sel => document.querySelector(sel)
var es = sel => document.querySelectorAll(sel)
var log = console.log.bind(console)
var fps = 60

var rand = function(min, max) {
   return Math.floor(min + Math.random() * (max + 1 - min))
}
var Collision = function(objA, objB) {

   var L1 = objA.x
   var T1 = objA.y
   var R1 = objA.x + objA.w
   var B1 = objA.y + objA.h

   var L2 = objB.x
   var T2 = objB.y
   var R2 = objB.x + objB.w
   var B2 = objB.y + objB.h

   return !(L1 > R2 || T1 > B2 || R1 < L2 || B1 < T2)
}
var ImageFromPath = function(path) {
   var img = new Image()
   img.src = path
   return img
}

canvas = e('#canvas')
ctx = canvas.getContext('2d')

var img = new Image()
var imgW = 0
var imgH = 0
img.src = 'img/66952939_p0.jpg'
img.onload = function() {
   imgW = this.width
   imgH = this.height
}
