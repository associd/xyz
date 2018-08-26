class Sound{
   constructor() {
      this.audio = new Audio()
      this.setup()
   }
   setup() {
      //吓不吓人 害不害怕
      this.audioCtx = new AudioContext()
      this.analyser = this.audioCtx.createAnalyser()
      this.analyser.fftSize = 2048
      this.audioNode = this.audioCtx.createMediaElementSource(this.audio)
      this.gainNode = this.audioCtx.createGain()
      this.frequencyArray = new Uint8Array(this.analyser.frequencyBinCount)
      this.timeArray = new Uint8Array(this.analyser.frequencyBinCount)
      this.element = []

      log(this.audioCtx)

      this.audioNode.connect(this.gainNode)
      this.audioNode.connect(this.analyser)
      this.gainNode.connect(this.audioCtx.destination)
   }
   play(url) {
      this.audio.src = url
      this.audio.play()
   }
   connect(obj) {
      obj.Farr = this.frequencyArray
      obj.start = true
      this.element.push(obj)
   }
   update() {
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
}
