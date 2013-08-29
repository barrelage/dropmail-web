/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.List = React.createClass({

  getInitialState: function() {
    this.fetchTemplates();
    return { templates: null };
  },

  render: function() {
    return (
      <div>
        <h2>Templates</h2>
        <TemplateTable templates={this.state.templates} />

        <h3>New Template</h3>
        <TemplateForm />
      </div>
    );
  },

  // private

  fetchTemplates: function() {
    var self = this;

    app.client.Template.fetch(function(err, templates){
      if (err) return console.error(err);
      self.setState({ templates: templates });
    });
  },

});
