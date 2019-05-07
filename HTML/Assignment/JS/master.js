window.onload = function() {
   var gradient = 50
   es(".card").forEach( (item, index, array) => {
      item.dataset.order = index;
      item.style.backgroundColor = `rgb(${gradient * (index + 1)}, ${gradient * (index + 1)}, ${gradient * (index + 1)})`;
      item.style.color = `rgb(${gradient * (index + 1)}, ${gradient * (index + 1)}, ${gradient * (index + 1)})`;
      item.style.animation = `growth 1.5s ${index * 0.1 + 0.5}s cubic-bezier(.77,0,.18,1) forwards`;
      item.transmitHover = function(nextNodeOrder, energy) {
         if(this.dataset.order == 0 || this.dataset.order == array.length) {
            this.style.height = this.offsetHeight * energy
            this.style.width = this.offsetWidth * energy
         }else if(this.dataset.order < )
      }
   } )
   e(".container").addEventListener("click", event => {
      e(".container").classList.add("hide")
      e(`#${event.target.dataset.assgin}`).classList.remove("hide")
      e(`#${event.target.dataset.assgin}`).classList.add("show")
   })
   e(".container").addEventListener("mouseleave", event => {
      log("sadfsadfsadfsadf")
   })
   e(".container").addEventListener("mouseover", event => {
      if(event.target.classList.contains("card")) {

      }
   })
}
