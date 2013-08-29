/** @jsx React.DOM */
if (Views.Account == undefined) Views.Account = {};

Views.Account.Show = React.createClass({

  getInitialState: function() {
    this.fetchUser();
    return { user: app.authorization.get('user') };
  },

  render: function() {
    return (
      <div>
        <h2>Account</h2>
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-2 control-label">
              Name
            </label>

            <div class="col-lg-10">
              {this.state.user.get('name')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Email
            </label>

            <div class="col-lg-10">
              {this.state.user.get('email')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Signed up at
            </label>

            <div class="col-lg-10">
              {this.state.user.get('created_at')}
            </div>
          </div>
        </form>
      </div>
    );
  },

  // private

  fetchUser: function() {
    var self = this;

    app.client.User.me(function(err, user){
      if (err) return console.error(err);
      self.setState({ user: user });
    });
  }
});

