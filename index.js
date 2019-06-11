const http = require('http');
const httpProxy = require('http-proxy');
var proxy = new httpProxy.createProxyServer({
    target: 'ws://localhost:46514',
    ws: true
});
var proxyServer = http.createServer(function (req, res) {
    setTimeout(function () {
        if (req.url.indexOf('/api') == 0) {
            proxy.web(req, res, {
                target: 'http://jiluxinqing.000webhostapp.com'
            });
        }else{
            proxy.web(req, res, {
                target: 'http://localhost:9008'
            });
        }        
    }, 500);
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

proxyServer.listen(80);

//
// Create your target server
//
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(9008);