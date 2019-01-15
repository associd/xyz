import("./event.js").then((event) => {
   event.addAction("keydown", function(e) {

      var input = document.querySelector(".input-field textarea")
      if(e.key == "Enter") {
         if(input.value === "" && document.activeElement == input) {
            console.log("发送的内容不能为空");
            setTimeout(function() {
               input.value = "";
            }, 100)
         }
      }
   })
});
