var log = console.log.bind(console);
window.onload = function() {
   ajax({
      method: "GET",
      url: "./超级马里奥.nes",
      // url: "./test.txt",
      asyn: true,
      success: (data) => {
         window.bytes = new Uint8Array(data);
         window.offset = 32784;
         window.color = [
            "#FFFFFF",
            "#FEA000",
            "#FF0000",
            "#AA3030"
         ]
         let canvas = e("#canvas");
         let ctx = canvas.getContext("2d");
         drawNes(ctx, window.bytes, window.offset);

         bindEvent(ctx);
         drawSprite(e("#mario-canvas").getContext("2d"), window.bytes)
      }
   })
}

function drawSprite(ctx, bytes) {
   let spriteOffset = 32784
   let offset = 0
   let numberOfBytesPerBlock = 16
   let marioOfBlock = 8
   let marioOfBytes = numberOfBytesPerBlock*marioOfBlock
   setInterval(() => {
      let origin = offset
      for(let i = 0; i < 4; i++) {
         for(let j = 0; j < 2; j++) {
            drawPixel(ctx, bytes.slice(spriteOffset + offset), j * 80, i * 80)
            offset += 16
         }
      }
      offset = origin
      offset = (offset + marioOfBytes) % (marioOfBytes * 3);
   }, 200)


}

function bindEvent(ctx) {
   window.actions = {
      change_offset(offset) {
         window.offset += offset
         drawNes(ctx, window.bytes, window.offset)
         e("#offset").innerHTML = window.offset;
      }
   }
   e(".controls").addEventListener("click", event => {
      let action = event.target.dataset.action;
      let offset = Number(event.target.dataset.offset);
      actions[action] && actions[action](offset);
   })
}

function drawNes(ctx, bytes, offset) {
   let blockSize = 8
   let pixelSize = 10
   let numberOfBytesPerBlock = 16
   for(let i = 0; i < blockSize; i++ ) {
      for(let j = 0; j < blockSize; j++) {
         let index = offset + (i * blockSize + j) * numberOfBytesPerBlock;
         let x = j * pixelSize * 8
         let y = i * pixelSize * 8
         drawPixel(ctx, bytes.slice(index), x, y)
      }
   }
}

function drawPixel(context, data, x, y) {
   for (var i = 0; i < 8; i++) {
      var px1 = data[i]
      var px2 = data[i + 8]
      for (var j = 0; j < 8; j++) {
         var c1 = px1 >> (7 - j) & 0b00000001;
         var c2 = px2 >> (7 - j) & 0b00000001;
         var pxColor = (c1 << 1) + c2
         var px = x + j * 10
         var py = y + i * 10
         context.fillStyle = window.color[pxColor]
         context.fillRect(px, py, 10, 10);
      }
   }
}

function ajax(request){
   var xhr = new XMLHttpRequest();
   xhr.open(request.method, request.url, request.asyn);
   xhr.responseType = "arraybuffer";
   xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
         request.success(xhr.response);
      }
   }
   xhr.send(request.data);
}

function e(sel) {
   return document.querySelector(sel);
}

function es(sel) {
   return document.querySelectorAll(sel);
}
