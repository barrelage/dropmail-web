/**
 * Page: /admin/templates/:id/edit
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Layouts
 */
var AdminLayout = require('../layout/AdminLayout');

/**
 * Components
 */
var ListItemLink = require('../components/ListItemLink')
  , FormField = require('../components/FormField')
  , Button = require('../components/Button');

/**
 * Mixins
 */
var AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin');

var AdminTemplateEdit = React.createClass({

  getInitialState: function() {
    return {
      template: new Dropmail.Template
    };
  },

  componentDidMount: function() {
    var self = this
      , editor = ace.edit('editor');

    editor.setOptions({
      maxLines: 50,
      mode: 'ace/mode/html',
      tabSize: 2
    });

    this.setState({ editor: editor });

    this._fetchTemplate(function(err, template) {
      var session = self.state.editor.getSession();

      session.setValue(template.get('html'));

      session.on('change', function(e) {
        var session = self.state.editor.getSession();

        self.state.template.set('html', session.getValue());
        self._updatePreview();
      });

      self._updatePreview();
    });
  },

  render: function() {
    var template = this.state.template;

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <ListItemLink path="/admin/templates">Templates</ListItemLink>
              <ListItemLink path={'/admin/templates/' + template.get('id')}>
                {template.get('name')}
              </ListItemLink>
              <li className="active">Edit</li>
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <form onSubmit={this._onSubmit}>
              <FormField
                label="From"
                name="from"
                value={template.get('from')}
                onChange={this._onChange} />

              <FormField
                label="Subject"
                name="subject"
                value={template.get('subject')}
                onChange={this._onChange} />

              <div className="form-group">
                <div id="editor" />
              </div>

              <div className="form-group">
                <ul className="list-inline">
                  <li>
                    <Button type="submit" action="primary" onClick={this._onSave}>
                      Save
                    </Button>
                  </li>

                  <li>
                    <SendPreview handleSend={this._sendPreview} />
                  </li>
                </ul>
              </div>
            </form>
          </div>

          <div className="col-sm-12 col-lg-6">
            <p>From: {template.get('from')}</p>
            <p>Subject: {template.get('subject')}</p>

            <iframe id="preview" ref="preview" />
          </div>
        </div>
      </AdminLayout>
    );
  },

  _onChange: function(event) {
    this.state.template.set(event.target.name, event.target.value);
    this.setState({ template: this.state.template });

    this._updatePreview();
  },

  _fetchTemplate: function(callback) {
    var self = this
      , id = this.props._route.params.id;

    Dropmail.Template.find(id, function(err, template) {
      if (err) return console.error(err);
      self.setState({ template: template });

      if (callback) callback(err, template);
    });
  },

  _updatePreview: function() {
    var self = this;

    this.state.template.preview(function(err, email) {
      if (err) return console.error(err);

      var html = window.html = email.get('html')
        , document = self.refs.preview.getDOMNode().contentDocument;

      document.open();
      document.write(html);
      document.close();
    });
  },

  _sendPreview: function(to) {
    var params = this.state.template.get('params');

    this.state.template.send(to, params, function(err, email) {
      if (err) return console.error(err);

      console.log('email sent');
    });

    return false;
  },

  _onSave: function() {
    var self = this;

    this.state.template.save(function(err, template) {
      if (err) return console.error(err);
      self.setState({ template: template });
    });

    return false;
  }

});

var SendPreview = React.createClass({

  mixins: [AuthorizationStateMixin],

  getInitialState: function() {
    return {
      hideForm: true,
      message: null
    };
  },

  render: function() {
    if (this.state.hideForm) {
      return (
        <div className='send-preview'>
          <Button onClick={this.toggleForm}>
            Send as email
          </Button>

          <div className='message'>
            {this.state.message}
          </div>
        </div>
      );
    }

    return (
      <form method='post' className='send-preview' onSubmit={this._onSubmit}>
        <div className="input-group">
          <input
            ref='to'
            className='form-control'
            type='text'
            defaultValue={this.state.currentUser.get('email')} />

          <span className="input-group-btn">
            <Button action="default" type="submit">
              Send
            </Button>

            <Button onClick={this.toggleForm}>
              Cancel
            </Button>
          </span>
        </div>

        <div className='message'>
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

  _onSubmit: function() {
    var self = this
      , to = this.refs.to.getDOMNode().value;

    this.props.handleSend(to);
    this.setState({ message: 'Email sent', hideForm: true });

    setTimeout(function() {
      self.setState({ message: null });
    }, 3000)

    return false;
  }

});

module.exports = AdminTemplateEdit;
