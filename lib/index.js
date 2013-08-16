
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

  this.changeOrg = function(org) {
    var self = this
      , options = { organization_id: org.get('id') };

    app.client.createSession(options, function(err, auth) {
      if (err) return console.error(err);

      // go home incase this page is specific to the org
      app.goTo();

      window.location.reload();
    });

    return false;
  }

  this.start = function(){
    Backbone.history.start({ pushState: true });
  };

};
