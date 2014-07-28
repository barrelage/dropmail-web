/**
 * Page: /admin/account
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Layout
 */
var AdminLayout = require('../layout/AdminLayout');

/**
 * Mixins
 */
var AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin');

var AdminAccount = React.createClass({

  mixins: [AuthorizationStateMixin],

  render: function() {
    var account = this.state.currentUser;

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Account</li>
            </ol>

            <dl>
              <dt>Name:</dt>
              <dd>{account.get('name')}</dd>

              <dt>Email:</dt>
              <dd>{account.get('email')}</dd>
            </dl>
          </div>
        </div>
      </AdminLayout>
    );
  }

});

module.exports = AdminAccount;
