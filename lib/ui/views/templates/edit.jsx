/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  mixins: [FetchTemplateMixin],

  getInitialState: function() {
    var self = this;

    this.fetchTemplate(function(err, template) {
      self.state.editor.session.setValue(template.get('html'));

      self.state.editor.session.on('change', function(e) {
        self.state.template.set('html', self.state.editor.session.getValue());
        self.updatePreview();
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

    this.state.template.preview({ name: 'Tyler' }, function(err, email) {
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
    var params = { name: 'Tyler' };
    params.to = to;

    this.state.template.send(params, function(err, email) {
      if (err) return console.error(err);

      console.log('email sent');
    });

    return false;
  }
});

SendTest = React.createClass({
  getInitialState: function() {
    return { hideForm: true };
  },

  render: function() {
    if (this.state.hideForm) {
      return (
        <div class='send-preview'>
          <button class='btn btn-default' onClick={this.toggleForm}>
            Send as email
          </button>
        </div>
      );
    }

    return (
      <div class='send-preview'>
        <input
          ref='to'
          class='form-control'
          type='text'
          placeholder='johnny@example.com' />

        <button class='btn btn-primary' onClick={this.sendForm}>
          Send
        </button>

        <button class='btn btn-default' onClick={this.toggleForm}>
          Cancel
        </button>
      </div>
    );
  },

  // private

  toggleForm: function() {
    this.setState({ hideForm: !this.state.hideForm });

    return false;
  },

  sendForm: function() {
    this.props.handleSend(this.refs.to.getValue());
    this.toggleForm();

    return false;
  }

});
