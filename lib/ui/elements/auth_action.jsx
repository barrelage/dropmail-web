/** @jsx React.DOM */
AuthAction = React.createClass({
  signOut: React.autoBind(function(){
    this.props.onUserChange(null);
    app.router.navigate('#', { trigger: true });
    return false;
  }),

  signIn: React.autoBind(function(){
    app.router.navigate('#/sign_in', { trigger: true });
    return false;
  }),

  render: function(){
    if (this.props.user){
      return <a href='#' onClick={this.signOut}>Sign Out</a>;
    }

    return <a href='#' onClick={this.signIn}>Sign In</a>;
  }
});