/** @jsx React.DOM */
Pages.Index = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  render: function(){
    if (!this.props.user) return Pages.MarketingSplash(this.props);

    return (
      <div>Welcome back!</div>
    );
  },

  onUserChange: function(user){
    if (user) {
      if (!this.props.organizations.length) {
        return app.router.navigate('/organizations', { trigger: true });
      }
    }
  }

});
