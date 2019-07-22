class XyzCard  {
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
class XyzContainer {
   constructor(htmlElements = []) {
      this.XyzCards = [];
      htmlElements.forEach((item) => {
         this.push(new XyzCard(item));
      })
   }
   push(XyzCard) {
      this.XyzCards.push(XyzCard);
   }
   showXyzCard() {
      this.XyzCards.forEach(function(item, index, array) {
         setTimeout(function() {
            item.show()
         }, index * 100 + 500)
      })
   }
   initXyzCard() {
      this.XyzCards.forEach(function(item, index, array) {

      })
   }
}
