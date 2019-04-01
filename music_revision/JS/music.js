var music = {
   name: "跨越星弧",
   author: "徐梦圆",
   img: "./IMG/1.jpg",
   src: "./RESOURCE/徐梦圆 - 跨越星弧.mp3",
}
var music2 = {
   name: "worlds apart",
   author: "seven lions,kerli",
   img: "./IMG/2.jpg",
   src: "./RESOURCE/Seven Lions,Kerli - Worlds Apart.mp3",
}
var data =  [music,music2,music,music2,music,music2,music,music2,music,music,music2,music,music,];



var max = Math.floor(data.length / 3);


var html = "";
for (i = 0; i < max ; i++) {
   html += "<section class='f-tr flex'>"
   for(j = 0; j < 3; j++) {
      html += `
         <div class="f-td music" data-url="${data[i*3+j]["src"]}" style="background-image: url(${data[i*3+j]["img"]})">
            <div class="layer full"></div>
         </div>
      `
   }
   html += "</section>"
}

e("#music-container").innerHTML = html
