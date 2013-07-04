var DropmailWeb = function(options){
  this.client = new Dropmail({ baseURL: 'http://0.0.0.0:9393' });

  /*
   * uses the key stored in the a cookie to set user state
   */
  this.client.loadCurrentUser = function(callback){
    var key = $.cookie('key');

    if (!key) return;
    this.credentials = { key: key };

    this.User.me(function(err, user){
      if (err) return console.log(err);
      callback(user);
    });
  };

  this.router = new Router(options);

  this.start = function(){
    Backbone.history.start({ pushState: false });
  };
};

