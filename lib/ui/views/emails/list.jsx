/** @jsx React.DOM */
if (Views.Emails == undefined) Views.Emails = {};

Views.Emails.List = React.createClass({

  getInitialState: function() {
    this.fetchEmails();
    return { emails: null };
  },

  render: function() {
    var self = this;

    return (
      <div>
        <h2>Emails</h2>
        <EmailTable emails={this.state.emails} />
      </div>
    );
  },

  // private

  fetchEmails: function() {
    var self = this;

    app.client.Email.fetch(function(err, emails) {
      if (err) return console.error(err);
      self.setState({ emails: emails });
    });
  },

  showEmail: function(email) {
    app.goTo('emails/' + email.get('id'));
    return false;
  },

});
