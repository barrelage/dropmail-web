var dropmail = new Dropmail({ baseURL: 'http://0.0.0.0:9393' })
  , app;

var key = $.cookie('key');
if (key) { dropmail.authenticate(key); }

var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  }
, initialize: function() {
    React.renderComponent(DropmailApp(), document.getElementById('container'));
  }
, index: function() {

  }
});

