/** @jsx React.DOM */
Pages.MarketingSplash = React.createClass({
  getInitialState: function(){
    return { errors: {} };
  },

  handleSubmit: React.autoBind(function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.User.save($form, function(err, user){
      if (err) return self.setState({ errors: err.attributes });

      self.props.onUserChange(user);

      app.client.authenticate(user);
      app.client.Authorization.save(function(err, auth){
        if (err) console.log(err); /* TODO: handle errors */

        app.client.authenticate(auth);
        $.cookie('key', auth.get('key'));
      });
    });

    return false;
  }),

  render: function(){
    var errors = this.state.errors;

    return (
      <div class='row'>
        <div class='span9'>
          <h1>Powerful transactional email management</h1>
          <p class='lead'>Empowering people to get shit done</p>
        </div>

        <div class='span3'>
          <form action='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              placeholder='First Last'
              errors={errors.name} />
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
            <FormSubmit label='Sign Up' />
          </form>
        </div>
      </div>
    );
  }
});