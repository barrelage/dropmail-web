/**
 * Bootstrap PageItem
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons');

var PageItem = React.createClass({

  propTypes: {
    disabled: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    next: React.PropTypes.bool,
    handleClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      href: '#'
    };
  },

  render: function() {
    var ClassSet = React.addons.classSet

    var classes = ClassSet({
      'disabled': this.props.disabled,
      'previous': this.props.previous,
      'next': this.props.next
    });

    return (
      <li className={classes}>
        <a
          href={this.props.href}
          title={this.props.title}
          onClick={this._onClick}>

          {this.props.children}
        </a>
      </li>
    );
  },

  _onClick: function() {
    if (this.props.handleClick) {
      if (!this.props.disabled) {
        this.props.handleClick(this.props.href);
      }

      return false;
    }
  }

});

module.exports = PageItem;
