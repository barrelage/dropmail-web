/**
 * AuthorizationState Mixin
 *
 * @jsx React.DOM
 */

/**
 * Stores
 */
var AuthorizationStore = require('../stores/AuthorizationStore');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Mixin
 */
var AuthorizationStateMixin = {

  getInitialState: function() {
    return this._authorizationState();
  },

  componentDidMount: function() {
    AuthorizationStore.addChangeListener(this._onAuthorizationChange);
  },

  componentWillUnmount: function() {
    AuthorizationStore.removeChangeListener(this._onAuthorizationChange);
  },

  requireAuthorization: function() {
    if (this.state.currentAuthorization.isSignedIn() == true) return;

    setTimeout(function() {
      PageActions.goTo('/signin');
    }, 1);
  },

  disallowAuthorization: function() {
    if (this.state.currentAuthorization.isSignedIn() == false) return;

    setTimeout(function() {
      PageActions.goTo('/admin');
    }, 1);
  },

  _onAuthorizationChange: function() {
    this.setState(this._authorizationState());
  },

  _user: function() {
    return AuthorizationStore.get().get('user') ||
      new Dropmail.User;
  },

  _organization: function() {
    return AuthorizationStore.get().get('organization') ||
      new Dropmail.Organization;
  },

  _authorizationState: function() {
    return {
      currentAuthorization: AuthorizationStore.get(),
      currentUser: this._user(),
      currentOrganization: this._organization()
    };
  }

};

module.exports = AuthorizationStateMixin;
