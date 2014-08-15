/**
 * Pagination Component
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react')
  , merge = require('react/lib/merge')
  , qs = require('qs');

/**
 * Components
 */
var Pager = require('../components/bootstrap/Pager')
  , PageItem = require('../components/bootstrap/PageItem')

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

var Pagination = React.createClass({

  getInitialState: function() {
    var query = this.props._route.query;

    return {
      query: merge({ page: 1 }, query),
      rows: [],
      total: 0,
      pages: 1
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    //TODO update URL with state change
    //PageActions.pushState(this.state.query);
  },

  componentDidMount: function() {
    this._fetch();
  },

  render: function() {
    var self = this
      , rows = []
      , query = [];

    this.state.rows.forEach(function(data) {
      rows.push(self.props.rowComponent({ key: data.get('id'), data: data }));
    });

    return (
      <div>
       <div className="list-group">
          {rows}
        </div>

        {this._navigation()}
      </div>
    );
  },

  _navigation: function() {
    if (this.state.pages <= 1) return null;

    return (
      <Pager>
        <PageItem
          handleClick={this._navigate.bind(null, -1)}
          disabled={this.state.query.page == 1}
          previous>

          Previous
        </PageItem>

        <PageItem
          handleClick={this._navigate.bind(null, 1)}
          disabled={this.state.pages <= this.state.query.page}
          next>

          Next
        </PageItem>
      </Pager>
    );
  },

  _fetch: function() {
    var self = this;

    this.props.resource.fetch(this.state.query, function(err, data) {
      if (err) return console.error(err);

      self.setState({
        rows: data[self.props.resource.path],
        total: data.total,
        pages: (data.total / data.per_page)
      });
    });
  },

  _navigate: function(pageOffset) {
    if (typeof pageOffset == 'undefined') pageOffset = 1;

    var page = parseInt(this.state.query.page) + pageOffset
      , query = merge(this.state.query, { page: page });

    this.setState({ query: query }, this._fetch);

    return false;
  }

});

module.exports = Pagination;
