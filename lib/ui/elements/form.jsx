/** @jsx React.DOM */
Dropmail.ui.Form = React.createClass({
  render: function() {
    return <form action='#' method='post' class={ this.props.name }>
      { this.props.children }
      <button class='btn btn-primary' type='submit' data-loading='Loading…'>
        { this.props.submitLabel }
      </button>
    </form>;
  }
});
