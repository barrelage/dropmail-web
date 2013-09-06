/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  getInitialState: function() {
    this.fetchTemplate();
    return { template: new app.client.Template, errors: {} };
  },

  componentDidUpdate: function() {
    var self = this
      , editor = ace.edit('editor');

    editor.session.setMode("ace/mode/html");
    editor.getSession().setTabSize(2);

    var updatePreview = ace.require("./lib/lang").delayedCall(function() {
      var $form = $(self.refs.form.getDOMNode())
        , value = editor.session.getValue();

      $('form textarea[name=html]').val(value);

      app.client.Template.preview($form, {}, function(err, message) {
        if (err) return console.error(err);
        $('.preview').contents().find('body').html(message.get('html'));
      });
    });

    editor.session.setValue(this.state.template.get('html'));
    updatePreview();

    editor.session.on('change', function() {
      updatePreview.schedule(500);
    });
  },

  render: function() {
    return (
      <div class='row'>
        <div class='col-md-12'>
          <h2>Template Edit</h2>

          <form
            method='post'
            class='form-horizontal'
            role='form'
            ref='form'
            onSubmit={this.handleSave}>

            <input
              type='hidden'
              name='id'
              value={this.state.template.get('id')} />

            <div class='row'>
              <div class='col-lg-6 col-sm-12'>
                <FormField
                  label='From'
                  value={this.state.template.get('from')} />

                <FormField
                  label='Subject'
                  value={this.state.template.get('subject')} />

                <div class='form-group'>
                  <div id='editor'></div>

                  <textarea
                    class='hidden'
                    name='html'
                    value={this.state.template.get('html')} />
                </div>

                <FormSubmit label='Save' action='Saving' />
              </div>

              <div class='col-lg-6 col-sm-12'>
                <iframe class='col-sm-12 preview' ref='preview' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  },

  // private

  handleSave: function() {
    var self = this
      , $form = $(this.refs.form.getDOMNode());

    app.client.Template.save($form, function(err, template){
      if (err) return self.setState({ errors: err.attributes });
      self.setState({ template: template });
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

