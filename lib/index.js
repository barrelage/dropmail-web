
window.DropmailWeb = function(config){

  var SESSION_TIMEOUT = 30 * 60; // 30 minutes

  window.app = this; // set a global (bad form, FIX)

  // our own personal client
  this.dropmail = new Dropmail(config);

  // client for authenticated user
  this.client = new Dropmail(
    $.extend(config, {
      credentials: null, session: { expires: SESSION_TIMEOUT }
    })
  );

  this.router = new Router();

  this.start = function(){
    Backbone.history.start({ pushState: true });
  };

};
