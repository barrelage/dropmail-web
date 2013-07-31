
window.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'templates': 'listTemplates',
    'templates/:id': 'showTemplate',
    'sign_in': 'signIn'
  },

  index: function(){
    this.renderView(Pages.Index);
  },

  listTemplates: function(){
    this.renderView(Pages.Templates);
  },

  showTemplate: function(id){
    this.renderView(Pages.Template, { id: id });
  },

  signIn: function(){
    this.renderView(Pages.SignIn);
  },

  renderView: function(view, props){
    var options = { view: view, viewProps: props };
    React.renderComponent(App(options), document.getElementById('container'));
  }

});
