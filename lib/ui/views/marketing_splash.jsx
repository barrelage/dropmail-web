/** @jsx React.DOM */
Views.MarketingSplash = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  render: function(){
    var errors = this.state.errors;

    return (
      <div class='row'>
        <div class='span9'>
          <h1>Powerful transactional email management</h1>
          <p class='lead'>Empowering people to get shit done</p>
        </div>

        <div class='span3'>
          <form method='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              placeholder='First Last'
              errors={errors.name} />
            <FormField
              name='email'
              label='Email'
              placeholder='user@example.com'
              type='email'
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
  },

  // private

  handleSubmit: function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.User.save($form, function(err, user){
      if (err) return self.setState({ errors: err.attributes });
      app.client.startSession({ credentials: user });
    });

    return false;
  }

});
