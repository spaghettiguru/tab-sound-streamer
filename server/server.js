var WebSocketServer = require("ws").Server,
wss = new WebSocketServer({ port: 8080 });

var channels = {};

function generateToken(length) {
  var charCodes = new Array(length);

  for (var i = 0; i < length; i++) {
    charCodes[i] = 0x0041 + Math.round(Math.random() * (0x007a-0x0041));
  }
  return String.fromCharCode.apply(String, charCodes);
}

wss.on('connection', function(ws) {
        var channelId = generateToken(10);
        ws.on('message', function(message) {
        	console.log('recieved: %s', message);
		});
		ws.send(channelId);
});
