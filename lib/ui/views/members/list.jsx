/** @jsx React.DOM */
if (Views.Members == undefined) Views.Members = {};

Views.Members.List = React.createClass({

  getInitialState: function() {
    this.fetchMembers();
    return { members: null };
  },

  render: function() {
    return (
      <div>
        <h2>Members</h2>
        <MemberTable members={this.state.members} />
      </div>
    );
  },

  // private

  fetchMembers: function() {
    var self = this;

    app.client.Member.fetch(function(err, members){
      if (err) return console.error(err);
      self.setState({ members: members });
    });
  },

});

