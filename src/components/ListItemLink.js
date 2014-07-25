/**
 * ListItemLink
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Components
 */
var Link = require('../components/Link');

var ListItemLink = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <li>
        <Link path={this.props.path}>
          {this.props.children}
        </Link>
      </li>
    );
  },

  _onClick: function() {
    PageActions.goTo(this.props.path);
    return false;
  }

});

module.exports = ListItemLink;
