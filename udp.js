const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const socket = dgram.createSocket("udp4");

server.on('close', () => {
    console.log('socket已关闭');
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('socket正在监听中...');
});

server.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    console.log(msg.toString('utf8'))
    //server.send('exit', rinfo.port, rinfo.address)
});

server.bind(12345);

// 开关
setTimeout(() => {
    server.setBroadcast(true);
    server.send(`{
        "type": 1002,
        "result": 1
    }`, 8888, '255.255.255.255')
}, 1000)
