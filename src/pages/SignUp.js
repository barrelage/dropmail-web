/** @jsx React.DOM **/

var React = require('react')
  , MarketingLayout = require('../layout/MarketingLayout');

require('../less/pages/login.less');

var SignIn = React.createClass({

  render: function() {
    return (
      <MarketingLayout>
        <div className="container">
          <div className="page-header">
            <h1>Register</h1>
          </div>

          <form role="form">
            <div className="form-group">
              <label htmlFor="name-field">Name</label>

              <input
                className="form-control"
                id="name-field"
                placeholder="John Doe"
                required
                autofocus />

            </div>

            <div className="form-group">
              <label htmlFor="email-field">Email Address</label>

              <input
                className="form-control"
                id="email-field"
                type="email"
                placeholder="Email address"
                required />

            </div>

            <div className="form-group">
              <label htmlFor="password-field">Password</label>

              <input
                className="form-control"
                id="password-field"
                type="password"
                placeholder="Password"
                required />

            </div>

            <div className="form-group">
              <label htmlFor="password-confirmation-field">
                Confirm your password
              </label>

              <input
                className="form-control"
                id="password-confirmation-field"
                type="password"
                placeholder="Password"
                required />

            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Register
            </button>
          </form>
        </div>
      </MarketingLayout>
    );
  }

});

module.exports = SignIn;
