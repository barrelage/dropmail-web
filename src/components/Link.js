/**
 * Link
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

var Link = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <a href={this.props.path} onClick={this._onClick}>
        {this.props.children}
      </a>
    );
  },

  _onClick: function() {
    PageActions.goTo(this.props.path);
    return false;
  }

});

module.exports = Link;
