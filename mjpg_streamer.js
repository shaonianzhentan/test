const { exec } = require('child_process')

exec(`LD_LIBRARY_PATH=/usr/local/lib  mjpg_streamer -i "input_uvc.so" -o "output_http.so -w /usr/local/www"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`执行的错误: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})
console.log(`${new Date().toLocaleString()}开启服务`)

setInterval(() => {
    console.log('test')
}, 8000000000)