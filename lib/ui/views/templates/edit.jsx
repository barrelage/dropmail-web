/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  getInitialState: function() {
    this.fetchTemplate();
    return { template: new app.client.Template, errors: {} };
  },

  componentDidUpdate: function() {
    var editor = ace.edit('editor');
    editor.session.setMode("ace/mode/html");
    editor.getSession().setTabSize(2);

    var updatePreview = ace.require("./lib/lang").delayedCall(function() {
      var value = editor.session.getValue();
      $('.preview').contents().find('body').html(value);
      $('form textarea[name=html]').val(value);
    });

    updatePreview();

    editor.session.on('change', function() {
      updatePreview.schedule(500);
    });
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
            <div id='editor'>{this.state.template.get('html')}</div>

            <textarea
              class='hidden'
              name='html'
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

