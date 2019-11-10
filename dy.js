const request = require('request');
const zlib = require('zlib');


module.exports = function (page = 0) {
  return new Promise((resolve, reject) => {
    request(`https://www.tiktok.com/share/item/list?secUid=&id=&type=5&count=5&minCursor=${page}&maxCursor=1000001519326&shareUid=&_signature=oUeATAAgEBNNe.t-VaJovaFHgVAAPyP`, {
      headers: {
        'authority': 'www.tiktok.com',
        , 'scheme': 'https'
        , 'accept': 'application/json, text/plain, */*'
        , 'accept-encoding': 'gzip, deflate, br'
        , 'accept-language': 'zh-CN,zh;q=0.9'
        , 'cache-control': 'no-cache'
        , 'cookie': 's_v_web_id=59a0c1b341690d568d9540701496db73; _ga=GA1.2.2086684636.1573368694; _gid=GA1.2.1710461593.1573368694; _fbp=fb.1.1573368694151.690071355; SLARDAR_WEB_ID=19768960-9f8f-4c4b-a47f-bd52a6d22cbf; tt_webid=6757567395851912705; ak_bmsc=481EA2885D61E203C16F2E2163CBAEBE1720F806491D00000EB3C75D318EA409~plpC4LZoSgr4sI+BzrN0o0oP1134B8whvVYZegsegQDC/hEASkgz+8hqRH5NmDJ0S0iUx1SPSbaWWYYsoU7dhVYl1MuyI5/4wD1lPSv31L4LoV27OPIC6pdeWDnH6xJv9aLYGe0XK3wskm6cYF+Lbom4Y2i/X//jwB/dRMQm5urpUWa7XDwbPJDPD6O/YVsCIhpSk1qdAsPLP1xdmG6CDs9mqkgSxCdN+9Ax7fhF2ycOvTVhFae4I70mrR9jVZ3sO4ocHie07iZB1FgUyeuz1S7g==; bm_sv=3539F1A894514E6DCDB7FC5297BF3F8B~1fuLbbQJ+1sFegNQYGzJo/seFnONvNrN5q66rag4+TNYl7irjuxe/UnWeyMBJS+tRVaLI0Z1ucvF2FnpV0CePswSzlmBHHRm2ApiPu1P+yUcvzl08AfdYNT0EcGolfr/CPeEIb7WQgHQ/pxiC5XYNaft4DIKj2mJZRI1jrTxyyo='
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
          //console.log()
          resolve(JSON.parse(buffer.toString()))
        })
      } else {
        reject(err)
      }
    })

  })


}