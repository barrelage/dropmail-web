/**
 * Page: /admin/members
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
  , Button = require('../components/Button')
  , Link = require('../components/Link');

var AdminMembers = React.createClass({

  getInitialState: function() {
    return { members: [] };
  },

  componentDidMount: function() {
    this._loadMembers();
  },

  render: function() {
    var members = [];

    this.state.members.forEach(function(member) {
      members.push(
        <MemberListItem key={member.get('id')} member={member} />
      );
    });

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Members</li>
            </ol>

            <div className="list-group">
              {members}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  },

  _loadMembers: function() {
    var self = this;

    Dropmail.Member.fetch(function(err, data) {
      if (err) return console.error(err);
      self.setState({ members: data.members });
    });
  }

});

/**
 * MemberListItem
 */
var MemberListItem = React.createClass({

  render: function() {
    var member = this.props.member;

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          {member.get('name')}
        </h4>

        <p className="list-group-item-text">
          Email: <a href="mailto:{member.get('email')}">{member.get('email')}</a>
        </p>

        <p className="list-group-item-text">
          Added: {member.get('created_at')}
        </p>
      </div>
    );
  }

});

module.exports = AdminMembers;
