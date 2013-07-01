/** @jsx React.DOM */
FormSubmit = React.createClass({
  render: function(){
    return (
      <button class='btn btn-primary' type='submit' data-loading='Loading…'>
        {this.props.label}
      </button>
    )
   }
});

FormField = React.createClass({
  render: function(){
    var groupClass = 'control-group'
      , helpBlock;

    if (this.props.errors && this.props.errors.length){
      groupClass += ' error';
      helpBlock = <div class='help-block'>
        {this.props.errors.join(', ')}
      </div>;
    }

    return (
      <div class={groupClass}>
        <label class='control-label' for={this.props.name}>
          {this.props.label}
        </label>
        <div class='controls'>
          <input
            type={this.props.type || 'text'}
            name={this.props.name}
            placeholder={this.props.placeholder}
          />
          {helpBlock}
        </div>
      </div>
    )
  }
});
