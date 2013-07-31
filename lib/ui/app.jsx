/** @jsx React.DOM */
Views = {};

App = React.createClass({
  getDefaultProps: function(){
    return { viewProps: {} };
  },

  getInitialState: function(){
    var self = this;

    app.client.on('change:session', this.handleSessionChange.bind(this));
    app.client.startSession();

    return {
      session: app.client.session,
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
                      session={this.state.session}
                      organizations={this.state.organizations} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          this.props.view($.extend({
            session: this.state.session,
            organizations: this.state.organizations
          }, this.props.viewProps))
        }
      </div>
    );
  },

  // private

  goHome: function() {
    app.router.navigate('/', { trigger: true });
    return false;
  },

  handleSessionChange: function(session){
    if (session) {
      if (this.state && this.state.session == session) { return false; }

      var self = this;
      app.client.Organization.fetch(function(err, orgs){
        if (err) console.error(err);
        self.setState({ session: session, organizations: orgs });
      });
    } else {
      this.setState({ session: null, organizations: [] });
    }

    return false;
  }

});
