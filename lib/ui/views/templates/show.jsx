/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Show = React.createClass({

  mixins: [FetchTemplateMixin],

  getInitialState: function() {
    var self = this;

    this.fetchTemplate(function() {
      self.fetchRevisions();
    });

    return { template: new app.client.Template, revisions: [] };
  },

  render: function() {
    return (
      <div>
        <h2>Show Template</h2>

        <a href='#' onClick={this.goToEdit}>Edit</a>

        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-2 control-label">
              Name
            </label>

            <div class="col-lg-10">
              {this.state.template.get('name')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Slug
            </label>

            <div class="col-lg-10">
              {this.state.template.get('slug')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              From
            </label>

            <div class="col-lg-10">
              {this.state.template.get('from')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Subject
            </label>

            <div class="col-lg-10">
              {this.state.template.get('subject')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Published Revision
            </label>

            <div class="col-lg-10">
              {this.state.template.get('published_revision')
                || 'not yet published'}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Latest Revision
            </label>

            <div class="col-lg-10">
              {this.state.template.get('latest_revision')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Created at
            </label>

            <div class="col-lg-10">
              {this.state.template.get('created_at')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Last updated at
            </label>

            <div class="col-lg-10">
              {this.state.template.get('updated_at')}
            </div>
          </div>
        </form>

        <TemplateRevisionTable
          template={this.state.template}
          revisions={this.state.revisions} />

      </div>
    );
  },

  // private

  goToEdit: function() {
    app.goTo('templates/' + this.props.slug + '/edit');
    return false;
  },

  // private

  fetchRevisions: function() {
    var self = this;

    this.state.template.revisions(function(err, revisions) {
      if (err) return console.error(err);
      self.setState({ revisions: revisions });
    });
  }
});

TemplateRevisionTableRow = React.createClass({

  render: function() {
    var self = this
      , template = this.props.template
      , revision = this.props.revision;

    publishListItem = function() {
      if (template.get('published_revision') == revision.get('id')) {
        return <li>Published</li>;
      }

      return (
        <li onClick={self.props.handlePublish} class='dm-text-link'>Publish</li>
      );
    }

    return (
      <tr>
        <td>{revision.get('user').get('name')}</td>
        <td>{revision.get('created_at')}</td>
        <td class='dm-text-monospace'>{revision.get('id')}</td>
        <td>
          <ul class='list-inline'>
            <li class='dm-text-link'>View</li>
            {publishListItem()}
          </ul>
        </td>
      </tr>
    );
  }

});

TemplateRevisionTable = React.createClass({

  componentWillReceiveProps: function(nextProps) {
    this.setState(nextProps);
  },

  getInitialState: function() {
    return { template: this.props.template, revisions: this.props.revisions };
  },

  getDefaultProps: function() {
    return { revisions: [] };
  },

  render: function() {
    var self = this
      , template = this.state.template
      , rows = [];

    this.state.revisions.forEach(function(revision) {
      rows.push(
        <TemplateRevisionTableRow
          template={template}
          revision={revision}
          handlePublish={self._publishRevision.bind(null, revision)}/>
      );
    });

    return (
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>User</th>
            <th>Created At</th>
            <th>Revision</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </table>
    );
  },

  _publishRevision: function(revision) {
    var self = this;

    revision.publish(function(err, template) {
      if (err) return console.error(err);
      self.setState({ template: template });
    });
  }

});
