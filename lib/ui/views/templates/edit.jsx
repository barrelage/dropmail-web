/** @jsx React.DOM */
if (Views.Templates == undefined) Views.Templates = {};

Views.Templates.Edit = React.createClass({

  mixins: [FetchTemplateMixin],

  getInitialState: function() {
    var self = this
      , config = {
          baseHref: '/'
        , customConfig: ''
        , fullPage: true
        , allowedContent: true
        , toolbar: [
          {
            name: 'colors',
            items: [ 'TextColor', 'BGColor' ]
          }, {
            name: 'styles',
            items: [ 'Format', 'Font', 'FontSize' ]
          }, {
            name: 'basicstyles',
            items: [ 'Bold', 'Italic', 'Underline' ]
          }, {
            name: 'paragraph',
            items: [ 'NumberedList', 'BulletedList', '-', 'Outdent',
                     'Indent', '-', 'Blockquote', '-','JustifyLeft',
                     'JustifyCenter', 'JustifyRight' ]
          }, {
            name: 'insert',
            items: [ 'Table', 'HorizontalRule' ]
          }
        ]
      };

    this.fetchTemplate(function(err, template) {
      var params = JSON.stringify(template.get('params'), null, 2)
        , codeEditor = ace.edit('code_editor')
        , jsonEditor = ace.edit('json_editor')
        , visualEditor = CKEDITOR.replace('body_editor', config);

      jsonEditor.session.setValue(params);

      self.setState({
        codeEditor: codeEditor,
        jsonEditor: jsonEditor,
        visualEditor: visualEditor
      });

      self.updateVisualEditor();

      codeEditor.session.setMode("ace/mode/html");
      codeEditor.getSession().setTabSize(2);
      codeEditor.session.on('change', function(e, silent) {
        self.state.template.set('html', codeEditor.getSession().getValue());
      });

      jsonEditor.session.setMode("ace/mode/json");
      jsonEditor.getSession().setTabSize(2);
      jsonEditor.session.on('change', function(e) {
        try {
          var params = JSON.parse(jsonEditor.session.getValue());
          self.state.template.set('params', params);
        } catch (e) {
          console.error(e);
        }
      });

      visualEditor.on('change', function(e) {
        self.state.template.set('html', e.editor.getData());
      });
    });

    return {
      template: new app.client.Template,
      email: new app.client.Email,
      errors: {}
    };
  },

  render: function() {
    return (
      <div class='row'>
        <div class='col-md-12'>
          <h2>Template Edit</h2>

          <form
            method='post'
            class='form-horizontal row'
            onSubmit={this.handleSave}>

            <ul class="nav nav-tabs">
              <li class="active">
                <a href="#visual"
                  data-toggle="tab"
                  onClick={this.updateVisualEditor}>
                  Visual Editor
                </a>
              </li>
              <li>
                <a href="#code"
                  data-toggle="tab"
                  onClick={this.updateCodeEditor}>
                  Code Editor
                </a>
              </li>
              <li>
                <a href="#preview"
                  data-toggle="tab"
                  onClick={this.updatePreview}>
                  Preview
                </a>
              </li>
              <li>
                <a href="#params" data-toggle="tab">Params</a>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane active" id="visual">
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
                  <textarea id='body_editor'></textarea>
                </div>
              </div>

              <div class="tab-pane" id="code">
                <div id='code_editor' class='editor'></div>
              </div>

              <div class="tab-pane" id="preview">
                <div>
                  From: <span class='from'>{this.state.email.get('from')}</span>
                </div>

                <div>
                  Subject: <span class='subject'>{this.state.email.get('subject')}</span>
                </div>

                <iframe class='col-sm-12 preview' ref='preview' />
              </div>

              <div class="tab-pane" id="params">
                <div class='form-group'>
                  <div id='json_editor'></div>
                </div>
              </div>
            </div>

            <div class='row'>
              <div class='col-lg-12'>
                <FormSubmit label='Save' action='Saving' />
                <SendTest handleSend={this.sendPreview} />
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

  updateCodeEditor: function() {
    var html = this.state.template.get('html');
    this.state.codeEditor.getSession().setValue(html);
  },

  updateVisualEditor: function(){
    var html = this.state.template.get('html');
    this.state.visualEditor.setData(html);
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

  uploadImage: function(files, editor, welEditable) {
    var file = files[0]
      , data = new FormData();

    data.append('image', file);

    $.ajax({
        url: app.client.baseURL + '/images'
      , data: data
      , cache: false
      , contentType: false
      , processData: false
      , type: 'POST'
      , beforeSend: function (xhr) {
          var auth = app.client.credentials
            , basic = btoa(auth.key + ':');

          xhr.setRequestHeader('Authorization', 'Basic ' + basic);
        }
      , success: function(data) {
          var url = data._links.self;
          editor.insertImage(welEditable, url);
        }
    });
  },

  updateParams: function() {
    try {
      var params = JSON.parse(this.state.params.code());
      this.state.template.set('params', params);
      this.updatePreview();
    } catch (e) {
      console.error(e);
    }
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
