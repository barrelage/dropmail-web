var AppDispatcher = require('../dispatcher/AppDispatcher')
  , AppConstants = require('../constants/AppConstants');

var PageActions = {

  goTo: function(path) {
    AppDispatcher.handleViewAction(AppConstants.PAGE_GOTO, path);
  }

};

module.exports = PageActions;
