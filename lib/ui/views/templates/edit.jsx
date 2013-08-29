/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  getInitialState: function() {
    this.fetchTemplate();
    return { template: new app.client.Template, errors: {} };
  },

  render: function() {
    return (
      <div>
        <h2>Template Edit</h2>

        <form
          method='post'
          class='form-horizontal'
          role='form'
          ref='form'
          onSubmit={this.handleSave}>

          <input name='id' type='hidden' value={this.state.template.get('id')} />

          <FormField
            label='From'
            value={this.state.template.get('from')} />

          <FormField
            label='Subject'
            value={this.state.template.get('subject')} />

          <div class='form-group'>
            <textarea
              class='col-lg-6 col-sm-12 editor'
              name='html'
              onChange={this.handleChange}
              ref='editor'
              value={this.state.template.get('html')} />

            <iframe
              class='col-lg-6 col-sm-12 preview'
              ref='preview' />

          </div>

          <div class='form-group'>
            <FormSubmit label='Save' action='Saving' />
          </div>
        </form>
      </div>
    );
  },

  // private

  componentDidUpdate: function() {
    var preview = this.refs.preview.getDOMNode();
    preview.contentDocument.body.innerHTML = this.state.template.get('html');
  },

  handleChange: function() {
    var value = this.refs.editor.getDOMNode().value
      , template = this.state.template.set('html', value);

    this.setState({ template: template });
  },

  handleSave: function() {
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Template.save($form, function(err, template){
      if (err) return self.setState({ errors: err.attributes });
      console.log('saved');
    });

    return false;
  },

  fetchTemplate: function() {
    var self = this;

    app.client.Template.find(this.props.slug, function(err, template) {
      if (err) return console.error(err);
      self.setState({ template: template });
    });
  }

});

