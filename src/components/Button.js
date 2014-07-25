/**
 * Button
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons');

var Button = React.createClass({

  propTypes: {
    action: React.PropTypes.oneOf([
      'default', 'primary', 'success',
      'info', 'warning', 'danger', 'link'
    ]),
    size: React.PropTypes.oneOf(['lg', 'sm', 'xs']),
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      action: 'default',
      active: false,
      disabled: false
    };
  },

  render: function() {
    var classSet = React.addons.classSet;
    var classes = classSet({
      'btn': true,
      'active': this.props.active,
      'disabled': this.props.disabled
    });

    classes += ' btn-' + this.props.action;

    if (this.props.size) {
      classes += ' btn-' + this.props.size;
    }

    return this.transferPropsTo(
      <button className={classes}>{this.props.children}</button>
    );
  }

});

module.exports = Button;
