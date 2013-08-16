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
      // don't display current organization in list
      if (currentOrg.get('id') === org.get('id')) return;

      return (
        <li onClick={self.changeOrg.bind(this, org)}>
          <a href='#'>{org.get('name')}</a>
        </li>
      );
    }

    return this.transferPropsTo(
      <ul>
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

  changeOrg: function(org) {
    var self = this
      , options = { organization_id: org.get('id') };

    app.client.createSession(options, function(err, auth) {
      if (err) return console.error(err);

      // go home incase this page is specific to the org
      self.goTo();

      window.location.reload();
    });

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
