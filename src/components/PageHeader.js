/**
 * PageHeader React Component
 *
 * @jsx React.DOM
 */

/**
 * Module dependancies
 */
var React = require('react');

var PageHeader = React.createClass({

  render: function() {
    return (
      <h1 className="page-header">{this.props.children}</h1>
    );
  }

});

module.exports = PageHeader;
