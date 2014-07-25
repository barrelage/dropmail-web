/**
 * Icon React Component
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Icon Component
 *
 * @param type {string}
 * @param size {string} - lg|2x|3x|4x|5x
 * @param fixedWidth {boolean}
 * @param listItem {boolean}
 * @param boarder {boolean}
 * @param pull {string} - left|right
 * @param spin {boolean}
 * @param rotate {integer} - 90|180|270
 * @param flip {string} - horizontal|vertical
 */
var Icon = React.createClass({

  propTypes: {
    type: React.PropTypes.string,
    size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    fixedWidth: React.PropTypes.bool,
    listItem: React.PropTypes.bool,
    boarder: React.PropTypes.bool,
    pull: React.PropTypes.oneOf(['left', 'right']),
    spin: React.PropTypes.bool,
    rotate: React.PropTypes.oneOf([90, 180, 270]),
    flip: React.PropTypes.oneOf(['horizontal', 'vertical'])
  },

  render: function() {
    if (!this.props.type) return null;

    return this.transferPropsTo(
      <i className={this._faClass()}></i>
    );
  },

  statics: {
    prependName: function(name) {
      return 'fa-' + name;
    }
  },

  _faClass: function() {
    return this._faClasses().join(' ');
  },

  _faClasses: function() {
    var classes = ['fa'];

    classes.push(Icon.prependName(this.props.type));

    if (this.props.size) {
      classes.push(Icon.prependName(this.props.size));
    }

    if (this.props.fixedWidth) {
      classes.push(Icon.prependName('fw'));
    }

    if (this.props.listItem) {
      classes.push(Icon.prependName('li'));
    }

    if (this.props.boarder) {
      classes.push(Icon.prependName('boarder'));
    }

    if (this.props.pull) {
      classes.push('pull-' + this.props.pull);
    }

    if (this.props.spin) {
      classes.push(Icon.prependName('spin'));
    }

    if (this.props.rotate) {
      classes.push(Icon.prependName('rotate-' + this.props.rotate));
    }

    if (this.props.flip) {
      classes.push(Icon.prependName('flip-' + this.props.flip));
    }

    return classes;
  }

});

module.exports = Icon;
