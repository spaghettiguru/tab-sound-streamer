
var CONNECTION_PAGE_URL = "http://46.101.192.232";

var toggle = document.getElementById("captureToggle");

toggle.addEventListener("click", function(event) {
    chrome.runtime.sendMessage("togglecapture", function(response) {
      console.log("togglecapture response: ", response);
    });
    //if (!localStorage.getItem("isCapturing")) {
      var qrCode = new QRCode("qrcode", {
        text: CONNECTION_PAGE_URL,
        width: 200,
        height: 200
      });
    //}
});

/*chrome.runtime.onMessage.addListener(function(message) {
    if (message == "captureStatusChanged") {

    }
  });*/
