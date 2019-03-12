var e = sel => document.querySelector(sel);
var es = sel => document.querySelectorAll(sel);
var log = console.log.bind(console);
HTMLElement.prototype.attr = function() {
   log(this)
}
HTMLElement.prototype.parent = function() {
   return this.parentElement;
}
HTMLElement.prototype.next = function() {
   return this.nextElementSibling;
}
HTMLElement.prototype.last = function() {
   return this.previousElementSibling;
}
HTMLElement.prototype.siblings = function() {
   let node = new Array();
   if(this.next()) {
      node.push(this.next())
   }
   if(this.last() && node.push(this.last()));
   return ;
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
   if(dom.parent() && !dom.parent().classList.contains("fg-box")) {
      fgNormal(dom.parent())
   }
   fgRemove(dom, "active")
   e("html").style.setProperty("--flex-grow", 1);
}
function fgFull(dom) {
   if(dom.parent() && !dom.parent().classList.contains("fg-box")) {
      fgFull(dom.parent())

   }
   fgAdd(dom, "active");
}
function fgAdd(dom, className) {
   dom.classList.add(className)
}
function fgRemove(dom, className) {
   dom.classList.remove(className)
}
