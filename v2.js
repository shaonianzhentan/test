const http = require('http');
const httpProxy = require('http-proxy');
var express = require('express');
var request = require('request');
var cors = require('cors');
var httpProxyMiddleware = require('http-proxy-middleware');

function log() {
  console.log(new Date().toLocaleString(), ...arguments)
}

var proxy = new httpProxy.createProxyServer({
  target: 'ws://localhost:2333',
  ws: true
});
var proxyServer = http.createServer(function (req, res) {
  setTimeout(function () {
    proxy.web(req, res, {
      target: 'http://localhost:9008'
    });
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

var app = express();
var bodyParser = require('body-parser');
// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.use(cors())
app.use(
  '/api',
  httpProxyMiddleware({ target: 'http://jiluxinqing.000webhostapp.com', changeOrigin: true })
);


const dyApi = require('./dy.js')
app.get('/', (req, res) => {
  dyApi().then((data) => {
    res.json(data)
  }).then(err => {
    res.send(err)
  })
})

app.post('/proxy', (req, res) => {
  let body = req.body
  log(body)
  request(body, function (err, response, body) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(body)
  })
})

app.listen(9008);

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
//     res.end();
// }).listen(9008);