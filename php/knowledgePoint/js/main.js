var e = sel => document.querySelector(sel);
var es = sel => document.querySelectorAll(sel);
window.onload = function() {
   var content = e("#knowledge-content")
   
}
function sendMessage(str) {
   var XHL = new XMLHttpRequest()
   XHL.open("POST", "./request/getContent.php")
   XHL.send("")
   XHL.onload = function() {
      console.log(XHL.responseText);
   }
}
