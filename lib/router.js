
window.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'templates': 'listTemplates',
    'templates/:id': 'showTemplate',
    'sign_in': 'signIn'
  },

  index: function(){
    this.renderView(Views.Index);
  },

  listTemplates: function(){
    this.renderView(Views.Templates);
  },

  showTemplate: function(id){
    this.renderView(Views.Template, { id: id });
  },

  signIn: function(){
    this.renderView(Views.SignIn);
  },

  renderView: function(view, props){
    var options = { view: view, viewProps: props };
    React.renderComponent(App(options), document.getElementById('container'));
  }

});
