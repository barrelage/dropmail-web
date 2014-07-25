/**
 * MarketingLayout
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Actions
 */
var PageActions = require('../actions/PageActions');

/**
 * Components
 */
var NavigationItem = require('../components/NavigationItem');

/**
 * Mixins
 */
var PageStateMixin = require('../mixins/PageStateMixin')
  , AuthorizationStateMixin = require('../mixins/AuthorizationStateMixin');

/**
 * Styles
 */
require('../less/marketing.less');

/**
 * MarketingLayout React Class
 */
var MarketingLayout = React.createClass({

  mixins: [
    PageStateMixin,
    AuthorizationStateMixin
  ],

  render: function() {
    return this.transferPropsTo(
      <div>
        <div className="navbar navbar-inverse navbar-static-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Dropmail</a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <NavigationItem
                  label="Home"
                  path="/"
                  currentPage={this.state.currentPage}/>

                <NavigationItem
                  label="About"
                  path="/about"
                  currentPage={this.state.currentPage} />

                <NavigationItem
                  label="Contact"
                  path="/contact"
                  currentPage={this.state.currentPage} />

              </ul>

              <ul className="nav navbar-nav navbar-right">
                <NavigationItem
                  label="Sign In"
                  path="/signin"
                  currentPage={this.state.currentPage} />

                <NavigationItem
                  label="Register"
                  path="/signup"
                  currentPage={this.state.currentPage} />

              </ul>
            </div>
          </div>
        </div>

        {this.props.children}

        <footer>
          <div className="container">
            <p>&copy; Company 2014</p>
          </div>
        </footer>
      </div>
    );
  }

});

module.exports = MarketingLayout;
