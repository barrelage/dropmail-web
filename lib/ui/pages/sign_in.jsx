/** @jsx React.DOM */
Pages.SignIn = React.createClass({
  getInitialState: function(){
    return { errors: {} };
  },

  handleSubmit: React.autoBind(function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Authorization.save($form, function(err, auth){
      if (err) return self.setState({ errors: err });

      app.client.authenticate(auth);
      $.cookie('key', auth.get('key'));

      app.client.loadCurrentUser(function(user){
        self.props.onUserChange(user);
        app.router.navigate('/', { trigger: true });
      });
    });

    return false;
  }),

  render: function(){
    var errors = this.state.errors.attributes || {};

    return (
      <div class='row'>
        <div class='span4'></div>

        <div class='span4'>
          <AlertMessage text={this.state.errors.message} context='warning' />

          <form action='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              name='username'
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

        <div class='span4'></div>
      </div>
    );
  }
});
