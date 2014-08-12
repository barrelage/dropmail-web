var AppDispatcher = require('../dispatcher/AppDispatcher')
  , AppConstants = require('../constants/AppConstants')
  , qs = require('qs');

var PageActions = {

  goTo: function(path) {
    AppDispatcher.handleViewAction(AppConstants.PAGE_GOTO, path);
  },

  pushState: function(query) {
    var path = window.location.pathname + '?' + qs.stringify(query);
    AppDispatcher.handleViewAction(AppConstants.PAGE_PUSH, path);
  }

};

module.exports = PageActions;
