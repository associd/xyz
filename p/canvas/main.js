evtX = 0
evtY = 0
fmax = 100

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillRect(0, 0, canvas.width, canvas.height)

window.onload = function() {

   var path = get_music_path()
   var p = new ParticalSystem()
   audio = new Sound()//实例化音频
   specturm = new FrequencySpt()//实例化频谱
   audio.connect(specturm)//连接音频和频谱


   //场景抽象
   var s = {
      arr: [],
      update: function() {
         this.arr.forEach(function(item) {
            item.update()
         })
      },
      draw: function() {
         this.arr.forEach(function(item) {
            item.draw()
         })
      }
   }
   s.arr.push(p)
   s.arr.push(audio)
   bind_event(s, p, audio)
   animate(s)
}
