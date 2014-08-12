/**
 * An Marketing Page
 *
 * @jsx React.DOM
 */

/**
 * Module dependancies
 */
var React = require('react');

/**
 * Layouts
 */
var MarketingLayout = require('../layout/MarketingLayout');

/**
 * MarketingPage React Class
 */
var MarketingPage = React.createClass({

  render: function() {
    return (
      <MarketingLayout>
        {this.props.children}
      </MarketingLayout>
    );
  }

});

module.exports = MarketingPage;
