function get_music_path() {
   var l = es('#music-list>li')
   var path = []
   l.forEach((item) => {
      path.push(item.innerHTML)
   })
   return path
}

function bind_event(s, p, audio) {

   canvas.addEventListener('mousemove', function(event) {
      evtX = event.offsetX
      evtY = event.offsetY
      p.addPartical(event.offsetX, event.offsetY)
   })

   es('#music-list>li').forEach((item) => {
      item.addEventListener('click', function() {
         init_music('sound/'+item.innerHTML, audio)
      })
   })

   e('#switch').addEventListener('click', function(event) {
      var sw = event.target
      log(sw)
      if(sw.val == 'stop') {
         audio.audio.stop()
         sw.innerHTML = 'play'
      }else {
         audio.audio.play()
         sw.innerHTML = 'stop'
      }
   })
}

function init_music(path, audio) {
   audio.play(path)
}
