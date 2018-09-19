!function() {
   web_init()
   window.onload = function() {
      check_window_width()
      set_document_events()
      set_main_height()
      set_audio_canvas()
      set_audio_frequency()
      audio_init()
   }
   window.addEventListener("resize", function() {
      set_audio_canvas()
      set_main_height()
   })
}()

function web_init() {
   window.log = console.log.bind()
   window.e = sel => document.querySelector(sel)
   window.es = sel => document.querySelectorAll(sel)
   window.sound = new Sound()
   window.frequency = null

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

/**
 * dom
 */
function set_main_height() {
   var header = e("header")
   var main = e("main")
   var footer = e("footer")
   var ml = e(".music-list")
   var mh = window.innerHeight - header.offsetHeight - footer.offsetHeight
   main.style.height = mh + "px"
   ml.style.height = mh + "px"
}
function check_window_width(){
   var header = e("header")
   if(window.innerWidth < 980) {
      if(!header.classList.contains("large")) {
         header.classList.add("large")
      }
   }else {
      header.classList.remove("large")
   }
}
function set_document_events() {
   set_music_list_event()
   set_audio_event()
   set_slideDown_btn_event()
}
function set_slideDown_btn_event() {
   var header = e("header")
   var btn = e("#slide")
   document.addEventListener("click", function(event) {
      if(event.target.attr("id") == btn.attr("id")) {
         header.classList.toggle("large")

         //header是large时main会被header压缩 当header切换large时应当重设main的height
         set_main_height()

         //header是large时canvas将会是一个全新的样式 so canvas的高也要重设
         set_audio_canvas()

         //该死的header是large时 tmd 画布样式也要刷新
         if(window.frequency) {
            frequency.refresh()
         }

         //当large 是header的class时会发生一些奇妙的事情
         if(header.classList.contains("large")) {
            window.frequency.setup_style("circle")
         }else {
            window.frequency.setup_style("rect")
         }
      }
   })
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
      var time = this.audio.currentTime
      var totalTime = this.audio.duration
      var s = Math.floor(time % 60)
      var m = Math.floor(time / 60)
      if(s < 10) {
         s = "0" + s
      }
      current_time.innerHTML = m + ":" + s
      var cur = time / totalTime * 100 + "%"
      cur_bar.style.width = cur
      cur_time.style.left = cur
   }
   sound.onplaying(function() {
      duration.innerHTML = Math.floor(sound.audio.duration / 60) + ":" + Math.floor(sound.audio.duration % 60)
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

   //鼠标按住
   var v = e("#audio-volume")
   var cur = e("#audio-volume .cur")
   var curPro = e("#audio-volume .curprogress")
   v.mousedown = false
   v.addEventListener("mousedown", (event) => {
      v.mousedown = true
   })
   document.addEventListener("mouseup", (event) => {
      v.mousedown = false
   })
   document.addEventListener("mousemove", (event) => {
      var max = v.offsetWidth
      var x = event.clientX - v.offsetLeft
      var vol = x / max
      if(v.mousedown) {
         if(x > max || x < 0) {
            return
         }
         cur.style.left = x - (cur.offsetWidth / 2) + "px"
         curPro.style.width = x + "px"
         sound.change_volume(vol)
      }
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
   //全局的变量 写这条注释是为了 方便查找 ^_^
   window.frequency = new FrequencySpt(get_audio_canvas())
   sound.connect(frequency)
}
function set_audio_canvas() {
   var canvas = get_audio_canvas()
   var canvas_wraper = e("#canvas-wraper")
   canvas.width = canvas_wraper.offsetWidth
   canvas.height = canvas_wraper.offsetHeight
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
   var d = new Date()
   var bytesPerPiece = 1024 * 1024 * 2
   var fileName = file.name
   log(fileName)
   var fileSize = file.size

   var start = 0
   var totalPieces = Math.ceil(fileSize / bytesPerPiece)
   var count = totalPieces
   upload_piece(start, --count, file, fileName)
}
function upload_piece(start, count, file, fileName) {
   //土豆丝
   var bytesPerPiece = 1024 * 1024 * 2
   var fileSize = file.size
   var end = start + bytesPerPiece
   if(end > fileSize) {
      end = fileSize
   }
   var chunk = file.slice(start, end)

   var fd = new FormData()
   var xhr = new XMLHttpRequest()

   if(count >= 0) {
      fd.append('file', chunk, fileName)
      fd.append("token", "continue")
   }else {
      fd.append("token", "end")
      fd.append("fileName", fileName)
   }

   xhr.open('post', 'musicPlayer/upload_music.php')
   xhr.onload = function() {
      e('.music-list').innerHTML += xhr.responseText
      if(count >= 0) {
         upload_piece(end, --count, file, fileName)
      }
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
