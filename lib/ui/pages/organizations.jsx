/** @jsx React.DOM */
Pages.Organizations = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  render: function(){
    return (
      <div class='row'>
        <div class='span8'>
          {this.listOrganizations()}
        </div>
        <div class='span4'>
          <h3>Create an Organization</h3>
          <form method='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              placeholder='Name'
              errors={this.state.errors.name} />
            <FormSubmit label='Create Organization' />
          </form>
        </div>
      </div>
    );
  },

  handleSubmit: React.autoBind(function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Organization.save($form, function(err, org){
      if (err) return self.setState({ errors: err.attributes });
      self.props.onUserChange(self.props.user);
    });

    return false;
  }),

  listOrganizations: function(){
    var orgs = this.props.organizations;

    if (!orgs.length) {
      return (
        <div>
          <h3>Welcome to Dropmail</h3>
          <div>To get started, create an organization.</div>
        </div>
      );
    }

    function listOrganization(org){
      return <li>{org.get('name')}</li>;
    }

    return (
      <div>
        <h3>Your Organizations</h3>
        <ul>{orgs.map(listOrganization)}</ul>
      </div>
    );
  },

  onUserChange: function(user){
    if (!user) return app.router.requireUser();
  }

});
