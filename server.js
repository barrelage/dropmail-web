
/**
 * Module dependencies.
 */

var config = require('./config')
  , exec = require('child_process').exec
  , express = require('express')
  , app = express();

// set default env

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// configure

app.use(express.cookieParser());
app.use(express.compress());
app.use(express.favicon());

// log and build in development

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(function(req, res, next){ exec('make quiet', next); });
});

// serve static files

app.use(express.static(__dirname + '/build'));
app.use(function(req, res, next) {
  // if requesting an extension and no file exists, we can't fulfil it
  if (req.path.match(/\.\w{2,3}$/)) { res.send(404); } else next();
});

// catch-all to authorization and index file

app.all('*',
  require('./server/authorization')(),
  function(req, res){
    res.render('index.html.ejs', {
      config: {
        baseURL: config.dropmail.baseURL,
        credentials: req.authorization ? req.authorization.toJSON() : {}
      }
    });
  }
);

// bind
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('dropmail-web listening on ' + port);
});
