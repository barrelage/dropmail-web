/**
 * 404 for /admin/*
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
 * Components
 */
var PageHeader = require('../components/PageHeader');

/**
 * AdminNotFound React Class
 */
var AdminNotFound = React.createClass({

  render: function() {
    return (
      <AdminLayout>
        <PageHeader>Page not found</PageHeader>
      </AdminLayout>
    );
  }

});

module.exports = AdminNotFound;
