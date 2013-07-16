
window.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'sign_in': 'signIn',
    'organizations': 'organizations'
  },

  index: function(){
    this.renderComponent(Pages.Index);
  },

  signIn: function(){
    this.renderComponent(Pages.SignIn);
  },

  organizations: function(){
    this.renderComponent(Pages.Organizations);
  },

  renderComponent: function(component){
    var options = { component: component };
    React.renderComponent(App(options), document.getElementById('container'));
  }

});
