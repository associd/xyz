window.onload = function() {
   var gradient = 50
   es(".card").forEach( (item, index, array) => {
      item.order = index;
      item.style.backgroundColor = `rgb(${gradient * (index + 1)}, ${gradient * (index + 1)}, ${gradient * (index + 1)})`;
      item.style.color = `rgb(${gradient * (index + 1)}, ${gradient * (index + 1)}, ${gradient * (index + 1)})`;
      setTimeout( () => {
         item.style.height = "100%";
      }, index * 100 + 500)
      item.resum = function() {
         this.style.height = "100%";
      }
      item.transmitRight = function(energy) {
         this.style.height = energy * 100 + "%"
         this.style.width = energy * 100 + "%"
         if( this.order + 1 < array.length ) {
            array[this.order + 1]["transmitRight"]( energy * 0.9 )
         }
      }
      item.transmitLeft = function(energy) {
         this.style.height = energy * 100 + "%"
         this.style.width = energy * 100 + "%"
         if( this.order - 1 >= 0 ) {
            array[this.order - 1]["transmitLeft"]( energy * 0.9 )
         }
      }
      item.transmitHover = function(deriction, energy) {
         if(deriction == "right") {
            this.transmitRight(energy)
         }
         if(deriction == "left") {
            this.transmitLeft(energy)
         }
      }
   } )
   e(".container").addEventListener("click", event => {
      e(".container").classList.add("hide")
      e(`#${event.target.dataset.assgin}`).classList.remove("hide")
      e(`#${event.target.dataset.assgin}`).classList.add("show")
   })
   e(".container").addEventListener("mouseleave", event => {
      es(".card").forEach(function(item) {
         item.resum()
      })
   })
   e(".container").addEventListener("mouseover", event => {
      let target = event.target
      let index = target.order
      if(target.classList.contains("card")) {
         if( index < es(".card").length ) {
            target.transmitHover("right", 1.2)
         }
         if( index > 0 ) {
            target.transmitHover("left", 1.2)
         }
      }
   })
}
