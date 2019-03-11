var e = sel => document.querySelector(sel);
var es = sel => document.querySelectorAll(sel);
var log = console.log.bind(console);
HTMLElement.prototype.attr = function() {
   log(this)
}
HTMLElement.prototype.parent = function() {
   return this.parentElement;
}
window.onload = function() {
   userLogin();
   bindEvent();
}

function bindEvent() {
   var clickAction = {
      id: {
         "user-start": function(event) {
            fgNormal(event.target)
         }
      },
      class: {
         "fg-td": function(event) {
            fgFull(event.target)
         },
         "return": function(event) {
            fgNormal(event.target)
         }
      }

   }
   document.addEventListener("click", event => {
      var target = event.target
      var id = clickAction.id
      var _class = clickAction.class
      Object.keys(_class).forEach(function(item) {
         if(target.classList.contains(item)) {
            _class[item](event);
         }
      })
      Object.keys(id).forEach(function(item) {
         if(target.id == item) {
            id[item](event);
         }
      })
   })
}


function userLogin() {
   setTimeout(function() {
      fgFull(e("#user"))
   }, 200)
}

function fgNormal(dom) {
   fgRemove(dom, "active")
   e("html").style.setProperty("--flex-grow", 1);
}
function fgFull(dom) {
   fgAdd(dom, "active");
   e("html").style.setProperty("--flex-grow", 0);
}
function fgAdd(dom, className) {
   if(dom.parent() && !dom.parent().classList.contains("fg-box")) {
      fgAdd(dom.parent(), className)
   }
   dom.classList.add(className)
}
function fgRemove(dom, className) {
   if(dom.parent() && !dom.parent().classList.contains("fg-box")) {
      fgRemove(dom.parent(), className)
   }
   dom.classList.remove(className)
}
