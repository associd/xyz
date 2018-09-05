class Sound{
   constructor() {
      this.audio = new Audio()
      this.playing = false
      this.paused = true
      this.time = 0
      this.current_music = null
      this.setup()
   }
   setup() {
      this.audioCtx = new AudioContext()
      this.analyser = this.audioCtx.createAnalyser()
      this.analyser.fftSize = 2048
      this.audioNode = this.audioCtx.createMediaElementSource(this.audio)
      this.gainNode = this.audioCtx.createGain()
      this.frequencyArray = new Uint8Array(this.analyser.frequencyBinCount)
      this.timeArray = new Uint8Array(this.analyser.frequencyBinCount)
      this.element = []

      this.audioNode.connect(this.gainNode)
      this.audioNode.connect(this.analyser)
      this.gainNode.connect(this.audioCtx.destination)

      this.animate()
   }
   play(url) {
      this.audio.pause()
      this.audio.src = url
      this.audio.play()
      this.playing = true
      this.paused = false
   }
   onplaying(callback) {
      this.audio.onplaying = callback
   }
   change_pause() {
      if(!this.playing){return}
      if(this.paused) {
         this.audio.play()
      }else {
         this.audio.pause()
      }
      this.paused = !this.paused
   }
   connect(obj) {
      obj.Farr = this.frequencyArray
      this.element.push(obj)
   }
   connect_currentTime() {}


   /**
    * animate
    */
   update() {
      this.time++
      if(this.time % 60 == 0) {
         this.connect_currentTime()
      }
      this.analyser.getByteFrequencyData(this.frequencyArray)
      this.element.forEach(function(item, index) {
         item.update()
      })
   }
   draw() {
      this.element.forEach(function(item, index) {
         item.draw()
      })
   }
   animate() {
      this.update()
      this.draw()
      requestAnimationFrame(() => {
         this.animate()
      })
   }
}
