/** @jsx React.DOM */
Pages.Index = React.createClass({
  getInitialState: function(){
    return { errors: {} };
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

  render: function(){
    var errors = this.state.errors;

    if (!this.props.user) return Pages.MarketingSplash(this.props);

    function createOrganization(org){
      return <li>{org.get('name')}</li>;
    }

    return (
      <div class='row'>
        <div class='span4'>
          <h3>Create an organization</h3>
          <form action='post' ref='form' class='signup' onSubmit={this.handleSubmit}>
            <FormField
              label='Name'
              name='name'
              placeholder='Name'
              errors={errors.name} />
            <FormSubmit label='Create Organization' />
          </form>
        </div>
        <div class='span8'>
          <h3>Current Organizations</h3>
          <ul>
            {this.props.organizations.map(createOrganization)}
          </ul>
        </div>
      </div>
    );
  }
});

