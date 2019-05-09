window.onload = function() {
   var gradient = {
      start: {
         r: 0,
         g: 0,
         b: 0,
      },
      end: {
         r: 200,
         g: 200,
         b: 200,
      },
      distance: {
         r: 200,
         g: 200,
         b: 200,
      }
   }
   es(".card").forEach( (item, index, array) => {
      item.order = index;
      item.hoverBackgroundColor = {
         r: 255,
         g: 255,
         b: 0,
      }
      item.backgroundColor = {
         r: gradient.distance.r * index / array.length,
         g: gradient.distance.g * index / array.length,
         b: gradient.distance.b * index / array.length
      };
      item.style.backgroundColor = `rgb(
         ${item.backgroundColor.r},
         ${item.backgroundColor.g},
         ${item.backgroundColor.b}
      )`;
      item.style.color = `rgb(
         ${item.backgroundColor.r},
         ${item.backgroundColor.g},
         ${item.backgroundColor.b}
      )`;
      setTimeout(() => {
         item.style.height = "100%";
      }, index * 100 + 500)
      item.resum = function() {
         this.style.height = "100%";
         this.style.backgroundColor = `rgb(
            ${this.backgroundColor.r},
            ${this.backgroundColor.g},
            ${this.backgroundColor.b}
         )`;
         this.style.color = `rgb(
            ${this.backgroundColor.r},
            ${this.backgroundColor.g},
            ${this.backgroundColor.b}
         )`;
      }
      item.transmitRight = function(energy) {
         this.style.height = energy * 100 + "%"
         this.style.width = energy * 100 + "%"
         this.style.backgroundColor = `rgb(
            ${this.hoverBackgroundColor.r * energy * 0.8},
            ${this.hoverBackgroundColor.g * energy * 0.8},
            ${this.hoverBackgroundColor.b * energy * 0.8}
         )`;
         this.style.color = `rgb(
            ${this.hoverBackgroundColor.r * energy * 0.8},
            ${this.hoverBackgroundColor.g * energy * 0.8},
            ${this.hoverBackgroundColor.b * energy * 0.8}
         )`;
         if( this.order + 1 < array.length ) {
            array[this.order + 1]["transmitRight"]( energy * 0.9 )
         }
      }
      item.transmitLeft = function(energy) {
         this.style.height = energy * 100 + "%"
         this.style.width = energy * 100 + "%"
         this.style.backgroundColor = `rgb(
            ${this.hoverBackgroundColor.r * energy * 0.8},
            ${this.hoverBackgroundColor.g * energy * 0.8},
            ${this.hoverBackgroundColor.b * energy * 0.8}
         )`;
         this.style.color = `rgb(
            ${this.hoverBackgroundColor.r * energy * 0.8},
            ${this.hoverBackgroundColor.g * energy * 0.8},
            ${this.hoverBackgroundColor.b * energy * 0.8}
         )`;
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
