window.onload = function() {
   es(".card").forEach( (item, index) => {
      item.style.backgroundColor = `rgb(${10 * (index + 1)}, ${10 * (index + 1)}, ${10 * (index + 1)})`;
      item.style.color = `rgb(${10 * (index + 1)}, ${10 * (index + 1)}, ${10 * (index + 1)})`;
      item.style.animation = `growth 1.5s ${index * 0.1 + 0.5}s cubic-bezier(.77,0,.18,1) forwards`;
   } )
   e(".container").addEventListener("click", event => {
      e(".container").classList.add("hide")
      e(`#${event.target.dataset.assgin}`).classList.remove("hide")
      e(`#${event.target.dataset.assgin}`).classList.add("show")
   })
}
