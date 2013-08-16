/** @jsx React.DOM **/
TemplateForm = React.createClass({

  getInitialState: function() {
    return { errors: {} };
  },

  render: function() {
    return (
      <form method='post' class='form-horizontal' ref='form' onSubmit={this.handleSubmit}>
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
    )
  },

  // private

 handleSubmit: function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Template.save($form, function(err, template){
      var templates = self.state.templates;

      if (err) return self.setState({ errors: err.attributes });
      app.goTo('templates/' + template.get('slug'));
    });

    return false;
  },

});
