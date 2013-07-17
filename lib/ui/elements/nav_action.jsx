/** @jsx React.DOM */
NavActions = React.createClass({
  render: function(){
    var actions = [
      <li><a href='/sign_in' onClick={this.signIn}>Sign In</a></li>
    ];

    if (this.props.session){
      var user = this.props.session.get('user')
        , organization = this.props.session.get('organization');

      actions = [
        <li>
          <span class='welcome'>Welcome, {user.get('name')}</span>
        </li>,
        <li><a href='/' onClick={this.signOut}>Sign Out</a></li>
      ];

      if (organization){
        actions.unshift(
          <li class='dropdown'>
            <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
              {organization.get('name')}
              <b class='caret'></b>
            </a>

            <OrganizationList
              class='dropdown-menu'
              organizations={this.props.organizations} />
          </li>
        );
      }
    }

    return (
      <ul class='nav pull-right'>{actions}</ul>
    );
  },

  signOut: function(){
    app.client.endSession();
    app.router.navigate('/', { trigger: true });
    return false;
  },

  signIn: function(){
    app.router.navigate('/sign_in', { trigger: true });
    return false;
  }
});

