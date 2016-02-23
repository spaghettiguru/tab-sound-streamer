(function() {
	var rtcPeerConnectionConf = {
    	iceServers: [
        	{ url: "stun:stun.l.google.com:19302" },
        	{ url: "stun:stun1.l.google.com:19302" },
        	{ url: "stun:stun2.l.google.com:19302" },
        	{ url: "stun:stun3.l.google.com:19302" },
        	{ url: "stun:stun4.l.google.com:19302" }
    	]
	};
	var signalingChannel = io("http://46.101.192.232:8080");
	var pc = new webkitRTCPeerConnection(rtcPeerConnectionConf);

	pc.onicecandidate = function (evt) {
    	signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
	};

	// once remote stream arrives, show it in the remote video element
    pc.onaddstream = function (evt) {
        audioOut.src = URL.createObjectURL(evt.stream);
    };

	signalingChannel.on("message", function(data) {

	});
})();