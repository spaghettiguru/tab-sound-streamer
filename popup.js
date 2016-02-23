
var CONNECTION_PAGE_URL = "http://46.101.192.232";

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById("captureToggle");
  
  toggle.addEventListener("click", function(event) {
      chrome.runtime.sendMessage(null, "togglecapture");
      // generate qrcode
      new QRCode(document.getElementById("qrcode"), CONNECTION_PAGE_URL);
  });

  chrome.runtime.onMessage.addListener(function(message) {
      renderStatus(message);
    });
});
