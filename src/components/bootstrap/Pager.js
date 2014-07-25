/**
 * Bootstrap Pager
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

var Pager = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <ul className="pager">
        {this.props.children}
      </ul>
    );
  }

});

module.exports = Pager;
