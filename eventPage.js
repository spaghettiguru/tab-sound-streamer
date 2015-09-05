const SINGALING_SERVER_URL = "http://46.101.192.232:8080";

var capturedStream = null;
var rtcPeerConnectionConf = {
  iceServers: [
    { url: "stun:stun.l.google.com:19302" },
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun3.l.google.com:19302" },
    { url: "stun:stun4.l.google.com:19302" }
  ]
};

chrome.runtime.onMessage.addListener(function(message) {
	if (message == "togglecapture") {
		if (!capturedStream) {
      		chrome.tabs.query({
      			active: true,
      			currentWindow: true
    		},
    		function(tabs) {
        		chrome.tabCapture.onStatusChanged.addListener(function(captureInfo) {
          			chrome.runtime.sendMessage(null, captureInfo.status);
        		});

        		var captureOptions = {
      				audio: true,
      				video: false
    			  };

            var signalingChannel = io(SINGALING_SERVER_URL);

        		chrome.tabCapture.capture(captureOptions, function(stream) {
        			capturedStream = stream;
              var pc = new webkitRTCPeerConnection(rtcPeerConnectionConf);

              pc.onicecandidate = function (evt) {
                signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
              };

              pc.addStream(stream);

              pc.createOffer(function(offer){
                pc.setLocalDescription(new RTCSessionDescription(offer), function() {
                  
                })
              });
      			});
    		});  
      	} else {
    		capturedStream.stop();
    		capturedStream = null;
    	}
	}
});