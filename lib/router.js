
window.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'organizations/new': 'createOrganization',
    'templates': 'listTemplates',
    'templates/:slug': 'showTemplate',
    'emails': 'listEmails',
    'members': 'listMembers',
    'domains': 'listDomains',
    'domains/:id': 'showDomain',
    'account': 'showAccount'
  },

  index: function() {
    this.renderPage('index');
  },

  createOrganization: function() {
    this.renderPage('organizations/new');
  },

  listTemplates: function() {
    this.renderPage('templates/list');
  },

  showTemplate: function(slug) {
    // TODO: handle arguments
    this.renderPage('templates/show', { slug: slug });
  },

  listEmails: function() {
    this.renderPage('emails/list');
  },

  listMembers: function() {
    this.renderPage('members/list');
  },

  listDomains: function() {
    this.renderPage('domains/list');
  },

  showDomain: function(id) {
    this.renderPage('domains/show', { id: id });
  },

  showAccount: function() {
    this.renderPage('account/show');
  },

  renderPage: function(name, options) {
    var options = _.extend({ page: name }, { viewProps: options });
    React.renderComponent(App(options), document.getElementById('container'));
  }

});
