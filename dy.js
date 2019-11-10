const request = require('request');
const zlib = require('zlib');


module.exports = function (page = '1000001519326') {
  console.log(page)
  return new Promise((resolve, reject) => {
    request(`https://www.tiktok.com/share/item/list?secUid=&id=&type=5&count=5&minCursor=0&maxCursor=${page}&shareUid=&_signature=oUeATAAgEBNNe.t-VaJovaFHgVAAPyP`, {
      headers: {
        'authority': 'www.tiktok.com',
        'scheme': 'https', 'accept': 'application/json, text/plain, */*'
        , 'accept-encoding': 'gzip, deflate, br'
        , 'accept-language': 'zh-CN,zh;q=0.9'
        , 'cache-control': 'no-cache'
        
        , 'pragma': 'no-cache'
        , 'referer': 'https://www.tiktok.com/trending'
        , 'sec-fetch-mode': 'cors'
        , 'sec-fetch-site': 'same-origin'
        , 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
      },
      encoding: null
    }, (err, res, body) => {
      //console.log('错误：', err)
      if (!err) {
        zlib.unzip(body, function (err, buffer) {
          console.log(buffer.toString())
          //resolve(JSON.parse(buffer.toString()))
        })
      } else {
        reject(err)
      }
    })

  })


}