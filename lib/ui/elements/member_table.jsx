/** @jsx React.DOM */
MemberTable = React.createClass({

  render: function() {
    var self = this
      , members = this.props.members;

    function listItem(member){
      return (
        <tr>
          <td>{member.get('name')}</td>
          <td>{member.get('email')}</td>
          <td>{member.get('roles').join(', ')}</td>
          <td>{member.get('created_at')}</td>
        </tr>
      );
    }

    if (!members) {
      return (
        <div class='alert alert-info'>
          Loading.. 
        </div>
      );
    }

    return (
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {this.props.members.map(listItem)}
        </tbody>
      </table>
    );
  },

});
