const https = require('https');
const fs = require('fs')
const httpProxy = require('http-proxy');

function log() {
    console.log(new Date().toLocaleString(), ...arguments)
}


var proxy = new httpProxy.createProxyServer({
    target: 'ws://129.28.65.118:8123',
    ws: true
});
var proxyServer = https.createServer({
    key: fs.readFileSync('1.key'),
    cert: fs.readFileSync('1.crt')
}, function (req, res) {
    log(req.url)
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

proxy.on('error', function (e) {
    console.log(e)
});

proxyServer.listen(443);

console.log('Listen https://localhost:443')