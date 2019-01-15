window.action = {};
function addAction(event, callback) {
   if(window.action[event]) {
      window.action[event].push(callback);
   }else {
      window.action[event] = [callback];
   }
   document.addEventListener(event, callback);
}

export {addAction};
