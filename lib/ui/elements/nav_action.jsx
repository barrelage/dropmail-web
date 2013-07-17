/** @jsx React.DOM */
NavActions = React.createClass({
  render: function(){
    var actions = [
      <li><a href='/sign_in' onClick={this.signIn}>Sign In</a></li>
    ];

    if (this.props.user){
      actions = [
        <li>
          <span class='welcome'>Welcome, {this.props.user.get('name')}</span>
        </li>,
        <li><a href='/' onClick={this.signOut}>Sign Out</a></li>
      ];
    }

    if (this.props.organization){
      actions.unshift(
        <li class='dropdown'>
          <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
            {this.props.organization.get('name')}
            <b class='caret'></b>
          </a>

          <OrganizationList
            class='dropdown-menu'
            organizations={this.props.organizations}
            onOrgChange={this.props.onOrgChange}/>
        </li>
      );
    }

    return (
      <ul class='nav pull-right'>{actions}</ul>
    );
  },

  signOut: function(){
    app.client.endSession();
    this.props.onUserChange();
    app.router.navigate('/', { trigger: true });
    return false;
  },

  signIn: function(){
    app.router.navigate('/sign_in', { trigger: true });
    return false;
  }
});

