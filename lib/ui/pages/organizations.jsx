/** @jsx React.DOM */
Pages.Organizations = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  render: function(){
    if (!this.props.user) return app.requireUser();

    return (
      <div class='row'>
        <div class='span8'>
          {this.listOrganizations()}
        </div>
        <div class='span4'>
          <h3>Create an organization</h3>
          <form method='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              placeholder='Acme Inc.'
              errors={this.state.errors.name} />
            <FormSubmit label='Create Organization' />
          </form>
        </div>
      </div>
    );
  },

  // private

  handleSubmit: function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Organization.save($form, function(err, org){
      if (err) return self.setState({ errors: err.attributes });
      self.props.onOrgChange(org);
    });

    return false;
  },

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

    return (
      <div>
        <h3>Current Organizations</h3>
        <OrganizationList
          organizations={orgs}
          onOrgChange={this.props.onOrgChange} />
      </div>
    );
  }

});
