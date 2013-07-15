/** @jsx React.DOM */
Pages.SignIn = React.createClass({
  getInitialState: function(){
    return { errors: {} };
  },

  handleSubmit: React.autoBind(function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.startSession($form, function(err, user){
      if (err) return self.setState({ errors: err });

      self.props.onUserChange(user);
      app.router.navigate('/', { trigger: true });
    });

    return false;
  }),

  render: function(){
    var errors = this.state.errors.attributes || {};

    return (
      <div class='row'>
        <div class='offset4 span4'>
          <AlertMessage text={this.state.errors.message} context='warning' />

          <form action='post' ref='form' class='signin' onSubmit={this.handleSubmit}>
            <FormField
              name='email'
              label='Email'
              placeholder='user@example.com'
              errors={errors.email} />
            <FormField
              label='Password'
              name='password'
              placeholder='••••••••'
              type='password'
              errors={errors.password} />
            <FormSubmit label='Sign In' />
          </form>
        </div>
      </div>
    );
  }
});
