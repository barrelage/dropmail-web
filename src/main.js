/** @jsx React.DOM **/

var React = require('react')
  , config = require('../config')
  , Routes = require('./components/Routes');

require('dropmail');

// Global
window.React = React;
window.Dropmail = new Dropmail(config.api);

React.renderComponent(
  <Routes />,
  document.getElementById('dropmailapp')
);

