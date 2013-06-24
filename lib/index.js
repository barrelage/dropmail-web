Dropmail.baseURL = 'http://0.0.0.0:9393';
Dropmail.ui = {};

var DropmailWeb = function(options) {
  Dropmail.call(this);

  var key = $.cookie('key');
  if (key) { this.authenticate(key); }

  this.router = new Router(options);
  this.router.app = this;

  this.start = function() {
    Backbone.history.start({ pushState: true });
  };
};

_.extend(DropmailWeb.prototype, Dropmail.prototype);
_.extend(DropmailWeb, Dropmail);
