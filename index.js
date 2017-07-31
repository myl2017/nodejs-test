var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/'){  // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./index.html')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end(string)
  }else if(path === '/login'){
      response.setHeader('Content-Type', 'text/html;charset=utf-8')
      //var str = Object.keys(query)
      var username
      var password
      var errors = {}

      for(var key in query){
        if(key === 'username'){
            username = query[key]
        }else if(key === 'password'){
            password = query[key]
        }
      }

      if(username.trim() === ''){
          errors['username'] = '用户名不能为空'
      }else if(username === 'myl'){
          if(password === ''){
              errors['password'] = '密码不能为空'
          }else if(password !== '123456'){
              errors['password'] = '密码错误'
          }
      }else{
          errors['username'] = '用户名不存在'
      }
      if(password === ''){
          errors['password'] = '密码不能为空'
      }
      if(Object.keys(errors).length > 0){
          response.statusCode = 412
          var string = JSON.stringify({errors:errors}) //node.js提供的一个对象
          response.end(string)
      }else{
          response.statusCode = 200
          response.end(JSON.stringify({userId:'Hello AJAX'}))
      }
  }else{
      response.statusCode = 404
      response.setHeader('Content-Type', 'text/html;charset=utf-8')
      response.end('找不到对应的路径，你需要自行修改 index.js')
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
