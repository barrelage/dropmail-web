/**
 * An Admin Page
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
var AdminLayout = require('../layout/AdminLayout');

/**
 * AdminPage React Class
 */
var AdminPage = React.createClass({

  render: function() {
    return (
      <AdminLayout>
        {this.props.children}
      </AdminLayout>
    );
  }

});

module.exports = AdminPage;
