/**
 * Page: /admin/templates/[:id]
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons')
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

/**
 * Mixins
 */

var AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin');

/**
 * AdminTemplate React Class
 */
var AdminTemplate = React.createClass({

  mixins: [AuthorizationStateMixin],

  getInitialState: function() {
    return {
      template: new Dropmail.Template,
      revisions: []
    };
  },

  componentDidMount: function() {
    this._fetchTemplate();
  },

  render: function() {
    var self = this
      , template = this.state.template
      , timestampFormat = 'MMMM Do YYYY, h:mm:ss a'
      , revisions = [];

    this.state.revisions.forEach(function(revision) {
      revisions.push(
        <TemplateRevisionRow
          revision={revision}
          template={template}
          key={revision.get('id')}
          handlePublish={self._publishRevision.bind(null, revision)} />
      );
    });

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <ListItemLink path="/admin/templates">Templates</ListItemLink>
              <li className="active">{template.get('name')}</li>
            </ol>

            <p>
              <strong>Date created:</strong> {moment(template.get('created_at')).format(timestampFormat)}
            </p>
            <p>
              <strong>Last modified:</strong> {moment(template.get('updated_at')).format(timestampFormat)}
            </p>
            <p>
              <strong>Latest revision:</strong> <span className="text-monospace">{template.get('latest_revision')}</span>
            </p>
            <p>
              <strong>Published revision:</strong> <span className="text-monospace">{template.get('published_revision') || 'not yet published'}</span>
            </p>

            <p>
              <Link path={'/admin/templates/'+ template.get('id') + '/edit'}>
                Edit
              </Link>
            </p>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Revisions</h3>
              </div>

              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Revision</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {revisions}
                </tbody>

              </table>
            </div>
          </div>
        </div>

      </AdminLayout>
    );
  },

  _fetchTemplate: function() {
    var self = this
      , id = this.props._route.params.id;

    Dropmail.Template.find(id, function(err, template) {
      if (err) return console.error(err);
      self.setState({ template: template });

      // TODO: We should do this in parallel
      self._fetchRevisions();
    });
  },

  _fetchRevisions: function() {
    var self = this;

    this.state.template.revisions(function(err, revisions) {
      if (err) return console.error(err);
      self.setState({ revisions: revisions });
    });
  },

  _publishRevision: function(revision) {
    var self = this;

    revision.publish(function(err, template) {
      if (err) console.error(err);
      self.setState({ template: template });
    });

    return false;
  }

});

/**
 * TemplateRevisionRow
 */
var TemplateRevisionRow = React.createClass({

  render: function() {
    var self = this
      , revision = this.props.revision
      , template = this.props.template;

    publishLink = function() {
      if (template.get('published_revision') == revision.get('id')) {
        return (
          <Button disabled={true} size="xs">
            Published
          </Button>
        );
      }

      return (
        <Button onClick={self.props.handlePublish} size="xs">
          Publish
        </Button>
      );
    }

    return this.transferPropsTo(
      <tr>
        <td>{revision.get('user').get('name')}</td>
        <td>{moment(revision.get('created_at')).format('MMMM Do YYYY')}</td>
        <td className="text-monospace">{revision.get('id')}</td>
        <td>
          <ul className="list-inline">
            <li>{publishLink()}</li>
          </ul>
        </td>
      </tr>
    );
  }

});

module.exports = AdminTemplate;
