var e = sel => document.querySelector(sel);
var es = sel => document.querySelectorAll(sel);
var log = console.log.bind(console);
HTMLElement.prototype.attr = function() {
   log(this)
}
HTMLElement.prototype.parent = function() {
   return this.parentElement;
}
HTMLElement.prototype.last = function() {
   return this.previousElementSibling;
}
HTMLElement.prototype.next = function() {
   return this.nextElementSibling;
}
HTMLElement.prototype.nextElements = function(elements = []) {
   if(this.next()) {
      this.next().nextElements(elements).push(this.next())
      return elements;
   }else{
      return elements;
   }
}
HTMLElement.prototype.lastElements = function(elements = []) {
   if(this.last()) {
      this.last().lastElements(elements).push(this.last())
      return elements;
   }else{
      return elements;
   }
}
HTMLElement.prototype.siblings = function() {
   return this.lastElements().concat(this.nextElements())
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
