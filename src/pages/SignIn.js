/**
 * SignIn Page
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Layouts
 */
var MarketingLayout = require('../layout/MarketingLayout');

/**
 * Mixins
 */
var ParseRefsMixin = require('../mixins/ParseRefs')
  , AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin');

/**
 * Actions
 */
var AuthorizationActions = require('../actions/AuthorizationActions')
  , PageActions = require('../actions/PageActions');

/**
 * Components
 */
var Alert = require('../components/Alert')
  , FormField = require('../components/FormField');

/**
 * SignIn React Component
 */

var SignIn = React.createClass({

  mixins: [
    ParseRefsMixin,
    AuthorizationStateMixin
  ],

  render: function() {
    this.disallowAuthorization();

    return (
      <MarketingLayout>
        <div className="container">
          <div className="page-header">
            <h1>Sign In</h1>
          </div>

          <Alert type="danger">
            {this.state.currentAuthorization.errors.message}
          </Alert>

          <form onSubmit={this._handleSubmit} role="form">
            <div className="form-group">
              <label htmlFor="email-field">Email address</label>

              <input
                type="email"
                className="form-control"
                id="email-field"
                ref="email"
                placeholder="Email address"
                required
                autofocus />

            </div>

            <div className="form-group">
              <label htmlFor="password-field">
                Password <a href="/forgot_password">(forgot password)</a>
              </label>

              <input
                type="password"
                className="form-control"
                id="password-field"
                ref="password"
                placeholder="Password"
                required />

            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </MarketingLayout>
    );
  },

  _handleSubmit: function() {
    AuthorizationActions.signIn(this.parseRefs());
    return false;
  }

});

module.exports = SignIn;
