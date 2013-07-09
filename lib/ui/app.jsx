/** @jsx React.DOM */
Pages = {};

App = React.createClass({
  getInitialState: function(){
    var self = this;

    app.client.startSession(function(err, user) {
      self.handleUserChange(user);
    });

    return { user: app.client.authenticatedUser };
  },

  render: function(){
    return (
      <div class='layout'>
        <div class='row'>
          <div class='span12'>
            <div class='navbar'>
              <div class='navbar-inner'>
                <AuthAction user={this.state.user} onUserChange={this.handleUserChange} />
              </div>
            </div>
            <div class='header-logo'>
              <a href='/' onClick={this.goHome}>Dropmail</a>
            </div>
          </div>
        </div>

        {this.props.component({ user: this.state.user, onUserChange: this.handleUserChange })}
      </div>
    );
  },

  goHome: React.autoBind(function() {
    app.router.navigate('/', { trigger: true });
    return false;
  }),

  handleUserChange: React.autoBind(function(user){
    this.setState({ user: user });
    return false;
  })

});

