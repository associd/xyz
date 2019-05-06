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
var music3 = {
   name: "音乐家",
   author: "徐梦圆",
   img: "./IMG/3.jpg",
   src: "./RESOURCE/徐梦圆 - 音乐家（Feat.徐梦圆）.mp3",
}
window.data =  [music,music3,music3,music2,music,music3,music,music2,music3,music,music2,music3,music,];


var musicNumber = 1;

var max = Math.floor(data.length / musicNumber);


var html = "";
for (i = 0; i < max ; i++) {
   html += "<section class='flex'>"
   for(j = 0; j < musicNumber; j++) {
      html += `
         <div class="music"  data-url="${i*musicNumber+j}">
            <div class="name">${data[i*musicNumber+j]["name"]}</div>
            <div class="author">${data[i*musicNumber+j]["author"]}</div>
            <img class="img" src="${data[i*musicNumber+j]["img"]}" alt="shit">
         </div>
      `
   }
   html += "</section>"
}

e("#music-container").innerHTML = html
