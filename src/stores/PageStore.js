var AppDispatcher = require('../dispatcher/AppDispatcher')
  , EventEmitter = require('events').EventEmitter
  , AppConstants = require('../constants/AppConstants')
  , merge = require('react/lib/merge')
  , CHANGE_EVENT = 'change'
  , _pages = [];

/**
 * Stores
 */
var AuthorizationStore = require('./AuthorizationStore');

/**
 * Sets the page
 */

function set(page) {
  _pages.unshift(page);
  PageStore.emitChange();
}

var PageStore = merge(EventEmitter.prototype, {
  current: function() {
    return _pages[0] || window.location.pathname;
  },

  previous: function() {
    return _pages[1];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchIndex: AppDispatcher.register(function(payload) {
    var action = payload.action
      , path = payload.data;

    switch(action) {
      case AppConstants.PAGE_GOTO:
        set(path);
        break;

      default:
        return true;
    }

    return true;
  })
});

module.exports = PageStore;
