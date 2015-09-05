//var httpServer = require('http').createServer(requestHandler);
var io = require('socket.io')(8080);
//httpServer.listen(8080);

function generateToken(length) {
  var charCodes = new Array(length);

  for (var i = 0; i < length; i++) {
    charCodes[i] = 0x0041 + Math.round(Math.random() * (0x007a-0x0041));
  }
  return String.fromCharCode.apply(String, charCodes);
}

//function requestHandler(request, response) {
  //response.setHeaders({"Access-Control-Allow-Origin": "*"});
  //response.send("connected!");
//}

io.on('connection', function(socket) {
        socket.on('message', function(message) {
        	console.log('recieved: %s', message);
		});
		socket.send("you are connected!");
});
