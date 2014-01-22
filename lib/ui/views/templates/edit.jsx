/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  mixins: [FetchTemplateMixin],

  getInitialState: function() {
    var self = this;

    this.fetchTemplate(function(err, template) {
      var params = JSON.stringify(template.get('params'), null, 2);

      self.state.editor.session.setValue(template.get('html'));
      self.state.editor.session.on('change', function(e) {
        self.state.template.set('html', self.state.editor.session.getValue());
        self.updatePreview();
      });

      self.state.jsonEditor.session.setValue(params);
      self.state.jsonEditor.session.on('change', function(e) {
        try {
          var params = JSON.parse(self.state.jsonEditor.session.getValue());
          self.state.template.set('params', params);
          self.updatePreview();
        } catch (e) {
          console.error(e);
        }
      });

      self.updatePreview();
    });

    return {
      template: new app.client.Template,
      email: new app.client.Email,
      errors: {}
    };
  },

  componentDidMount: function() {
    var self = this
      , editor = ace.edit('editor')
      , jsonEditor = ace.edit('json-editor');

    editor.session.setMode("ace/mode/html");
    editor.getSession().setTabSize(2);

    jsonEditor.session.setMode("ace/mode/json");
    jsonEditor.getSession().setTabSize(2);

    this.setState({ editor: editor, jsonEditor: jsonEditor });
  },

  render: function() {
    return (
      <div class='row'>
        <div class='col-md-12'>
          <h2>Template Edit</h2>

          <form
            method='post'
            class='form-horizontal'
            onSubmit={this.handleSave}>

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

                <div class='form-group'>
                  <div id='json-editor'></div>
                </div>

                <FormSubmit label='Save' action='Saving' />

                <SendTest handleSend={this.sendPreview} />
              </div>

              <div class='col-lg-6 col-sm-12'>
                <div>
                  From: <span class='from'>{this.state.email.get('from')}</span>
                </div>

                <div>
                  Subject: <span class='subject'>{this.state.email.get('subject')}</span>
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

    this.state.template.preview(function(err, email) {
      if (err) return console.error(err);

      $preview.contents().find('body').html(email.get('html'));
      self.setState({ email: email });
    });
  },

  handleSave: function(callback) {
    var self = this;

    this.state.template.save(function(err, template){
      if (err) return self.setState({ errors: err.attributes });
      self.setState({ template: template });

      if (_.isFunction(callback)) callback(err, template);
    });

    return false;
  },

  sendPreview: function(to) {
    var params = this.state.template.get('params');

    this.state.template.send(to, params, function(err, email) {
      if (err) return console.error(err);

      console.log('email sent');
    });

    return false;
  }
});

SendTest = React.createClass({
  getInitialState: function() {
    return {
      email: app.authorization.get('user').get('email'),
      hideForm: true,
      message: null
    };
  },

  render: function() {
    if (this.state.hideForm) {
      return (
        <div class='send-preview'>
          <button class='btn btn-default' onClick={this.toggleForm}>
            Send as email
          </button>
          <div class='send-preview-message'>
            {this.state.message}
          </div>
        </div>
      );
    }

    return (
      <form method='post' class='send-preview' onSubmit={this.handleSend}>
        <input
          ref='to'
          class='form-control'
          type='text'
          defaultValue={app.authorization.get('user').get('email')} />

        <button type='submit' class='btn btn-primary'>
          Send
        </button>

        <button class='btn btn-default' onClick={this.toggleForm}>
          Cancel
        </button>

        <div class='send-preview-message'>
          {this.state.message}
        </div>
      </form>
    );
  },

  // private

  toggleForm: function() {
    this.setState({ hideForm: !this.state.hideForm, message: null });

    return false;
  },

  handleSend: function() {
    this.props.handleSend(this.refs.to.getDOMNode().value);
    this.setState({ message: 'Email sent' });

    return false;
  }

});
