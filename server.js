var connect = require('connect')
  , app = connect()
  , webpack = require('webpack')
  , config = require('./webpack.config')
  , http = require('http')
  , static = require('serve-static')
  , fs = require('fs')
  , index = fs.readFileSync('./public/index.html')
  , port = Number(process.env.PORT || 3000);

webpack(config, function(err, stats) {
  console.log(err, stats);
});

app.use(static('public'));

app.use(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'html' });
  res.end(index);
});

http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port);
});

