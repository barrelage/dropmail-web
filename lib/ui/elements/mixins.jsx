/** @jsx React.DOM */

var FetchTemplateMixin = {
  fetchTemplate: function(callback) {
    var self = this;

    app.client.Template.find(this.props.slug, function(err, template) {
      if (err) app.goTo('templates');
      self.setState({ template: template });

      if (callback) callback(err, template);
    });
  }
};

