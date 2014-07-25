/**
 * NavigationItem React Component
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Components
 */
var Icon = require('./Icon')
  , ListItemLink = require('./ListItemLink');

/**
 * NavigationItem React Class
 */
var NavigationItem = React.createClass({

  render: function() {
    var ClassSet = React.addons.classSet;

    var classes = ClassSet({
      'nav-item': true,
      'active': this._isCurrentPage()
    });

    return this.transferPropsTo(
      <ListItemLink className={classes} path={this.props.path}>
        <Icon type={this.props.icon} /> <span className="nav-label">{this.props.label}</span>
      </ListItemLink>
    );
  },

  _isCurrentPage: function() {
    return this.props.currentPage == this.props.path;
  }

});

module.exports = NavigationItem;
