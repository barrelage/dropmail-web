/** @jsx React.DOM */
AuthAction = React.createClass({
  signOut: React.autoBind(function(){
    this.props.onUserChange(null);
    return false;
  }),

  render: function(){
    if (this.props.user){
      return <a href='#' onClick={this.signOut}>Sign Out</a>;
    }

    return <a href='/sign_in'>Sign In</a>;
  }
});
