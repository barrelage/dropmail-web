/** @jsx React.DOM **/
OrganizationList = React.createClass({

  getInitialState: function() {
    this.fetchOrgs();
    return { organizations: [] };
  },

  render: function() {
    var self = this
      , currentOrg = app.authorization.get('organization');

    function listItem(org){
      var listClass;

      if (currentOrg.get('id') === org.get('id')) {
        listClass = 'current';
      }

      return (
        <li class={listClass} onClick={app.changeOrg.bind(this, org)}>
          <a href='#'>{org.get('name')}</a>
        </li>
      );
    }

    return this.transferPropsTo(
      <ul class='organization-list'>
        {this.state.organizations.map(listItem)}

        <li class='divider'></li>
        <li onClick={this.goTo.bind(this, 'organizations/new')}>
          <a href='#'>Create Organization</a>
        </li>
      </ul>
    );
  },

  // private

  goTo: function(path) {
    if (typeof path != 'string') path = '';

    app.router.navigate('/' + path, { trigger: true });
    return false;
  },

  fetchOrgs: function() {
    var self = this;

    app.client.Organization.fetch(function(err, orgs){
      if (err) return console.error(err);
      self.setState({ organizations: orgs });
    });
  }

});
