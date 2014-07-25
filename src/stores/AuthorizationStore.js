var AppDispatcher = require('../dispatcher/AppDispatcher')
  , EventEmitter = require('events').EventEmitter
  , AppConstants = require('../constants/AppConstants')
  , merge = require('react/lib/merge')
  , CHANGE_EVENT = 'auth_change'
  , _authorization;

function set(auth) {
  _authorization = auth;

  AuthorizationStore.emitChange();
}

function signIn(credentials) {
  Dropmail.startSession(credentials, function(err, auth) {
    if (err) console.error(err, auth);
    set(auth);
  });
}

function signOut(auth) {
  Dropmail.endSession();
  set();
}

function changeOrganization(id) {
  Dropmail.createSession({ organization_id: id }, function(err, auth) {
    if (err) console.error(err, auth);
    set(auth)
  });
}

var AuthorizationStore = merge(EventEmitter.prototype, {
  get: function() {
    return _authorization ||
      Dropmail._resumeSession() ||
      new Dropmail.Authorization;
  },

  errors: function() {
    return _errors || {};
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
      , data = payload.data;

    switch(action) {
      case AppConstants.AUTH_CREATE:
        signIn(data);
        break;

      case AppConstants.AUTH_DELETE:
        signOut(data);
        break;

      case AppConstants.AUTH_CHANGE_ORG:
        changeOrganization(data);
        break

      default:
        return true;
    }
  })

});

module.exports = AuthorizationStore;
