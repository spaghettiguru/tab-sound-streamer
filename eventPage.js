const SINGALING_SERVER_URL = "http://46.101.192.232:8080";

var rtcPeerConnectionConf = {
    iceServers: [
        { url: "stun:stun.l.google.com:19302" },
        { url: "stun:stun1.l.google.com:19302" },
        { url: "stun:stun2.l.google.com:19302" },
        { url: "stun:stun3.l.google.com:19302" },
        { url: "stun:stun4.l.google.com:19302" }
    ]
};

var mediaStream = null;

function setupStreamTransfer(signalingChannel, stream) {
    var pc = new webkitRTCPeerConnection(rtcPeerConnectionConf);

    signalingChannel.on("message", function(data) {
        console.log("Message from the server: ", data);
        if (data.sdp) {
            pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        } else {
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    });

    pc.onicecandidate = function (evt) {
        signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
    };

    pc.addStream(stream);

    pc.createOffer(function(offer){
        pc.setLocalDescription(new RTCSessionDescription(offer), function() {

        });
    });

    return pc;
}

chrome.browserAction.onClicked.addListener(function() {
    console.log("browser action icon clicked!");
});

chrome.tabCapture.onStatusChanged.addListener(function(captureInfo) {
    console.log("tabCapture status changed to: [%s]", captureInfo.status);
    chrome.runtime.sendMessage(null, captureInfo.status);
});

chrome.runtime.onMessage.addListener(function(message) {
	if (message == "togglecapture") {
            var tabQueryOptions;

            if (!mediaStream) {
                tabQueryOptions = {
                    active: true,
                    currentWindow: true
                };

                var captureOptions = {
                    audio: true,
                    video: false
                };

                var signalingChannel = io(SINGALING_SERVER_URL);

                chrome.tabCapture.capture(captureOptions, function(stream) {
                    console.log("Tab capturing was started");
                    console.log(stream);
                    mediaStream = stream;
                    setupStreamTransfer(signalingChannel, stream);
                });
            } else {
                mediaStream.getAudioTracks()[0].stop();
                mediaStream = null;
            }
    }
});