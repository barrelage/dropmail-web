/**
 * Page: /admin/emails
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons')
  , moment = require('moment')
  , merge = require('react/lib/merge')
  , qs = require('qs');

/**
 * Pages
 */
var AdminPage = require('../pages/AdminPage');

/**
 * Components
 */
var Icon = require('../components/Icon')
  , Pagination = require('../components/Pagination');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

var AdminEmails = React.createClass({

  render: function() {
    return (
      <AdminPage>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Emails</li>
            </ol>

            <Pagination
              resource={Dropmail.Email}
              rowComponent={EmailListItem}
              _route={this.props._route} />

          </div>
        </div>
      </AdminPage>
    );
  }

});

/**
 * EmailListItem
 */
var EmailListItem = React.createClass({

  render: function() {
    var ClassSet = React.addons.classSet
      , email = this.props.data
      , classes = ClassSet({
        'list-group-item': true,
        'list-group-item-danger': this._hasError()
    });

    return (
      <div className={classes} onClick={this._onClick}>
        <span className="badge">
          <Icon type="chevron-right" />
        </span>

        <span className="badge">
          {moment(email.get('send_at')).format('YYYY/MM/DD hh:mm')}
        </span>

        {this._openedBadge()}
        {this._clickedBadge()}
        {this._bouncedBadge()}
        {this._complainedBadge()}

        <h4 className="list-group-item-heading">
          {email.get('to')}
        </h4>
      </div>
    );
  },

  _openedBadge: function() {
    if (this.props.data.get('opened') !== true) return;

    return (
      <span className="text-success badge">
        <Icon type="folder-open-o" title="Opened" />
      </span>
    );
  },

  _clickedBadge: function() {
    if (this.props.data.get('clicked') !== true) return;

    return (
      <span className="text-success badge">
        <Icon type="external-link" title="Clicked" />
      </span>
    );
  },

  _bouncedBadge: function() {
    if (this.props.data.get('bounced') !== true) return;

    return (
      <span className="badge">
        <Icon type="chain-broken" title="Bounced" />
      </span>
    );
  },

  _complainedBadge: function() {
    if (this.props.data.get('complained') !== true) return;

    return (
      <span className="badge">
        <Icon type="exclamation-triangle" title="Complained" />
      </span>
    );
  },

  _hasError: function() {
    var email = this.props.data;
    return email.get('bounced') || email.get('complained');
  },

  _onClick: function() {
    PageActions.goTo('/admin/emails/' + this.props.data.get('id'));
  }

});

module.exports = AdminEmails;
