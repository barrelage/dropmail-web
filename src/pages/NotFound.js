/**
 * 404 for marketing site
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
 * Components
 */
var PageHeader = require('../components/PageHeader');

var NotFound = React.createClass({

  render: function() {
    return (
      <MarketingLayout>
        <div className="container">
          <PageHeader>Page not found</PageHeader>
        </div>
      </MarketingLayout>
    );
  }

});

module.exports = NotFound;
