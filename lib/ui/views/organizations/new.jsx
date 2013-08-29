/** @jsx React.DOM */
if (Views.Organizations == undefined) Views.Organizations = {};

Views.Organizations.New = React.createClass({

  getInitialState: function() {
    return { errors: {} };
  },

  render: function() {
    return (
      <div>
        <h2>Create Organization</h2>

        <form method='post' class='form-horizontal' ref='form' onSubmit={this.handleSubmit}>
          <FormField
            label='Name'
            name='name'
            placeholder='Dellsys, Inc.'
            errors={this.state.errors.name} />
          <FormSubmit label='Create Organization' />
        </form>
      </div>
    )
  },

  // private

  handleSubmit: function(){
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Organization.save($form, function(err, org){
      if (err) return self.setState({ errors: err.attributes });
      app.changeOrg(org);
    });

    return false;
  },

});

