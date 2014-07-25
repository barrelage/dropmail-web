var connect = require('connect')
  , http = require('http')
  , static = require('serve-static')
  , fs = require('fs')
  , index = fs.readFileSync('./public/index.html')
  , app = connect()
  , port = 3000;

app.use(static('public'));

app.use(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'html' });
  res.end(index);
});

http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port);
});
