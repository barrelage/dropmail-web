/** @jsx React.DOM */
DomainForm = React.createClass({

  getInitialState: function() {
    return { errors: {} };
  },

  render: function() {
    return (
      <form method='post' class='form-horizontal' ref='form' onSubmit={this.handleSubmit}>
        <FormField
          label='Host'
          name='host'
          placeholder='example.com'
          errors={this.state.errors.host} />
        <FormSubmit label='Add domain' />
      </form>
    )
  },

  // private

  handleSubmit: function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Domain.save($form, function(err, domain){
      if (err) return self.setState({ errors: err.attributes });
      app.goTo('domains/' + domain.get('id'));
    });

    return false;
  },

});
