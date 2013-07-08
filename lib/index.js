window.DropmailWeb = function(config){
  window.app = this; // set a global (bad form, FIX)

  // our own personal client
  this.dropmail = new Dropmail(config);

  // client for authenticated user
  this.client = new Dropmail(config);
  this.client.authenticate({});

  // uses the key stored in the a cookie to set user state
  this.client.loadCurrentUser = function(callback){
    var key = $.cookie('key');
    if (!key) return;

    this.authenticate(key);
    this.User.me(function(err, user){
      if (err) return console.log(err);
      callback(user);
    });
  };

  this.router = new Router();

  this.start = function(){
    Backbone.history.start({ pushState: true });
  };
};

