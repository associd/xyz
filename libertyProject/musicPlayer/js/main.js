!function() {
   web_init()
   window.onload = function() {
      set_main_height()
      set_music_list_event()
      set_audio_event()
      set_audio_canvas()
      set_audio_frequency()
      audio_init()
   }
   window.addEventListener("resize", function() {
      set_main_height()
      set_audio_canvas()
   })
}()

function web_init() {
   window.log = console.log.bind()
   window.e = sel => document.querySelector(sel)
   window.es = sel => document.querySelectorAll(sel)
   window.sound = new Sound()

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

function set_main_height() {
   var header = e("header")
   var main = e("main")
   var footer = e("footer")
   var ml = e(".music-list")
   var mh = window.innerHeight - header.offsetHeight - footer.offsetHeight
   main.style.height = mh + "px"
   ml.style.height = mh + "px"
}

/**
 * audio
 */
function audio_init() {
   var current_time = e(".current")
   var duration = e(".end")
   var cur_time = e(".progress .cur")
   var cur_bar = e(".progress .curprogress")
   sound.connect_currentTime = function() {
      var s = Math.floor(this.audio.currentTime % 60)
      if(s < 10) {
         s = "0"+s
      }
      current_time.innerHTML = Math.floor(this.audio.currentTime / 60) + ":" + s
      var cur = this.audio.currentTime / this.audio.duration * 100 + "%"
      cur_bar.style.width = cur
      cur_time.style.left = cur
   }
   sound.onplaying(function() {
      duration.innerHTML = Math.floor(this.duration / 60) + ":" + Math.floor(this.duration % 60)
   })
}
function set_audio_event() {
   e("#audio-last").addEventListener("click", audio_last)
   e("#audio-pause").addEventListener("click", audio_change)
   e("#audio-next").addEventListener("click", audio_next)
   e("#audio-current-time").addEventListener("mousedown", function() {
      audio_down(true)
   })
   e("#audio-current-time").addEventListener("mouseup", function() {
      audio_down(false)
   })
   e("#audio-current-time").addEventListener("mousemove", function() {
      audio_set_current_time()
   })
}
function set_music_list_event() {
   var ml = e('.music-list')
   ml.addEventListener('drop', function(event) {
      prevent(event)
      upload_music(get_data(event))
   })
   ml.addEventListener('dragover', prevent)
   ml.addEventListener("click", function(event) {
      audio_play(event.target)
   })
}
function audio_change() {
   sound.change_pause()
   audio_change_icon()
}
function audio_last() {
   var c = sound.current_music
   if(c && c.lastElement()) {
      audio_play(c.lastElement())
   }
}
function audio_next() {
   var c = sound.current_music
   if(c && c.nextElement()) {
      audio_play(c.nextElement())
   }
}
function audio_change_icon() {
   var children = e("#audio-pause").children
   var play = children[0]
   var pause = children[1]
   if(sound.paused) {
      pause.classList.remove("dpib")
      play.classList.add("dpib")
   }else {
      pause.classList.add("dpib")
      play.classList.remove("dpib")
   }
}
function audio_play(active) {
   var h = active
   if(h.tagName === "LI") {
      sound.play(h.attr("path"))
      sound.current_music = h
      audio_change_backgroud(h.attr("img"))
      audio_change_icon()
      audio_change_active(h)
   }
}
function audio_change_backgroud(url) {
   var imgbox = e("#active-albumimg")
   imgbox.classList.add("hide")
   var img = creat_img(url, function() {
      var that = this
      setTimeout(function() {
         imgbox.innerHTML = ""
         imgbox.appendChild(that)
         imgbox.classList.remove("hide")
      }, 500)
   })
}
function audio_change_active(music) {
   var mn = e(".music-name")
   var ma = e(".music-album")
   var mc = e(".music-composer")
   var mi = e(".music-img")
   var content = music.children[0].children
   mn.innerHTML = content[0].innerHTML
   ma.innerHTML = content[1].innerHTML
   mc.innerHTML = content[2].innerHTML
   mi.src = music.attr("img")
}
function get_audio_canvas() {
   var canvas = e("#audio-canvas")
   return canvas
}
function set_audio_frequency() {
   frequency = new FrequencySpt(get_audio_canvas())
   sound.connect(frequency)
}
function set_audio_canvas() {
   var canvas = get_audio_canvas()
   var canvas_wraper = e("#canvas-wraper")
   canvas.width = canvas_wraper.offsetWidth
   canvas.height = 220
}
function audio_down(down) {
   sound.timeButtonDown = down
}
function audio_set_current_time() {
   
}



/**
 * ajax
 */
function get_data(event) {
   return event.dataTransfer.files[0]
}
function upload_music(file) {
   var fd = new FormData()
   var xhr = new XMLHttpRequest()
   fd.append('file', file)
   xhr.open('post', 'musicPlayer/upload_music.php')
   xhr.onload = function() {
      e('.music-list').innerHTML += xhr.responseText
   }
   xhr.upload.onprogress = function(event) {
      log(Math.floor(event.loaded / event.total * 100) + '%')
   }
   xhr.send(fd)
}

/**
 * base
 */
function prevent(event) {
   event.preventDefault()
   event.stopPropagation()
}
function creat_img(src, onload) {
   var img = new Image()
   img.src = src
   img.onload = onload
   return img
}
