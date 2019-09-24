class Card  {
   constructor(element) {
      this.element = element;
   }
   show() {
      this.element.style.height = "100%";
   }
   init() {
      this.element.style.backgroundColor = this.getColor({
         r: 200,
         g: 200,
         b: 0,

      })
   }
   getColor(range, factor) {
      return `rgba(
         ${range.r * factor.r},
         ${range.g * factor.g},
         ${range.b * factor.b},
         ${range.a * factor.a}
      )`
   }
}
class CardBox {
   constructor(htmlElements = []) {
      this.cards = [];
      htmlElements.forEach((item) => {
         this.push(new Card(item));
      })
   }
   push(card) {
      this.cards.push(card);
   }
   showCard() {
      this.cards.forEach(function(item, index, array) {
         setTimeout(function() {
            item.show()
         }, index * 100 + 500)
      })
   }
   initCard() {
      this.cards.forEach(function(item, index, array) {

      })
   }
}
