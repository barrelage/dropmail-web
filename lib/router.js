var dropmail = new Dropmail({ baseURL: 'http://0.0.0.0:9393' });

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    '/sign_in': 'signIn'
  },

  index: function(){
    this.renderComponent(Pages.Index);
  },

  signIn: function(){
    this.renderComponent(Pages.SignIn);
  },

  renderComponent: function(component){
    var options = { component: component }
    React.renderComponent(App(options), document.getElementById('container'));
  }
});

