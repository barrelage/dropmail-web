/** @jsx React.DOM */
if (Views.Emails == undefined) Views.Emails = {};

Views.Emails.List = React.createClass({

  getInitialState: function() {
    this.fetchEmails();
    return { emails: null };
  },

  render: function() {
    var self = this
      , emails = this.state.emails;

    function listItem(email) {
      return (
        <tr onClick={self.showEmail.bind(this, email)}>
          <td>{email.get('to')}</td>
          <td>{email.get('subject')}</td>
          <td>{email.get('send_at')}</td>
        </tr>
      );
    }

    if (!emails) {
      return (
        <div class='alert alert-info'>
          Loading...
        </div>
      )
    }

    if (!emails[0]){
      return (
        <div class='alert'>
          No emails have been sent.
          You can send a sample email from the template editor.
        </div>
      );
    }

    return (
      <div>
        <h2>Emails</h2>
          <table class='table table-striped'>
            <thead>
              <tr>
                <th>To</th>
                <th>Subject</th>
                <th>Sent At</th>
              </tr>
            </thead>

            <tbody>
              {emails.map(listItem)}
            </tbody>
          </table>
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
