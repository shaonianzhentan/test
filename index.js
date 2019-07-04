const http = require('http');
const httpProxy = require('http-proxy');

var proxy = new httpProxy.createProxyServer({
    target: 'ws://129.28.65.118:8123',
    ws: true
});
var proxyServer = http.createServer(function (req, res) {
    proxy.web(req, res, {
        target: 'http://129.28.65.118:8123'
    });
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

proxy.on('error', function(e) {
    console.log(e)
});

proxyServer.listen(80);