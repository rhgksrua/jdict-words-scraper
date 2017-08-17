console.log('hello world');


chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log(message);
    // need to add message to localstorage and display on the browser page
  }
);

const click = document.getElementById("click");
let a = 1;
click.addEventListener('click', e => {
  console.log('clicked me!');
  a = 101293;

})
