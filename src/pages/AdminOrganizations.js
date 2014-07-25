/**
 * Organization List
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
var PageActions = require('../actions/PageActions')
  , AuthorizationActions = require('../actions/AuthorizationActions');

/**
 * Components
 */
var PageHeader = require('../components/PageHeader')
  , FormField = require('../components/FormField')
  , Button = require('../components/Button');

/**
 * Mixins
 */
var AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin');

/**
 * AdminNotFound React Class
 */
var AdminOrganizations = React.createClass({

  mixins: [AuthorizationStateMixin],

  getInitialState: function() {
    return { organizations: [] };
  },

  componentDidMount: function() {
    this._loadOrganizations();
  },

  componentWillUpdate: function(nextProps, nextState) {
    var currentID = this.state.currentOrganization.get('id')
      , nextID = nextState.currentOrganization.get('id');

    // redirect to Dashboard if we change organization
    if (currentID && currentID !== nextID) {
      PageActions.goTo('/admin');
    }
  },

  render: function() {
    var organizations = [];

    this.state.organizations.forEach(function(org) {
      organizations.push(
        <OrganizationListItem key={org.get('id')} organization={org} />
      );
    });

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Organizations</li>
            </ol>

            <div className="list-group">
              {organizations}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">New Organization</h3>
              </div>

              <div className="panel-body">
                <OrganizationForm />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  },

  _loadOrganizations: function() {
    var self = this;

    Dropmail.Organization.fetch(function(err, data) {
      if (err) return console.error(err);
      self.setState({ organizations: data.organizations });
    });
  }

});

/**
 * OrganizationListItem
 */
var OrganizationListItem = React.createClass({

  render: function() {
    var org = this.props.organization;

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          {org.get('name')}
        </h4>

        <p onClick={this._onClick} className="list-group-item-text">
          Swith
        </p>
      </div>
    );
  },

  _onClick: function() {
    var id = this.props.organization.get('id');
    AuthorizationActions.changeOrganization(id);

    return false;
  }

});

/**
 * OrganizationForm
 */

OrganizationForm = React.createClass({

  getInitialState: function() {
    return { errors: {}, saving: false }
  },

  render: function() {
    return (
      <form onSubmit={this._onSubmit}>
        <FormField
          label="Name"
          placeholder="Acme Inc."
          name="name"
          ref="nameGroup"
          errors={this.state.errors.name}
          required />

        <Button action="primary" type="submit" disabled={this.state.saving == true}>
          Add
        </Button>
      </form>
    );
  },

  _onSubmit: function() {
    var self = this
      , name = this.refs.nameGroup.refs.name.getDOMNode().value;

    this.setState({ saving: true });

    Dropmail.Organization.save({ name: name }, function(err, organization) {
      if (err) return self.setState({ errors: err.attributes, saving: false });

      AuthorizationActions.changeOrganization(organization.get('id'));
    });

    return false;
  }

});

module.exports = AdminOrganizations;
