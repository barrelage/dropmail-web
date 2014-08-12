/**
 * AdminLayout
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Components
 */
var NavigationItem = require('../components/NavigationItem')
  , Icon = require('../components/Icon');

/**
 * Mixins
 */
var AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin')
  , PageStateMixin = require('../mixins/PageStateMixin');

/**
 * Styles
 */
require('../less/admin.less');

/**
 * AdminLayout React Class
 */
var AdminLayout = React.createClass({

  mixins: [
    PageStateMixin,
    AuthorizationStateMixin
  ],

  componentWillMount: function() {
    this.requireAuthorization();
  },

  render: function() {
    return this.transferPropsTo(
      <div id="admin">
        <div className="container-fluid">
          {this.props.children}
        </div>
        <div className="sidebar">
          <ul className="nav">
            <li><a href="#">Dropmail</a></li>

            <NavigationItem
              label={this.state.currentUser.get('name')}
              path="/admin/account"
              icon="user"
              currentPage={this.state.currentPage} />

            <NavigationItem
              label={this.state.currentOrganization.get('name')}
              path="/admin/organizations"
              icon="heart"
              currentPage={this.state.currentPage} />

            <NavigationItem
              label="Templates"
              path="/admin/templates"
              icon="text-height"
              currentPage={this.state.currentPage} />

            <NavigationItem
              label="Domains"
              path="/admin/domains"
              icon="globe"
              currentPage={this.state.currentPage} />

            <NavigationItem
              label="Members"
              path="/admin/members"
              icon="users"
              currentPage={this.state.currentPage} />

            <NavigationItem
              label="Emails"
              path="/admin/emails"
              icon="envelope"
              currentPage={this.state.currentPage} />

          </ul>
        </div>
      </div>
    );
  }

});

module.exports = AdminLayout;
