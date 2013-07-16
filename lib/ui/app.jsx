
/** @jsx React.DOM */
Pages = {};

App = React.createClass({
  getInitialState: function(){
    var self = this;

    app.client.startSession(function(err, user) {
      self.handleUserChange(user);
    });

    return {
      user: app.client.authenticatedUser,
      organizations: []
    };
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

        {this.props.component({
          user: this.state.user,
          organizations: this.state.organizations,
          onUserChange: this.handleUserChange
        })}
      </div>
    );
  },

  goHome: function() {
    app.router.navigate('/', { trigger: true });
    return false;
  },

  handleUserChange: function(user){
    var self = this;

    this.setState({ user: user });

    if (user) {
      app.client.Organization.fetch(function(err, orgs){
        if (err) console.log(err);
        self.setState({ organizations: orgs });
      });
    } else {
      self.setState({ organizations: [] });
    }

    return false;
  }

});
