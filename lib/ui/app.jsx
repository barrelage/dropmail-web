/** @jsx React.DOM */
Pages = {};

App = React.createClass({
  getInitialState: function(){
    var self = this;

    app.client.loadCurrentUser(function(user){
      self.handleUserChange(user);
    });

    return { user: null };
  },

  render: function(){
    return (
      <div class='layout'>
        <div class='row'>
          <div class='span12'>
            <div class='navbar'>
              <ul class='nav pull-right actions'>
                <li>
                  <AuthAction user={this.state.user} onUserChange={this.handleUserChange} />
                </li>
              </ul>
            </div>
            <div class='header-logo'>
              <a href='/'>Dropmail</a>
            </div>
          </div>
        </div>

        {this.props.component({ user: this.state.user, onUserChange: this.handleUserChange })}
      </div>
    );
  },

  signIn: React.autoBind(function(credentials){
    app.client.authenticate(credentials);

    app.client.Authorization.save(function(err, auth){
      if (err) console.log(err); /* TODO: handle errors */

      app.client.authenticate(auth);
      $.cookie('key', auth.get('key'));
    });

    return false;
  }),

  handleUserChange: React.autoBind(function(user){
    this.setState({ user: user });
    if (!user) $.removeCookie('key');
    return false;
  })

});

