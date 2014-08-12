/**
 * Page: /admin/domains/[:id]
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react')
  , moment = require('moment');

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

var AdminDomain = React.createClass({

  getInitialState: function() {
    return { domain: new Dropmail.Domain };
  },

  componentDidMount: function() {
    this._fetchDomain();
  },

  render: function() {
    var domain = this.state.domain;

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <ListItemLink path="/admin/domains">Domains</ListItemLink>
              <li className="active">{domain.get('host')}</li>
            </ol>

            <p>
              <strong>Status:</strong> {domain.get('status')}
            </p>

            <p>
              <strong>Verification Token:</strong> <span className="text-monospace">{domain.get('verification_token')}</span>
            </p>

            <p>
              <strong>Added:</strong> {moment(domain.get('created_at')).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  },

  _fetchDomain: function() {
    var self = this
      , id = this.props._route.params.id;

    Dropmail.Domain.find(id, function(err, domain) {
      if (err) return console.error(err);
      self.setState({ domain: domain });
    });

  }

});

module.exports = AdminDomain;
