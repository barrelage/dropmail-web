window.DropmailWeb = function(config){
  window.app = this; // set a global (bad form, FIX)

  // our own personal client
  this.dropmail = new Dropmail(config);

  // client for authenticated user
  this.client = new Dropmail(
    $.extend(config, { credentials: null, session: { expires: 1800 } })
  );

  this.router = new Router();

  this.start = function(){
    Backbone.history.start({ pushState: true });
  };
};
