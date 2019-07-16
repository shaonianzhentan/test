const child_process = require('child_process')

child_process.spawnSync(`LD_LIBRARY_PATH=/usr/local/lib  mjpg_streamer -i "input_uvc.so" -o "output_http.so -w /usr/local/www"`)
console.log(`${new Date().toLocaleString()}开启服务`)