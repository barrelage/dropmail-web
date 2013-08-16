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
    var groupClass = 'form-group'
      , helpBlock;

    if (this.props.errors && this.props.errors.length){
      groupClass += ' error';
      helpBlock = <div class='help-block'>
        {this.props.errors.join(', ')}
      </div>;
    }

    return (
      <div class={groupClass}>
        <label class='control-label col-lg-2' for={this.props.name}>
          {this.props.label}
        </label>
        <div class='col-lg-10'>
          <input
            class='form-control'
            type={this.props.type || 'text'}
            name={this.props.name}
            placeholder={this.props.placeholder}
          />
          {helpBlock}
        </div>
      </div>
    );
  }
});
