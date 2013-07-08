/** @jsx React.DOM */
AlertMessage = React.createClass({
  render: function(){
    if (!this.props.text) return <div />;

    var class_name = 'alert alert-' + (this.props.context || 'info');

    return (
      <div class={class_name}>
        {this.props.text}
      </div>
    );
  }
});

