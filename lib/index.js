
window.DropmailWeb = function(config){

  window.app = this; // set a global (bad form, FIX)

  this.client = new Dropmail(config);

  this.authorization = this.client._resumeSession();
  //if (!this.authorization) window.location.reload();

  this.router = new Router();

  this.goTo = function(path) {
    if (typeof path != 'string') path = '';

    app.router.navigate('/' + path, { trigger: true });
    return false;
  },

  this.start = function(){
    Backbone.history.start({ pushState: true });
  };

};
