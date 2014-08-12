/**
 * Page: /admin/emails/[:id]
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Layouts
 */
var AdminLayout = require('../layout/AdminLayout');

/**
 * Components
 */
var ListItemLink = require('../components/ListItemLink')
  , Button = require('../components/Button')
  , Link = require('../components/Link');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

var AdminEmail = React.createClass({

  getInitialState: function() {
    return { email: new Dropmail.Email };
  },

  componentDidMount: function() {
    this._fetchEmail();
  },

  render: function() {
    var email = this.state.email;

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <ListItemLink path="/admin/emails">Emails</ListItemLink>
              <li className="active">{email.get('id')}</li>
            </ol>

            <dl>
              <dt>From:</dt>
              <dd>{email.get('from')}</dd>

              <dt>To:</dt>
              <dd>
                <a href="#" onClick={this._showUserEmails}>
                  {email.get('to')}
                </a>
              </dd>

              <dt>Subject:</dt>
              <dd>{email.get('subject')}</dd>
            </dl>

            <p>
              <iframe id="preview" ref="preview" />
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  },

  _fetchEmail: function() {
    var self = this
      , id = this.props._route.params.id;

    Dropmail.Email.find(id, function(err, email) {
      if (err) return console.error(err);
      self.setState({ email: email });
    });

  },

  _showUserEmails: function() {
    PageActions.goTo('/admin/emails?to=' + this.state.email.get('to'));
    return false;
  }

});

module.exports = AdminEmail;
