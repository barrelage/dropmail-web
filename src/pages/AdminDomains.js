/**
 * Domains List
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
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Components
 */
var PageHeader = require('../components/PageHeader')
  , FormField = require('../components/FormField')
  , Button = require('../components/Button');

/**
 * AdminNotFound React Class
 */
var AdminDomains = React.createClass({

  getInitialState: function() {
    return { domains: [] };
  },

  componentDidMount: function() {
    this._loadDomains();
  },

  render: function() {
    var domains = [];

    this.state.domains.forEach(function(domain) {
      domains.push(
        <DomainListItem key={domain.get('id')} domain={domain} />
      );
    });

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Domains</li>
            </ol>

            <div className="list-group">
              {domains}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Add Domain</h3>
              </div>

              <div className="panel-body">
                <DomainForm />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  },

  _loadDomains: function() {
    var self = this;

    Dropmail.Domain.fetch(function(err, data) {
      if (err) return console.error(err);
      self.setState({ domains: data.domains });
    });
  }

});

/**
 * DomainListItem
 */
var DomainListItem = React.createClass({

  render: function() {
    var domain = this.props.domain;

    return (
      <div className="list-group-item" onClick={this._onClick}>
        <h4 className="list-group-item-heading">
          {domain.get('host')}
        </h4>

        <p className="list-group-item-text">
          Status: {domain.get('status')}
        </p>
      </div>
    );
  },

  _onClick: function() {
    PageActions.goTo('/admin/domains/' + this.props.domain.get('id'));
  }

});

/**
 * DomainForm
 */

DomainForm = React.createClass({

  getInitialState: function() {
    return { errors: {}, saving: false }
  },

  render: function() {
    return (
      <form onSubmit={this._onSubmit}>
        <FormField
          label="Host"
          placeholder="example.com"
          name="host"
          ref="hostGroup"
          errors={this.state.errors.host}
          required />

        <Button action="primary" type="Add" disabled={this.state.saving == true}>
          Create
        </Button>
      </form>
    );
  },

  _onSubmit: function() {
    var self = this
      , host = this.refs.hostGroup.refs.host.getDOMNode().value;

    this.setState({ saving: true });

    Dropmail.Domain.save({ host: host }, function(err, domain) {
      if (err) return self.setState({ errors: err.attributes, saving: false });
      PageActions.goTo('/admin/domains/' + domain.get('id'));
    });

    return false;
  }

});

module.exports = AdminDomains;
