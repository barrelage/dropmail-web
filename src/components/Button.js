/**
 * Button
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons');

/**
 * Components
 */
var Icon = require('./Icon');

var Button = React.createClass({

  propTypes: {
    action: React.PropTypes.oneOf([
      'default', 'primary', 'success',
      'info', 'warning', 'danger', 'link'
    ]),
    size: React.PropTypes.oneOf(['lg', 'sm', 'xs']),
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    processing: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      action: 'default',
      active: false,
      disabled: false,
      processing: false
    };
  },

  render: function() {
    var classSet = React.addons.classSet;
    var classes = classSet({
      'btn': true,
      'active': this.props.active,
      'disabled': this._isDisabled()
    });

    classes += ' btn-' + this.props.action;

    if (this.props.size) {
      classes += ' btn-' + this.props.size;
    }

    return this.transferPropsTo(
      <button className={classes}>{this._children()}</button>
    );
  },

  _children: function() {
    if (this.props.processing) {
      return (
        <span>
          <Icon type="spinner" spin={true} /> {this.props.children}
        </span>
      );
    }

    return this.props.children;
  },

  _isDisabled: function() {
    return this.props.disabled || this.props.processing;
  }

});

module.exports = Button;
