/** @jsx React.DOM */
Pages = {};

App = React.createClass({
  getInitialState: function(){
    this.loadCurrentUser();
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
    dropmail.authenticate(credentials);

    dropmail.Authorization.save(function(err, auth){
      if (err) console.log(err); /* TODO: handle errors */

      dropmail.authenticate(auth);
      $.cookie('key', auth.get('key'));
    });

    return false;
  }),

  handleUserChange: React.autoBind(function(user){
    this.setState({ user: user });
    if (!user) $.removeCookie('key');
    return false;
  }),

  /*
   * uses the key stored in the a cookie to set user state
   */
  loadCurrentUser: function(){
    var self = this
      , key = $.cookie('key');

    if (!key) return;
    dropmail.credentials = { key: key };

    dropmail.User.me(function(err, user){
      if (err) return console.log(err);
      self.handleUserChange(user);
    });
  },
});

