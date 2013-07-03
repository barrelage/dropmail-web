var DropmailWeb = function(options){
  this.router = new Router(options);
  this.router.app = this;

  this.start = function(){
    Backbone.history.start({ pushState: true });
  };
};

_.extend(DropmailWeb.prototype, Dropmail.prototype);
_.extend(DropmailWeb, Dropmail);
