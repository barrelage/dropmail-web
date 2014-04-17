/** @jsx React.DOM */
EmailTable = React.createClass({

  render: function() {
    var self = this
      , emails = this.props.emails;

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

    if (!emails[0]) {
      return (
        <div class='alert'>
          No emails have been sent.
          You can send a sample email from the template editor.
        </div>
      );
    }

    return (
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
    );
  },

  showEmail: function(email) {
    app.goTo('emails/' + email.get('id'));
    return false;
  }

});
