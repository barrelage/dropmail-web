/** @jsx React.DOM **/

var React = require('react');

require('../less/admin.less');

var AdminLayout = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <div>
        <h1>Admin Layout</h1>
        {this.props.children}
      </div>
    );
  }

});

module.exports = AdminLayout;
