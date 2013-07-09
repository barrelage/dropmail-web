/** @jsx React.DOM */
AuthAction = React.createClass({
  signOut: React.autoBind(function(){
    app.client.endSession();
    this.props.onUserChange();
    app.router.navigate('/', { trigger: true });
    return false;
  }),

  signIn: React.autoBind(function(){
    app.router.navigate('/sign_in', { trigger: true });
    return false;
  }),

  render: function(){
    var welcome
      , actionLink = <a href='/sign_in' onClick={this.signIn}>Sign In</a>;

    if (this.props.user) {
      welcome = (
        <span class='welcome'>
          { this.props.user.get('name') } ({ this.props.user.get('email') })
        </span>
      );

      actionLink = <a href='/' onClick={this.signOut}>Sign Out</a>;
    }

    return (
      <ul class='nav pull-right actions'>
        <li>{ welcome }</li>
        <li>{ actionLink }</li>
      </ul>
    );
  }
});
