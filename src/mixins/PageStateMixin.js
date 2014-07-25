/** @jsx React.DOM **/

var PageStore = require('../stores/PageStore');

var PageStateMixin = {

  getInitialState: function() {
    return this._pageState();
  },

  componentDidMount: function() {
    PageStore.addChangeListener(this._onPageChange);
  },

  componentWillUnmount: function() {
    PageStore.removeChangeListener(this._onPageChange);
  },

  _onPageChange: function() {
    this.setState(this._pageState());
  },

  _pageState: function() {
    return { currentPage: PageStore.current() };
  }

};

module.exports = PageStateMixin;
