/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Show = React.createClass({

  mixins: [FetchTemplateMixin],

  getInitialState: function() {
    this.fetchTemplate();
    return { template: new app.client.Template };
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
      </div>
    );
  },

  // private

  goToEdit: function() {
    app.goTo('templates/' + this.props.slug + '/edit');
    return false;
  }
});
