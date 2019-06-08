var WebSocketServer = require('ws').Server;
var wss             = new WebSocketServer({port: 6443});

console.log(6443);
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(message);
    });
});

wss.on('error', function (error) {
    console.log('error:', error);
});