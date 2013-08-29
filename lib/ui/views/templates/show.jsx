/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Show = React.createClass({

  getInitialState: function() {
    this.fetchTemplate();
    return { template: new app.client.Template };
  },

  render: function() {
    return (
      <div>

        <h2>Show Template</h2>

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
              Created at
            </label>

            <div class="col-lg-10">
              {this.state.template.get('created_at')}
            </div>
          </div>
        </form>
      </div>
    );
  },

  // private

  fetchTemplate: function() {
    var self = this;

    app.client.Template.find(this.props.slug, function(err, template) {
      if (err) return console.error(err);
      self.setState({ template: template });
    });
  }
});

