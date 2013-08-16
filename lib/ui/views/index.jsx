/** @jsx React.DOM */
Views.Index = React.createClass({
  render: function() {
    return <h2>{app.authorization.get('organization').get('name')}</h2>;
  }
});
