/**
 * FormField React Component
 *
 * @jsx React.DOM
 */

/**
 * Module dependencies
 */
var React = require('react/addons');

var HelpBlock = React.createClass({

  render: function() {
    if (this.props.errors) {
      this.props.children = this.props.errors.join(', ');
    }

    if (!this.props.children) return null;

    return (
      <div className="help-block">
        {this.props.children}
      </div>
    );
  }

});

var FormField = React.createClass({

  render: function() {
    var ClassSet = React.addons.classSet
      , groupClass = ClassSet({
          'form-group': true,
          'has-error': this._hasError()
        });

    var input = this.transferPropsTo(
      <input
        className="form-control"
        name={this.props.name}
        ref={this.props.name}
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder} />
    );

    return (
      <div className={groupClass}>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>

        {input}

        <HelpBlock errors={this.props.errors} />
      </div>
    );
  },

  _hasError: function() {
    return this.props.errors && this.props.errors.length;
  }

});

module.exports = FormField;
