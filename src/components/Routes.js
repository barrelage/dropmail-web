/**
 * Routes
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons')
  , page = require('page')
  , qs = require('qs');

/**
 * Stores
 */
var PageStore = require('../stores/PageStore');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Pages
 */
var MarketingPage = require('../pages/MarketingPage')
  , AdminPage = require('../pages/AdminPage');

function getPageState() {
  return PageStore.current();
}

var Routes = React.createClass({

  routes: [
    // Marketing
    ['/', require('../pages/Home')],
    ['/signin', require('../pages/SignIn')],
    ['/signup', require('../pages/SignUp')],

    // Dashboard
    ['/admin', require('../pages/AdminDashboard')],

    // Templates
    ['/admin/templates', require('../pages/AdminTemplates')],
    ['/admin/templates/:id', require('../pages/AdminTemplate')],
    ['/admin/templates/:id/edit', require('../pages/AdminTemplateEdit')],

    // Domains
    ['/admin/domains', require('../pages/AdminDomains')],
    ['/admin/domains/:id', require('../pages/AdminDomain')],

    // Members
    ['/admin/members', require('../pages/AdminMembers')],

    // Emails
    ['/admin/emails', require('../pages/AdminEmails')],
    ['/admin/emails/:id', require('../pages/AdminEmail')],

    // Organizations
    ['/admin/organizations', require('../pages/AdminOrganizations')],

    // Account
    ['/admin/account', require('../pages/AdminAccount')],

    // 404's
    ['/admin/*', require('../pages/AdminNotFound')],
    ['*', require('../pages/NotFound')]
  ],

  componentDidMount: function() {
    var self = this
      , currentPath = window.location.pathname;

    this.routes.forEach(function(route) {
      var path = route[0]
        , Component = route[1];

      // Force React to re-initialize the component
      var reset = function(ctx, next) {
        var Page = MarketingPage;
        if (route[0].indexOf('/admin/')) Page = AdminPage;

        self.setState({ component: <Page _route={ctx} /> });
        self.forceUpdate(next);
      }

      var load = function(ctx) {
        ctx.query = qs.parse(ctx.querystring);

        self.setState({ component: <Component _route={ctx} /> });
      }

      page(path, reset, load);
    });

    PageActions.goTo(currentPath);
    PageStore.addChangeListener(this._onChange)

    page.start();
  },

  componentWillUnmount: function() {
    PageStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return { component: <div /> };
  },

  render: function() {
    return this.state.component;
  },

  _onChange: function() {
    var show = function() {
      page.show(getPageState());
    }

    // move to end of queue
    setTimeout(show, 0);
  }

});

module.exports = Routes;
