var AppDispatcher = require('../dispatcher/AppDispatcher')
  , AppConstants = require('../constants/AppConstants');

var TemplateActions = {

  list: function() {
    AppDispatcher.handleViewAction(AppConstants.TEMPLATE_LIST);
  },

  create: function(data) {
    AppDispatcher.handleViewAction(AppConstants.TEMPLATE_CREATE, data);
  }

};

module.exports = TemplateActions;
