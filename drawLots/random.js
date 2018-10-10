window.log = console.log.bind()
window.e = sel => document.querySelector(sel)
window.es = sel => document.querySelectorAll(sel)
window.rand = function(min, max) {
   return Math.floor(min + Math.random() * (max - min + 1))
}

window.onload = function() {
   var startBtn = e("#start")
   startBtn.addEventListener("click", () => {
      randoming()
   })
}

function randoming() {
   var text = e("#rand-text")
   var count = 100
   while (count--) {
      setTimeout(function() {
         text.innerHTML = rand(0, 100)
      }, (100 - count) * 20)
   }
}
