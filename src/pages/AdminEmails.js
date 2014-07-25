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
 * Layouts
 */
var AdminLayout = require('../layout/AdminLayout');

/**
 * Components
 */
var ListItemLink = require('../components/ListItemLink')
  , Button = require('../components/Button')
  , Link = require('../components/Link')
  , Icon = require('../components/Icon')
  , Pager = require('../components/bootstrap/Pager')
  , PageItem = require('../components/bootstrap/PageItem');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

var AdminEmails = React.createClass({

  getInitialState: function() {
    var query = merge({ page: 1 }, this.props._route.query)
    return { emails: [], total: 0, pages: 1, query: query };
  },

  componentDidMount: function() {
    this._loadEmails();
  },

  componentDidUpdate: function(nextProps, nextState) {
    // Load new emails when query changes
    if (this.state.query !== nextState.query) this._loadEmails();
  },

  render: function() {
    var emails = [];

    this.state.emails.forEach(function(email) {
      emails.push(
        <EmailListItem key={email.get('id')} email={email} />
      );
    });

    return (
      <AdminLayout>
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Emails</li>
            </ol>

            <div className="checkbox">
              <label>
                <input
                  name="clicked"
                  type="checkbox"
                  checked={this.state.query.clicked == 'true'}
                  onChange={this._filter} />

                Clicked link
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  name="opened"
                  type="checkbox"
                  checked={this.state.query.opened == 'true'}
                  onChange={this._filter} />

                Opened
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  name="bounced"
                  type="checkbox"
                  checked={this.state.query.bounced == 'true'}
                  onChange={this._filter} />

                Bounced
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  name="complained"
                  type="checkbox"
                  checked={this.state.query.complained == 'true'}
                  onChange={this._filter} />

                Reported as spam
              </label>
            </div>

            <div className="list-group">
              {emails}
            </div>

            <Pager>
              <PageItem handleClick={this._previousPage} disabled={this.state.query.page == 1} previous>Previous</PageItem>
              <PageItem handleClick={this._nextPage} disabled={this.state.pages <= this.state.query.page} next>Next</PageItem>
            </Pager>

          </div>
        </div>
      </AdminLayout>
    );
  },

  _filter: function(event) {
    var target = event.target
      , query = merge(this.state.query, { page: 1 }) // creates shallow clone
      , href;

    if (target.checked) {
      query[target.name] = 'true';
    } else {
      delete query[target.name];
    }

    href = this.props._route.pathname + '?' + qs.stringify(query);

    PageActions.goTo(href);
    this.setState({ query: query });

    return false;
  },

  _previousPage: function() {
    var page = this.state.query.page - 1
      , query = merge(this.state.query, { page: page })
      , href = this.props._route.pathname + '?' + qs.stringify(query)

    PageActions.goTo(href);
    this.setState({ query: query });

    return false;
  },

  _nextPage: function() {
    var page = this.state.query.page + 1
      , query = merge(this.state.query, { page: page })
      , href = this.props._route.pathname + '?' + qs.stringify(query)

    PageActions.goTo(href);
    this.setState({ query: query });
    return false;
  },

  _hadFilter: function(type) {
    return this.props.query[type] == true;
  },

  _loadEmails: function() {
    var self = this;

    Dropmail.Email.fetch(this.state.query, function(err, data) {
      if (err) return console.error(err);

      self.setState({
        emails: data.emails,
        total: data.total,
        pages: data.total / data.per_page
      });
    });
  }

});

/**
 * Pagination React Component
 */
var Pagination = React.createClass({

  getDefaultProps: function() {
    return {
      next: null,
      previous: null
    };
  },

  render: function() {
    return (
      <ul className="pager">
        {this._listItem('previous', 'Previous')}
        {this._listItem('next', 'Next')}
      </ul>
    );
  },

  _listItem: function(type, name) {
    var classes = type
      , href = this.props[type];

    if (!href) classes += ' disabled';

    return (
      <li className={classes}>
        <a href="#" onClick={this._onClick.bind(null, type)}>
          {name || type}
        </a>
      </li>
    );
  },

  _onClick: function(type) {
    PageActions.goTo(this.props[type]);
    return false;
  }

});

/**
 * EmailListIten
 */
var EmailListItem = React.createClass({

  render: function() {
    var ClassSet = React.addons.classSet
      , email = this.props.email
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
    if (this.props.email.get('opened') !== true) return;

    return (
      <span className="text-success badge">
        <Icon type="folder-open-o" title="Opened" />
      </span>
    );
  },

  _clickedBadge: function() {
    if (this.props.email.get('clicked') !== true) return;

    return (
      <span className="text-success badge">
        <Icon type="external-link" title="Clicked" />
      </span>
    );
  },

  _bouncedBadge: function() {
    if (this.props.email.get('bounced') !== true) return;

    return (
      <span className="badge">
        <Icon type="chain-broken" title="Bounced" />
      </span>
    );
  },

  _complainedBadge: function() {
    if (this.props.email.get('complained') !== true) return;

    return (
      <span className="badge">
        <Icon type="exclamation-triangle" title="Complained" />
      </span>
    );
  },

  _hasError: function() {
    var email = this.props.email;
    return email.get('bounced') || email.get('complained');
  },

  _onClick: function() {
    PageActions.goTo('/admin/emails/' + this.props.email.get('id'));
  }

});

module.exports = AdminEmails;
