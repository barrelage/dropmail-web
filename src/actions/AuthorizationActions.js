var AppDispatcher = require('../dispatcher/AppDispatcher')
  , AppConstants = require('../constants/AppConstants');

var AuthorizationActions = {

  signIn: function(auth) {
    AppDispatcher.handleViewAction(AppConstants.AUTH_CREATE, auth);
  },

  signOut: function() {
    AppDispatcher.handleViewAction(AppConstants.AUTH_DELETE);
  },

  changeOrganization: function(id) {
    AppDispatcher.handleViewAction(AppConstants.AUTH_CHANGE_ORG, id);
  }

};

module.exports = AuthorizationActions;
