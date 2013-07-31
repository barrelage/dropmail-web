/** @jsx React.DOM */
Views.Templates = React.createClass({

  getInitialState: function(){
    this.reloadTemplates();

    return {
      errors: {},
      templates: []
    };
  },

  render: function(){
    if (!this.props.session) return app.requireSession();

    return (
      <div class='row'>
        <NavigationColumn current='organizations' />

        <div class='span6'>
          {this.listTemplates()}
        </div>
        <div class='span4'>
          <h3>Create a template</h3>
          <form method='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              placeholder='Order Confirmation'
              errors={this.state.errors.name} />
            <FormField
              label='Slug'
              name='slug'
              placeholder='order_confirmation'
              errors={this.state.errors.name} />
            <FormSubmit label='Create Template' />
          </form>
        </div>
      </div>
    );
  },

  // private

  handleSubmit: function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Template.save($form, function(err, template){
      var templates = self.state.templates;

      if (err) return self.setState({ errors: err.attributes });

      templates.unshift(template);
      self.setState({ templates: templates });
    });

    return false;
  },

  reloadTemplates: function(){
    var self = this;

    app.client.Template.fetch(function(err, templates){
      self.setState({ templates: templates });
    });
  },

  listTemplates: function(){
    var templates = this.state.templates;

    if (!templates.length) {
      return (
        <div>
          <h3>This organization does not have a template</h3>
          <div>To get started, create a template.</div>
        </div>
      );
    }

    return (
      <div>
        <h3>Current Templates</h3>
        <TemplateList templates={templates} />
      </div>
    );
  }

});
