export function drawSprite(ctx, bytes) {
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
