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
      organization: null,
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
                <div class='container'>
                  <a href='/' class='brand' onClick={this.goHome}>Dropmail</a>
                  <div class='nav-collapse collapse'>
                    <NavActions
                      user={this.state.user}
                      organization={this.state.organization}
                      organizations={this.state.organizations}
                      onUserChange={this.handleUserChange}
                      onOrgChange={this.handleOrgChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          this.props.component({
            user: this.state.user,
            organization: this.state.organization,
            organizations: this.state.organizations,
            onUserChange: this.handleUserChange,
            onOrgChange: this.handleOrgChange
          })
        }
      </div>
    );
  },

  // private

  goHome: function() {
    app.router.navigate('/', { trigger: true });
    return false;
  },

  handleUserChange: function(user){
    var self = this;

    this.setState({ user: user });

    if (user) {
      app.client.Organization.fetch(function(err, orgs){
        if (err) console.error(err);
        self.setState({ organizations: orgs, organization: orgs[0] });
      });
    } else {
      self.setState({ organizations: [], organization: null });
    }

    return false;
  },

  handleOrgChange: function(org){
    var orgs = this.state.organizations;

    if (orgs.indexOf(org) < 0) orgs.push(org);
    this.setState({ organizations: orgs, organization: org });

    return false;
  }

});
