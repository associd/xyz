(function() {
   window.log = console.log.bind()
   window.e = sel => document.querySelector(sel)
   window.es = sel => document.querySelectorAll(sel)
   window.rand = function(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1))
   }
   window.min = function(a, b) {
      return a-b>0 ? a = b : a
   }

   HTMLElement.prototype.attr = function(name, value = null) {
      if(value) {
         this.setAttribute(name, value)
      }else{
         return this.getAttribute(name)
      }
   }
   HTMLElement.prototype.nextElement = function() {
      return this.nextElementSibling
   }
   HTMLElement.prototype.lastElement = function() {
      return this.previousElementSibling
   }
})()

window.onload = function() {
   e("#confirm").addEventListener("click", event => {

      let startDateObject = parseDate(e("#startDate").value)
      let endDateObject = parseDate(e("#endDate").value)

      let sd = new Date(startDateObject.year, startDateObject.month, startDateObject.day)
      let ed = new Date(endDateObject.year, endDateObject.month, endDateObject.day)

      let intervalDay = (new Date(ed.getTime() - sd.getTime())).getTime() / 1000 / 3600 / 24

      createBox(intervalDay, "<input class='box' type='checkbox'>", e("#container"))
   })
   var con = e("#container")
   loadStrorage(con)
   document.addEventListener("click", event => {
      var boxs = es(".box")
      var checkedBoxs = []
      for (var i = 0; i < boxs.length; i++) {
         if(boxs[i].checked) {
            checkedBoxs.push(i)
         }
      }
      var data = {
         con: con.innerHTML,
         userStatus: {
            startDate: e("#startDate").value,
            endDate: e("#endDate").value,
            checkedBoxs: checkedBoxs,
         },
      }
      localStorage.setItem("table", JSON.stringify(data))
   })
}

/**
 * "2018-10-12"
 * {year: 2018, month: 10, day: 12}
 */
function parseDate(date) {
   date = date.split("-")
   return {year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])}
}

function createBox(num, domString, container) {
   container.innerHTML = ""
   for (var i = 1; i <= num; i++) {
      if(i % 7 == 0) {
         container.innerHTML += domString
      } else {
         container.innerHTML += domString
      }
   }
}

function loadStrorage(dom) {
   if(localStorage.getItem("table")) {
      var web = JSON.parse(localStorage.getItem("table"))
      dom.innerHTML = web.con
      e("#startDate").value = web.userStatus.startDate
      e("#endDate").value = web.userStatus.endDate
      var boxs = es(".box")
      web.userStatus.checkedBoxs.forEach(function(item, index) {
         boxs[item].checked = true
      })
   }else {
      var data = {
         con: e("#container").innerHTML,
         userStatus: {
            startDate: e("#startDate").value,
            endDate: e("#endDate").value,
            checkedBoxs: null,
         },
      }
      localStorage.setItem("table", JSON.stringify(data))
   }
}
