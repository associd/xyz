window.onload = function() {
   let game = {};
   ajax({
      method: "GET",
      url: "./Super Mario Bros.nes",
      asyn: true,
      success: (data) => {
         let bytes = new Uint8Array(data);
         drawNes(bytes);
      }
   })
}

function drawNes(bytes) {
   let blockSize = 8
   let pixelSize = 8
   log(bytes)
   log(bytes.slice(2))
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

function log(...log) {
   console.log(log);
}
