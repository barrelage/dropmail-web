/** @jsx React.DOM */
DropmailApp = React.createClass({
  getInitialState: function(){
    var self = this;

    /* set user if we have credentials */
    if (dropmail.credentials){
      dropmail.User.me(function(err, user){
        if (err) return alert(err); // TODO: log user out
        self.handleUserChange(user);
      });
    }

    return {
      user: null,
      content: SplashPage({ onUserChange: this.handleUserChange })
    };
  },

  render: function(){
    return (
      <div class='layout'>
        <div class='row'>
          <div class='span12'>
            <div class='navbar'>
              <HeaderNav actions={this.actions()} />
            </div>
            <div class='header-logo'>
              <a href='/'>Dropmail</a>
            </div>
          </div>
        </div>

        {this.state.content}
      </div>
    );
  },

  actions: function(){
    var items = [
      <a href='/features'>Features</a>,
      <a href='/pricing'>Pricing</a>,
      <a href='/sign_in'>Sign In</a>,
    ];

    if (this.state.user) {
      items = [
        <a href='/'>{this.state.user.get('name')}</a>,
        <a href='/sign_out' onClick={this.signOut}>Sign Out</a>
      ];
    }
    return items;
  },

  signIn: React.autoBind(function(credentials){
    dropmail.authenticate(credentials);

    dropmail.Authorization.save(function(err, auth){
      if (err) console.log(err); /* TODO: handle errors */

      dropmail.authenticate(auth);
      $.cookie('key', auth.get('key'));
    });

    return false;
  }),

  handleUserChange: React.autoBind(function(user){
    var pageOptions = { onUserChange: this.handleUserChange }
      , content = SplashPage(pageOptions);

    if (user) content = AppPage(pageOptions);
    this.setState({ user: user, content: content });

    return false;
  }),

  /*
   * click handler to sign user out and redirect them to marketing
   * splash page
   */
  signOut: React.autoBind(function(){
    $.removeCookie('key');
    this.handleUserChange(null);

    return false;
  })
});

HeaderNav = React.createClass({
  render: function(){
    function HeaderNavItem(object){
      return <li>{object}</li>
    }

    return (
      <ul class='nav pull-right actions'>
        {this.props.actions.map(HeaderNavItem)}
      </ul>
    );
  }
});

SplashPage = React.createClass({
  getInitialState: function(){
    return { errors: {} };
  },

  handleSubmit: React.autoBind(function(){
    var self = this
      , attributes = {}
      , user;

    for (var name in this.refs){
      var value = $(this.refs[name].getDOMNode()).find('input').val();
      attributes[name] = value.trim();
    }

    user = new dropmail.User(attributes);
    user.save(function(err, user){
      if (err) return self.setState({ errors: err.attributes });
      self.props.onUserChange(user);

      dropmail.authenticate(user);
      dropmail.Authorization.save(function(err, auth){
        if (err) console.log(err); /* TODO: handle errors */

        dropmail.authenticate(auth);
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
          <form action='post' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              ref='name'
              placeholder='First Last'
              errors={errors.name} />
            <FormField
              name='email'
              label='Email'
              ref='email'
              placeholder='user@example.com'
              errors={errors.email} />
            <FormField
              label='Password'
              name='password'
              ref='password'
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

AppPage = React.createClass({
  render: function(){
    return (
      <div class='row'>
        <div class='span12'>
          This is the app, yo.
        </div>
      </div>
    );
  }
});
