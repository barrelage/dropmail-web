
/**
 * Module dependencies.
 */

var Dropmail = require('../vendor/dropmail.js');

// internal dropmail client

var dm = new Dropmail(require('../config').dropmail);

module.exports = function() {
  var cookieKey = 'authorization';

  // middleware function
  return function(req, res, next) {

    // if an authorization is cached, return it instead

    if (cookieKey in req.cookies) {
      req.authorization = dm.Authorization.build(req.cookies[cookieKey]);
      return next();
    }

    // save a temporary authorization so we can email new signups

    dm.Authorization.save({ ttl: 10 * 60 }, function(err, auth) {
      if (err) { return res.send(500, err); }

      res.cookie(cookieKey, auth, { httpOnly: true, maxAge: 5 * 60 * 1000 });
      req.authorization = auth;
      next();
    });

  };
};
