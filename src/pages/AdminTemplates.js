/**
 * Page: /admin/templates
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react')
  , moment = require('moment');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Layouts
 */
var AdminLayout = require('../layout/AdminLayout');

/**
 * Components
 */
var PageHeader = require('../components/PageHeader')
  , Alert = require('../components/Alert')
  , FormField = require('../components/FormField')
  , Button = require('../components/Button')
  , Link = require('../components/Link')
  , Pagination = require('../components/Pagination');

/**
 * AdminTemplates React Class
 */
var AdminTemplates = React.createClass({

  render: function() {
    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Templates</li>
            </ol>

            <Pagination
              resource={Dropmail.Template}
              rowComponent={TemplateListItem}
              _route={this.props._route} />

          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">New Template</h3>
              </div>

              <div className="panel-body">
                <TemplateForm />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

});

/**
 * TemplateListItem React Class
 */
var TemplateListItem = React.createClass({

  render: function() {
    var template = this.props.data
      , updated_at = template.get('updated_at');

    return (
      <div className="list-group-item" onClick={this._onClick}>
        <h4 className="list-group-item-heading">
          {template.get('name')}
        </h4>

        <p className="list-group-item-text">
          Last modified {moment(updated_at).fromNow()}
        </p>
      </div>
    );
  },

  _onClick: function() {
    PageActions.goTo('/admin/templates/' + this.props.data.get('id'));
  }

});

/**
 * TemplateForm
 */
var TemplateForm = React.createClass({

  getInitialState: function() {
    return { errors: {}, saving: false };
  },

  render: function() {
    return (
      <form onSubmit={this._onSubmit}>
        <FormField
          label="Name"
          placeholder="User Signup"
          name="name"
          ref="nameGroup"
          errors={this.state.errors.name}
          required />

        <Button action="primary" type="submit" disabled={this.state.saving == true}>
          Create
        </Button>
      </form>
    );
  },

  _onSubmit: function() {
    var self = this
      , name = this.refs.nameGroup.refs.name.getDOMNode().value;

    this.setState({ saving: true });

    Dropmail.Template.save({ name: name }, function(err, template) {
      if (err) return self.setState({ errors: err.attributes, saving: false });
      PageActions.goTo('/admin/templates/' + template.get('id'));
    });

    return false;
  }

});

module.exports = AdminTemplates;
