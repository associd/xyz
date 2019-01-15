var e = sel => document.querySelector(sel);
var es = sel => document.querySelectorAll(sel);
window.onload = function() {
   var content = e("#knowledge-content");
   fillContent("foreword", content)
}

function fillContent(name, dom) {
   getPoint(name, function(text) {
      dom.innerHTML = text;
   })

   /**
   *  name = "str"  successful = function(responseText){}
   */
   function getPoint(name, successful) {
      var XHL = new XMLHttpRequest();
      XHL.open("POST", `./knowledgeFolder/${name}.html`);
      XHL.send("");
      XHL.onload = function() {
         successful(XHL.responseText);
      }
   }
}
