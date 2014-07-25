/** @jsx React.DOM **/

var React = require('react/addons');

var Alert = React.createClass({

  getDefaultProps: function() {
    return { type: "success" };
  },

  render: function() {
    var classSet = React.addons.classSet;
    var classes = classSet({
      'alert': true,
      'alert-success': this.props.type == 'success',
      'alert-info': this.props.type == 'info',
      'alert-warning': this.props.type == 'warning',
      'alert-danger': this.props.type == 'danger'
    });

    if (!this.props.children) return null;

    return this.transferPropsTo(
      <div className={classes} role="alert">
        {this.props.children}
      </div>
    );
  }

});

module.exports = Alert;
