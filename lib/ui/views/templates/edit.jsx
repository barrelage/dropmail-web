/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  getInitialState: function() {
    this.fetchTemplate();

    return {
      template: new app.client.Template,
      message: new app.client.Message,
      errors: {}
    };
  },

  componentDidMount: function() {
    var self = this
      , editor = ace.edit('editor');

    editor.session.setMode("ace/mode/html");
    editor.getSession().setTabSize(2);

    this.setState({ editor: editor });
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
                  name='from'
                  label='From'
                  value={this.state.template.get('from')}
                  onChange={this.handleChange } />

                <FormField
                  name='subject'
                  label='Subject'
                  value={this.state.template.get('subject')}
                  onChange={this.handleChange} />

                <div class='form-group'>
                  <div id='editor'></div>
                </div>

                <FormSubmit label='Save' action='Saving' />
              </div>

              <div class='col-lg-6 col-sm-12'>
                <div>
                  From: <span class='from'>{this.state.message.get('from')}</span>
                </div>

                <div>
                  Subject: <span class='subject'>{this.state.message.get('subject')}</span>
                </div>

                <iframe class='col-sm-12 preview' ref='preview' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  },

  // private

  handleChange: function(event) {
    this.state.template.set(event.target.name, event.target.value);
    this.setState({ template: this.state.template });

    this.updatePreview();
  },

  updatePreview: function() {
    var self = this
      , $preview = $(this.refs.preview.getDOMNode());

    this.state.template.preview({}, function(err, message) {
      if (err) return console.error(err);

      $preview.contents().find('body').html(message.get('html'));
      self.setState({ message: message });
    });
  },

  handleSave: function() {
    var self = this;

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

      self.state.editor.session.setValue(template.get('html'));

      self.state.editor.session.on('change', function(e) {
        self.state.template.set('html', self.state.editor.session.getValue());
        self.updatePreview();
      });

      self.setState({ template: template });

      self.updatePreview();
    });
  }

});

